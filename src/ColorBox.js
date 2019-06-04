import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/styles';
import classNames from "classnames";

import styles from './styles/ColorBoxStyles';

const ColorBox = ( props ) => {
    const [ copied, onCopy ] = useState( false );
    const { background, name, moreUrl, showingFullPalette, classes } = props;
    const changeCopyState = () => {
        onCopy( true );
        setTimeout( () =>
            onCopy( false )
        , 1500 );
    }

    return (
        <CopyToClipboard text={ background } onCopy={ changeCopyState }>
            <div className={ classes.colorBox } style={{ background: background }}>
                <div
                    style={{ background }}
                    className={ classNames( classes.copyOverlay, {
                        [ classes.showOverlay ]: copied
                    })}
                />
                <div
                    className={ classNames( classes.copyMessage, {
                        [ classes.showMessage ]: copied
                    })}
                >
                    <h1>copied!</h1>
                    <p className={ classes.copyText }>{ background }</p>
                </div>
                <div>
                    <div className={ classes.boxContent }>
                        <span className={ classes.colorName }>{ name }</span>
                    </div>
                    <button className={ classes.copyButton }>
                        Copy
                    </button>
                </div>
                { showingFullPalette &&
                    <Link to={ moreUrl } onClick={ event => event.stopPropagation() }>
                        <span className={ classes.seeMore }>
                            More
                        </span>
                    </Link>
                }
            </div>
        </CopyToClipboard>
    );
}

export default withStyles( styles )( ColorBox );
