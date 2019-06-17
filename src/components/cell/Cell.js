import React, { Component } from 'react';
import './cell.css';

class Cell extends Component {

    render() {
        return (
             <div className="cell" onClick={this.props.dropCoin}>
                <div className={this.props.cellType}></div>
             </div>
        )
    }
}

export default Cell;