const nodemailer = require("nodemailer");
const key = require('./key.json');

function sendMail(to, title, html) {
    new Promise(function (resolve, reject) {
        nodemailer.createTestAccount((err, account) => {
            if (err) {
                reject(err);
                return
            }
            const smtpTransport = nodemailer.createTransport({
                host: key.email.host,//'smtp.qq.com',
                port: 465, //587,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: key.email.user, // generated ethereal user
                    pass: key.email.pass // generated ethereal password
                }
            });
            smtpTransport.sendMail({
                from: key.email.user,//发件人邮箱
                to: to,//收件人邮箱，多个邮箱地址间用','隔开
                subject: title,//邮件主题
                html: html // html body//text和html两者只支持一种
            }, function (err, res) {
                console.log(1);   
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
                console.log(err, res);
            });
        })
    })
}
module.exports = sendMail;
