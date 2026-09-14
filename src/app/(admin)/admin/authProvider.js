import { getSession, signIn, signOut } from 'next-auth/react';
import { LOGIN_URL } from '@/lib/consts';
import { documentPath } from '@/lib/uploads';

export const redirectAfterLogin = search => {
  const pathname = new URLSearchParams(search).get('document');
  return pathname ? documentPath(pathname) : null;
};

export const authProvider = {
  login: async credentials => {
    const result = await signIn('credentials', { redirect: false, ...credentials }, credentials);
    const target = redirectAfterLogin(window.location.search);

    if (result?.ok && target) window.location.assign(target);

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
