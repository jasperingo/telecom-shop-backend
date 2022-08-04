import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true, // true for 465, false for other ports (587)
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const EmailingService = {
  sendEmailVerificationToken(to: string, token: string) {
    return transporter.sendMail({
      to,
      from: `"${process.env.APP_NAME}" <${process.env.EMAIL_SENDER}>`,
      subject: 'Email verification token',
      text: `Your email verification token is ${token}`,
      html: `
        <html>
          <body>
            <h1 style="color: purple">Royaltysubs</h1>
            <p>Your email verification token is</p>
            <div style="font-size: 24px;">
              <strong>${token}</strong>
            </div>
          </body>
        </html>
      `,
    });
  },

  sendResetPasswordToken(to: string, token: string) {
    return transporter.sendMail({
      to,
      from: `"${process.env.APP_NAME}" <${process.env.EMAIL_SENDER}>`,
      subject: 'Password reset token',
      text: `Your password reset token is ${token}`,
      html: `
        <html>
          <body>
            <h1 style="color: purple">Royaltysubs</h1>
            <p>Your password reset token is</p>
            <div style="font-size: 24px;">
              <strong>${token}</strong>
            </div>
          </body>
        </html>
      `,
    });
  }
};

export default EmailingService;
