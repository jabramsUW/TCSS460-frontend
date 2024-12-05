// third-party
import { FormattedMessage } from 'react-intl';

// assets
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import BookIcon from '@mui/icons-material/Book';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { MessageOutlined, EmailIcon, SendIcon, SearchIcon, BookIcon };

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id: 'book-pages',
  title: <FormattedMessage id="Bookstore" />,
  type: 'group',
  children: [
    {
      id: 'messages',
      title: <FormattedMessage id="Books" />,
      type: 'collapse',
      icon: icons.MessageOutlined,
      children: [
        {
          id: 'Search-all-books',
          title: <FormattedMessage id="search-all" />,
          type: 'item',
          url: '/books/search',
          icon: icons.SearchIcon
        },
        {
          id: 'create-books',
          title: <FormattedMessage id="add-book" />,
          type: 'item',
          url: '/books/create',
          icon: icons.BookIcon
        }
      ]
    }
  ]
};

export default pages;
