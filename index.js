const express = require('express');
const app = express();

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Start the server on port 3009
app.listen(3009, () => {
  console.log('Server is running on port 3009');
});
