import ROUTES from './routes';

const siteNav = {
  mainNav: [
    {
      title: 'Mayak home',
      href: '/',
    },
  ],
  innerLinks: [
    { title: 'Стати партнером', href: ROUTES.ADD_NEW, badge: 'new' },
    { title: 'Пошук допомоги', href: ROUTES.SPECIALIST },
    { title: 'Події', href: ROUTES.EVENTS },
  ],
};

export default siteNav;
