import React, { Component } from "react";
import classNames from "classnames";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";

import DraggableColorBox from './DraggableColorBox';

import styles from "./styles/NewPaletteStyles";

class NewPaletteForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  open: true,
		  currentColor: "blue",
		  colors: [ "blue", "red" ]
		};
		this.updateCurrentColor = this.updateCurrentColor.bind( this );
		this.addNewColor = this.addNewColor.bind( this );
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	updateCurrentColor( newColor ) {
		this.setState({ currentColor: newColor.hex });
	};

	addNewColor() {
		this.setState({
			colors: [ ...this.state.colors, this.state.currentColor ]
		})
	};

	render() {
		const { classes } = this.props;
		const { open } = this.state;

		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={classNames(classes.appBar, {
						[classes.appBarShift]: open,
					})}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.handleDrawerOpen}
							edge="start"
							className={classNames(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap>
							Persistent drawer
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer
					className={classes.drawer}
					variant='persistent'
					anchor='left'
					open={open}
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<div className={ classes.drawerHeader }>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<Typography variant="h4">
						Design Your Palette
					</Typography>
					<div className={ classes.buttons }>
						<Button
							variant='contained'
							color='secondary'
							className={ classes.button }
						>
							Clear Palette
						</Button>
						<Button
							variant='contained'
							color='primary'
							className={ classes.button }
						>
							Random Color
						</Button>
					</div>
					<ChromePicker
						color={ this.state.currentColor }
						onChangeComplete={ this.updateCurrentColor }
					/>
					<Button
						variant='contained'
						color='primary'
						className={ classes.button }
						style={{ backgroundColor: this.state.currentColor }}
						onClick={ this.addNewColor }
					>
						Add Color
					</Button>
				</Drawer>
				<main
					className={classNames( classes.content, {
						[ classes.contentShift]: open
					})}
				>
					<div className={classes.drawerHeader} />
					{ this.state.colors.map( color => (
						<DraggableColorBox color={ color } />
					))}
				</main>
			</div>
		);
	}
}

export default withStyles( styles, { withTheme: true })( NewPaletteForm );
