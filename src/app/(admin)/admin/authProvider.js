import { getSession, signIn, signOut } from 'next-auth/react';
import { LOGIN_URL } from '@/lib/consts';
import { documentPath } from '@/lib/uploads';

const LOGIN_ERRORS = {
  CredentialsSignin: 'Невірний логін або пароль',
};

export const loginErrorMessage = result =>
  (result?.ok ? null : (LOGIN_ERRORS[result?.error] ?? 'Не вдалося увійти. Спробуйте ще раз'));

export const redirectAfterLogin = search => {
  const pathname = new URLSearchParams(search).get('document');
  return pathname ? documentPath(pathname) : null;
};

export const authProvider = {
  login: async credentials => {
    const result = await signIn('credentials', { redirect: false, ...credentials }, credentials).catch(() => null);
    const message = loginErrorMessage(result);

    if (message) throw new Error(message);

    const target = redirectAfterLogin(window.location.search);
    if (target) window.location.assign(target);

    return result;
  },
  logout: async () => signOut({ callbackUrl: LOGIN_URL }),
  checkAuth: async () => {
    const session = await getSession();
    return session ? Promise.resolve() : Promise.reject();
  },
  checkError: async () => {
    Promise.resolve();
  },
  getIdentity: async () => {
    const session = await getSession();

    return {
      id: session.user.id,
      fullName: session.user.name,
    };
  },
  getPermissions: () => Promise.resolve(),
};
