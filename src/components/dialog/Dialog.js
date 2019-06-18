import React, { Component } from 'react';
import '../dialog/dialog.css';

class Dialog extends Component {

    render() {
        const { msg } = this.props
        return (
            <div className="dialog-container">
                <div className="dialog">
                    <div className="dialog-form">
                        <label className="winner-text">
                            {msg}
                        </label>
                        <br></br>
                        <button className="new-game-btn" onClick={this.props.newGame}>
                            New Game
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dialog;