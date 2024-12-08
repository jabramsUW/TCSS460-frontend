import DeleteIcon from '@mui/icons-material/Delete';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import { IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

export function SeriesListItem({ series, onDelete }: { series: String; onDelete: (seriesName: String) => void }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(series)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <a href={'/books/search/series?name=' + series}>
        <ListItemText primary={<a href={'/books/search/series?name=' + series}>{series}</a>} />
      </a>
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
