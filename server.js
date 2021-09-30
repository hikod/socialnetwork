const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
  // useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

if (mongoose.connection.readyState === 0) {
  console.log("0: disconnected");
} else if (mongoose.connection.readyState === 1) {
  console.log("1: connected");
} else if (mongoose.connection.readyState === 2) {
  console.log("2: connecting");
} else {
  console.log("3: disconnecting");
}
  

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
