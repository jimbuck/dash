import { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		menuButton: {
			marginRight: theme.spacing(2),
		},
	}),
);

export default function NavBar() {
	const classes = useStyles();

	const [menuOpened, setMenuOpened] = useState(false);

	return <AppBar position="static">
		<Toolbar variant="dense">
			<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
				<MenuIcon />
			</IconButton>
			<Typography variant="h6" color="inherit">
				Dash
			</Typography>
		</Toolbar>
		<SwipeableDrawer anchor="left" color="secondary" open={menuOpened} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)} >
			<List>
				{['Media', 'Work', 'Editing', 'Shortcuts'].map((text, index) => (
					<ListItem button key={text}>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</SwipeableDrawer>
	</AppBar>;

	function toggleDrawer(open: boolean) {
		return (event: React.KeyboardEvent | React.MouseEvent) => {
			if (event?.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) return;

			setMenuOpened(open);
		};
	}
}
