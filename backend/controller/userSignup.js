const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
async function userSignupController(req, res) {
    try {
        const { fullName, email, nic, gender, dob, password, profilePic } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists with this email",
                error: true,
                success: false
            });
        }

        // Validate required fields
        if (!fullName || !email || !nic || !gender || !dob || !password) {
            return res.status(400).json({
                message: "Please fill all required fields",
                error: true,
                success: false
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        
        if (!hashPassword) {
            throw new Error('Error in hashing password');
        }   

        // Create new user object
        const newUser = new userModel({
            email,
            fullName,
            nic,
            gender,
            dob,
            profilePic: profilePic || "",
            password: hashPassword
        });

        // Save user to database
        const savedUser = await newUser.save();

        // Return success response without exposing password
        const userResponse = savedUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            data: userResponse,
            error: false,
            success: true,
            message: 'User created successfully'
        });

    } catch (err) {
        console.error('Registration error:', err);
        
        // Handle MongoDB duplicate key errors explicitly
        if (err.code === 11000) {
            return res.status(409).json({
                message: "User already exists with this email or NIC",
                error: true,
                success: false
            });
        }
        
        res.status(500).json({
            message: err.message || 'An error occurred during registration',
            error: true,
            success: false
        });
    }
}

module.exports = userSignupController;