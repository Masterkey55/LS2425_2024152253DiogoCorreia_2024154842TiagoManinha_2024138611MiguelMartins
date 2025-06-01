import "./toggleEspeciais.css"

function ToggleEspeciais(props) {
    const {setToggleEspeciais, toggleEspeciais} = props
    return (
        <div className="toggle-especiais">
            <span>CASAS ESPECIAIS</span>
            <label className="switch">
                <input type="checkbox" id="toggleEspeciais" checked={toggleEspeciais} onChange={()=> setToggleEspeciais(!toggleEspeciais)}/>
                <span className="slider"></span>
            </label>
        </div>
    )
}

export default ToggleEspeciais;