const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('cookie-session');


const urlEncoderParser = bodyParser.urlencoded({ extended:false})
const app = express();

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


// définir une autre page 
app.get('/contact', () => {
    res.render('contact.ejs');
})

// ajouter une tache
app.post('/', urlEncoderParser, (req,res) => {    // urlEncoderParser permet de recupérer l'attribut name du formulaire (par la méthode POST dans ce cas)
    req.session.todo.push(req.body.name);
    res.redirect('/');
})

app.get('/supprimer/:id', (req,res) =>{
    if(req.params.id !=''){
        req.session.todo.splice(req.params.id, 1)
    }
    res.redirect('/');
})

app.use( (req, res) => {
    res.redirect('/');
})

app.listen(3000, () => console.log("server up"));