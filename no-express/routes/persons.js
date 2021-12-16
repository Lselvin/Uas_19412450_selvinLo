var express = require('express'); //use express modules
    var router = express.Router();
    var dbConn  = require('../lib/db'); //connect to db on stage 2
    
    // display all persons
    router.get('/', function(req, res, next) {
        dbConn.query('SELECT * FROM persons ORDER BY id desc',function(err,rows)     {
            if(err) {
                req.flash('error', err);
                res.render('persons',{data:''});
            } else {
                res.render('persons',{data:rows});
                // render to views/persons/index.ejs
            }
        });
    });
    
        // display add a person page
        router.get('/add', function(req, res, next) {    
            // render to add.ejs
            res.render('persons/add', {
                name: '',
                job: ''
            })
        })

        // add a new person
    router.post('/add', function(req, res, next) {    
        let name = req.body.name;
        let job = req.body.job;
        let errors = false;
        if(name.length === 0 || job.length === 0) {
            errors = true;
            req.flash('error', "Please enter name and job"); // set flash message
            // render to add.ejs with flash message
            res.render('persons/add', {
                name: name,
                job: job
            })
        }
        // if no error, insert query to db
        if(!errors) {
            var form_data = {
                name: name,
                job: job
            }
            dbConn.query('INSERT INTO persons SET ?', form_data, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    // render to add.ejs
                    res.render('persons/add', {
                        name: form_data.name,
                        job: form_data.job                    
                    })
                } else {                
                    req.flash('success', 'a person successfully added');
                    res.redirect('/persons');
                }
            })
        }
    })
    
    module.exports = router;