import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './styles/MiniPaletteStyles';

class MiniPalette extends Component {
    constructor(props) {
      super(props);
      this.deletePalette = this.deletePalette.bind(this);
    //   this.handleClick = this.handleClick.bind(this);
    }

    deletePalette( event ) {
        event.stopPropagation();
        this.props.handleDelete( this.props.id );
    }

    render() {
        const { classes, paletteName, emoji, colors, handleClick } = this.props;
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
                    onClick={ this.deletePalette }
                />
                <div className={ classes.colors }>{ miniColorBoxes }</div>
                <h5 className={ classes.title }>
                    { paletteName } <span className={ classes.title }>{ emoji }</span>
                </h5>
            </div>
        );
    }
};

export default withStyles( styles )( MiniPalette );
