import React, { Component } from "react";
import { withStyles } from '@material-ui/styles';

import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

import styles from './styles/PaletteStyles';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lavel: 500,
            format: "hex"
        }
        this.changeLavel = this.changeLavel.bind( this );
        this.changeFormat = this.changeFormat.bind( this );
    }

    changeLavel( lavel ) {
        this.setState({ lavel });
    }

    changeFormat( value ) {
        this.setState({ format: value })
    }

	render() {
        const { colors, paletteName, emoji, id } = this.props.palette;
        const { classes } = this.props;
        const { lavel, format } = this.state;
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
                    changeLavel={ this.changeLavel }
                    handleChange={ this.changeFormat }
                    showAllColors
                />
				<div className={ classes.colors }>{ colorBoxes }</div>
                <PaletteFooter paletteName={ paletteName } emoji={ emoji } />
			</div>
		)
	}
}

export default withStyles( styles )( Palette );
