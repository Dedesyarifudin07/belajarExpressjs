    const express = require('express');
    const expressLayouts = require('express-ejs-layouts');
    const {loadContact ,findContact,addContact ,cekDuplikat , deleteContact} = require('./utils/contacts');
    const {check, body, validationResult } = require('express-validator');
    const session = require('express-session');
    const cookieParser = require('cookie-parser');
    const flash = require('connect-flash');
    const { reset } = require('nodemon');
 

    const app = express();
    const port = 3000;
// ============================================= setup ejs ===========================================
    app.set('view engine','ejs');
// ============================================= third partymidleware ================================
    app.use(expressLayouts);
    

// ========================================== application level midleware ========================
app.use((req,res,next) => {
    console.log('time :',Date.now());
    next();
});

// ======================================== built in middleware ===================================
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));


//konfigurasi flash
app.use(cookieParser('secret'));
app.use(
    session({
    cookie: {maxAge : 6000},
    secret :'secret',
    resave:true,
    saveUninitialized :true,
    })
);

app.use(flash());

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
    const contacts = loadContact();
    
    res.render('contact',{
        layout:'layouts/main-layout',
        title:'halaman contact',
        contacts,
        msg:req.flash('msg')
        })
    });

    //halaman form tambah data
    app.get('/contact/add',(req,res) => {
        res.render('add-contact',{
            title:'Form Tambah Data Contact',
            layout:'layouts/main-layout.ejs'

        })
    })


    //process data contact
    app.post('/contact',
    [
        body('nama').custom((value) => {
            const duplikat =cekDuplikat(value);
            if(duplikat) {
                throw new Error('nama contact sudah digunakan');
            }

            return true;
        }),
        check('email','Email Tidak Valid').isEmail(),
        check('nohp','No Hp Tidak Valid').isMobilePhone('id-ID'),

    ]
    , (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            // return res.status(400).json({ errors: errors.array() });

            res.render('add-contact', {
                title:'Form tambah data contact',
                layout :'layouts/main-layout',
                errors :errors.array(),
            })
        }else{
            addContact(req.body);
            req.flash('msg','Data contact berhasil ditambahkan');
            res.redirect('/contact');
         }
        // res.send(req.body);



    })

    //procces delete contact
    app.get('/contact/delete/:nama', (req,res) => {
        const contact = findContact(req.params.nama);

        //jika kontak tidak ada
        if(!contact) {
            res.status(404);
            res.send('<h1>404</h1>');
        }else{
           deleteContact(req.params.nama);
           req.flash('msg','Data contact berhasil dihapus');
            res.redirect('/contact');
        }
    });

    //form ubah data contact
    app.get('/contact/edit/:nama',(req,res) => {
        const contact = findContact(req.params.nama);

        res.render('edit-contact',{
            title:'Form ubah Data Contact',
            layout:'layouts/main-layout.ejs',
            contact,
        })
    })
       


    //halaman detail contact
    app.get('/contact/:nama',(req,res) => {
        // res.send('halaman contack')
        // res.sendFile('./views/contact.html',{root :__dirname})
        const contact = findContact(req.params.nama);
        
        res.render('detail',{
            layout:'layouts/main-layout',
            title:'halaman detail contact',
            contact,
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