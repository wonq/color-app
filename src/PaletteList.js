import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Link } from "react-router-dom";

import MiniPalette from './MiniPalette';

import styles from "./styles/PaletteListStyles";

class PaletteList extends Component {
    goToPalette( id ) {
        this.props.history.push( `/palette/${ id }` )
    }

    render() {
        const { classes, palettes, deletePalette } = this.props;
        return (
            <div className={ classes.root }>
                <div className={ classes.container }>
                    <nav className={ classes.nav }>
                        <h1 className={ classes.heading }>React Colors</h1>
                        <Link to="/palette/new">Create Palette</Link>
                    </nav>
                    <div className={ classes.palettes }>
                        { palettes.map( palette => (
                            <MiniPalette
                                { ...palette }
                                key={ palette.id }
                                id={ palette.id }
                                handleClick={ () => this.goToPalette( palette.id ) }
                                handleDelete={ deletePalette }
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles( styles )( PaletteList );
