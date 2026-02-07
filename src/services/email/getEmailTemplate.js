import { render } from '@react-email/render';
import { emailTemplates } from './templates.config';

export async function getEmailTemplate(data, type) {
  const Template = emailTemplates[type];
  if (!Template) {
    console.error(`Email template not found for type "${type}"`);
    return '';
  }

  return await render(<Template data={data} />);
}
