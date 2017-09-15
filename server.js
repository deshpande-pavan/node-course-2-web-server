const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to update the log file');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // // res.send('<h1>Hello</h1>');
    // res.send({
    //     name: 'Pavan',
    //     likes: [
    //         'biking', 'cities'
    //     ]
    // });

    res.render('home.hbs', {
        pageTitle: "This is Home Pavan Page",
        welcomeMessage: 'Welcome to pavan This Page',
        // currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "Pavan Page",
        header1: 'About This Pavan Page',
        // currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'wrong route'
    });
});
app.listen(3000, () => {
    console.log("Server is up on port 3000");
});