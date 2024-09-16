const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

// POST route to send an email
app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('All fields are required');
  }

  // Create a transporter using Gmail SMTP
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aadarsh112010@gmail.com', // Replace with your Gmail address
      pass: 'vwme ymli qcfz qahj',  // Replace with your Gmail App Password
    },
  });

  // Define email options
  let mailOptions = {
    from: email, // Sender's email
    to: 'banadab330@marchub.com', // Your Gmail address to receive the email
    subject: `New message from ${name}`,
    text: `You have a new message from ${name} (${email}):\n\n${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error); // Log the error
      return res.status(500).send('Failed to send email: ' + error.message);  // Return the error as a response
    }
    console.log('Email sent:', info.response); // Log the success response
    res.status(200).send('Email sent successfully');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
