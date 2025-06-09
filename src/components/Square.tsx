// import React from 'react'

import type React from "react";

interface SquareProps {
    value : string | null;
    onClick: () => void;
    className: string | null;
}

const Square: React.FC<SquareProps> = ({value, onClick, className}) => {
    return (
        <>
            <button 
                className={`${className}`}
                onClick={onClick}>{value}
            </button>
        </>
    )
}

export default Square