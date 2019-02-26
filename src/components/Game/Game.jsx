import React from 'react';
import Board from './../Board/Board';
import { getWinner } from './../../helpers';

export default class Game extends React.Component {
    constructor() {
        super();

        this.state = {
            history: [
                Array(9).fill(null)
            ],
            stepNumber: 0,
            xIsNext: true
        }
    }

    handleClick(i) {
        const { history, xIsNext, stepNumber } = this.state;
        const newHistory = history.slice(0, stepNumber + 1);
        const newSquares = newHistory[newHistory.length - 1].slice();
        if(newSquares[i] || getWinner(newSquares)) return;
        newSquares[i] = xIsNext ? 'X' : 'O';
        newHistory[newHistory.length] = newSquares;
        this.setState({
            history: newHistory,
            stepNumber: newHistory.length - 1,
            xIsNext: !xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    renderMoves(move) {
        const desc = move ? `Go to move # ${move}` : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
        );
    }

    render() {
        const { history, xIsNext, stepNumber } = this.state;
        const current = history[stepNumber];
        let status;
        const winner = getWinner(current);
        if(winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Player: ${xIsNext ? 'X' : '0'}`;
        }
        
        return (
            <>
                <Board 
                    squares={current} 
                    onClick={(i) => this.handleClick(i)}  
                />
                <div className="game__info">
                    <span>{status}</span>
                    <ol>{history.map((step, move) => this.renderMoves(move))}</ol>
                </div>
            </>
        )
    }
}