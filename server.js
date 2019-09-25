const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();
app.use(express.json());
app.get('/',(request, response)=>response.send('API is running'));

//routes
app.use('/api/users',require("./config/routes/api/users"));
app.use('/api/auth',require("./config/routes/api/auth"));
app.use('/api/profile',require("./config/routes/api/profile"));
app.use('/api/tasks',require("./config/routes/api/tasks"));

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server started on port ${PORT}`));
