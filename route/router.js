const express = require('express');
const router = express.Router();            // utilisation de la methode "Router" d'"Express"


router.get('/meteo', (req,res) => {         // app.get => router.get
    res.render('meteo.ejs');
})

router.get('/gif', (req, res) => {
    res.render('gif.ejs');
})

router.get('/poubelle', (req, res) => {
    res.render('poubelle.ejs');
})


module.exports = router;                        // page rendue accessible par  "export" et assigné a une variable 