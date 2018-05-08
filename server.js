//Install express server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const stripe = require("stripe")(
  "sk_test_xtz7vzUNDhyFM1leNDKmLLAW"
  );
 // app.use(express.static(__dirname + '/dist'));
  // parse JSON inputs
app.use(bodyParser.json());

// Also, parse URL encoded inputs
app.use(bodyParser.urlencoded());

//app.get('/', (req, res) => res.send('Hello World!'))

// create ephemeral keys for any customer
app.post("/ephemeral_keys", (req, res) => {
  console.log(req.body);
  //console.log(req.baseUrl);
    var stripe_version = req.body.api_version;
    var customerId =req.body.customerId;

    if(!stripe_version)
    stripe_version=req.query.api_version;

    if(!customerId)
    customerId=req.query.customerId;


    console.log(stripe_version + "" +customerId);
    if (!stripe_version) {
        res.status(400).end();
      return;
    }
    
    // This function assumes that some previous middleware has determined the
    // correct customerId for the session and saved it on the request object.
    stripe.ephemeralKeys.create(
      {customer: customerId},
      {stripe_version: stripe_version}
    ).then((key) => {
       console.log(key);
      res.status(200).json(key);
    
    }).catch((err) => {
       // res.send(err)
       console.log(err)
      res.status(500).end();
    });
  });

  // create customer 

  app.post("/create_customer", (req, res) => {
    console.log(req.body);
    //console.log(req.baseUrl);
      var email = req.body.email;

      if(!email)
      email=req.query.email;
  
      console.log(email);
      if (!email) {
          res.status(400).end();
        return;
      }
      
      stripe.customers.create({
        email:email
      }, function(err, customer) {
        // asynchronously called

        console.log(err);
        console.log(customer);
        if(err!=null){
          res.status(402).end();
        }
        else if(customer!=null){
          res.status(200).send(customer.id);
        }
      });

      });

  // create charge for any customer

app.post("/charge", (req, res) => {
  console.log(req.body);
  //console.log(req.baseUrl);

    var customerId =req.body.customer_id;
    var amount =req.body.amount;
    var shipping =req.body.shipping;
    var source = req.body.source;
    var metadata =req.body.metadata;

    if(!amount)
    amount=req.query.amount;

    if(!customerId)
    customerId=req.query.customer_id;

    if(!shipping)
    shipping=req.query.shipping;

    if(!customerId)
    source=req.query.source;

    if(!metadata){
      metadata=req.query.metadata
    }

    if (!customerId) {
        res.status(400).end();
      return;
    }
    
    stripe.charges.create({
      amount: amount,
      currency: "gbp",
      description: "Example charge",
      source: source,
      shipping:shipping,
      customer:customerId,
      metadata:metadata,
    }, function(err, charge) {
      // asynchronously called

      if(err!=null){
        console.log(err);
        res.status(402).json(err);
      }
      else if(charge!=null){
        console.log(charge);
        res.status(200).json(charge);
      }
    });
  });

  // save card for any customer 

  app.post("/saveCards", (req, res) => {
  
    //console.log(req.baseUrl);
  
      var customerId =req.body.customer_id;
      var source = req.body.source;

      if(!customerId)
      customerId=req.query.customer_id;
     
      if(!source){
        source=req.query.source;
      }
  
     // console.log(stripe_version + "" +customerId);
      if (!customerId) {
          res.status(400).end();
        return;
      }
      
      // This function assumes that some previous middleware has determined the
      // correct customerId for the session and saved it on the request object.
      stripe.customers.createSource(customerId, {
        source: source
      },function(err,customer){
       
        if(err!=null){
          console.log("create source",err);
          res.status(402).end();
        }
        else if(customer!=null){
          console.log("create source",customer);
          customerData(customer,customerId,function(confirmation){
          
              if(confirmation!=null){
              console.log("delete card",confirmation);
              res.status(200).send("Card already exists");
            }
            else{
              console.log("delete card"," card added successfully");
              res.status(200).send("Card added Successfully");
            }
          });
        }
      });
    });
    function customerData(customer,customer_id,callback){
      console.log('customer fingerprint',customer.fingerprint);

      var flag=false;

      stripe.customers.listCards(customer_id, function(err, cards) {
        // asynchronously called
        if(err!=null)
        {
          console.log("list card",err);
          callback(null);
        }
        else if(cards!=null)
        {
          console.log("list card",cards.data);
          if(cards.data.length>0)
          {
            for( var i=0; i<cards.data.length;i++){
              if(customer.fingerprint===cards.data[i].fingerprint && customer.id !=cards.data[i].id)
              {
                console.log(customer.id,cards.data[i].id);
                stripe.customers.deleteCard(
                  customer_id,
                  customer.id,
                  function(err, confirmation) {
                    // asynchronously called
                  callback(confirmation);
                  }
                );
                flag=true; 
                break;
              }
             
            }
            if(!flag)
            {
              console.log(flag," card not match with other cards")
              callback(null);
            }
          }
          else{

            console.log("list card"," no card found");
            callback(null);
          }
   
        }
      });
    }

    // google pay 
