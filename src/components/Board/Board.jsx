import React from 'react';
import Square from '../Square/Square';

export default class Board extends React.Component {

    renderSquare(i) {
        const { squares } = this.props;
        return (
            <Square
                key={i}
                value={squares[i]} 
                onClick={() => this.props.onClick(i) } 
            />
        );
    }

    render() {
        return (
            <>
                <div className="board">
                    { this.props.squares.map((v,i) => this.renderSquare(i,'')) }
                </div>
            </>
        )
    }
}