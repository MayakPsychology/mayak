import * as Sentry from '@sentry/nextjs';
import { env } from '@/lib/env';
import { resend } from '@/lib/resend';
import { APPLICATION_SENDER, EMAIL_SUBJECT_PREFIX } from '@/app/config/emails';
import { getEmailTemplate } from './getEmailTemplate';

function reportEmailFailure(error) {
  Sentry.captureException(error, { tags: { scope: 'application-email' } });
  return { success: false, error: error.message };
}

export async function sendEmail({ from, to, subject, html }) {
  try {
    const { data, error } = await resend.emails.send({ from, to, subject, html });

    if (error) {
      return reportEmailFailure(new Error(`${error.name}: ${error.message}`));
    }

    return { success: true, emailId: data.id };
  } catch (error) {
    return reportEmailFailure(error);
  }
}

export async function sendApplicationNotification({ data, type, subjectDetails }) {
  const html = await getEmailTemplate(data, type);
  if (!html) return reportEmailFailure(new Error(`Unknown email template "${type}"`));

  return sendEmail({
    from: APPLICATION_SENDER,
    to: env.ADMIN_EMAIL,
    subject: `${EMAIL_SUBJECT_PREFIX[type]}: ${subjectDetails}`,
    html,
  });
}
