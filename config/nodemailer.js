const nodeMailer = require('nodemailer');
const Path = require('path');
const ejs = require('ejs');

const Transporter = nodeMailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port : 587,
    secure: false,
    auth : {
        user : process.env.userEmail,
        pass : process.env.emailPassword,
    }
});

const renderTemplate = (data,relativePath)=>{
    let html;
    ejs.renderFile(
        Path.join(__dirname,'views/mailer',relativePath),
        data,
        function(err,data){
            if(err){
                return;
            }
            html = data;
        }
    )
    return html;
}

module.exports = {
    Transporter:Transporter,
    renderTemplate:renderTemplate
};