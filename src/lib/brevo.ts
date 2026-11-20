import * as brevo from '@getbrevo/brevo';

const brevoApiKey = process.env.BREVO_API_KEY;
const senderEmail = process.env.BREVO_SENDER_EMAIL || 'info@impactenergies.com';
const senderName = process.env.BREVO_SENDER_NAME || 'Impact Energies';
const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'info@impactenergies.com';

const apiInstance = new brevo.TransactionalEmailsApi();
if (brevoApiKey) {
  apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, brevoApiKey);
}

export interface SendEmailParams {
  toEmail: string;
  toName?: string;
  subject: string;
  htmlContent: string;
  replyTo?: { email: string; name?: string };
}

export async function sendEmail({
  toEmail,
  toName,
  subject,
  htmlContent,
  replyTo,
}: SendEmailParams): Promise<{ success: boolean; messageId?: string; simulated?: boolean; error?: string }> {
  // If no Brevo API key is provided, log simulation so the application works seamlessly in development
  if (!brevoApiKey || brevoApiKey.trim() === '' || brevoApiKey.includes('your-brevo-api-key')) {
    console.log('[Brevo Simulation] Email dispatch:', {
      to: toEmail,
      subject,
      sender: senderEmail,
    });
    return {
      success: true,
      simulated: true,
      messageId: `simulated-${Date.now()}`,
    };
  }

  const sendSmtpEmail = new brevo.SendSmtpEmail();
  sendSmtpEmail.sender = { email: senderEmail, name: senderName };
  sendSmtpEmail.to = [{ email: toEmail, name: toName || toEmail }];
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = htmlContent;
  if (replyTo) {
    sendSmtpEmail.replyTo = replyTo;
  }

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return {
      success: true,
      messageId: data.body?.messageId,
    };
  } catch (error: any) {
    console.error('Brevo Email Delivery Error:', error?.response?.body || error?.message || error);
    return {
      success: false,
      error: error?.response?.body?.message || error?.message || 'Failed to dispatch email via Brevo',
    };
  }
}

export async function notifyAdminContact({
  fullName,
  email,
  company,
  enquiryType,
  message,
}: {
  fullName: string;
  email: string;
  company?: string;
  enquiryType?: string;
  message: string;
}) {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #14171A; border-bottom: 2px solid #6DAE37; padding-bottom: 12px; margin-top: 0;">New Contact Inquiry Received</h2>
      <p style="color: #4A5568;">You have received a new contact submission from the Impact Energies website:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 8px 0; color: #718096; width: 140px;"><strong>Full Name:</strong></td><td style="color: #1A202C;">${fullName}</td></tr>
        <tr><td style="padding: 8px 0; color: #718096;"><strong>Email:</strong></td><td style="color: #1A202C;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #718096;"><strong>Company:</strong></td><td style="color: #1A202C;">${company || 'N/A'}</td></tr>
        <tr><td style="padding: 8px 0; color: #718096;"><strong>Enquiry Type:</strong></td><td style="color: #1A202C;">${enquiryType || 'General enquiry'}</td></tr>
      </table>
      <div style="margin-top: 20px; padding: 16px; background-color: #f7fafc; border-left: 4px solid #6DAE37; border-radius: 4px;">
        <strong style="color: #2d3748;">Message:</strong>
        <p style="color: #4a5568; margin-top: 8px; white-space: pre-wrap;">${message}</p>
      </div>
      <p style="color: #a0aec0; font-size: 12px; margin-top: 24px;">Impact Energies - System Notification</p>
    </div>
  `;

  return sendEmail({
    toEmail: adminEmail,
    toName: 'Impact Energies Team',
    subject: `New Inquiry from ${fullName} [${enquiryType || 'General'}]`,
    htmlContent,
    replyTo: { email, name: fullName },
  });
}

export async function notifyAdminCareerApplication({
  fullName,
  email,
  phone,
  role,
  experience,
  resumeUrl,
  coverLetter,
}: {
  fullName: string;
  email: string;
  phone?: string;
  role: string;
  experience?: string;
  resumeUrl?: string;
  coverLetter?: string;
}) {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #14171A; border-bottom: 2px solid #6DAE37; padding-bottom: 12px; margin-top: 0;">New Job Application Received</h2>
      <p style="color: #4A5568;">A candidate has applied for a position at Impact Energies:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 8px 0; color: #718096; width: 140px;"><strong>Position:</strong></td><td style="color: #1A202C; font-weight: bold; color: #6DAE37;">${role}</td></tr>
        <tr><td style="padding: 8px 0; color: #718096;"><strong>Applicant:</strong></td><td style="color: #1A202C;">${fullName}</td></tr>
        <tr><td style="padding: 8px 0; color: #718096;"><strong>Email:</strong></td><td style="color: #1A202C;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #718096;"><strong>Phone:</strong></td><td style="color: #1A202C;">${phone || 'Not provided'}</td></tr>
        <tr><td style="padding: 8px 0; color: #718096;"><strong>Experience:</strong></td><td style="color: #1A202C;">${experience || 'N/A'}</td></tr>
        ${resumeUrl ? `<tr><td style="padding: 8px 0; color: #718096;"><strong>CV / Resume Link:</strong></td><td style="color: #1A202C;"><a href="${resumeUrl}" target="_blank">${resumeUrl}</a></td></tr>` : ''}
      </table>
      ${
        coverLetter
          ? `<div style="margin-top: 20px; padding: 16px; background-color: #f7fafc; border-left: 4px solid #6DAE37; border-radius: 4px;">
              <strong style="color: #2d3748;">Cover Note:</strong>
              <p style="color: #4a5568; margin-top: 8px; white-space: pre-wrap;">${coverLetter}</p>
            </div>`
          : ''
      }
      <p style="color: #a0aec0; font-size: 12px; margin-top: 24px;">Impact Energies - HR Recruitment Portal</p>
    </div>
  `;

  return sendEmail({
    toEmail: adminEmail,
    toName: 'Impact HR Team',
    subject: `New Job Application: ${role} - ${fullName}`,
    htmlContent,
    replyTo: { email, name: fullName },
  });
}

