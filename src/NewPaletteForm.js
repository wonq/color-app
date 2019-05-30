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
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { ChromePicker } from "react-color";

import DraggableColorBox from './DraggableColorBox';

import styles from "./styles/NewPaletteStyles";

class NewPaletteForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			currentColor: "",
			newColorName: "",
			colors: [],
			// colors: [ ...this.props.palettes[6].colors ],
			newPaletteName: ""
		};
		this.updateCurrentColor = this.updateCurrentColor.bind( this );
		this.addNewColor = this.addNewColor.bind( this );
		this.handleChange = this.handleChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
		this.removeColor = this.removeColor.bind( this );
	};

    componentDidMount() {
        ValidatorForm.addValidationRule( 'isColorNameUnique', value =>
			this.state.colors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			)
        );
        ValidatorForm.addValidationRule( 'isColorUnique', () =>
			this.state.colors.every(
				({ color }) => color !== this.state.currentColor
			)
        );
        ValidatorForm.addValidationRule( 'isPaletteNameUnique', value =>
			this.props.palettes.every(
				({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
			)
        );
	};

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
		const newColor = {
			color: this.state.currentColor,
			name: this.state.newColorName
		};
		this.setState({ colors: [ ...this.state.colors, newColor ], newColorName: ""})
	};

	handleChange( event ) {
		this.setState({
			[ event.target.name ]: event.target.value
		})
	};

	handleSubmit() {
		let newName = this.state.newPaletteName;
		const NewPalette = {
			paletteName: newName,
			id: newName.toLowerCase().replace( / /g, "-" ),
			colors: this.state.colors
		}
		this.props.savePalette( NewPalette );
		this.props.history.push( "/" );
	};

	removeColor( colorName ) {
		this.setState({
			colors: this.state.colors.filter( color => color.name !== colorName )
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
					color="default"
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
						<ValidatorForm onSubmit={ this.handleSubmit }>
							<TextValidator
								label="Palette Name"
								name="newPaletteName"
								value={ this.state.newPaletteName }
								onChange={ this.handleChange }
								validators={[
									'required',
									'isPaletteNameUnique',
								]}
								errorMessages={[
									'Enter a palette name',
									'Name already used!'
								]}
							/>
							<Button
								variant='contained'
								color='primary'
								type="submit"
							>
								Save Palette
							</Button>
						</ValidatorForm>
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
						<IconButton onClick={ this.handleDrawerClose }>
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
					<ValidatorForm onSubmit={ this.addNewColor }>
						<TextValidator
							value={ this.state.newColorName }
							name="newColorName"
							onChange={ this.handleChange }
							validators={[
								'required',
								'isColorNameUnique',
								'isColorUnique'
							]}
                    		errorMessages={[
								'Enter a color name',
								'Color name must be unique',
								'Color already used!'
							]}
						/>
						<Button
							variant="contained"
							color="primary"
							type="submit"
							className={ classes.button }
							style={{ backgroundColor: this.state.currentColor }}
						>
							Add Color
						</Button>
					</ValidatorForm>
				</Drawer>
				<main
					className={classNames( classes.content, {
						[ classes.contentShift]: open
					})}
				>
					<div className={ classes.drawerHeader } />
					{ this.state.colors.map( color => (
						<DraggableColorBox
							key={ color.name }
							color={ color.color }
							name={ color.name }
							handleClick={ () => this.removeColor( color.name ) }
						/>
					))}
				</main>
			</div>
		);
	}
}

export default withStyles( styles, { withTheme: true })( NewPaletteForm );
