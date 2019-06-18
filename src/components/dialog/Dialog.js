import React, { Component } from 'react';
import '../dialog/dialog.css';

class Dialog extends Component {

    render() {
        const { msg } = this.props

        let msg_form_type_css = "dialog-form " + this.props.dialogType
        
        return (
            <div className="dialog-container">
                <div className="dialog">
                    <div className={msg_form_type_css}>
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