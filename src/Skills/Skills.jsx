import Header from "../Header"
import StarryBackground from "../StarryBackground"
import './Skills.css'
import { useEffect, useState } from "react"
import SkillsData from "./SkillsData"

export default function Skills(){
    const [WinWidth, setWinWidth] = useState(window.innerWidth);
    const [AnimateSkillsTitle, setAnimateSkillsTitle] = useState(false)
    const [SkillsInput, setSkillsInput] = useState("")
    const [TheSkillsData, setSkillsData] = useState(SkillsData())

    useEffect(() => {
        setAnimateSkillsTitle(true)
    }, [])

    useEffect(() => {
        const handleResize = () => setWinWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function FilterSkills(input){
        if(input == ""){
            setSkillsData(SkillsData())
            return
        }
        let ToFilterSkills = SkillsData()
        let FilteredSkills = ToFilterSkills.map((SkillsSections, index) => {
                                let NewSkills = SkillsSections.Skills.map((TheSkill, index) => {
                                    if(TheSkill.toLowerCase().startsWith(input.toLowerCase())){
                                        return TheSkill;
                                    }
                                    return null
                                }).filter(skill => skill !== null);
                                return (
                                    {
                                        SectionName: ToFilterSkills[index].SectionName,
                                        Skills: NewSkills
                                    }
                                )
                            })
        setSkillsData(FilteredSkills)
    }

    return (
        <>
            <Header/>
            <StarryBackground/>
            <section className='SkillsTitleSection'>
                <h2 className='PageTitleSkills'>{'Skills'.split('').map((char, index) => {
                    return (
                        <span
                            key={index}
                            className={`SkillsTitleLetter ${AnimateSkillsTitle ? 'show' : ''}`}
                            style={{ transitionDelay: `${index * 0.1}s` }}
                            >{char}</span>)
                        })}</h2>
            </section>
            <section className="SkiilsSearchBarSection">
                <input style={WinWidth < 1000 ? {width: "80%"} : {width: "50%"}} type="text" value={SkillsInput} onChange={(e) => {FilterSkills(e.target.value); setSkillsInput(e.target.value)}} className="SkillsSearchInput" placeholder="Enter a Skill (e.g. JavaScript)"/>
            </section>
            <section className="SkillsSection">
            {TheSkillsData.map((section, index) => {
                if(section.Skills.length == 0){
                    return null
                }
                return (
                    <>
                        <article style={{width: `25rem`}}>
                            <h2 className="SkillsSectionTitle">{section.SectionName}</h2>
                            <div>
                                {section.Skills.map((skill, index) => {
                                return (
                                    <span className="SkillSpan">{skill}</span>
                                )
                            })}
                            </div>
                        </article>
                        {/* <div className="VerticalSkillsLine"></div> */}
                    </>
                )
            })}
            </section>
        </>
    )
}