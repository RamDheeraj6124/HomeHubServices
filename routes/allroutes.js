const express = require('express');
const router = express.Router();
const userGetController = require('../controllers/userGetController');
const userPostController = require('../controllers/userPostController');
const Rating=require('../models/rating');
/*
const mongoose = require('mongoose');
const ratingSchema = new mongoose.Schema({
    value: Number
  });
const Rating = mongoose.model("Rating", ratingSchema);
*/
// Routes for GET methods
router.get('/', userGetController.renderProject);
router.get('/altlogin', userGetController.altlogin);
router.get('/dashboard', userGetController.renderDashboard);
router.get('/login', userGetController.renderLogin);
router.get('/signup', userGetController.renderSignup);
router.get('/carpentershop', userGetController.rendercarpentershop);
router.get('/mobile', userGetController.rendermobile);
router.get('/painting', userGetController.renderpainting);
router.get('/homenurse', userGetController.renderhomenurse);
router.get('/interiordesign', userGetController.renderinteriordesign);
router.get('/electrian', userGetController.renderelectrian);
router.get('/furniture', userGetController.renderfurniture);
router.get('/plumbing', userGetController.renderplumbing);
router.get('/babysitter', userGetController.renderbabysitter);
router.get('/catering', userGetController.rendercatering);
router.get('/appliancess', userGetController.renderappliancess);
router.get('/spaandsalon', userGetController.renderspaandsalon);
router.get('/cleaning', userGetController.rendercleaning);
router.get('/housekeeping', userGetController.renderhousekeeping);
router.get('/flooringrepair', userGetController.renderflooringrepair);
router.get('/termsandconditions', userGetController.rendertermsandconditions);
router.get('/aboutus', userGetController.renderaboutus);
router.get('/contact', userGetController.rendercontact);
router.get('/Carpenterscart1', userGetController.renderCarpenterscart1);
router.get('/mobilecart', userGetController.rendermobilecart);
router.get('/homepaintingcart', userGetController.renderhomepaintingcart);
router.get('/interiordesigncart', userGetController.renderinteriordesigncart);
router.get('/Electricanscart1', userGetController.renderElectricanscart1);
router.get('/furniturecart', userGetController.renderfurniturecart);
router.get('/plumbingcart', userGetController.renderplumbingcart);
router.get('/Appliancescart1', userGetController.renderAppliancescart1);
router.get('/spaandsaloon', userGetController.renderspaandsaloon);
router.get('/homecleaingcart', userGetController.renderhomecleaingcart);
router.get('/flooringrepaircart', userGetController.renderflooringrepaircart);
router.post('/signup', userPostController.signup);
router.post('/login', userPostController.login);
router.get('/renderadmin',userGetController.renderadmin);
router.get('/renderadminlog',userGetController.renderadminlog);
router.post('/createuser',userPostController.createuser);
router.post('/updateuser',userPostController.updateuser);
router.post('/deleteuser',userPostController.deleteuser);
router.get('/already',userGetController.already);
router.get('/rendersubadmin',userGetController.rendersubadmin);
router.get('/rendersubadminlog',userGetController.rendersubadminlog);
router.post('/subadmincreateuser',userPostController.subadmincreateuser);
router.post('/subadminupdateuser',userPostController.subadminupdateuser);
router.get('/rendereditor',userGetController.rendereditor);
router.get('/rendereditorlog',userGetController.rendereditorlog);
router.get('/rateus',userGetController.rateus)
router.post('/editorupdateuser',userPostController.editorupdateuser);
router.get('/logfilter',userGetController.logfilter);
router.get('/forgotpassword',userGetController.forgotpassword);
router.get('/logout',userPostController.logout);
router.get('/cantupdate',userGetController.cantupdate);
router.get('/cantdelete',userGetController.cantdelete);
router.get('/goback',userGetController.goback);
router.get('/updatewithotp',userGetController.updatewithotp);
router.get('/loginwithotp',userGetController.loginwithotp);
router.get('/thankyou',userGetController.thankyou);
router.post('/sendOTP',userPostController.sendOTP);
router.post('/loginOTP',userPostController.loginOTP);
router.post('/resetPassword',userPostController.resetPassword);
router.post("/api/save-rating", async (req, res) => {
    try {
        const { value } = req.body;
        const rating = new Rating({ value });
        await rating.save();
        res.status(201).json({ message: "Rating saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while saving the rating" });
    }
  });

  
/*
router.get('/autocomplete',userGetController.autocomplete);*/

module.exports = router;
