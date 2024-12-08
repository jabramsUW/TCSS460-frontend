import DeleteIcon from '@mui/icons-material/Delete';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import { IconButton, ListItem, ListItemAvatar, ListItemText, Rating } from '@mui/material';

// project import
import { IBook } from 'types/book';
import Avatar from './@extended/Avatar';

export function BookListItem({ book }: { book: IBook }) {
  return (
    <ListItem
      // secondaryAction={
      //   <IconButton edge="end" aria-label="delete" onClick={() => onDelete(book.isbn13)}>
      //     <DeleteIcon />
      //   </IconButton>
      // }
    >
      
      <ListItemAvatar>
        <Avatar alt={book.title} src={book.icons.small} variant="square" />
      </ListItemAvatar>
      <ListItemText primary={book.title} secondary={
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
      <ListItemText primary="No Elements" />
    </ListItem>
  );
}
