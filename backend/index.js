require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./config/db');
const router = require('./routes');

const app = express();

// ✅ CORS CONFIGURATION with proper error handling
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // for cookies or auth headers
}));

// ✅ Parse JSON and form data with increased limit
app.use(express.json({ limit: '10mb' })); // Increased from default
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ API Routes
app.use("/api", router);

// ✅ Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(err.status || 500).json({
        message: err.message || 'An unexpected error occurred',
        error: true,
        success: false
    });
});

// ✅ Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
});

// ✅ Connect to DB
connection();