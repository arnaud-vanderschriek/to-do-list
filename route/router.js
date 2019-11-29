const express = require('express');
const router = express.Router();           // utilisation de la methode "Router" d'"Express"
const fetch = require('node-fetch');


router.get('/meteo', (req,res) => {        // app.get => router.get
    const api_url = "https://api.darksky.net/forecast/04b59744b4cb848ebf7be229b519487a/37.8267,-122.4233";
    fetch(api_url)
    .then(res => res.json())
    .then(data => {
    res.json(data);
    })
})

router.get('/gif', (req, res) => {
    res.render('gif.ejs');
})

router.get('/poubelle', (req, res) => {
    res.render('poubelle.ejs');
})


module.exports = router;                        // page rendue accessible par  "export" et assigné a une variable 