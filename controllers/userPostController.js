// controllers/userPostController.js
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Log = require('../models/Log');
const mongoose=require('mongoose');
const nodemailer=require('nodemailer');
const express=require('express');
const app=express.Router();
const Sdata=require('../models/sessiondata');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'kbhargavreddy22@gmail.com', // Your Gmail address
        pass: 'ygbi lfdv bpsb giza' // Your Gmail password
    }
});

exports.sendOTP = async (req, res) => {
    const email = req.body.email;
    const otp = Math.floor(1000 + Math.random() * 9000);
    const otpExpiration = new Date(); // Current date and time
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 5); // Setting OTP expiration to 5 minutes from now

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        user.otp = otp;
        user.otpExpiration = otpExpiration; // Store the expiration time with the user
        await user.save();

        const mailOptions = {
            from: 'kbhargavreddy22@gmail.com',
            to: email,
            subject: 'Forget Password - One Time Password',
            text: `Your OTP is: ${otp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send('Error sending OTP');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('OTP sent successfully');
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


exports.loginOTP = async (req, res) => {
    const email = req.body.email;
    const enteredOTP = req.body.otp;

    try {
        let user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Check if OTP is empty (already used or expired)
        if (!user.otp) {
            return res.status(401).send('OTP already used or expired');
        }

        // Check if entered OTP matches the stored OTP
        if (user.otp !== enteredOTP) {
            return res.status(401).send('Invalid OTP');
        }

        // Check if OTP has expired (assuming 5 minutes expiry)
        const currentTime = new Date();
        if (currentTime > user.otpExpiration) {
            user.otp = ''; // Clear the OTP
            await user.save();
            return res.status(401).send('OTP expired');
        }

        // Clear the OTP after successful login
        user.otp = '';
        await user.save();
        if (user.role === 0) {
            req.session.dashboard =`/dashboard?username=${encodeURIComponent(user.username)}&email=${encodeURIComponent(user.email)}`;
            return res.redirect(req.session.dashboard);
        } else {
            req.session.dashboard=`/altlogin?username=${encodeURIComponent(user.username)}&role=${encodeURIComponent(user.role)}&email=${encodeURIComponent(user.email)}`;
            return res.redirect(req.session.dashboard);
        }
    } catch (err) {
        console.error('Error: ', err);
        return res.status(500).json({ error: "Internal server error." });
    }
};



exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    try {
        // Find user by email and check if OTP is valid and not expired
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Check if OTP is empty (already used or expired)
        if (!user.otp) {
            return res.status(401).send('OTP already used or expired');
        }

        // Check if entered OTP matches the stored OTP
        if (user.otp !== otp) {
            return res.status(401).send('Invalid OTP');
        }

        // Check if OTP has expired (assuming 5 minutes expiry)
        const currentTime = new Date();
        if (currentTime > user.otpExpiration) {
            user.otp = ''; // Clear the OTP
            await user.save();
            return res.status(401).send('OTP expired');
        }

        // Update password
        user.password = hashedPassword;
        user.otp = ''; // Clear the OTP after password reset
        await user.save();

        res.send({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};


exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if the user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.render('as'); 
        }
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        });
        await newUser.save();

        // Render success page
        res.render('ssl');
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).send("Error: " + err.message);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email }).exec();
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        req.session.user = user;

        const logintime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        req.session.logintime = logintime;

        console.log('Session created for user:', user);
        console.log('Login time (IST):', logintime);

        if (user.role === 0) {
            req.session.dashboard =`/dashboard?username=${encodeURIComponent(user.username)}&email=${encodeURIComponent(user.email)}`;
            return res.redirect(req.session.dashboard);
        } else {
            req.session.dashboard=`/altlogin?username=${encodeURIComponent(user.username)}&role=${encodeURIComponent(user.role)}&email=${encodeURIComponent(user.email)}`;
            return res.redirect(req.session.dashboard);
        }
    } catch (err) {
        console.error('Error: ', err);
        return res.status(500).json({ error: "Internal server error." });
    }
};


exports.createuser = async (req, res) => {
    const { username, email, password, role } = req.body;
    const { ausername, arole, aemail } = req.query; // Retrieve parameters from req.query

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create the new user with the specified role using Mongoose
        await User.create({ username, email, password: hashedPassword, role });

        let add = '';
        if (role == 3) {
            add = 'Sub Admin';
        } else if (role == 2) {
            add = 'Editor';
        } else if (role == 1) {
            add = 'Shop';
        } else if (role == 0) {
            add = 'User';
        }

        // Create log entry
        await Log.create({
            action: 'Create User',
            timestamp: new Date(),
            doneby_user_name: ausername,
            doneby_user_role: 'Admin',
            doneby_user_email: aemail,
            performedonuser: email,
            performedonuser_initialrole: 'Null',
            performedonuser_newrole: add
        });

        res.redirect(`/renderadmin?username=${encodeURIComponent(ausername)}&role=${encodeURIComponent(arole)}&email=${encodeURIComponent(aemail)}`);
    } catch (error) {
        console.error(error);
        if (error.code === 11000 && error.keyValue && error.keyValue.email) {
            return res.status(400).redirect(`/already?username=${encodeURIComponent(ausername)}&role=${encodeURIComponent(arole)}&email=${encodeURIComponent(aemail)}`);
        } else {
            return res.status(500).send('Internal Server Error');
        }
    }
};

exports.updateuser = async (req, res) => {
    const { userId, role, email, prole } = req.body;
    const { ausername, aemail } = req.query;
    const link = `/renderadmin?username=${encodeURIComponent(ausername)}&role=4&email=${encodeURIComponent(aemail)}`;

    try {
        // Check if the user exists in Sdata
        const lf = await Sdata.findOne({ email });

        if (!lf) {
            await User.updateOne({ _id: userId }, { $set: { role } });

            let add = '';
            let add1 = '';
            if (prole == 3) {
                add1 = 'Sub Admin';
            } else if (prole == 2) {
                add1 = 'Editor';
            } else if (prole == 1) {
                add1 = 'Shop';
            } else if (prole == 0) {
                add1 = 'User';
            }
            if (role == 3) {
                add = 'Sub Admin';
            } else if (role == 2) {
                add = 'Editor';
            } else if (role == 1) {
                add = 'Shop';
            } else if (role == 0) {
                add = 'User';
            }
            await Log.create({
                action: 'Update User',
                timestamp: new Date(),
                doneby_user_name: ausername,
                doneby_user_role: 'Admin',
                doneby_user_email: aemail,
                performedonuser: email,
                performedonuser_initialrole: add1,
                performedonuser_newrole: add
            });

            res.redirect(link);
        } else if (lf) {
            res.redirect(`/cantupdate?link=${encodeURIComponent(link)}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteuser = async (req, res) => {
    const { userId, email, prole } = req.body;
    const { ausername, arole, aemail } = req.query;
    const link = `/renderadmin?username=${encodeURIComponent(ausername)}&role=${encodeURIComponent(arole)}&email=${encodeURIComponent(aemail)}`;

    try {
        // Check if the user exists in Sdata
        const lf = await Sdata.findOne({ email });

        if (lf) {
            res.redirect(`/cantdelete?link=${encodeURIComponent(link)}`);
            return;
        }

        await User.deleteOne({ _id: userId });

        let add = '';
        if (prole == 3) {
            add = 'Sub Admin';
        } else if (prole == 2) {
            add = 'Editor';
        } else if (prole == 1) {
            add = 'Shop';
        } else if (prole == 0) {
            add = 'User';
        }

        // Create log entry
        await Log.create({
            action: 'Delete User',
            timestamp: new Date(),
            doneby_user_name: ausername,
            doneby_user_role: 'Admin',
            doneby_user_email: aemail,
            performedonuser: email,
            performedonuser_initialrole: add,
            performedonuser_newrole: 'Null'
        });

        res.redirect(link);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.subadmincreateuser = async (req, res) => {
    const { username, email, password, role } = req.body;
    const { ausername, arole, aemail } = req.query; // Retrieve parameters from req.query

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Convert the role value to a number
        const roleNumber = parseInt(role);
        
        // Create the new user with the specified role using Mongoose
        await User.create({ username, email, password: hashedPassword, role: roleNumber });

        let add = '';
        if (roleNumber === 3) {
            add = 'Sub Admin';
        } else if (roleNumber === 2) {
            add = 'Editor';
        } else if (roleNumber === 1) {
            add = 'Shop';
        } else if (roleNumber === 0) {
            add = 'User';
        }

        // Create log entry
        await Log.create({
            action: 'Create User',
            timestamp: new Date(),
            doneby_user_name: ausername,
            doneby_user_role: 'Sub Admin',
            doneby_user_email: aemail,
            performedonuser: email,
            performedonuser_initialrole: 'Null',
            performedonuser_newrole: add
        });

        res.redirect(`/rendersubadmin?username=${encodeURIComponent(ausername)}&role=${encodeURIComponent(arole)}&email=${encodeURIComponent(aemail)}`);
    } catch (error) {
        console.error(error);
        if (error.code === 11000 && error.keyValue && error.keyValue.email) {
            return res.status(400).redirect(`/already?username=${encodeURIComponent(ausername)}&role=${encodeURIComponent(arole)}&email=${encodeURIComponent(aemail)}`);
        } else {
            return res.status(500).send('Internal Server Error');
        }
    }
};

exports.subadminupdateuser = async (req, res) => {
    const { userId, role, email, prole } = req.body;
    const { ausername, aemail } = req.query;
    const link = `/rendersubadmin?username=${encodeURIComponent(ausername)}&role=3&email=${encodeURIComponent(aemail)}`;

    try {
        // Check if the user exists in Sdata
        const lf = await Sdata.findOne({ email });

        if (!lf) {
            await User.updateOne({ _id: userId }, { $set: { role } });

            let add = '';
            let add1 = '';
            if (prole == 2) {
                add1 = 'Editor';
            } else if (prole == 1) {
                add1 = 'Shop';
            } else if (prole == 0) {
                add1 = 'User';
            }
            if (role == 2) {
                add = 'Editor';
            } else if (role == 1) {
                add = 'Shop';
            } else if (role == 0) {
                add = 'User';
            }
            await Log.create({
                action: 'Update User',
                timestamp: new Date(),
                doneby_user_name: ausername,
                doneby_user_role: 'Sub Admin',
                doneby_user_email: aemail,
                performedonuser: email,
                performedonuser_initialrole: add1,
                performedonuser_newrole: add
            });

            res.redirect(link);
        } else if (lf) {
            res.redirect(`/cantupdate?link=${encodeURIComponent(link)}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.editorupdateuser = async (req, res) => {
    const { userId, role, email, prole } = req.body;
    const { ausername, aemail } = req.query;
    const link = `/rendersubadmin?username=${encodeURIComponent(ausername)}&role=2&email=${encodeURIComponent(aemail)}`;

    try {
        // Check if the user exists in Sdata
        const lf = await Sdata.findOne({ email });

        if (!lf) {
            await User.updateOne({ _id: userId }, { $set: { role } });

            let add = '';
            let add1 = '';
            if (prole == 1) {
                add1 = 'Shop';
            } else if (prole == 0) {
                add1 = 'User';
            }
            if (role == 1) {
                add = 'Shop';
            } else if (role == 0) {
                add = 'User';
            }
            await Log.create({
                action: 'Update User',
                timestamp: new Date(),
                doneby_user_name: ausername,
                doneby_user_role: 'Editor',
                doneby_user_email: aemail,
                performedonuser: email,
                performedonuser_initialrole: add1,
                performedonuser_newrole: add
            });

            res.redirect(link);
        } else if (lf) {
            res.redirect(`/cantupdate?link=${encodeURIComponent(link)}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


exports.logout = async (req, res) => {
    const email = req.query.email;
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Unable to destroy session:', err);
            } else {
                console.log('Session destroyed.');
            }
        });
    } else {
        console.log('No session to destroy.');
    }
    res.render('lafter');
    try {
 

        await Sdata.deleteOne({ email });

        console.log(`Deleted document for email: ${email}`);
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).send('Internal Server Error');
    }
};
