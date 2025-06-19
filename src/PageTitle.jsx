import { useState, useEffect} from 'react'

export default function PageTitle(props){
    const [AnimateMainProjectTest, setAnimateSkillsTitle] = useState(false)

    useEffect(() => {
        setAnimateSkillsTitle(true)
    }, [])
    return (
        <section className='ProjectsTitleSection'>
                <h2 className='PageTitleProjects'>{props.Title.split('').map((char, index) => {
                    return (
                    <span
                        key={index}
                        className={`MainProjectLetter ${AnimateMainProjectTest ? 'show' : ''}`}
                        style={{ transitionDelay: `${index * 0.1}s` }}
                        >{char}</span>)
                        })}</h2>
            </section>
    )
}