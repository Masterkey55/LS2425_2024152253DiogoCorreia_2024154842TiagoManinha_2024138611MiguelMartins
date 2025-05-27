import { useState, useEffect } from "react";

export default function Slot(props) {
    const { isHovered, value, row, col } = props;
    let initialPosition = -(row + 1) * 100
    const [position, setPosition] = useState(0);
    let tempoAnimacao = (row + 1) / 2 * 0.13
    
    useEffect(() => {
        setPosition(initialPosition);
        if (value) {
            setPosition(0);
        }
    }, [value, initialPosition]);

    return (
        <div className={`slot ${isHovered ? "hovered" : ""}`}>
            {value && (
                <div
                    className={`disc ${value}`}
                    style={{
                        transition: `top ${tempoAnimacao}s linear`,
                        top: `${position}%`
                    }}
                ></div>
            )}
        </div>
    );
}