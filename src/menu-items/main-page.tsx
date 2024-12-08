// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import HomeIcon from '@mui/icons-material/Home';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { HomeIcon };

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const mainpage: NavItemType = {
  id: 'main-page',
  title: <FormattedMessage id="main-page" />,
  type: 'group',
  url: '/directory',
  icon: icons.HomeIcon
};

export default mainpage;
