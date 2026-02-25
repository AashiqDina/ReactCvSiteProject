import Header from '../Header/Header.jsx'
import '../Header/Header.css'
import './Home.css'
import StarryBackground from '../Background/StarryBackground.jsx'
import { Link } from 'react-router-dom'

export default function Home(){
    return (
        <>
            <Header/>
            <StarryBackground/>
            <section className='HomeBody'>
                <article className='UsefulThings'>
                    <button onClick={() => window.location.href = 'https://github.com/AashiqDina'}>Github</button>
                    <button onClick={() => window.location.href = 'https://www.linkedin.com/in/aashiq-dina-339842227/'}>LinkedIn</button>
                </article>
                <article className='HomeMessage'>
                    <h2 className='SimpleMessage'>Welcome to my portfolio! I'm an aspiring frontend developer, passionate about crafting beautiful and user-friendly web experiences. This site is a work in progress, so some pages may be unavailable or incomplete. However, I hope my skills meet your expectations.</h2>
                </article>
                <article className='QuickSections'>
                        <Link style={{color:'white'}} role="button" to="/Projects">
                            <button className='QuickSectionsButtons'>
                                Projects
                            </button>
                        </Link>
                        <Link style={{color:'white'}} role="button" to="/Education">
                            <button className='QuickSectionsButtons'>
                                Education
                            </button>
                        </Link>
                        <Link style={{color:'white'}} role="button" to="/Skills">
                            <button className='QuickSectionsButtons'>
                                Skills
                            </button>
                        </Link>
                </article>
            </section>
        </>
        
    )
}