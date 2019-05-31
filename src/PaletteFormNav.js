import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import PaletteMetaForm from "./PaletteMetaForm";

const drawerWidth = 400;
const styles = theme => ({
	root: {
		display: "flex"
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
		  easing: theme.transitions.easing.sharp,
		  duration: theme.transitions.duration.leavingScreen
		}),
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: "64px"
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20
	},
	navBtns: {
		marginRight: "1rem",
		"& a": {
			textDecoration: "none"
		}
	},
	button: {
		margin: "0 0.5rem",
	}
});

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
			newPaletteName: "",
			formShowing: false
        }
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind( this );
    }

	showForm() {
		this.setState({ formShowing: true })
	};

	hideForm() {
		this.setState({ formShowing: false })
	};

	render() {
		const { classes, open, palettes, handleSubmit } = this.props;
		const { formShowing } = this.state;

        return (
            <div>
				<CssBaseline />
				<AppBar
					position="fixed"
					color="default"
					className={ classNames( classes.appBar, {
						[ classes.appBarShift ]: open,
					})}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={ this.props.handleDrawerOpen }
							edge="start"
							className={ classNames( classes.menuButton, open && classes.hide )}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap>
							Create A Palette
						</Typography>
					</Toolbar>
					<div className={ classes.navBtns }>
						<Link to="/">
							<Button
								className={ classes.button }
								variant='contained'
								color='secondary'
							>
								Go Back
							</Button>
						</Link>
						<Button
							variant='contained'
							color="primary"
							onClick={ this.showForm }
							className={ classes.button }
						>
							Save
						</Button>
					</div>
				</AppBar>
				{ formShowing && (
					<PaletteMetaForm
						palettes={ palettes }
						handleSubmit={ handleSubmit }
						hideForm={ this.hideForm }
					/>
				)}
            </div>
        );
    }
}


export default withStyles( styles, { withTheme: true } )( PaletteFormNav );
