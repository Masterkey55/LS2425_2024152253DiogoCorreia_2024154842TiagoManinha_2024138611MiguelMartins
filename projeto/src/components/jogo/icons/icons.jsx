import "./icons.css";

import home from '../../../assets/icons/home.png';
import imgrestart from '../../../assets/icons/restart.png';

function Icons(props){

    const {restart, inicio, fimJogo} = props; 

    return(
        <div className="container-icons">
            <div onClick={()=>inicio("inicio")}>
                <img src={home}/>
            </div>
            <div onClick={()=> !fimJogo && restart()} style={fimJogo ? { opacity: 0.5, pointerEvents: "none" } : {}}>
                <img src={imgrestart}/>
            </div>
        </div>
    );
}

export default Icons;