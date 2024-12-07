import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
export default function BookSearchSelector({
  initialValue,
  onClick
}: {
  initialValue: String;
  onClick: (event: React.MouseEvent<HTMLElement>, newParameter: String) => void;
}) {
  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <ToggleButtonGroup color="primary" exclusive value={initialValue} onChange={onClick}>
        <ToggleButton value={'ISBN'}>ISBN</ToggleButton>
        <ToggleButton value={'Title'}>Title</ToggleButton>
        <ToggleButton value={'Author'}>Author(s)</ToggleButton>
        <ToggleButton value={'Publication Year'}>Publication Year</ToggleButton>
        <ToggleButton value={'Rating'}>Rating</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
