// style sheet created so that it can be imported anywhere in the project
// using material ui specifically
import { orange, red } from '@mui/material/colors';
import backgroundImage from './floweraura.jpeg';

export const styleOrangeBox = {
  backgroundColor: orange[200],
  padding: '10px',
  marginBottom: '20px',
  borderRadius: '10px',
  width: '50%'
};

export const styleRedButton = {
  backgroundColor: red[300],
};

export const typographyFontVougella = {
  fontFamily: 'Voguella, sans-serif',
}

export const pageBackground = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  padding: '20px',
}