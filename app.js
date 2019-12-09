require('dotenv').config();
var path = require('path');
var express = require('express');
var sheets = require('./key/index');
const {google} = require('googleapis');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'));
app.use(express.json());
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.get("/",async (req,res)=>{
    try {
        let result = await  sheets.spreadsheets.values.get({
            spreadsheetId:process.env.SHEETID,
            range:'A:H'
        })
        res.render('index.ejs',{products:result.data.values})
    } catch (error) {
        res.send('Lỗi :' + error)
    }
})
app.listen(process.env.PORT,function(){
    console.log('web listened on port :' + process.env.PORT);
})