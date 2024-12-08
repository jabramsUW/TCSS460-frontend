import DeleteIcon from '@mui/icons-material/Delete';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import { IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link';

export function SeriesListItem({ series, onDelete }: { series: String; onDelete: (seriesName: String) => void }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(series)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <Link href={'/books/search/series?name=' + series} style={{ color: 'black', textDecoration: 'none' }} passHref>
        <ListItemButton component="a">
          <ListItemText primary={series} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
}

export function NoSeries() {
  return (
    <ListItem>
      <ListItemAvatar>
        <CommentsDisabledIcon />
      </ListItemAvatar>
      <ListItemText primary="No Elements" />
    </ListItem>
  );
}
