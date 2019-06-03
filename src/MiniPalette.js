import React from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './styles/MiniPaletteStyles';

function MiniPalette( props ) {
    const { classes, paletteName, emoji, colors, handleClick } = props;
    const miniColorBoxes = colors.map( color => (
        <div
            key={ color.name }
            className={ classes.miniColor }
            style={{ backgroundColor: color.color }}
        />
    ));

    return (
        <div className={ classes.root } onClick={ handleClick }>
            <DeleteIcon
                className={ classes.deleteIcon }
                style={{ transition: "all 0.3s ease-in-out" }}
            />
            <div className={ classes.colors }>{ miniColorBoxes }</div>
            <h5 className={ classes.title }>
                { paletteName } <span className={ classes.title }>{ emoji }</span>
            </h5>
        </div>
    );
};

export default withStyles( styles )( MiniPalette );
