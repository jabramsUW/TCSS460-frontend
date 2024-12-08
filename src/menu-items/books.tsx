// third-party
import { FormattedMessage } from 'react-intl';

// assets
import SearchIcon from '@mui/icons-material/Search';
import BookIcon from '@mui/icons-material/Book';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
// type
import { NavItemType } from 'types/menu';

// icons
const icons = { SearchIcon, BookIcon, LibraryBooksIcon, LibraryAddIcon };

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id: 'book-pages',
  title: <FormattedMessage id="Bookstore" />,
  type: 'group',
  children: [
    {
      id: 'Find-a-book',
      title: <FormattedMessage id="search-title" />,
      type: 'item',
      url: '/books/search',
      icon: icons.SearchIcon
    },
    {
      id: 'Browse-books',
      title: <FormattedMessage id="browse-books" />,
      type: 'item',
      url: '/books/browse',
      icon: icons.BookIcon
    },
    {
      id: 'book-series',
      title: <FormattedMessage id="book-series" />,
      type: 'item',
      url: '/books/series',
      icon: icons.LibraryBooksIcon
    },
    {
      id: 'create-books',
      title: <FormattedMessage id="add-book" />,
      type: 'item',
      url: '/books/create',
      icon: icons.LibraryAddIcon
    }
  ]
};

export default pages;
