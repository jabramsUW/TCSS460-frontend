import Button from '@mui/material/Button';
interface NiceButtonProps {
  text: string; // The text to display on the button
  icon: React.ReactNode; // icon to display
  url: string; // url to link to
}
export function NiceButton({ text, icon, url }: NiceButtonProps): JSX.Element {
  return (
    <Button
      variant="contained"
      size="large"
      href={url}
      fullWidth
      startIcon={icon}
      sx={{
        height: '5rem', // Makes the button taller
        fontSize: '1.5rem', // Larger font size
        backgroundColor: '#1975d2', // Custom color
        ':hover': { backgroundColor: '#115292' } // Hover color
      }}
    >
      {text}
    </Button>
  );
}

export default NiceButton;
