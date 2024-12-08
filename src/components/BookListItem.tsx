import DeleteIcon from '@mui/icons-material/Delete';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import { IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

import { IBook } from 'types/book';

export function BookListItem({ book, onDelete }: { book: IBook; onDelete: (isbn: number) => void }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(book.isbn)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={book.title} secondary={book.authors} secondaryTypographyProps={{ color: 'gray' }} />
    </ListItem>
  );
}

export function NoBook() {
  return (
    <ListItem>
      <ListItemAvatar>
        <CommentsDisabledIcon />
      </ListItemAvatar>
      <ListItemText primary="No Elements" />
    </ListItem>
  );
}
