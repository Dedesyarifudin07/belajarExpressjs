const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = 3000;
// ============================================= setup ejs ===========================================
app.set('view engine','ejs');
app.use(expressLayouts);//third party middleware
app.use(express.static('public'));//built in middleware
app.use(express.urlencoded({extended:true}))








//================================================= Route =====================================
app.get('/',(req,res) => {
    
    // res.json(
    //     {user:'tobi',email:'@GMAIL.COM'},
        
    // )
    res.sendFile('./views/index.html',{root :__dirname})
});

app.get('/about',(req,res) => {
    // res.send('halaman about ')
    res.sendFile('./views/about.html',{root :__dirname})
});

app.get('/contact',(req,res) => {
    // res.send('halaman contack')
    res.sendFile('./views/contact.html',{root :__dirname})
});


app.get('/product/:id',(req,res) => {
    res.send('producy id :' + req.params.id)
})

app.use('/',(req,res) => {
    res.status(404)
    res.send('404')
})

app.listen(port,(req,res) => {
   console.log(`mongo contact app || listenig at http://localhost:${port}`);
   
})