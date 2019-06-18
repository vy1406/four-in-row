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
            msg: "dummy msg",
            dialogType: "" // will change the background of the dialog according to the endGame
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

    dropCoin =  (column) => {
        let board = this.dropCoinOnFirstFreeCell(column)
        this.changeNextPlayer()

         this.setState({
            board
        })

        this.checkEndGame()
    }

    changeNextPlayer = () => {
        let curPlayer = this.state.curPlayer === "player1" ? "player2" : "player1"
        this.setState({ curPlayer })
    }

    dropCoinOnFirstFreeCell = (col) => {
        let tempBoard = this.state.board
        if (!this.state.isGameOver) {
            for (let i = ROW_LIMIT - 1; i >= 0; i--)
                if (!tempBoard[i][col]) {
                    tempBoard[i][col] = this.state.curPlayer
                    break
                }
        }
        return tempBoard
    }

    checkEndGame = () => {
        let winner = ""

        winner = this.checkVertical()
        if (winner === "player1" || winner === "player2") this.showDialog(winner)

        winner = this.checkHorizontal()
        if (winner === "player1" || winner === "player2") this.showDialog(winner)

        winner = this.checkDiagonalFromLeft()
        if (winner === "player1" || winner === "player2") this.showDialog(winner)

        winner = this.checkDiagonalFromRight()
        if (winner === "player1" || winner === "player2") this.showDialog(winner)
    }

    showDialog = winner => {
        let msg = ""
        let dialogType = ""
        if (winner !== undefined) {
            if (winner === "tie") {
                msg = "Its a tie!"
                dialogType = "tie-dialog"
            }
            if (winner === "player1") {
                msg = "player1 won!"
                dialogType = "player1-won-dialog"
            }
            if (winner === "player2") {
                msg = "player2 won!"
                dialogType = "player2-won-dialog"
            }

            this.setState({ msg, isGameOver: true , dialogType})
        }
    }

    checkTie = () => {
        // check if all the cell are with player1 or player2
        let board = this.state.board
        for (let row = 3; row < ROW_LIMIT; row++) {
            for (let col = 3; col < COL_LIMIT; col++)
                if (board[row][col] !== "player1" || board[row][col] !== "player1")
                    return null
        }
        return "tie"
    }

    checkDiagonalFromRight = () => {
        let board = this.state.board
        for (let row = 3; row < ROW_LIMIT; row++) {
            for (let col = 3; col < COL_LIMIT; col++)
                if (board[row][col]) // check if player there, if yes -> check if others are the same.
                    if (
                        board[row][col] === board[row - 1][col + 1] &&
                        board[row][col] === board[row - 2][col + 2] &&
                        board[row][col] === board[row - 3][col + 3]
                    )
                        return board[row][col]
        }
        return null
    }

    checkDiagonalFromLeft = () => {
        let board = this.state.board
        for (let row = 3; row < ROW_LIMIT; row++) {
            for (let col = 3; col < COL_LIMIT; col++)
                if (board[row][col]) // check if player there, if yes -> check if others are the same.
                    if (
                        board[row][col] === board[row - 1][col - 1] &&
                        board[row][col] === board[row - 2][col - 2] &&
                        board[row][col] === board[row - 3][col - 3]
                    )
                        return board[row][col]
        }
        return null
    }

    checkVertical = () => {
        let board = this.state.board
        for (let row = 3; row < ROW_LIMIT; row++) {
            for (let col = 0; col < COL_LIMIT; col++) {
                if (board[row][col]) // check if player there, if yes -> check if others are the same.
                    if (
                        board[row][col] === board[row - 1][col] &&
                        board[row][col] === board[row - 2][col] &&
                        board[row][col] === board[row - 3][col]
                    )
                        return board[row][col]
            }
        }
        return null
    }

    newGame = () => {
        this.initializeBoard()
        this.setState({
            curPlayer: "player1",
            isGameOver: false,
            msg: ""
        })
    }

    checkHorizontal = () => {
        let board = this.state.board
        for (let row = 0; row < ROW_LIMIT; row++) {
            for (let col = 0; col < COL_LIMIT - 3; col++)
                if (board[row][col]) // check if player there, if yes -> check if others are the same.
                    if (
                        board[row][col] === board[row][col + 1] &&
                        board[row][col] === board[row][col + 2] &&
                        board[row][col] === board[row][col + 3]
                    )
                        return board[row][col]
        }
        return null
    }

    renderHeader = () => {
        let stylePlayer1 = this.state.curPlayer === "player1" ? "player1_name currentPlayer" : "player1_name"
        let stylePlayer2 = this.state.curPlayer === "player2" ? "player2_name currentPlayer" : "player2_name"

        return (
            <div className="header">
                <div className={stylePlayer1}>Player 1</div>
                <div className={stylePlayer2}>Player 2</div>
            </div>
        )
    }

    renderBoard = () => {
        return (
            <div className="board">
                {this.state.board.map((row, i) => <Row
                    key={i}
                    row={row}
                    dropCoin={this.dropCoin}
                />)}
            </div>
        )
    }

    render() {
        return (
            <div className="game">
                {this.renderHeader()}
                {this.renderBoard()}
                {this.state.isGameOver ?
                    <Dialog
                        dialogType={this.state.dialogType}
                        msg={this.state.msg}
                        newGame={this.newGame} />
                    :
                    null}
            </div>
        )
    }
}

export default Game;