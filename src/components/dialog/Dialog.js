import React, { Component } from 'react';

class Dialog extends Component {

    render() {
        const { msg } = this.props
        return (
            <div className="dialog-container">
                <div className="dialog">

                    <label className="username-label" htmlFor="username">
                        {msg}
                    </label>
                    <button className="submit-btn">
                        Submit
                    </button>

                </div>
            </div>
        )
    }
}

export default Dialog;