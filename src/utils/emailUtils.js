import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendInvitationEmail = async (email, invitationLink) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Invitacion para unirte a la Companhia',
        html: `<p>Has sido invitado a la Companhia</p>
            <a href="${invitationLink}">Registrarse</a>`,
    };

    await transporter.sendMail(mailOptions);
};