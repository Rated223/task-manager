const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const welcomeEmail = (email, name) => {
  sgMail.send({
      to: email,
      from: "Rated223@outlook.com",
      subject: "Welcome to Task-Manager",
      text: `Welcome to the app ${name}.`
  })  
};

const deleteAccountConfirmation = (email, name) => {
    sgMail.send({
        to: email,
        from: "Rated223@outlook.com",
        subject: "Deleted accont confirmation",
        text: `We will miss you ${name}. :c`
    })  
};

module.exports = {
    welcomeEmail,
    deleteAccountConfirmation
}