import './Experience.css'
import Header from "../Header"
import StarryBackground from "../StarryBackground"
import PageTitle from "../PageTitle"
import ExperienceData from "./ExperienceData"
import { useEffect, useState } from 'react'

export default function Experience(){
const [Level, setLevel] = useState(1);
const [ExperienceMax, setExperienceMax] = useState(ExperienceData().length * 10);
const [CurrentExperience, setCurrentExperience] = useState(0);

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
                        <h3 className='Experience'>{Math.floor(CurrentExperience*10)}/{Math.floor(ExperienceMax*10)}</h3>
                        <div className="FilledPart" style={{width: `${CurrentExperience/ExperienceMax * 100}%`, overflow: "hidden"}}></div>
                    </div>
                </article>
                <article className='LevelInformationContainer'>
                    <h2 className='Level'>Level {Level}</h2>
                </article>

            </section>
        </>
    )
}