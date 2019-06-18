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
            curPlayer: "player1",
            isGameOver: false,
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
            for (let col = 0; col < COL_LIMIT; col++)
                row.push(null)
            matrix.push(row)
        }

        this.setState({
            board: matrix
        })
    }

    dropCoin = (column) => {
        let board = this.dropCoinOnFirstFreeCell(column)
        this.changeNextPlayer()
        this.setState({
            board
        })
    }

    changeNextPlayer = () => {
        let curPlayer = this.state.curPlayer === "player1" ? "player2" : "player1"
        this.setState({ curPlayer })
    }

    dropCoinOnFirstFreeCell = (col) => {
        if (!this.state.isGameOver) {
            let tempBoard = this.state.board
            for (let i = ROW_LIMIT - 1; i >= 0; i--)
                if (!tempBoard[i][col]) {
                    tempBoard[i][col] = this.state.curPlayer
                    break
                }
            this.checkEndGame()
            return tempBoard
        }
    }

    checkEndGame = () => {
        this.checkVertical()
        this.checkHorizontal()
        this.checkDiagonal()
        // this.setState({isGameOver : true})
    }

    checkVertical = () => {
        // for (let row = 0; row < ROW_LIMIT; row++) {
        //     for (let col = 0; col < COL_LIMIT; col)
            
        // }
    }

    renderHeader = () => {
        return (
            <div className="header">
                <div className="player1_name">Player 1</div>
                <div className="player2_name">Player 2</div>
            </div>
        )
    }

    renderBoard = () => {
        return (
            <div className="board">
                {this.state.board.map((row, i) => <Row key={i} row={row} dropCoin={this.dropCoin} />)}
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