import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const user = process.env.USER_MAIL;
const pass = process.env.USER_PASS;

export const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: user,
    pass: pass,
  },
});

export const sendConfirmationEmail = (name, email, confirmationCode) => {
  console.log('Check');
  transport.sendMail({
    from: user,
    to: email,
    subject: 'Please confirm your account',
    html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:5173/auth/confirm/${confirmationCode}> Click here</a>
          </div>`,
  }).catch(err => console.log(err));
};