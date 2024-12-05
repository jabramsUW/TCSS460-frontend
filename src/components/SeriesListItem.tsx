import DeleteIcon from '@mui/icons-material/Delete';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import { IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

// project import
import PriorityAvatar from 'components/Priority';

export function SeriesListItem({ series, onDelete }: { series: String; onDelete: (seriesName: String) => void }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(series)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <PriorityAvatar priority={0} />
      </ListItemAvatar>
      <ListItemText primary={series} />
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
