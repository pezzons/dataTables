const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
var flash = require('express-flash');
var session = require('express-session')
var bodyParser = require('body-parser');
var url = require('url');
app.use(bodyParser.json());


function createUploadsFolder() {
    const dir = './uploads';
    // trinam kataloga
    if (fs.existsSync(dir)) {
        fs.rmdirSync(dir);
    }    
    // sukuriame kataloga
    if (!fs.existsSync(dir)) {
      //fs.mkdirSync(dir);
    }
}

function createClientFolder() {
    const dir = './client';
    // trinam kataloga
    if (fs.existsSync(dir)) {
        //fs.rmdirSync(dir);
    }    
    // sukuriame kataloga
    if (!fs.existsSync(dir)) {
      //fs.mkdirSync(dir);
    }
}


//app.engine('ejs', require('ejs'));
//app.set('env', process.env.NODE_ENV);
//app.set('views', path.join(__dirname, '../app/views'));
//app.set('view engine', 'ejs');


let ejsPath = path.join(__dirname, 'views');
//console.log(ejsPath);

//app.use(express.static(ejsPath));
//app.set('views', ejsPath);
app.set('view engine', 'ejs'); // default views path ./views/<ejs file>

app.get('/', function(req,res){
    res.render('index');
    //res.json();
    //res.send('fuck');
});

app.get('/info', function(req,res){
    //createUploadsFolder();
    //createClientFolder();
    res.send({info: 1983});
});


function collectDataTableAjaxData(req, res, next){
    let dataCollect = '';
    if (req.method == 'POST') 
    {
        req.on('data', function (data) {
            dataCollect += data;
            if (dataCollect.length > 1e6){
                req.connection.destroy();
            };
        });

        req.on('end', function () {
            let qobj = url.parse(dataCollect, false);
            req.body = qobj;                
            req.data = qobj;
            next();
        });
             
    }else{
        req.data = req.query; 
        next();
    }
};

app.post('/jonas', collectDataTableAjaxData, function(req,res, X){ 


    console.log('2. BODY - -');
    console.log(req.body);
    console.log(' - - -');
    console.log('3. QUERY - -');
    console.log(req.query);
    console.log(' - - -');
    console.log('4. DATA - -');
    console.log(req.data);
    console.log(' - - -');


    res.send({
        "draw": 1,
        "recordsTotal": 57,
        "recordsFiltered": 57,
        "data": [
          {
            "first_name": "Airi",
            "last_name": "Satou",
            "position": "Accountant",
            "office": "Tokyo",
            "start_date": "28th Nov 08",
            "salary": "$162,700"
          },
          {
            "first_name": "Angelica",
            "last_name": "Ramos",
            "position": "Chief Executive Officer (CEO)",
            "office": "London",
            "start_date": "9th Oct 09",
            "salary": "$1,200,000"
          },
          {
            "first_name": "Ashton",
            "last_name": "Cox",
            "position": "Junior Technical Author",
            "office": "San Francisco",
            "start_date": "12th Jan 09",
            "salary": "$86,000"
          },
          {
            "first_name": "Bradley",
            "last_name": "Greer",
            "position": "Software Engineer",
            "office": "London",
            "start_date": "13th Oct 12",
            "salary": "$132,000"
          },
          {
            "first_name": "Brenden",
            "last_name": "Wagner",
            "position": "Software Engineer",
            "office": "San Francisco",
            "start_date": "7th Jun 11",
            "salary": "$206,850"
          },
          {
            "first_name": "Brielle",
            "last_name": "Williamson",
            "position": "Integration Specialist",
            "office": "New York",
            "start_date": "2nd Dec 12",
            "salary": "$372,000"
          },
          {
            "first_name": "Bruno",
            "last_name": "Nash",
            "position": "Software Engineer",
            "office": "London",
            "start_date": "3rd May 11",
            "salary": "$163,500"
          },
          {
            "first_name": "Caesar",
            "last_name": "Vance",
            "position": "Pre-Sales Support",
            "office": "New York",
            "start_date": "12th Dec 11",
            "salary": "$106,450"
          },
          {
            "first_name": "Cara",
            "last_name": "Stevens",
            "position": "Sales Assistant",
            "office": "New York",
            "start_date": "6th Dec 11",
            "salary": "$145,600"
          },
          {
            "first_name": "Cedric",
            "last_name": "Kelly",
            "position": "Senior Javascript Developer",
            "office": "Edinburgh",
            "start_date": "29th Mar 12",
            "salary": "$433,060"
          }
        ]
      });
});

app.get('/flash', 
    function(req,res){ 
        req.flash('message', { success: false, message: 'batch approval failed' }); 
        res.sendStatus(200);
});


const c = {a:5};
Object.assign(c, {b:6});
console.log(c);

let obja = { name: 'Robertas', role: 'pezonas', pezonas2: 'Mangirdas'};
let skaiciai = [1, 100, 12, 2, 45];
let found = skaiciai.find(function(x){
    return x < 100 && x > 10;
});




function checkItz(userMenus, menuKey){
    return Object.keys(userMenus).find(function(x){
        return 1;
    });
};

app.listen(5002);