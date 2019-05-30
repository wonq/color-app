import React, { Component } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPaletteName: ""
        }
        this.handleChange = this.handleChange.bind( this );
    }

    componentDidMount() {
        ValidatorForm.addValidationRule( 'isPaletteNameUnique', value =>
			this.props.palettes.every(
				({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
			)
        );
	};

	handleChange( event ) {
		this.setState({
			[ event.target.name ]: event.target.value
		})
	};

    render() {
		const { classes, open } = this.props;
		const { newPaletteName } = this.state;

        return (
            <div>
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
							onClick={this.props.handleDrawerOpen}
							edge="start"
							className={classNames(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap>
							Persistent drawer
						</Typography>
						<ValidatorForm onSubmit={ () => this.props.handleSubmit( newPaletteName ) }>
							<TextValidator
								label="Palette Name"
								name="newPaletteName"
								value={ newPaletteName }
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
							<Link to="/">
								<Button variant='contained' color='secondary'>
									Go Back
								</Button>
							</Link>
						</ValidatorForm>
					</Toolbar>
				</AppBar>
            </div>
        );
    }
}


export default PaletteFormNav;
