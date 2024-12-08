import DeleteIcon from '@mui/icons-material/Delete';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import { IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText, Rating } from '@mui/material';
import Link from 'next/link';
import { IBook } from 'types/book';
import Avatar from './@extended/Avatar';

export function BookListItem({ book, onDelete }: { book: IBook; onDelete: (isbn: number) => void }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(book.isbn13)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <Link href={`/books/view?isbn=${book.isbn13}`} style={{ color: 'black', textDecoration: 'none' }} passHref>
        <ListItemButton component="a">
          <ListItemAvatar sx={{ pr: 2 }}>
            <Avatar alt={book.title} src={book.icons.small} sx={{ width: 1, height: 1 }} variant="square" />
          </ListItemAvatar>
          <ListItemText
            primary={book.title}
            secondary={
              <div>
                <div>{book.authors}</div>
                <div>
                  <Rating name="bookRating" value={book.ratings.average} precision={0.2} size="small" readOnly />
                </div>
                <div>{book.publication}</div>
              </div>
            }
            secondaryTypographyProps={{ color: 'gray' }}
          />
        </ListItemButton>
      </Link>
    </ListItem>
  );
}

export function NoBook() {
  return (
    <ListItem>
      <ListItemAvatar>
        <CommentsDisabledIcon />
      </ListItemAvatar>
      <ListItemText primary="No books matching search criteria" />
    </ListItem>
  );
}
