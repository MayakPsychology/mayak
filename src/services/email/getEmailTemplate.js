import { render } from '@react-email/render';
import { emailTemplates } from './templates.config';

export async function getEmailTemplate(data, type) {
  const Template = emailTemplates[type];
  if (!Template) return '';

  return render(<Template data={data} />);
}
