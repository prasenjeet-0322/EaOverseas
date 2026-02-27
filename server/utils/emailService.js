const { Resend } = require('resend');
const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {
    try {
        if (process.env.RESEND_API_KEY) {
            const resend = new Resend(process.env.RESEND_API_KEY);
            const data = await resend.emails.send({
                from: 'EAOverseas <onboarding@resend.dev>', // Update this with your verified domain
                to: [to],
                subject: subject,
                html: html,
            });
            console.log('Email sent via Resend:', data);
            return data;
        } else if ((process.env.NODEMAILER_USER && process.env.NODEMAILER_PASS) || (process.env.EMAIL_USER && process.env.EMAIL_PASS)) {
            const user = process.env.NODEMAILER_USER || process.env.EMAIL_USER;
            const pass = process.env.NODEMAILER_PASS || process.env.EMAIL_PASS;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: user,
                    pass: pass
                }
            });

            const mailOptions = {
                from: user,
                to: to,
                subject: subject,
                html: html
            };

            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent via Nodemailer:', info.response);
            return info;
        } else {
            console.warn('No email provider configured (RESEND_API_KEY or NODEMAILER_USER/PASS missing).');
            // For development/debugging, log the OTP to console if we can't send email
            // But we don't have the cleartext OTP here, it's passed in html.
            // A simple regex extraction for debugging could be useful but let's just log the HTML body for now in dev.
            console.log('DEBUG (Email Body):', html);
            return { id: 'mock-id', message: 'Email logged to console' };
        }
    } catch (error) {
        console.error('Error sending email:', error);
        console.log('--- EMAIL FALLBACK (DEV) ---');
        console.log('Subject:', subject);
        console.log('To:', to);
        console.log('Body:', html);
        console.log('----------------------------');
        // Do not throw, so flow continues
        return { id: 'mock-id', message: 'Email failed but logged to console' };
    }
};

module.exports = sendEmail;
