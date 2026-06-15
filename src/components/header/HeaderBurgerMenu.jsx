import { useState} from 'react';
import { Link } from "react-router-dom"; 

export default function HeaderBurgerMenu(){
    const [burgerMenuClicked, SetBurgerMenuClicked] = useState(false)

    return (
        <>
            <button  className='BurgerMenuButton' onClick={() => SetBurgerMenuClicked(prev => !prev)}>
                <div className={`BurgerMenu${burgerMenuClicked ? "Open" : ""}`}>
                    <div className={`BurgerOne${burgerMenuClicked ? "Open" : ""}`}></div>
                    <div className={`BurgerTwo${burgerMenuClicked ? "Open" : ""}`}></div>
                    <div className={`BurgerThree${burgerMenuClicked ? "Open" : ""}`}></div>
                </div>
            </button>


            <div className={`DropDownMenu ${burgerMenuClicked ? "DropDownMenuClicked" : ""}`}>
                <div className='ButtonsCollection'>
                    <BurgerLink title="Home" path="/" menuState={burgerMenuClicked}/>
                    <BurgerLink title="Experience" path="/Experience" menuState={burgerMenuClicked}/>
                    <BurgerLink title="Education" path="/Education" menuState={burgerMenuClicked}/>
                    <BurgerLink title="Projects" path="/Projects" menuState={burgerMenuClicked}/>
                    <BurgerLink title="Skills" path="/Skills" menuState={burgerMenuClicked}/>
                </div>
            </div>
        </>
    )
}

function BurgerLink({title, path, menuState}){
    return(
        <Link 
            style={{
                color:'white',
                pointerEvents: menuState ? "auto" : "none",
            }}
            aria-disabled={!menuState}
            tabIndex={menuState ? 0 : -1} 
            to={path}>
                <h2>{title}</h2>
        </Link>
    )
}