import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { IBook } from 'types/book';
export default function BookSearchSelector({
  onClick
}: {
  onClick: (event: React.MouseEvent<HTMLElement>, searchKey: keyof IBook) => void;
}) {
  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <ToggleButtonGroup color="primary" exclusive onChange={onClick}>
        {/* <ToggleButton value={'isbn13'}>ISBN</ToggleButton> */}
        <ToggleButton value={'title'}>Title</ToggleButton>
        <ToggleButton value={'authors'}>Author(s)</ToggleButton>
        <ToggleButton value={'publication'}>Publication Year</ToggleButton>
        <ToggleButton value={'ratings.average'}>Rating</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
