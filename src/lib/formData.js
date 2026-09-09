import { BadRequestException } from '@/lib/errors/BadRequestException';

export const MAX_ATTACHMENTS_SIZE = 4 * 1024 * 1024;
export const ALLOWED_ATTACHMENT_TYPES = ['.pdf', '.jpg', '.jpeg', '.png', '.webp', '.doc', '.docx'];
export const OVERSIZE_MESSAGE = 'Файли завеликі — сумарний розмір не має перевищувати 4 МБ';

export function formDataToObject(formData) {
  const data = {};

  formData.forEach((value, key) => {
    if (typeof value !== 'string') return;

    try {
      data[key] = JSON.parse(value);
    } catch {
      data[key] = value;
    }
  });

  return data;
}

const hasAllowedType = name => ALLOWED_ATTACHMENT_TYPES.some(ext => name.toLowerCase().endsWith(ext));

const safeName = name => name.split(/[\\/]/).pop().replace(/[\r\n"]/g, '');

export async function formDataToAttachments(formData) {
  const files = [];
  formData.forEach((value, key) => {
    if (typeof value !== 'string') files.push([key, value]);
  });

  const total = files.reduce((sum, [, file]) => sum + file.size, 0);
  if (total > MAX_ATTACHMENTS_SIZE) {
    throw new BadRequestException({ files: [OVERSIZE_MESSAGE] });
  }

  const rejected = files.find(([, file]) => !hasAllowedType(file.name));
  if (rejected) {
    throw new BadRequestException({ files: [`Формат файлу "${rejected[1].name}" не підтримується`] });
  }

  return Promise.all(
    files.map(async ([key, file]) => ({
      filename: `${key}-${safeName(file.name)}`,
      content: Buffer.from(await file.arrayBuffer()),
    })),
  );
}
