import React, { Component } from 'react';
import './cell.css';

class Cell extends Component {

    dropCoin = () => this.props.dropCoin(this.props.column)

    // get cell css type
    getCellType = () => {
        let cellType = "empty"
        if (this.props.cellType)
            this.props.cellType === "player1" ? cellType = "player1" : cellType = "player2"
        return cellType
    }

    render() {
        const cellType = this.getCellType()
        return (
            <div className="cell" onClick={this.dropCoin} >
                <div className={cellType}></div>
            </div>
        )
    }
}

export default Cell;