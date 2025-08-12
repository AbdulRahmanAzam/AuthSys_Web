export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>Verify Your Email Address - AuthSys</title>
  
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
    
    * {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
      color: #e2e8f0;
      line-height: 1.6;
      min-height: 100vh;
    }
    
    .email-wrapper {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
      padding: 40px 20px;
      min-height: 100vh;
    }
    
    .email-container {
      max-width: 650px;
      margin: 0 auto;
      background: rgba(15, 23, 42, 0.95);
      border: 1px solid rgba(100, 116, 139, 0.2);
      border-radius: 24px;
      backdrop-filter: blur(20px);
      box-shadow: 
        0 25px 50px -12px rgba(0, 0, 0, 0.8),
        0 0 0 1px rgba(100, 116, 139, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      overflow: hidden;
      position: relative;
    }
    
    .email-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, #3b82f6, #8b5cf6, #06b6d4, transparent);
      opacity: 0.8;
    }
    
    .header {
      background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
      position: relative;
      padding: 50px 40px 40px;
      text-align: center;
      overflow: hidden;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
    }
    
    .tech-pattern {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        linear-gradient(45deg, rgba(100, 116, 139, 0.1) 1px, transparent 1px),
        linear-gradient(-45deg, rgba(100, 116, 139, 0.1) 1px, transparent 1px);
      background-size: 20px 20px;
      opacity: 0.3;
    }
    
    .logo-container {
      position: relative;
      z-index: 2;
      display: inline-block;
      margin-bottom: 24px;
    }
    
    .logo {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
      border-radius: 20px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      color: white;
      font-weight: 600;
      box-shadow: 
        0 20px 25px -5px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(255, 255, 255, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      position: relative;
    }
    
    .logo::before {
      content: '';
      position: absolute;
      inset: -2px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4);
      border-radius: 22px;
      z-index: -1;
      opacity: 0.5;
      filter: blur(8px);
    }
    
    .header h1 {
      color: #f1f5f9;
      margin: 0;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -1px;
      position: relative;
      z-index: 2;
      background: linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .subtitle {
      color: #94a3b8;
      font-size: 16px;
      margin: 8px 0 0;
      font-weight: 400;
      position: relative;
      z-index: 2;
    }
    
    .content {
      padding: 50px 40px;
      position: relative;
      background: rgba(15, 23, 42, 0.5);
    }
    
    .greeting {
      font-size: 20px;
      color: #f1f5f9;
      margin: 0 0 28px;
      font-weight: 600;
    }
    
    .message {
      font-size: 16px;
      color: #cbd5e1;
      margin: 0 0 40px;
      line-height: 1.8;
      font-weight: 400;
    }
    
    .message strong {
      color: #3b82f6;
      font-weight: 600;
    }
    
    .otp-section {
      margin: 40px 0;
    }
    
    .otp-container {
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%);
      border: 2px solid rgba(59, 130, 246, 0.3);
      border-radius: 16px;
      padding: 32px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .otp-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
      animation: shimmer 3s infinite;
    }
    
    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }
    
    .otp-label {
      font-size: 12px;
      color: #94a3b8;
      margin: 0 0 16px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-family: 'JetBrains Mono', monospace;
    }
    
    .otp-code {
      font-size: 42px;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0 0 16px;
      letter-spacing: 8px;
      font-family: 'JetBrains Mono', monospace;
      text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
      position: relative;
      z-index: 2;
    }
    
    .tech-info {
      display: flex;
      justify-content: space-between;
      margin: 40px 0;
      gap: 20px;
    }
    
    .info-card {
      flex: 1;
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid rgba(100, 116, 139, 0.2);
      border-radius: 12px;
      padding: 20px;
      text-align: center;
    }
    
    .info-icon {
      font-size: 24px;
      margin-bottom: 8px;
      display: block;
    }
    
    .info-title {
      font-size: 12px;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 4px;
      font-weight: 600;
    }
    
    .info-value {
      font-size: 14px;
      color: #f1f5f9;
      font-weight: 500;
    }
    
    .security-note {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-left: 4px solid #ef4444;
      padding: 20px 24px;
      margin: 32px 0;
      border-radius: 12px;
      position: relative;
    }
    
    .security-note::before {
      content: '🛡️';
      position: absolute;
      top: 20px;
      left: 20px;
      font-size: 20px;
    }
    
    .security-note p {
      margin: 0 0 0 40px;
      font-size: 14px;
      color: #fca5a5;
      font-weight: 500;
      line-height: 1.6;
    }
    
    .footer {
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%);
      padding: 40px;
      text-align: center;
      border-top: 1px solid rgba(100, 116, 139, 0.2);
      position: relative;
    }
    
    .footer-logo {
      font-size: 18px;
      font-weight: 700;
      color: #f1f5f9;
      margin-bottom: 16px;
      font-family: 'JetBrains Mono', monospace;
    }
    
    .footer p {
      margin: 0 0 8px;
      font-size: 14px;
      color: #94a3b8;
      line-height: 1.6;
    }
    
    .footer-tech {
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid rgba(100, 116, 139, 0.2);
    }
    
    .tech-badges {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }
    
    .tech-badge {
      background: rgba(59, 130, 246, 0.1);
      border: 1px solid rgba(59, 130, 246, 0.3);
      color: #93c5fd;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      font-family: 'JetBrains Mono', monospace;
    }
    
    .company-info {
      font-size: 12px;
      color: #64748b;
      margin-top: 16px;
      font-family: 'JetBrains Mono', monospace;
    }
    
    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3), rgba(6, 182, 212, 0.3), transparent);
      margin: 40px 0;
    }
    
    @media only screen and (max-width: 600px) {
      .email-wrapper {
        padding: 20px 10px;
      }
      
      .email-container {
        border-radius: 16px;
      }
      
      .header, .content, .footer {
        padding: 32px 24px;
      }
      
      .header h1 {
        font-size: 28px;
      }
      
      .otp-code {
        font-size: 36px;
        letter-spacing: 4px;
      }
      
      .tech-info {
        flex-direction: column;
        gap: 16px;
      }
      
      .tech-badges {
        flex-direction: column;
        align-items: center;
      }
    }
  </style>
