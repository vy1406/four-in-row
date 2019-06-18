import React, { Component } from 'react';
import Cell from '../cell/Cell';
import './row.css';

class Row extends Component {

    render() {
        return (
            <div className="row">
                {this.props.row.map((cell, i) =>
                    <Cell key={i}
                        cellType={cell}
                        column={i}
                        dropCoin={this.props.dropCoin}
                    />)}
            </div>
        )
    }
}

export default Row;