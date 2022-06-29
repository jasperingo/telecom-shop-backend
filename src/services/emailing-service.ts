import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SEND_GRID_API_KEY as string);

const from = {
  name: process.env.APP_NAME,
  email: process.env.SEND_GRID_SENDER_EMAIL as string,
};

const EmailingService = {
  sendResetPasswordToken(to: string, token: string) {
    return sgMail.send({
      to,
      from,
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
      `
    });
  }
};

export default EmailingService;
