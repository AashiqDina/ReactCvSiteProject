import { useState, useEffect} from 'react'
import { motion } from 'framer-motion'
import Header from '../Header.jsx'
import StarryBackground from '../StarryBackground'
import './Education.css'
import EducationData from './EducationData.jsx'
import PageTitle from '../PageTitle.jsx'
export default function Education(){
    const [WinWidth, setWinWidth] = useState(window.innerWidth);
    const [ShowTimeline, setShowTimeline] = useState(false)
    const [ExpandedIndex, setExpandedIndex] = useState(null);

    const ExpandedDot = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        width: "80vw",
        transition: "all 0.5s ease-in-out",
        borderRadius: "5rem"
    }

    useEffect(() => {
        const handleResize = () => setWinWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return(
        <>
            {!ShowTimeline && <Header/>}
            <StarryBackground/>
            {!ShowTimeline && <PageTitle Title="Education"/>}
            <section className='EducationContentBody'>
                {!ShowTimeline && <article className='EducationSummarySection'>
                    <div>
                        <h4 style={WinWidth < 500 ? {fontSize: "0.9rem"} : {fontSize: "1.1rem"}}>Queen Mary University of London<br />
                        Bachelor of Science (Hons)</h4>
                        <p style={WinWidth < 500 ? {fontSize: "0.7rem"} : {fontSize: "1.1rem"}}>Computer Science <br />
                        Upper Second-Class Honours (2:1) - 69.7%</p>
                    </div>
                    <div>
                        <h4 style={WinWidth < 500 ? {fontSize: "0.9rem"} : {fontSize: "1.1rem"}}>The City Academy, Hackney<br />
                        A-Levels</h4>
                        <p style={WinWidth < 500 ? {fontSize: "0.7rem"} : {fontSize: "1.1rem"}}>Mathematics - B<br />
                        Physics - B<br />
                        Three-Dimensional Design - A</p>
                    </div>
                </article>}
                {!ShowTimeline && <article>
                    <h3 className='ViewMoreEducation'>View Details, Modules and More</h3>
                    <a onClick={() => setShowTimeline(true)}>
                        <div href="ToTimeLine" className='EducationSeeMoreArrow'>
                            <div className={`ArrowDown`}></div>
                            <div className={`ArrowDownTwo`}></div>
                        </div>
                    </a>
                </article>}
                {ShowTimeline && 
                <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 5 }} className='TimelineSection'>
                    <div id='ToTimeLine'></div>
                    <h3>Timeline</h3>
                    <h4>Click each point to view more detail</h4>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 5 }}  style={ExpandedIndex ? { display: "flex", justifyContent: "center", alignItems: "center"} : {}} className='TimeLineLine'>
                        {EducationData().map((Point, index) => {
                            return (
                                <div key={index} className='MappedEducationTimeline'>
                                    {!(ExpandedIndex == (index+1)) && <div style={{fontWeight: "200"}} className='LeftOfPoint'>
                                        <h5 className='TimelineLeftDesc'>{Point.LeftDesc}</h5>
                                    </div>}
                                    <div onClick={() => {ExpandedIndex != index+1 ? setExpandedIndex(index+1) : console.log("")}} style={ExpandedIndex == index+1 ? ExpandedDot : {}} id={'MappedPoint' + index} className='PointContainer'>
                                        <div style={ExpandedIndex == index+1 ? ExpandedDot : {}} className={ExpandedIndex == index+1 ? 'Point' : 'PointSmall'}>
                                            <div style={ExpandedIndex == index+1 ? {opacity: "1"} : {opacity: "0"}} className='InnerPoint'>
                                                {ExpandedIndex == index+1 &&
                                                    <>
                                                        <div className='TimeLineExpandedLeaveContainer'>
                                                            <button className='BurgerMenuButton' onClick={() => setExpandedIndex(null)}>
                                                                <div className='TimelineCross'>
                                                                    <div className='BurgerMenuOpen'>
                                                                        <div className='BurgerOneOpen'></div>
                                                                        <div className='BurgerTwoOpen'></div>
                                                                        <div className='BurgerThreeOpen'></div>
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        </div>
                                                        <div className='TimeLineExpandedTitle'>
                                                            <h6>{Point.InstitutionName}</h6>
                                                        </div>
                                                        <div className='TimeLineExpandedSubTitle'>
                                                            {Point.Year && <p>{Point.Year}</p>}
                                                            {Point.Year && <div style={{height: "50%"}}><div className='Seperator'></div></div>}
                                                            <p>{Point.RightDesc}</p>
                                                        </div>
                                                        <div className='TimeLineExpandedMainBody'>
                                                            <div className='TleDesc'>
                                                                {Point.MainDesc}
                                                            </div>
                                                            <div className='TleOtherInformation'>
                                                                {Point.SubjecsModulesWithGrades.map((SubMod, index) => {
                                                                    return (
                                                                        <span className='SubMod'>{SubMod}</span>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {!(ExpandedIndex == (index+1)) && <div className='RightOfPoint'>
                                        <h5 className='TimelineRightDesc'>{Point.RightDesc}</h5>
                                    </div>}
                                </div>
                            )
                        })  }
                    </motion.div>
                </motion.article>}
            </section>

        {ShowTimeline && <button className='EducationBackUpArrow' onClick={() => {setShowTimeline(false)}}>
            <div className={`ArrowUp`}></div>
            <div className={`ArrowUpTwo`}></div>
        </button>}
        </>
    )
}