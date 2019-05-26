import React, { Component } from "react";

import ColorBox from './ColorBox';
import Navbar from './Navbar';

import './Palette.css';

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
        console.log(value);
    }

	render() {
        const { colors } = this.props.palette;
        const { lavel, format } = this.state;
        const colorBoxes = colors[ lavel ].map( ( color, index ) => (
            <ColorBox
                key={ index }
                // background={ color[ format ] } ?????
                background={ color[ format ] }
                name={ color.name }
            />
        ));

		return (
			<div className="Palette">
			    <Navbar
                    lavel={ lavel }
                    changeLavel={ this.changeLavel }
                    handleChange={ this.changeFormat }
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
