import DeleteIcon from '@mui/icons-material/Delete';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import { IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText, Rating } from '@mui/material';
import NextLink from 'next/link';
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
      <ListItemButton>
        <NextLink href={`/books/view?${book.isbn13}`} passHref legacyBehavior />
        <ListItemAvatar>
          <Avatar alt={book.title} src={book.icons.small} variant="square" />
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
