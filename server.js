import express from "express";
import cors from "cors"; 
import dotenv from "dotenv";

import notesRoutes from "./src/routes/notesRoutes.js";
import { connectDB } from "./src/config/db.js";
import ratelimiter from "./src/middleware/rateLimiter.js";


dotenv.config();


const app = express();
 
const PORT = process.env.PORT || 5001;
const HOST = '0.0.0.0';

// Cors Security 
app.use(
    cors({
        origin: "http://localhost:5173",
    }))

//Middleware will pass JSON bodies: req.body
app.use(express.json());

app.use(ratelimiter);

app.get('/api/test-direct', (req, res) => {
    return res.status(200).json({ 
        message: 'Direct API test endpoint working',
        timestamp: new Date().toISOString()
    });
});

app.get('/api', (req, res) => {
    return res.status(200).json({
        message: 'API is ready',
        endpoints: {
            notes: '/api/notes',
            test: '/api/test-direct'
        }
    });
});



app.use("/api/notes", notesRoutes)

app.get("/", (req, res)=>{
    res.send("Hello From Thinkboard App")
});


app.use('*', (req, res) => {
    console.log(`❌ 404 Not Found: ${req.method} ${req.originalUrl}`);
    return res.status(404).json({
        error: 'Route not found',
        message: `Cannot ${req.method} ${req.originalUrl}`,
        availableEndpoints: [
            '/',
            '/health',
            '/api',
            '/api/test-direct',
            '/api/notes'
        ]
    });
});
// Connect to MongoDB but don't block server start
connectDB()
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err.message));

    // Start server IMMEDIATELY
    const server = app.listen(PORT, HOST, () => {
    console.log('=' .repeat(50));
    console.log(`✅ SERVER IS RUNNING!`);
    console.log('=' .repeat(50));
    console.log(`📡 Health check:     http://localhost:${PORT}/health`);
    console.log(`📡 API:              http://localhost:${PORT}/api`);
    console.log(`📡 Debug:            http://localhost:${PORT}/debug`);
    console.log('=' .repeat(50));
});


server.on('error', (error)=>{
    console.error(`Server error: ${error}`);
    process.exit(1);
});

