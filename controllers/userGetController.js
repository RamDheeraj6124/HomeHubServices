// controllers/userGetController.js

const User = require('../models/userModel');
const Log = require('../models/Log');
const Search=require('../models/searchlist');
const Rating=require('../models/rating');
const mongoose=require('mongoose');
exports.goback=(req,res)=>{
  const isAuthenticated = req.session.user !== undefined;
  if (isAuthenticated ) {
    return res.redirect(req.session.dashboard);
}
}
/*
exports.autocomplete = async (req, res) => {
  const query = req.query.query.toLowerCase();
  console.log(query);
  try {
    const url = 'mongodb://localhost:27017/Hi';
    await mongoose.connect(url);
    console.log("hi");
    
    const searchList = await Search.find({ name: { $regex: `^${query}`, $options: 'i' } });
    console.log(searchList);
    const autocompleteResults = searchList.map(result => result.name);
    res.json(autocompleteResults);
    await mongoose.connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};*/


exports.renderProject = (req, res) => {
      const isAuthenticated = req.session.user !== undefined;
    
      if (isAuthenticated ) {
        return res.redirect(req.session.dashboard);
    }
      res.render('project12');
  };


// Render dashboard page
exports.renderDashboard = (req, res) => {
    const username = req.query.username;
    const email = req.query.email;
    
    if (username ) {
        res.render('project12', { username: username ,email:email});
    } else {
        res.send('Unauthorized access. Please log in.');
    }
  
};
exports.cantupdate=(req,res)=>{
  const username = req.query.username;
    const email = req.query.email;
    const role = req.query.role;
    res.render('cantupdate', {username:username,email:email,role:role});
}
exports.cantdelete=(req,res)=>{
  const username = req.query.username;
    const email = req.query.email;
    const role = req.query.role;
    res.render('cantdelete', {username:username,email:email,role:role});
}
exports.altlogin=(req,res)=>{
  const role=req.query.role;
  const username=req.query.username;
  const email=req.query.email;
  res.render('altuser',{role:role,username:username,email:email});
};
exports.renderadminlog = async (req, res) => {
  try {
      let adlogs = await Log.find();
      const email = req.query.email;
      const role = req.query.role;

      res.render('log', { adlogs, name: 'Admin Log', email, role });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
};

exports.rendersubadminlog = async (req, res) => {
  try {
      let adlogs = await Log.find({ doneby_user_role: { $ne: "Admin" } });
      const email = req.query.email;
      const role = req.query.role;

      res.render('log', { adlogs, name: 'Sub Admin Log', email, role });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
};

exports.rendereditorlog = async (req, res) => {
  try {
      let adlogs = await Log.find({ doneby_user_role: { $nin: ["Admin", "Sub Admin"] } });
      const email = req.query.email;
      const role = req.query.role;

      res.render('log', { adlogs, name: 'Editor Log', email, role });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
};

exports.logfilter = async (req, res) => {
  try {
      const email = req.query.email;
      const role = req.query.role;
      let adlogs = await Log.find({ doneby_user_email: email });
      let name = '';
      if (role == 4) {
          name = "Admin Log";
      } else if (role == 3) {
          name = "Sub Admin Log";
      } else if (role == 2) {
          name = "Editor Log";
      }
      res.render('filterlog', { adlogs, name: name });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
};

exports.renderadmin = async (req, res) => {
  try {
      const username = req.query.username;
      const email = req.query.email;
      const role = req.query.role;
      let users = await User.find();
      users = users.filter(user => user.role !== 4);
      const usersByRole = {
          'Sub Admin': [],
          'Editor': [],
          'Shop': [],
          'User': []
      };

      users.forEach(user => {
          switch (user.role) {
              case 3:
                  usersByRole['Sub Admin'].push(user);
                  break;
              case 2:
                  usersByRole['Editor'].push(user);
                  break;
              case 1:
                  usersByRole['Shop'].push(user);
                  break;
              case 0:
                  usersByRole['User'].push(user);
                  break;
              default:
                  break;
          }
      });

      res.render('admin', { usersByRole, username, role, email });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
};

exports.rendersubadmin = async (req, res) => {
  try {
      const username = req.query.username;
      const email = req.query.email;
      const role = req.query.role;
      let users = await User.find();
      users = users.filter(user => user.role < 3);

      const usersByRole = {
          'Editor': [],
          'Shop': [],
          'User': []
      };

      users.forEach(user => {
          switch (user.role) {
              case 2:
                  usersByRole['Editor'].push(user);
                  break;
              case 1:
                  usersByRole['Shop'].push(user);
                  break;
              case 0:
                  usersByRole['User'].push(user);
                  break;
              default:
                  break;
          }
      });

      res.render('subadmin', { usersByRole, username, role, email });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
};

exports.rendereditor = async (req, res) => {
  try {
      const username = req.query.username;
      const email = req.query.email;
      const role = req.query.role;
      let users = await User.find();
      users = users.filter(user => user.role < 2);

      const usersByRole = {
          'Shop': [],
          'User': []
      };

      users.forEach(user => {
          switch (user.role) {
              case 1:
                  usersByRole['Shop'].push(user);
                  break;
              case 0:
                  usersByRole['User'].push(user);
                  break;
              default:
                  break;
          }
      });

      res.render('editor', { usersByRole, username, role, email });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
};

exports.already=(req,res)=>{
  const {username,role,email}=req.body;
  res.render('alreadyexist',{username,role,email});
}
exports.forgotpassword=(req,res)=>{
  res.render('forgotpassword');
}


exports.renderLogin = (req, res) => {
    res.render('login');
  };
  
  exports.renderSignup = (req, res) => {
    res.render('signup');
  };

  exports.rendercarpentershop = (req, res) => {
    res.render('carpentershop');
  };

  exports.rendermobile = (req, res) => {
    res.render('mobile');
  };

  exports.renderpainting = (req, res) => {
    res.render('painting');
  };

  exports.renderhomenurse = (req, res) => {
    res.render('homenurse');
  };

  exports.renderinteriordesign = (req, res) => {
    res.render('interiordesign');
  };

  exports.renderelectrian = (req, res) => {
    res.render('electrian');
  };

  exports.renderfurniture = (req, res) => {
    res.render('furniture');
  };

  exports.renderplumbing = (req, res) => {
    res.render('plumbing');
  };

  exports.renderbabysitter = (req, res) => {
    res.render('babysitter');
  };

  exports.rendercatering = (req, res) => {
    res.render('catering');
  };

  exports.renderappliancess = (req, res) => {
    res.render('appliancess');
  };

  exports.renderspaandsalon = (req, res) => {
    res.render('spaandsalon');
  };

  exports.rendercleaning = (req, res) => {
    res.render('cleaning');
  };

  exports.renderhousekeeping = (req, res) => {
    res.render('housekeeping');
  };

  exports.renderflooringrepair = (req, res) => {
    res.render('flooringrepair');
  };

  exports.rendertermsandconditions = (req, res) => {
    res.render('termsandconditions');
  };

  exports.renderaboutus = (req, res) => {
    res.render('aboutus');
  };

  exports.rendercontact = (req, res) => {
    res.render('contact');
  };

  exports.renderCarpenterscart1 = (req, res) => {
    res.render('Carpenterscart1');
  };

  exports.rendermobilecart = (req, res) => {
    res.render('mobilecart');
  };

  exports.renderhomepaintingcart = (req, res) => {
    res.render('homepaintingcart');
  };

  exports.renderinteriordesigncart = (req, res) => {
    res.render('interiordesigncart');
  };

  exports.renderElectricanscart1 = (req, res) => {
    res.render('Electricanscart1');
  };

  exports.renderfurniturecart = (req, res) => {
    res.render('furniturecart');
  };

  exports.renderplumbingcart = (req, res) => {
    res.render('plumbingcart');
  };

  exports.renderAppliancescart1 = (req, res) => {
    res.render('Appliancescart1');
  };

  exports.renderspaandsaloon = (req, res) => {
    res.render('spaandsaloon');
  };

  exports.renderhomecleaingcart = (req, res) => {
    res.render('homecleaingcart');
  };

  exports.renderflooringrepaircart = (req, res) => {
    res.render('flooringrepaircart');
  };

  exports.forgotpassword=(req,res)=>{
    res.render('forgotpassword');
  }
  
  exports.updatewithotp =(req,res)=>{
    res.render('updatewithotp');
  }
  
  exports.loginwithotp = (req,res)=>{
    res.render('loginwithotp');
  }
  exports.thankyou=(req,res)=>{
    res.render('thankyou');
  }
  

  exports.rateus = async (req, res) => {
    try {
      let allrates = await Rating.find();
      let num = 0;
      let total = 0;
  
      if (allrates.length > 0) {
        for (let x in allrates) {
          num++;
          total += allrates[x].value;
        }
      }
  
      const avg = num > 0 ? total / num : 0;
      res.render('rateus', { avg, num });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error occurred');
    }
  };
  

