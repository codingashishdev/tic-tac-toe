import { useState } from "react";
import "./App.css";
import Board from "./components/Board";

function App() {
    const [active, setActive] = useState(false);
    const [gameKey, setGameKey] = useState(0); // Force re-render of Board
    
    const handleStart = () => setActive(true);
    
    const handleReset = () => {
        setGameKey(prev => prev + 1);
    };

    return (
        <>
            <div>
                <h1 className="text-3xl font-bold m-2">Tic Tac Toe</h1>
                
                <div>
                    {active ? (
                        <Board key={gameKey} />
                    ) : (
                        <>
                            <button onClick={handleStart} className="text-xl px-6 py-3">
                                Start Game
                            </button>
                        </>
                    )}
                </div>

                <div className="mt-6">
                    {active ? (
                        <button onClick={handleReset} className="bg-red-500 text-white px-4 py-2">
                            Reset
                        </button>
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default App;