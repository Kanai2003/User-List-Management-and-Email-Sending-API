import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = asyncHandler(async (user, subject, body) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject,
        html: body,
    };
    return transporter.sendMail(mailOptions);
});
