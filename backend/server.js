const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const examRoutes = require('./routes/examRoutes');
const resultRoutes = require('./routes/resultRoutes');

// Use Routes
app.use('/api/exams', examRoutes);
app.use('/api/results', resultRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ MongoDB connected successfully");
}).catch(err => {
    console.error("❌ MongoDB connection error:", err);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
