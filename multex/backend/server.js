const express = require('express');
const mongoose = require('mongoose');
const Music = require('./routes/Music');
const cors = require('cors');
const app = express();
app.use(cors())

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName:"MusicApplication"
});

app.use("/api/music", Music)
app.get("/",(req,res)=>{
  res.send("Hello")
})
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// mongodb://localhost:27017