</head>

<body>
  <div class="email-wrapper">
    <div class="email-container">
      <!-- Header -->
      <div class="header">
        <div class="tech-pattern"></div>
        <div class="logo-container">
          <div class="logo">🔐</div>
        </div>
        <h1>Email Verification</h1>
        <p class="subtitle">Advanced Security Protocol Activated</p>
      </div>
      
      <!-- Content -->
      <div class="content">
        <p class="greeting">Welcome to the future of authentication!</p>
        
        <p class="message">
          Your journey into our secure digital ecosystem begins now. We've initiated an advanced verification protocol for <strong>{{email}}</strong>. Complete the verification using the quantum-encrypted code below to unlock your account.
        </p>
        
        <div class="otp-section">
          <div class="otp-container">
            <p class="otp-label">Verification Protocol</p>
            <p class="otp-code">{{otp}}</p>
          </div>
        </div>
        
        <div class="tech-info">
          <div class="info-card">
            <span class="info-icon">⚡</span>
            <div class="info-title">Encryption</div>
            <div class="info-value">AES-256</div>
          </div>
          <div class="info-card">
            <span class="info-icon">🕐</span>
            <div class="info-title">Valid For</div>
            <div class="info-value">24 Hours</div>
          </div>
          <div class="info-card">
            <span class="info-icon">🌐</span>
            <div class="info-title">Protocol</div>
            <div class="info-value">OAuth 2.0</div>
          </div>
        </div>
        
        <div class="security-note">
          <p>This verification code is generated using advanced cryptographic algorithms and is valid for 24 hours. Never share this code with anyone - our AI security systems monitor all authentication attempts.</p>
        </div>
        
        <div class="divider"></div>
        
        <p style="font-size: 14px; color: #94a3b8; margin: 0; text-align: center;">
          <strong>Secure. Private. Protected.</strong><br>
          If you didn't initiate this verification, our security team has been automatically notified.
        </p>
      </div>
      
      <!-- Footer -->
      <div class="footer">
        <div class="footer-logo">⚡ AuthSys Labs</div>
        <p><strong>Next-Generation Authentication Platform</strong></p>
        <p>Powered by advanced AI security algorithms</p>
        
        <div class="footer-tech">
          <div class="tech-badges">
            <span class="tech-badge">React.js</span>
            <span class="tech-badge">Node.js</span>
            <span class="tech-badge">MongoDB</span>
            <span class="tech-badge">JWT</span>
            <span class="tech-badge">bcrypt</span>
          </div>
          <div class="company-info">
            © 2025 AuthSys Labs • Built with ❤️ and ☕<br>
            Secured by quantum-resistant encryption
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`

export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>Reset Your Password</title>
  
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  
  <style>
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: #f8fafc;
      color: #334155;
      line-height: 1.6;
    }
    
    table {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 16px;
      box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }
    
    .header {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      padding: 40px 40px 30px;
      text-align: center;
    }
    
    .logo {
      width: 64px;
      height: 64px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: white;
      font-weight: 600;
    }
    
    .header h1 {
      color: white;
      margin: 0;
      font-size: 28px;
      font-weight: 600;
      letter-spacing: -0.5px;
    }
    
    .content {
      padding: 40px;
    }
    
    .greeting {
      font-size: 18px;
      color: #1e293b;
      margin: 0 0 24px;
      font-weight: 500;
    }
    
    .message {
      font-size: 16px;
      color: #475569;
      margin: 0 0 32px;
      line-height: 1.7;
    }
    
    .otp-container {
      background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
      border: 2px dashed #fca5a5;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      margin: 32px 0;
    }
    
    .otp-label {
      font-size: 14px;
      color: #991b1b;
      margin: 0 0 8px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .otp-code {
      font-size: 32px;
      font-weight: 700;
      color: #dc2626;
      margin: 0;
      letter-spacing: 4px;
      font-family: 'Courier New', monospace;
    }
    
    .security-note {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 16px 20px;
      margin: 32px 0;
      border-radius: 0 8px 8px 0;
    }
    
    .security-note p {
      margin: 0;
      font-size: 14px;
      color: #92400e;
      font-weight: 500;
    }
    
    .urgent-note {
      background: #fef2f2;
      border-left: 4px solid #ef4444;
      padding: 16px 20px;
      margin: 32px 0;
      border-radius: 0 8px 8px 0;
    }
    
    .urgent-note p {
      margin: 0;
      font-size: 14px;
      color: #991b1b;
      font-weight: 500;
    }
    
    .footer {
      background: #f8fafc;
      padding: 32px 40px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }
    
    .footer p {
      margin: 0 0 8px;
      font-size: 14px;
      color: #64748b;
    }
    
    .company-info {
      font-size: 13px;
      color: #94a3b8;
      margin-top: 16px;
    }
    
    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
      margin: 32px 0;
    }
    
    @media only screen and (max-width: 600px) {
      .email-container {
        margin: 20px 10px;
        border-radius: 12px;
      }
      
      .header, .content, .footer {
        padding: 24px 20px;
      }
      
      .header h1 {
        font-size: 24px;
      }
      
      .otp-code {
        font-size: 28px;
        letter-spacing: 2px;
      }
    }
  </style>
</head>

<body>
  <div style="background-color: #f8fafc; padding: 20px 0;">
    <div class="email-container">
      <!-- Header -->
      <div class="header">
        <div class="logo">🔑</div>
        <h1>Password Reset</h1>
      </div>
      
      <!-- Content -->
      <div class="content">
        <p class="greeting">Hello!</p>
        
        <p class="message">
          We received a request to reset the password for your account associated with <strong>{{email}}</strong>. If you made this request, please use the verification code below to proceed with resetting your password.
        </p>
        
        <div class="otp-container">
          <p class="otp-label">Reset Code</p>
          <p class="otp-code">{{otp}}</p>
        </div>
        
        <div class="urgent-note">
          <p>⏰ This password reset code expires in 15 minutes for security reasons. Please use it promptly.</p>
        </div>
        
        <div class="security-note">
          <p>🛡️ For your security, never share this code with anyone. Our team will never ask for this code via phone, email, or any other method.</p>
        </div>
        
        <div class="divider"></div>
        
        <p style="font-size: 14px; color: #64748b; margin: 0;">
          <strong>Didn't request a password reset?</strong><br>
          If you didn't request this password reset, please ignore this email. Your account remains secure. However, if you're concerned about unauthorized access, please contact our support team immediately.
        </p>
      </div>
      
      <!-- Footer -->
      <div class="footer">
        <p><strong>AuthSys Security Team</strong></p>
        <p>This is an automated security message, please do not reply to this email.</p>
        <div class="company-info">
          © 2025 AuthSys. All rights reserved.<br>
          Sent with ❤️ from our secure servers.
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`

