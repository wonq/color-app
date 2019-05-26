import React, { Component } from "react";

import ColorBox from './ColorBox';
import Navbar from './Navbar';

import './Palette.css';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { lavel: 500 }
        this.changeLavel = this.changeLavel.bind( this );
    }

    changeLavel( lavel ) {
        this.setState({ lavel });
    }

	render() {
        const { colors } = this.props.palette;
        const { lavel } = this.state;
        const colorBoxes = colors[ lavel ].map( ( color, index ) => (
            <ColorBox
                key={ index }
                background={ color.hex }
                name={ color.name }
            />
        ));

		return (
			<div className="Palette">
			    <Navbar
                    lavel={ lavel }
                    changeLavel={ this.changeLavel }
                />
				<div className="Palette-colors">
					{ colorBoxes }
				</div>
				{/* Footer eventually */}
			</div>
		)
	}
}

export default Palette;
