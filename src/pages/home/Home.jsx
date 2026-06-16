import './Home.css'
import { Link } from 'react-router-dom'

export default function Home(){
    return (
        <>
            <section className='HomeBody'>
                <article className='UsefulThings'>
                    <button onClick={() => window.location.href = 'https://github.com/AashiqDina'}>
                        Github
                    </button>
                    <button onClick={() => window.location.href = 'https://www.linkedin.com/in/aashiq-dina-339842227/'}>
                        LinkedIn
                    </button>
                </article>
                <article className='HomeMessage'>
                    <h2 className='SimpleMessage'>
                        Welcome to my portfolio! I'm an aspiring frontend developer, 
                        passionate about crafting beautiful and user-friendly web experiences. 
                        This site is a work in progress, so some pages may be unavailable or incomplete. 
                        However, I hope my skills meet your expectations.
                    </h2>
                </article>
                <article className='QuickSections'>
                    <SectionButtons title={"Projects"} path={"/Projects"}/>
                    <SectionButtons title={"Education"} path={"/Education"}/>
                    <SectionButtons title={"Skills"} path={"/Skills"}/>
                </article>
            </section>
        </>
        
    )
}

function SectionButtons({title, path}){
    return(
        <Link style={{color:'white'}} role="button" to={path}>
            <button className='QuickSectionsButtons'>
                {title}
            </button>
        </Link>
    )
}