import { createTheme } from '@mui/material';
import shadows from '@mui/material/styles/shadows';

const lightTheme = {
    bg_warnig: '#FFCC66',
    bg_primary: '#4324df',
    bg_light: 'white',
    bg_light_secundary: '#f6f6f6',
    text_primary: '#363535',
    text_secondary: '#ABABAB',
    shadows_primary: 'rgb(212, 204, 204)'
};

const theme = createTheme({
    palette: {
        mode: 'dark'
    }
});
const darkTheme = {
    bg_warnig: '#F5A623',
    bg_primary: '#4324df',
    bg_light: '#1E1E1E',
    bg_light_secundary: '#121212',
    text_primary: '#F0EDED ',
    text_secondary: '#ABABAB',
    shadows_primary: 'rgb(212, 204, 204)'
};
const themas = {
    light: theme,
    dark: darkTheme
};

export default themas;
