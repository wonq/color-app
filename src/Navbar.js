import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { withStyles } from '@material-ui/styles';

import styles from './styles/NavbarStyles';

const Navbar = ( props ) => {
    const [ format, setFormat ] = useState( "hex" );
    const [ open, setOpen ] = useState( false );

    const {
        handleChange,
        lavel,
        changeLavel,
        showAllColors,
        classes
    } = props;

    const handleFormatChange = ( event ) => {
        setFormat( event.target.value );
        setOpen( true );
        handleChange( event.target.value );
    };

    const closeSnackbar = () => setOpen( false );

    return (
        <header className={ classes.Navbar }>
            <div className={ classes.logo }>
                <Link to="/">react color picker</Link>
            </div>
            { showAllColors &&
                <div>
                    <span>Lavel: { lavel }</span>
                    <div className={ classes.slider }>
                        <Slider
                            defaultValue={ lavel }
                            min={ 100 }
                            max={ 900 }
                            onAfterChange={ changeLavel }
                            step={ 100 }
                        />
                    </div>
                </div>
            }
            <div className={ classes.selectContainer }>
                <Select value={ format } onChange={ handleFormatChange }>
                    <MenuItem value="hex">HEX - #ffffff</MenuItem>
                    <MenuItem value="rgb">RGB - rgb( 255, 255, 255 )</MenuItem>
                    <MenuItem value="rgba">RGBA - rgba( 255, 255, 255, 1.0 )</MenuItem>
                </Select>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={ open }
                autoHideDuration={ 3000 }
                message={
                    <span id="message-id">
                        Format Changed To { format.toUpperCase() }
                    </span>
                }
                ContentProps={{ "aria-describedby": "message-id" }}
                onClose={ closeSnackbar }
                action={[
                    <IconButton
                        onClick={ closeSnackbar }
                        color="inherit"
                        key="close"
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        </header>
    );
};

export default withStyles( styles )( Navbar );
