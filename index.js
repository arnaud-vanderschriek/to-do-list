const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const pathRoute = require('./route/router'); 
const fetch = require('node-fetch');                            // assignation du fichier router.js a la variable pathRoute
const stringify = require('node-stringify');


const urlEncoderParser = bodyParser.urlencoded({ extended:false})
const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/route', pathRoute);

app.use(session({secret: 'chocoCookie'}));    

// lier le favicon sous express
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// lier le css sous express
app.use(express.static('public'));
app.use(express.static('views'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());


app.use( (req, res, next) => {
    if(typeof(req.session.todo)=='undefined'){
        req.session.todo = [];

    }
    
    next();
})


// définir la view "main.ejs" comme page principale. => '/'
app.get('/', (req,res) => {

    res.render('main.ejs', {todo: req.session.todo, data:req.body.name});
})

// ajouter une tache
app.post('/', urlEncoderParser, (req,res) => {    // urlEncoderParser permet de recupérer l'attribut name du formulaire (par la méthode POST dans ce cas)
     let data = req.body.name
    if(data !== '')
    req.session.todo.push(req.body.name);
        res.render('main.ejs',{todo: req.session.todo,data:req.body.name})
})

// on supprime une tâche
app.get('/del/:id', (req,res) =>{
    data=req.params.id
    if(req.params.id !== ''){
        req.session.todo.splice(req.params.id,1)
    }
    res.render('main.ejs', {todo: req.session.todo, data:req.params.name});
})


app.get('/up/:id',urlEncoderParser, (req, res) =>{               // A FAIRE !!!!!!!!!     Fonction Update....
        data =req.session.todo[req.params.id]   
        console.log( req.session.todo[req.params.id])
     
        if(req.params.id !==''){
            req.session.todo.splice(req.params.id,1)
        }
        res.render('main.ejs', {todo: req.session.todo, data});
       
})


app.use( (req, res) => {
    res.redirect('/');
})

app.listen(3000, () => console.log("server up"));