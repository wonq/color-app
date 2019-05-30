import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { ChromePicker } from "react-color";
import arrayMove from 'array-move';

import PaletteFormNav from './PaletteFormNav';
import DraggableColorList from './DraggableColorList';

import styles from "./styles/NewPaletteStyles";

class NewPaletteForm extends Component {
	static defaultProps = {
		maxColors: 20
	}

	constructor(props) {
		super(props);
		this.state = {
			open: false,
			currentColor: "Black",
			newColorName: "",
			// colors: [],
			colors: this.props.palettes[0].colors,
		};
		this.updateCurrentColor = this.updateCurrentColor.bind( this );
		this.addNewColor = this.addNewColor.bind( this );
		this.handleChange = this.handleChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
		this.removeColor = this.removeColor.bind( this );
		this.clearColors = this.clearColors.bind( this );
		this.addRadomColors = this.addRadomColors.bind( this );
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

	clearColors() {
		this.setState({
			colors: []
		})
	};

	addRadomColors() {
		// Pick random color from exiting palettes
		const allColors = this.props.palettes.map( p => p.colors ).flat();
		let rand = Math.floor( Math.random() * allColors.length );
		const randomColor = allColors[ rand ];
		this.setState({ colors: [ ...this.state.colors, randomColor ] })
	};

	handleSubmit( newPaletteName ) {
		const NewPalette = {
			paletteName: newPaletteName,
			id: newPaletteName.toLowerCase().replace( / /g, "-" ),
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

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ colors }) => ({
			colors: arrayMove( colors, oldIndex, newIndex ),
		}));
	};

	render() {
		const { classes, maxColors, palettes } = this.props;
		const { open, colors } = this.state;
		const paletteIsFull = colors.length >= maxColors;

		return (
			<div className={classes.root}>
				<PaletteFormNav
					open={ open }
					classes={ classes }
					palettes={ palettes }
					handleSubmit={ this.handleSubmit }
					handleDrawerOpen={ this.handleDrawerOpen }
				/>
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
							onClick={ this.clearColors }
						>
							Clear Palette
						</Button>
						<Button
							variant='contained'
							color='primary'
							className={ classes.button }
							disabled={ paletteIsFull }
							onClick={ this.addRadomColors }
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
							disabled={ paletteIsFull }
							style={{
								backgroundColor: paletteIsFull
									? "grey"
									: this.state.currentColor }}
						>
							{ paletteIsFull
								? "Palettte Full"
								: "Add Color"
							}
						</Button>
					</ValidatorForm>
				</Drawer>
				<main
					className={classNames( classes.content, {
						[ classes.contentShift]: open
					})}
				>
					<div className={ classes.drawerHeader } />
					<DraggableColorList
						colors={ this.state.colors }
						removeColor={ this.removeColor }
						axis="xy"
						onSortEnd={ this.onSortEnd }
					/>
				</main>
			</div>
		);
	}
}

export default withStyles( styles, { withTheme: true })( NewPaletteForm );
