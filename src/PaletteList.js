import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

import MiniPalette from './MiniPalette';

const styles = {
    root: {
        backgroundColor: "blue",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
    },
      palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat( 3, 30% )",
        gridGap: "2.5rem",
    }
};

class PaletteList extends Component {
    goToPalette( id ) {
        this.props.history.push( `/palette/${ id }` )
    }

    render() {
        const { classes, palettes } = this.props;
        return (
            <div className={ classes.root }>
                <div className={ classes.container }>
                    <nav className={ classes.nav }>
                        <h1>React Colors</h1>
                    </nav>
                </div>
                <div className={ classes.palettes }>
                    { palettes.map( palette => (
                        <MiniPalette
                            { ...palette }
                            handleClick={ () => this.goToPalette( palette.id ) }
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default withStyles( styles )( PaletteList );
