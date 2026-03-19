import { env } from '@/lib/env';
import { resend } from '@/lib/resend';
import { EMAIL_TYPES } from '@/app/config/emails';
import { getEmailTemplate } from './getEmailTemplate';

export async function sendEmail({ from, to, subject, html }) {
  try {
    const response = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    return { success: true, emailId: response.data.id };
  } catch (error) {
    console.error('❌ Email failed:', error);
    return { success: false, error: error.message };
  }
}

export async function sendApplicationNotification(data) {
  const html = await getEmailTemplate(data, EMAIL_TYPES.SPECIALIST_APPLICATION);
  return sendEmail({
    from: 'Заявки спеціалістів <noreply@notify.mayak.co.ua>',
    to: env.ADMIN_EMAIL,
    subject: `Нова заявка: ${data.firstName} ${data.surname || data.lastName}`,
    html,
  });
}
