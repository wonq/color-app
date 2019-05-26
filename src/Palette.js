import React, { Component } from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import ColorBox from './ColorBox';

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
			    <div className="slider">
                    <Slider
                        defaultValue={ lavel }
                        min={ 100 }
                        max={ 900 }
                        onAfterChange={ this.changeLavel }
                        step={ 100 }
                    />
				</div>
				<div className="Palette-colors">
					{ colorBoxes }
				</div>
				{/* Footer eventually */}
			</div>
		)
	}
}

export default Palette;
