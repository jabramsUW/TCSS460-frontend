// material-ui
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import BookIcon from '@mui/icons-material/Book';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

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
        <Grid item xs={12}>
          <NiceButton text="Search All" icon={<SearchIcon />} url="/books/search" />
        </Grid>
        <Grid item xs={6}>
          <NiceButton text="List Series" icon={<LibraryBooksIcon />} url="/books/by-series" />
        </Grid>
        <Grid item xs={6}>
          <NiceButton text="New Book" icon={<BookIcon />} url="/books/create" />
        </Grid>
      </Grid>
      <br />
      <MainCard title="Random Book">
        <RandomBook />
      </MainCard>
    </MainCard>
  );
}
