// import {dbPort} from '../src/config.js'
// import sampleBreach from './sampleBreach.json';
const dbPort = 3001;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const mongoose = require("mongoose");

const connection = mongoose.createConnection(
  "mongodb://localhost:27017/",
  {
    dbName: "Quiet-Feet",
  },
  (err) =>
    err ? console.log(err) : console.log("Connected to Quiet-Feet database")
);

const newSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
var collection = connection.model("Users", newSchema);
module.exports = collection;

const digitalIdentitySchema = new mongoose.Schema({
  email:{
    type: [String],
    default: undefined
  }
  ,
  description: {
    type: [String],
    default: undefined
  },
  phoneNumber: {
    type: String,
  },
  dataBreachLog: {
    type: String,
  },
  recentActivity: {
    type: String,
  },
  usernames: {
    type: String,
  },
  platforms: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
var diCollection = connection.model("Digital-Identity", digitalIdentitySchema);
module.exports = diCollection;


app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await collection.findOne({
      email: email,
      password: password,
    });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.insertMany([data]);
      const getNewID = await collection.findOne({ email: email });
      await diCollection.insertMany({_id: getNewID._id, email: email, description: 'Main'});
    }
  } catch (e) {
    res.json("fail");
  }

  
});


app.post("/addEmail", async (req, res) => {
  const { userEmail, email, description } = req.body;

  
  try {
    checkID = await collection.findOne({email: userEmail});
    const id = checkID.id;

    const data = {
      _id: id,
      email: email,
      description: description,
    };

    if (checkID){
      try {
        const check = await diCollection.findOne({ email: email });
        const checkIDDI = await diCollection.findOne({ _id: id });
    
        if (check) {
          res.json("exist");
        } else if (!check && checkIDDI){
          res.json("updated")
          await diCollection.updateOne(
            { _id: id },
            {
              $push: {
                "email": email, 
                "description": description
                }
            }
         )
        }else {
          res.json("notexist");
          await diCollection.insertMany([data]);
        }
      }catch (e) {
        // res.json("fail");
      }
    } else {
      res.json("notexist")
    }
  }catch (e) {
    res.json("fail");
    
  }
});



// /getEmails

app.get("/getEmails", cors(), async (req, res) => {
  // console.log(req.query.id);
  const email = req.query.email;
  // var data = await diCollection.findById(req.query.id).exec();

  try {
    var userInfo = await collection.findOne({email: email});
    if (userInfo) {
      var dataDI = await diCollection.findOne({_id: userInfo._id});
      // res.json("exist");
      // data,
      res.send({email: dataDI.email, description: dataDI.description});
    } else {
      res.json("notexist");
      // res.json("Error Getting Emails - Does not Exist")
    }
  } catch (e) {
    res.json("fail");
  }
});

app.get("/getNameAndID", cors(), async (req,res) => {
  const email = req.query.email;

  try{
    var userInfo = await collection.findOne({email: email});
    if(userInfo){
      var dataName = userInfo.firstName;
      var dataID = userInfo._id; 
      res.send({id: dataID, firstName: dataName});
    } else {
      res.json("notexist");
    }
  }catch(e){
    res.json("fail");
  }
});

app.get('/getBreachedData', cors(), async (req,res) => {
var data =
  [
    {
      "Title":"Adobe",
      "Domain":"adobe.com",
      "BreachDate":"2013-10-04",
      "Description":"In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, <em>encrypted</em> password and a password hint in plain text. The password cryptography was poorly done and many were quickly resolved back to plain text. The unencrypted hints also <a href=\"http://www.troyhunt.com/2013/11/adobe-credentials-and-serious.html\" target=\"_blank\" rel=\"noopener\">disclosed much about the passwords</a> adding further to the risk that hundreds of millions of Adobe customers already faced.",
      "DataClasses":["Email addresses","Password hints","Passwords","Usernames"],

    },
    {
      "Title":"Battlefield Heroes",
      "Domain":"battlefieldheroes.com",
      "BreachDate":"2011-06-26",
      "Description":"In June 2011 as part of a final breached data dump, the hacker collective &quot;LulzSec&quot; <a href=\"http://www.rockpapershotgun.com/2011/06/26/lulzsec-over-release-battlefield-heroes-data\" target=\"_blank\" rel=\"noopener\">obtained and released over half a million usernames and passwords from the game Battlefield Heroes</a>. The passwords were stored as MD5 hashes with no salt and many were easily converted back to their plain text versions.",
      "DataClasses":["Passwords","Usernames"], 
    }
  ]
;
  res.send(data);


})


app.listen(dbPort, () => {
  console.log("Connected to Port: " + dbPort);
});
