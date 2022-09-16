    const express = require('express');
    const expressLayouts = require('express-ejs-layouts');

    const app = express();
    const port = 3000;
// ============================================= setup ejs ===========================================
    app.set('view engine','ejs');
    app.use(expressLayouts);
//================================================= Route =====================================
    app.get('/',(req,res) => {
    
    // res.json(
    //     {user:'tobi',email:'@GMAIL.COM'},
        
    // )
    // res.sendFile('./views/index.html',{root :__dirname})
    const mahasiswa = [
        {
            nama:'Dede syarifudin',
            email :'dede@gmail.com'
        },
        {
            nama:' syarifudin',
            email :'syarifudin@gmail.com'
        },
        {
            nama:'alhadid07',
            email :'alhadid07@gmail.com'
        }, 
        {
            nama:'ahmadbedoel',
            email :'ahmad@gmail.com'
        }
        
    ]
    res.render('index',{
        nama:'Dedesyarifudin' ,
        title:'halaman home',
        mahasiswa,
        layout:'layouts/main-layout'
    })
    
    });

    app.get('/about',(req,res) => {
    // res.send('halaman about ')
    // res.sendFile('./views/about.html',{root :__dirname})
    res.render('about',{
        layout:'layouts/main-layout',
        title:'halaman about'
    })
    });

    app.get('/contact',(req,res) => {
    // res.send('halaman contack')
    // res.sendFile('./views/contact.html',{root :__dirname})
    res.render('contact',{
        layout:'layouts/main-layout',
        title:'halaman contact'
    })
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