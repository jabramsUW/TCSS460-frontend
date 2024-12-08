import DeleteIcon from '@mui/icons-material/Delete';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import { IconButton, ListItem, ListItemAvatar, ListItemText, Rating } from '@mui/material';

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
      <a href={"/books/view?isbn=" + book.isbn13}>
        <ListItemAvatar>
          <Avatar alt={book.title} src={book.icons.small} variant="square" />
        </ListItemAvatar>
      </a>
      <ListItemText primary={<a href={"/books/view?isbn=" + book.isbn13}>{book.title}</a>} secondary={
        <div>
          <div>{book.authors}</div>
          <div><Rating name="bookRating" value={book.ratings.average} precision={0.2} size="small" readOnly /></div>
          <div>{book.publication}</div>
        </div>} 
        secondaryTypographyProps={{ color: 'gray' }} />
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