app.post("/chargeGooglePay", (req, res) => {
  console.log(req.body);
  //console.log(req.baseUrl);
   
    var amount =req.body.amount;
    var shipping =req.body.shipping;
    var source = req.body.source;
    var metadata =req.body.metadata;

    if(!amount)
    amount=req.query.amount;

    if(!shipping)
    shipping=req.query.shipping;

    if(!source)
    source=req.query.source;

    if(!metadata){
      metadata=req.query.metadata
    }

   // console.log(stripe_version + "" +customerId);
    if (!source) {
        res.status(400).end();
      return;
    }
    
    // This function assumes that some previous middleware has determined the
    // correct customerId for the session and saved it on the request object.
    stripe.charges.create({
      amount: amount,
      currency: "gbp",
      description: "Example charge",
      source: source,
      shipping:shipping,
      metadata:metadata,
    }, function(err, charge) {
      // asynchronously called
      
      
      if(err!=null){
        console.log(err);
        res.status(402).end();
      }
      else if(charge!=null){
        console.log(charge.id);
        res.status(200).json(charge);
      }
    });
  });

      // get all charges of any customer

app.post("/getCustomerCharges", (req, res) => {
  console.log(req.body);
  //console.log(req.baseUrl);
   

  var customerId =req.body.customer_id;
  var starting_after = req.body.starting_after;

  
  if(!customerId)
  customerId=req.query.customer_id;

  if(!starting_after)
  starting_after= req.query.starting_after;

 // console.log(stripe_version + "" +customerId);
  if (!customerId) {
      res.status(400).end();
    return;
  }

  if(!starting_after)
  {
    stripe.charges.list(
      { customer:customerId},
      function(err, charges) {
        // asynchronously called
          // asynchronously called
          
          if(err!=null){
            console.log(err);
            res.status(402).end();
          }
          else if(charges!=null){
            console.log(charges);
            res.status(200).json(charges);
          }
      }
    );
  }
  else{
    stripe.charges.list(
      { customer:customerId,
        starting_after:starting_after},
      function(err, charges) {
        // asynchronously called
          // asynchronously called
          
          if(err!=null){
            console.log(err);
            res.status(402).end();
          }
          else if(charges!=null){
            console.log("starting_after",charges);
            res.status(200).json(charges);
          }
      }
    );
  }
  
  
   
  });

  // send user email receipt

  app.post("/sendEmailReceipt", (req, res) => {
    console.log(req.body);
    //console.log(req.baseUrl);

    
     
  
    var email =req.body.email;
   
    if(!email)
    email= req.query.email;
  
   // console.log(stripe_version + "" +customerId);
    if (!email) {
        res.status(400).end();
      return;
    }


    const account= {
      user:'info@jump360.me',
       pass:'jump@2017360'
    }

    console.log('account',account);

    const mailOptions = {
      from: account.user, // sender address
      to: email, // list of receivers
      subject: 'Donation Payment Receipt', // Subject line
      text: "Hare Krishna!\n\n" +

      "        Thanks for your contribution. Please find your donation receipt below.\n\n"+

      "Regards,\n"+
      "ASK Krishna",
      attachments:[{
            filename:'donation receipt.pdf',
            contentType:'application/pdf',
            path: pdfdata
      }]
     
     // html: '<p>Your html here</p>'// plain text body
    };
    console.log('mail',mailOptions);
    // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
      name: 'Godaddy',
      host: "smtpout.secureserver.net",
      secure: true,
      port: 465,
      auth: {
      user: 'info@jump360.me',
      pass: 'jump@2017360'
      }
      });

   console.log('tarnsporetr',transporter);


   transporter.sendMail(mailOptions, function (err, info) {
      if(err)
      {
        console.log("err",err)
        res.status(200).send("Error sending email.");  
      }

      else
      {
        console.log("success",info);
        
        res.status(200).send("Donation Receipt sent.");
      }   
   });
  });
  });

  //send user's parent a concent about using app

  app.post("/sendUserConcentEmail", (req, res) => {
    console.log(req.body);
    console.log(req.query);
     
  
    var email =req.body.email;
    var userName = req.body.userName;
   
    if(!email)
    email= req.query.email;

    if(!userName)
    userName= req.query.userName;
  
   // console.log(stripe_version + "" +customerId);
    if (!email) {
        res.status(400).end();
      return;
    }

    const account= {
      user:'info@jump360.me',
       pass:'jump@2017360'
    }

    console.log('account',account);

    const mailOptions = {
      from: account.user, // sender address
      to: email, // list of receivers
      subject: 'Mailer',
      text: "Hare Krishna!\n\n" +

      "Your Daughter/Son "+userName+" has installed Ask Krishna App and below are the user consents\n\n"+
      
      "1) Allow sending the push notification, messages and emails relating to the purchases, information, and facilities offered by the Ask Krishna app\n\n"+
      
      "2) Allow receiving emails and marketing information relating directly to ISKCON London and from its subsidiaries.\n\n"+
      
      "3) Allow processing data collected for the analysis and statistic calculations. We use the name, DOB, location and amount of donation for this purpose.\n\n"+
      
      "4) Allow sharing personal details and statistics held on the files for the devotee (as the user) to be shared with ISKCON London.\n\n"+
      
      "Regards,\n"+
      "ASK Krishna"
     // html: '<p>Your html here</p>'// plain text body
    };
    console.log('mail',mailOptions);
    // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
      name: 'Godaddy',
      host: "smtpout.secureserver.net",
      secure: true,
      port: 465,
      auth: {
      user: 'info@jump360.me',
      pass: 'jump@2017360'
      }
      });

   console.log('tarnsporetr',transporter);


   transporter.sendMail(mailOptions, function (err, info) {
      if(err)
      {
        console.log("err",err)
        res.status(200).send("Error Sending email.");  
      }

      else
      {
        console.log("success",info);
        
        res.status(200).send("Sent concent email to your parent.");
      }   
   });
  });
  });


app.listen(process.env.PORT || 5000, () => console.log('Example app listening on port 5000!'))
//app.listen(process.env.PORT || 3030);


