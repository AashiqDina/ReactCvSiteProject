import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"; 

export default function Header(){
    const [BurgerMenuClicked, SetBurgerMenuClicked] = useState(false)
    const [WinWidth, setWinWidth] = useState(window.innerWidth);

    useEffect(() => {
            const handleResize = () => setWinWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);
    
    return (
        <header style={WinWidth < 500 ? {padding: "0"} : {}} className="PageHeader">            
            <button  className='BurgerMenuButton' onClick={() => SetBurgerMenuClicked(!BurgerMenuClicked)}>
                <div className={`BurgerMenu${BurgerMenuClicked ? "Open" : ""}`}>
                    <div className={`BurgerOne${BurgerMenuClicked ? "Open" : ""}`}></div>
                    <div className={`BurgerTwo${BurgerMenuClicked ? "Open" : ""}`}></div>
                    <div className={`BurgerThree${BurgerMenuClicked ? "Open" : ""}`}></div>
                </div>
            </button>


            <div className={`DropDownMenu ${BurgerMenuClicked ? "DropDownMenuClicked" : ""}`}>
                <div className='ButtonsCollection'>
                    <Link style={{color:'white'}} to="/">
                        <button>Home</button>
                    </Link>
                    <Link style={{color:'white'}} to="/Experience">
                        <button>Experience</button>
                    </Link>
                    <Link style={{color:'white'}} to="/Education">
                        <button>Education</button>
                    </Link>
                    <Link style={{color:'white'}} to="/Projects">
                        <button>Projects</button>
                    </Link>
                    <Link style={{color:'white'}} to="/Skills">
                        <button>Skills</button>
                    </Link>
                </div>
            </div>

            <Link style={WinWidth < 500 ? {transform: "scale(0.8)"} : {}} to="/">
                <h1 className='HeaderTitle'>Aashiq Dina</h1>
            </Link>

        </header>
    )
}