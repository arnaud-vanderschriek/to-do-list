const express = require('express');
const router = express.Router();


// définir une autre page 
router.get('/meteo', (req,res) => {
    res.render('meteo.ejs');
})

router.get('/gif', (req, res) => {
    res.render('gif.ejs');
})

router.get('/poubelle', (req, res) => {
    res.render('poubelle.ejs');
})

router.get('/', (req,res) => {
    res.render('main.ejs', {todo: req.session.todo} );
})


module.exports=router;