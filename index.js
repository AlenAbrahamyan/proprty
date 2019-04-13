const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use('/proprty_files', express.static('proprty_files'));

app.set('view engine', 'ejs');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gevtest98@gmail.com',
      pass: 'gevor12gevor'
    }
  });
  

app.get('/', (req, res) => {
    res.render('proprty');
  });

  app.post('/', urlencodedParser, (req, res) => {
    
    res.render('proprty', {data: req.body});
    console.log(req.body.full_name, req.body.email, req.body.phone);

    var mailOptions = {
        from: 'gevtest98@gmail.com',
        to: 'd4nkuba@live.de',
        subject: 'New Client',
        html: '<h1>New Client</h1><p>' + req.body.full_name + '</p><p>' + req.body.email + '</p><p>'+ req.body.phone +'</p>'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ');
        }
      
      });


  });

  app.listen(process.env.PORT || 3000);