import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
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

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    render() {
        const { hideForm, handleSubmit } = this.props;
        const { open, newPaletteName } = this.state;

        return (
            <Dialog
                open={ open }
                onClose={ hideForm }
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={ () => handleSubmit( newPaletteName ) }>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your new beautyful palette, Make sure is uniq!
                        </DialogContentText>
                        <Picker />
                        <TextValidator
                            label="Palette Name"
                            name="newPaletteName"
                            value={ newPaletteName }
                            onChange={ this.handleChange }
                            fullWidth
                            margin="normal"
                            validators={[
                                'required',
                                'isPaletteNameUnique',
                            ]}
                            errorMessages={[
                                'Enter a palette name',
                                'Name already used!'
                            ]}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ hideForm } color="primary">
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            type="submit"
                        >
                            Save Palette
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        );
    }
}

export default PaletteMetaForm;