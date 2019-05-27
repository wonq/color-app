import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import PaletteList from './PaletteList';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from "./colorHelpers";

class App extends Component {
	findPalette( id ) {
		return seedColors.find( function( palette ) {
			return palette.id === id
		});
	}

	render() {
		return (
			<Switch>
				<Route
					exact
					path="/"
					render={ routeProps => (
						<PaletteList palettes={ seedColors } { ...routeProps } />
					)}
				/>
				<Route
					exact
					path="/palette/:id"
					render={ routeProps => (
						<Palette
							palette={ generatePalette(
								this.findPalette( routeProps.match.params.id )
							)}
						/>
					)}
				/>
				<Route path="/palette/:paletteId/:colorId"
					render={ () => (
						<h1>Colorrrr</h1>
					)}
				/>
			</Switch>
		);
	}
}

export default App;
