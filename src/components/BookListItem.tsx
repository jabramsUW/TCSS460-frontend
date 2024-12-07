import DeleteIcon from '@mui/icons-material/Delete';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import { IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

// project import
import { IBook } from 'types/book';
import PriorityAvatar from 'components/Priority';

export function BookListItem({ book, onDelete }: { book: IBook; onDelete: (isbn: number) => void }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(book.isbn13)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <PriorityAvatar priority={0} />
      </ListItemAvatar>
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
