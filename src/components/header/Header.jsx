import "./Header.css"
import HeaderBurgerMenu from "./HeaderBurgerMenu"
import { Link } from "react-router-dom"; 

export default function Header(){
    
    return (

        <header className="PageHeader">            
            <HeaderBurgerMenu/>

            <Link to="/" className='HeaderTitle'>
                <h1 className='HeaderTitle'>Aashiq Dina</h1>
            </Link>

        </header>
    )
}