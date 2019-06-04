import React, { useState } from "react";
import { withStyles } from '@material-ui/styles';

import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

import styles from './styles/PaletteStyles';

const Palette = ( props ) => {
    const { colors, paletteName, emoji, id } = props.palette;
    const [ lavel, setLavel ] = useState( 500 );
    const [ format, setFormat ] = useState( "hex" );
    const { classes } = props;
    const changeLavel = ( lavel ) => setLavel( lavel );
    const changeFormat = ( value ) => setFormat( value );
    const colorBoxes = colors[ lavel ].map( color => (
        <ColorBox
            key={ color.id }
            id={ color.id }
            // background={ color[ format ] } ?????
            background={ color[ format ] }
            name={ color.name }
            paletteId={ id }
            moreUrl={ `/palette/${ id }/${ color.id }` }
            showingFullPalette
        />
    ));

    return (
        <div className={ classes.Palette }>
            <Navbar
                lavel={ lavel }
                changeLavel={ changeLavel }
                handleChange={ changeFormat }
                showAllColors
            />
            <div className={ classes.colors }>{ colorBoxes }</div>
            <PaletteFooter paletteName={ paletteName } emoji={ emoji } />
        </div>
    )
};

export default withStyles( styles )( Palette );
