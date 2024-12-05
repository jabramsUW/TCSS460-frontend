// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import BookIcon from '@mui/icons-material/Book';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

// project imports
import MainCard from 'components/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //
//
interface NiceButtonProps {
  text: string; // The text to display on the button
  icon: React.ReactNode; // icon to display
  url: string; // url to link to
}
export function Nicebutton({ text, icon, url }: NiceButtonProps): JSX.Element {
  return (
    <Button
      variant="contained"
      size="large"
      href={url}
      fullWidth
      startIcon={icon}
      sx={{
        height: '100px', // Makes the button taller
        fontSize: '1.5rem', // Larger font size
        backgroundColor: '#1976d2', // Custom color
        ':hover': { backgroundColor: '#115293' } // Hover color
      }}
    >
      {text}
    </Button>
  );
}
export default function SamplePage() {
  return (
    <MainCard title="Welcome to our bookstore!">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Nicebutton text="Search All Books" icon={<SearchIcon />} url="/books/search" />
        </Grid>
        <Grid item xs={6}>
          <Nicebutton text="List Series" icon={<LibraryBooksIcon />} url="/books/by-series" />
        </Grid>
        <Grid item xs={6}>
          <Nicebutton text="Add New Book" icon={<BookIcon />} url="/books/create" />
        </Grid>
      </Grid>
    </MainCard>
  );
}
