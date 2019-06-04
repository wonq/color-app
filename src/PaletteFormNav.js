import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";

import PaletteMetaForm from "./PaletteMetaForm";

import styles from "./styles/PaletteFormNavStyles";

const PaletteFormNav = ( props ) => {
	const { classes, open, palettes, handleSubmit, handleDrawerOpen } = props;
	const [ formShowing, setFormShowing ] = useState( false );

	const showForm = () => {
		setFormShowing( true )
	};

	const hideForm = () => {
		setFormShowing( false )
	};

	return (
		<div className={ classes.root }>
			<CssBaseline />
			<AppBar
				position="fixed"
				color="default"
				className={ classNames( classes.appBar, {
					[ classes.appBarShift ]: open
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						onClick={ handleDrawerOpen }
						edge="start"
						className={ classNames( classes.menuButton, {
							[ classes.hide ]: open
						})}
					>
						<AddToPhotosIcon />
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
						onClick={ showForm }
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
					hideForm={ hideForm }
				/>
			)}
		</div>
	);
}


export default withStyles( styles, { withTheme: true } )( PaletteFormNav );
