const express = require('express')

const hbs = require('hbs');
hbs.registerPartials( __dirname+'/views/partials');

// cargar variables de entorno
require('dotenv').config()
const port = process.env.PORT // utilizar puerto


const app = express()


//? midleware: servir contenidos estaticos
app.use( express.static('public') )

// handlebars
app.set('view engine', 'hbs')

app.get('/', (req,res)=>{
    res.render('home', {
        nombre: 'Cristian Mora',
        titulo: 'Curso express | NodeJs'
    });
})

app.get('/generic', (req,res)=>{
    res.render('generic', {
        nombre: 'Cristian Mora',
        titulo: 'Curso express | NodeJs'
    });
})

app.get('/elements', (req,res)=>{
    res.render('elements', {
        nombre: 'Cristian Mora',
        titulo: 'Curso express | NodeJs'
    });
})

app.get('*', (req,res)=>{
    res.sendFile(__dirname+'/public/404.html')
})

app.listen(port)