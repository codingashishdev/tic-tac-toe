import React, { useEffect, useState } from "react";
import Square from "./Square";

function Board() {
    const [squares, setSquares] = useState<(string | null)[]>(
        Array(9).fill(null)
    );

    const [player1, setPlayer1] = useState<number[]>([]);
    const [player2, setPlayer2] = useState<number[]>([]);

    const [isXNext, setIsXNext] = useState(true);

    const [winner, setWinner] = useState("");
    const [draw, setDraw] = useState(false);

    const winningPositions = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ];

    useEffect(() => {
        if (player1.length >= 3 && match(player1)) {
            setWinner("player1");
        }

        if (player2.length >= 3 && match(player2)) {
            setWinner("player2");
        }

        if (squares.every((square) => square != null) == true && winner == "") {
            setDraw(true);
        }
    }, [player1, player2]);

    const match = (player: number[]): boolean => {
        return winningPositions.some((winningPattern) =>
            winningPattern.every((position) => player.includes(position))
        );
    };

    const handleClick = (index: number) => {
        if (winner != "") return;
        if (squares[index]) return;
        const square = [...squares];
        square[index] = isXNext ? "X" : "O";
        isXNext
            ? setPlayer1([...player1, index + 1])
            : setPlayer2([...player2, index + 1]);
        setSquares(square);
        setIsXNext(!isXNext);
    };

    return (
        <>
            {winner === "" ? (
                <>
                    <div className="mb-4 text-xl font-mono">
                        Current Player: {isXNext ? "X" : "O"}
                    </div>
                    <div className="board flex flex-col content-center items-center">
                        {Array.from({ length: 3 }, (_, row) => (
                            <div key={row} className="board-row flex gap-1">
                                {Array.from({ length: 3 }, (_, col) => {
                                    const index = row * 3 + col;
                                    return (
                                        <Square
                                            key={`${row}-${col}`}
                                            value={squares[index]}
                                            onClick={() => {
                                                handleClick(index);
                                            }}
                                            className="w-20 h-20 text-2xl font-bold flex items-center justify-center border-2 border-gray-800 hover:bg-gray-600 cursor-pointer transition-colors duration-200"
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </>
            ) : draw == false ? (
                <div className="m-5 text-2xl font-bold">
                    And the winner is {winner}
                </div>
            ) : (
                <div>Draw</div>
            )}
        </>
    );
}

export default Board;
