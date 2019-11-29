const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const pathRoute = require('./route/router'); 
const fetch = require('node-fetch');                            // assignation du fichier router.js a la variable pathRoute


const urlEncoderParser = bodyParser.urlencoded({ extended:false})
const app = express();

app.use('/route', pathRoute);

app.use(session({secret: 'chocoCookie'}));    

// lier le favicon sous express
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// lier le css sous express
app.use(express.static('public'));


app.use( (req, res, next) => {
    if(typeof(req.session.todo)=='undefined'){
        req.session.todo = [];
    }
    next();
})


// définir la view "main.ejs" comme page principale. => '/'
app.get('/', (req,res) => {
    
    res.render('main.ejs', {todo: req.session.todo} );
})

// ajouter une tache
app.post('/', urlEncoderParser, (req,res) => {    // urlEncoderParser permet de recupérer l'attribut name du formulaire (par la méthode POST dans ce cas)
    if(req.body.name == ''){
        res.redirect('/');
    }else{
        req.session.todo.push(req.body.name);
        res.redirect('/');
    }
})

app.get('/supprimer/:id', (req,res) =>{
    if(req.params.id !=''){
        req.session.todo.splice(req.params.id, 1)
    }
    res.redirect('/');
})

// app.post('/update/:id', (req, res) =>{               // A FAIRE !!!!!!!!!     Fonction Update....
//     if(req.params.id != ''){
//         req.body.up = req.params.id 
//     }
//     res.redirect('/');
// })


// app.get('/meteo', (req, res) => {
//     const api_url = "https://api.darksky.net/forecast/04b59744b4cb848ebf7be229b519487a/37.8267,-122.4233";
//     fetch(api_url)
//     .then(res => res.json())
//     .then(data => {
//     res.json(data);
//     console.log(data);
// })
// })
// const api_url = "https://api.darksky.net/forecast/04b59744b4cb848ebf7be229b519487a/37.8267,-122.4233";
// const fetch_response = await fetch(api_url);
// console.log(fetch_response);
// const resp = await fetch_response.json();
// console.log(resp);

app.use( (req, res) => {
    res.redirect('/');
})

app.listen(3000, () => console.log("server up"));