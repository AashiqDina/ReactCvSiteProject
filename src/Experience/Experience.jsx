import './Experience.css'
import Header from "../Header"
import StarryBackground from "../StarryBackground"
import PageTitle from "../PageTitle"
import ExperienceData from "./ExperienceData"

export default function Experience(){
    const ExpData = ExperienceData()
    var temp = 0;
    const Months = ExpData.map((Job, index) => {
        return (
            (Date(Job.Dates.End).getFullYear() - Date(Job.Dates.Start).getFullYear()) + (Date(Job.Dates.End).getMonth() + Date(Job.Dates.End).getMonth())
        )
    })
    const Level = ExpData.length * 4
    const ExperienceMax = ExpData.length * Level * 1000
    const CurrentExperience = ExpData.length * Level * Months 

    return (
        <>
            <Header/>
            <StarryBackground/>
            <PageTitle Title="Experience"/>
            
            <section className="LevelSection">
                <article className="ExperienceBarContainer">
                    <div className="ExperienceBar">
                        <div className="FilledPart" style={{width: CurrentExperience/ExperienceMax * 100}}></div>
                    </div>
                </article>
            </section>
        </>
    )
}