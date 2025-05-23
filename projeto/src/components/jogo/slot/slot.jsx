export default function Slot(props) {
    const { isHovered, value, row, col } = props;
    
    return (
        <div className={`slot ${isHovered ? "hovered" : ""}`}>
            <div className={`disc ${value}`}></div>
        </div>
    );
}