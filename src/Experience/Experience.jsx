import './Experience.css'
import Header from "../Header"
import StarryBackground from "../StarryBackground"
import PageTitle from "../PageTitle"
import ExperienceData from "./ExperienceData"
import { useEffect, useState } from 'react'

export default function Experience(){
    const [WinWidth, setWinWidth] = useState(window.innerWidth);
    const [Level, setLevel] = useState(1);
    const [ExperienceMax, setExperienceMax] = useState(ExperienceData().length * 10);
    const [CurrentExperience, setCurrentExperience] = useState(0);
    const [ExpandedIndex, setExpandedIndex] = useState(null)

    useEffect(() => {
    const Months = ExperienceData().map((Job) => {
        const start = new Date(Job.Dates.Start);
        const end = new Date(Job.Dates.End);
        return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    });

    const TotalMonths = Months.reduce((Sum, Value) => Sum + Value, 0);
    setCurrentExperience(TotalMonths * ExperienceData().length * 7);
    }, []);


    useEffect(() => {
        const handleResize = () => setWinWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
    let Xp = CurrentExperience;
    let level = Level;
    let Max = ExperienceMax;

    while (Xp >= Max) {
        Xp -= Max;
        Max = Max * 1.2;
        level += 1;
    }

    if (level !== Level) setLevel(level);
    if (Max !== ExperienceMax) setExperienceMax(Max);
    if (Xp !== CurrentExperience) setCurrentExperience(Xp);
    }, [CurrentExperience]);

    return (
        <>
            <Header/>
            <StarryBackground/>
            <PageTitle Title="Experience"/>
            
            <section className="LevelSection">
                <article className="ExperienceBarContainer">
                    <div className="ExperienceBar">
                        <h3 className='Experience'>Level {Level} {WinWidth > 530 ? `| ${Math.floor(CurrentExperience/ExperienceMax * 100)}%`  : null}</h3>
                        <div className="FilledPart" style={{width: `${CurrentExperience/ExperienceMax * 100}%`, overflow: "hidden"}}></div>
                    </div>
                </article>
            </section>
            

            <section className="ExperienceSection">
                {ExperienceData().reverse().map((data, index) => {
                    return (
                        <article className='JobExperience' key={index} onClick={() => {ExpandedIndex == index ? setExpandedIndex(null) : setExpandedIndex(index)}} style={ExpandedIndex == index ? {borderRadius: '3rem', borderColor: data.Colour} : null}>
                            <div className='JobExperienceFirstRow'>
                                <h3>{data.Logo ? <img className='CompanyLogo' src={`${process.env.PUBLIC_URL}${data.Logo}` || ""} alt={data.Company} /> : null}{data.JobTitle}</h3>
                                <p>{data.Dates.Start} - {data.Dates.End}</p>
                            </div>
                            <h4>{data.Company}</h4>
                            <div className='JobExperienceSectionOne'>
                            </div>
                            {
                                <div className='JobExperienceExpandedSection' style={ExpandedIndex != index ? {display: "none"} : null}>
                                    <p>{data.Description}</p>
                                    <div className='JobExperienceExpandedSectionDivided'>
                                        <div className='JobExperienceExpandedSectionLeft'>
                                            <h4 style={{marginLeft: "2rem"}}>Highlights</h4>
                                            <ul>
                                                {
                                                    data.Highlights.map((Highlight, index) => {
                                                        return (
                                                            <li key={index}>{Highlight}</li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                        <div className='JobExperienceExpandedSectionRight'>
                                            <h4 style={{marginLeft: "2rem"}}>Skills</h4>
                                            <div className='ExperienceSkills'>
                                                {
                                                    data.Skills.map((Skill, index) => {
                                                        return (
                                                            <span key={index}>{Skill}</span>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>   
                            }
                        </article>
                    )
                })

                }
            </section>
        </>
    )
}