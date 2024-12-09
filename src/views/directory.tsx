// material-ui
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import BookIcon from '@mui/icons-material/Book';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

// project imports
import MainCard from 'components/MainCard';
import RandomBook from 'components/RandomBook';
import NiceButton from 'components/NiceButton';
// ==============================|| DIRECTORY PAGE ||============================== //
//
export default function SamplePage() {
  return (
    <MainCard
      sx={{
        '& .MuiCardHeader-title': { fontSize: '1.5rem' } // Title size
      }}
      title="Welcome to our bookstore!"
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <NiceButton text="Search Books" icon={<SearchIcon />} url="/books/search" />
        </Grid>
        <Grid item xs={6}>
          <NiceButton text="Browse Books" icon={<BookIcon />} url="/books/browse" />
        </Grid>
        <Grid item xs={6}>
          <NiceButton text="Browse Series" icon={<LibraryBooksIcon />} url="/books/series" />
        </Grid>
        <Grid item xs={6}>
          <NiceButton text="Add New Book" icon={<LibraryAddIcon />} url="/books/create" />
        </Grid>
      </Grid>
      <br />
      <MainCard title="Random Book">
        <RandomBook />
      </MainCard>
    </MainCard>
  );
}
