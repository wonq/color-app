import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import { generatePalette } from "./colorHelpers";
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

class App extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			palettes: seedColors
		}
		this.savePalette = this.savePalette.bind( this );
		this.findPalette = this.findPalette.bind( this );
	}

	findPalette( id ) {
		return this.state.palettes.find( palette => {
			return palette.id === id
		});
	}

	savePalette( newPalette ) {
		// console.log( newPalette );
		this.setState({
			palettes: [ ...this.state.palettes, newPalette ]
		})
	}

	render() {
		console.log( this.state );

		return (
			<Switch>
				<Route
					exact
					path="/palette/new"
					render={ routeProps => (
						<NewPaletteForm savePalette={ this.savePalette } { ...routeProps } />
					)}
				/>
				<Route
					exact
					path="/palette/:paletteId/:colorId"
					render={ routeProps => (
						<SingleColorPalette
							colorId={ routeProps.match.params.colorId }
							palette={ generatePalette(
								this.findPalette( routeProps.match.params.paletteId )
							)}
						/>
					)}
				/>
				<Route
					exact
					path="/"
					render={ routeProps => (
						<PaletteList palettes={ this.state.palettes } { ...routeProps } />
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
			</Switch>
		);
	}
}

export default App;
