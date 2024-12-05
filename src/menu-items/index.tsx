// project import
import other from './other';
import pages from './messages';
import bookPages from './books';
import mainpage from './main-page';

// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [mainpage, pages, bookPages, other]
};

export default menuItems;
