import { useState, useEffect } from "react";

export default function Slot(props) {
    const { isHovered, value, row, cor, image, isWinner } = props;
    let initialPosition = -(row + 1) * 100;
    let tempoAnimacao = (row + 1) / 2 * 0.13;
    const [position, setPosition] = useState(initialPosition);

    useEffect(() => {
        if (value) {
            setPosition(initialPosition);
            setTimeout(() => {
                setPosition(0);
            }, 10);
        } else {
            setPosition(initialPosition);   
        }
    }, [value, initialPosition]);

    return (
        <div className={`slot ${isHovered ? "hovered" : ""}`}>
            {value && (
                <div
                    className={`disc ${value} ${isWinner ? "winner" : ""}`}   
                    style={{
                        transition: `top ${tempoAnimacao}s linear`,
                        top: `${position}%`,
                        backgroundColor: cor,
                        backgroundImage: image ? `url(${image})` : "none",
                        backgroundSize: "77% 77%",
                        backgroundPosition: "center"
                    }}
                ></div>
            )}
        </div>
    );
}