const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const mongoose = require('mongoose');

exports.addUser = (username, email, password, role) => {

    try {
        // Check if user exists
        let existingUser = User.findOne({ email });
        if (existingUser) {
            console.log('User already exists');
            return;
        }

        // Hash password
        const hashedPassword =  bcrypt.hash(password, 10);
        // Create new user with hashed password
        const newUser = new User({ username, email, password: hashedPassword, role });
         newUser.save();
        console.log('User added successfully:', newUser);
    } catch (err) {
        console.error('Error adding user:', err.message);
    } 
};
