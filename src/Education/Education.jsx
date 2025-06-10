import { useState, useEffect} from 'react'
import Header from '../Header.jsx'
import StarryBackground from '../StarryBackground'

export default function Education(){
    const [WinWidth, setWinWidth] = useState(window.innerWidth);
    const [AnimateMainProjectTest, setAnimateSkillsTitle] = useState(false)

    useEffect(() => {
        setAnimateSkillsTitle(true)
    }, [])
    
    useEffect(() => {
        const handleResize = () => setWinWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return(
        <>
            <Header/>
            <StarryBackground/>
            <section className='ProjectsTitleSection'>
                <h2 className='PageTitleProjects'>{'Educations'.split('').map((char, index) => {
                    return (
                    <span
                        key={index}
                        className={`MainProjectLetter ${AnimateMainProjectTest ? 'show' : ''}`}
                        style={{ transitionDelay: `${index * 0.1}s` }}
                        >{char}</span>)
                        })}</h2>
            </section>
            <div></div>
        </>
    )
}