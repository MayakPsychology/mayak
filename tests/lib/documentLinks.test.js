import { describe, expect, it, vi } from 'vitest';
import { documentPath } from '@/lib/uploads';

vi.mock('next-auth/react', () => ({ getSession: vi.fn(), signIn: vi.fn(), signOut: vi.fn() }));

const { loginErrorMessage, redirectAfterLogin } = await import('@/app/(admin)/admin/authProvider');

const PATHNAME = 'submitted/educationFiles/диплом №1.pdf';

describe('documentPath', () => {
  it('escapes a pathname so spaces and cyrillic survive the query string', () => {
    expect(documentPath(PATHNAME)).toBe(
      '/api/admin/documents?pathname=submitted%2FeducationFiles%2F%D0%B4%D0%B8%D0%BF%D0%BB%D0%BE%D0%BC%20%E2%84%961.pdf',
    );
  });
});

describe('redirectAfterLogin', () => {
  it('sends the admin back to the document they clicked', () => {
    expect(redirectAfterLogin(`?document=${encodeURIComponent(PATHNAME)}`)).toBe(documentPath(PATHNAME));
  });

  it('stays put for a plain login', () => {
    expect(redirectAfterLogin('')).toBeNull();
  });

  it('cannot be pointed at another site', () => {
    expect(redirectAfterLogin('?document=https://evil.example/steal').startsWith('/api/admin/documents?')).toBe(true);
  });
});

describe('loginErrorMessage', () => {
  it('stays quiet when the sign-in succeeded', () => {
    expect(loginErrorMessage({ ok: true })).toBeNull();
  });

  it('names the actual problem for wrong credentials', () => {
    expect(loginErrorMessage({ ok: false, error: 'CredentialsSignin' })).toBe('Невірний логін або пароль');
  });

  it('falls back to a generic message when sign-in never answered', () => {
    expect(loginErrorMessage(null)).toBe('Не вдалося увійти. Спробуйте ще раз');
  });
});
