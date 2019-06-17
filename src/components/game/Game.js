import React, { Component } from 'react';
import Dialog from '../dialog/Dialog';
import Row from '../row/Row';
import './game.css'

const ROW_LIMIT = 6;
const COL_LIMIT = 7;

class Game extends Component {
    constructor() {
        super()
        this.state = {
            board: [],
            curPlayer: 1,
            isGameOver: true,
            msg: "dummy msg"
        }
    }

    componentDidMount() {
        this.initializeBoard()
    }

    initializeBoard = () => {
        let matrix = []
        for (let row = 0; row < ROW_LIMIT; row++) {
            let row = []
            for (let col = 0; col < COL_LIMIT; col++) {
                row.push(null)
            }
            matrix.push(row)
        }

        this.setState({
            board: matrix
        })
    }

    dropCoin = () => {

    }

    renderHeader = () => {
        return (
            <div className="header">HEADER</div>
        )
    }

    renderBoard = () => {
        return (
            <div className="board">
                {this.state.board.map((row,i) => <Row key={i} row={row} dropCoin={this.dropCoin}/>) }
            </div>
        )
    }
  
    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderBoard()}
                {this.state.isGameOver ? <Dialog msg={this.state.msg} /> : null}
            </div>
        )
    }
}

export default Game;