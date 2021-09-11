import { createTheme } from '@material-ui/core/styles';
import { red, lightBlue, green } from '@material-ui/core/colors';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function useTheme() {

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	// Create a theme instance.
	const theme = createTheme({
		palette: {
			type: prefersDarkMode ? 'dark' : 'light',
			primary: {
				main: lightBlue[900],
			},
			secondary: {
				main: green[700],
			},
			error: {
				main: red.A400,
			},
		},
	});

	return theme;
}
