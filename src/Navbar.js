import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import './Navbar.css';

class Navbar extends Component {
    render() {
        const { lavel, changeLavel } = this.props;

        return (
            <header className="Navbar">
                <div className="logo">
                    <a href="logo">react color picker</a>
                </div>
                <div className="slider-container">
                    <span>Lavel: { lavel }</span>
                    <div className="slider">
                        <Slider
                            defaultValue={ lavel }
                            min={ 100 }
                            max={ 900 }
                            onAfterChange={ changeLavel }
                            step={ 100 }
                        />
                    </div>
                </div>
            </header>
        );
    }
}

export default Navbar;
