exports.forgotPasswordTemplate = (name, otp) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                max-width: 500px; 
                margin: 0 auto; 
                border: 1px solid #eeeeee; 
                border-radius: 12px; 
                padding: 30px; 
                text-align: center; 
                background-color: #ffffff;">

      <h2 style="color: #6f42c1; margin-bottom: 20px;">
        Power House
      </h2>

      <p style="font-size: 16px; color: #555;">
        Hello ${name},
      </p>

      <p style="font-size: 16px; color: #555;">
        We received a request to reset your password. Please use the OTP below to continue.
      </p>

      <div style="margin: 35px 0;">
        <span style="font-size: 34px; 
                     font-weight: bold; 
                     letter-spacing: 6px; 
                     color: #6f42c1; 
                     background-color: #f3f0ff; 
                     padding: 12px 24px; 
                     border-radius: 10px; 
                     border: 2px solid #dcd3ff;">
          ${otp}
        </span>
      </div>

      <p style="font-size: 14px; color: #999;">
        This OTP is valid for <b>10 minutes</b>.
      </p>

      <p style="font-size: 13px; color: #cc0000; margin-top: 20px;">
        If you did not request this password reset, please ignore this email.
      </p>

      <p style="font-size: 14px; color: #555; margin-top: 30px; text-align: left;">
        Regards,<br/>
        <b>Sajin C L</b><br/>
        Power House Admin
      </p>

      <div style="margin-top: 30px; 
                  padding-top: 15px; 
                  border-top: 1px solid #eeeeee; 
                  font-size: 12px; 
                  color: #aaa;">
        © 2026 Power House Ecommerce. All rights reserved.
      </div>
    </div>
  `;
};
