import { useState} from 'react';
import { Link } from "react-router-dom"; 

export default function HeaderBurgerMenu(){
    const [burgerMenuClicked, SetBurgerMenuClicked] = useState(false)

    const invertMenuSelection = () => {SetBurgerMenuClicked(prev => !prev)}

    return (
        <>
            <button  className='BurgerMenuButton' onClick={invertMenuSelection}>
                <div className={`BurgerMenu${burgerMenuClicked ? "Open" : ""}`}>
                    <div className={`BurgerOne${burgerMenuClicked ? "Open" : ""}`}></div>
                    <div className={`BurgerTwo${burgerMenuClicked ? "Open" : ""}`}></div>
                    <div className={`BurgerThree${burgerMenuClicked ? "Open" : ""}`}></div>
                </div>
            </button>


            <div className={`DropDownMenu ${burgerMenuClicked ? "DropDownMenuClicked" : ""}`}>
                <div className='ButtonsCollection'>
                    <BurgerLink title="Home" path="/" menuState={burgerMenuClicked} closeMenu={invertMenuSelection}/>
                    <BurgerLink title="Experience" path="/Experience" menuState={burgerMenuClicked} closeMenu={invertMenuSelection}/>
                    <BurgerLink title="Education" path="/Education" menuState={burgerMenuClicked} closeMenu={invertMenuSelection}/>
                    <BurgerLink title="Projects" path="/Projects" menuState={burgerMenuClicked} closeMenu={invertMenuSelection}/>
                    <BurgerLink title="Skills" path="/Skills" menuState={burgerMenuClicked} closeMenu={invertMenuSelection}/>
                </div>
            </div>
        </>
    )
}

function BurgerLink({title, path, menuState, closeMenu}){
    return(
        <Link 
            style={{
                color:'white',
                pointerEvents: menuState ? "auto" : "none",
            }}
            aria-disabled={!menuState}
            tabIndex={menuState ? 0 : -1} 
            to={path}
            onClick={closeMenu}
        >
                <h2>{title}</h2>
        </Link>
    )
}