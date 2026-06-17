import './Projects.css';
import { useEffect, useState, useRef } from 'react';
import ProjectData from './ProjectData.jsx'
import PageTitle from '../Functions/PageTitle.jsx';
import {sortProjects, applyTilt} from '../utils/projectUtils.js'


export default function Projects() {
    const [WinWidth, setWinWidth] = useState(window.innerWidth);
    const [CurrentProjectSet, SetProjectSet] = useState(0);
    const [TheSortedArray, SetSortedArray] = useState([]);
    const [DisplayWindow, setDisplayWindow] = useState(false);
    const [DisplayImage, setDisplayImage] = useState(null);
    const [DisplayProjectData, setDisplayProjectData] = useState(null);
    const [AnimateMainProjectTest, setAnimateMainProjectText] = useState(false);
    const [DisplayContent, setDisplayContent] = useState(false)
    const [Skills, setSkills] = useState(null)
    const ProjectCardRef = useRef(null);
    const timeoutRef = useRef(null);

    //_________________________________________________________________________________________
    //  Tilt Functions
    //_________________________________________________________________________________________


    function tilt(clientX, clientY) {
        const ProjCard = ProjectCardRef.current;
        applyTilt(ProjCard, clientX, clientY)
    }

    function handleMouseMove(e) {
        tilt(e.clientX, e.clientY);
    }

    function handleTouchMove(e) {
        if (!e.touches.length) return;

        const touch = e.touches[0];
        tilt(touch.clientX, touch.clientY);
    }

    function handleMouseLeave() {
        ProjectCardRef.current.style.transform = "scale(1) rotateX(0) rotateY(0)";
    }

    //_________________________________________________________________________________________
    //  Other Functions
    //_________________________________________________________________________________________

    // right === 0 && left === 1
    function switchProj(direction){
        SetSortedArray(prevArray => {
            const newArr = [...prevArray]
            const current = newArr[CurrentProjectSet]
            const temp = current[0]
            current[0] = current[direction+1]
            current[direction+1] = current[2-direction]
            current[2-direction] = temp
            return newArr
        })
    }

    // up === 1 && down === -1
    function viewMoreProj(direction){
        if((direction === 1 && CurrentProjectSet > 0) || (direction === -1 && TheSortedArray.length - 1 > CurrentProjectSet)){
            triggerAnimation()

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            timeoutRef.current = setTimeout(() => {
                SetProjectSet(prev => prev - direction)
            }, 500);

        }
        console.log(CurrentProjectSet)
    }

    function triggerAnimation() {
        document.getElementById("ProjectsDisplayed").classList.remove("Animated");
        void document.getElementById("ProjectsDisplayed").offsetWidth;
        document.getElementById("ProjectsDisplayed").classList.add("Animated");

        document.getElementById("ProjectsDisplayed").addEventListener('animationend', () => {
            document.getElementById("ProjectsDisplayed").classList.remove("Animated");
        }, { once: true });
    }


    useEffect(() => {
        const handleResize = () => setWinWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const data = ProjectData()
        const sortedData = sortProjects(data)

        SetSortedArray(sortedData);
        const timeout = setTimeout(() => {
            setAnimateMainProjectText(true);
        }, 100);
    }, []);
    
    useEffect(() => {
        if (DisplayProjectData && !DisplayImage) {
            const timer = setTimeout(() => setDisplayContent(true), 1000);
            return () => clearTimeout(timer);
        }
    }, [DisplayProjectData, DisplayImage]);

    return (
        <>
                {DisplayImage && <div className='ProjectImageBackButton' onClick={() => {
                        setDisplayImage(null)
                        setDisplayWindow(true)
                        setDisplayProjectData(TheSortedArray[CurrentProjectSet]?.[1])
                    }}>
                        <div className='ProjectBackLineOne'></div>
                        <div className='ProjectBackLineTwo'></div>
                    </div>}
                {DisplayWindow &&
                    <div className='crossContainer'>
                        <button className='cross' onClick={() => {
                                                    setDisplayImage(null)
                                                    setDisplayWindow(false)
                                                    setDisplayProjectData(null)
                                                    setDisplayContent(false)
                                                }}>
                                                    <div className='BurgerMenuOpen'>
                                                        <div className='BurgerOneOpen'></div>
                                                        <div className='BurgerTwoOpen'></div>
                                                        <div className='BurgerThreeOpen'></div>
                                                    </div>
                                            </button>
                                        </div>
                                    }
            {!DisplayWindow && <PageTitle Title="Projects"/>}
            {<section className='ProjectsMainSection' id='ProjectsMainSection'>
                <article role='button' className='ProjectsDisplayed' id='ProjectsDisplayed'>

                    {WinWidth > 1000  && !DisplayWindow && (
                        <button className='DefaultButton' onClick={() => switchProj(1)}>
                            <article className='LeftProject'>
                                <div className='ContentArea'>
                                    <div className='ContentTitle'>
                                        {TheSortedArray[CurrentProjectSet]?.[0]?.ProjectTitle || ""}
                                    </div>
                                </div>
                            </article>
                        </button>
                    )}
                    
                    {WinWidth < 1000 && !DisplayWindow && (
                        <button className='LeftTriangleButton' onClick={() => switchProj(1)}>
                            <div style={{transform: "scale(0.8)"}} className='LeftAlignedButton'>
                                <div className='LeftTriangle'></div>
                            </div>
                        </button>
                    )}


                    <article onMouseMove={!DisplayWindow ? handleMouseMove : undefined} onMouseLeave={handleMouseLeave} onTouchMove={!DisplayWindow ? handleTouchMove : undefined} onTouchEnd={handleMouseLeave} style={{zIndex: '3'}} onClick={() => {
                                setDisplayWindow(true)
                                handleMouseLeave()
                                setSkills(TheSortedArray[CurrentProjectSet]?.[1].TechUsed)
                                setDisplayProjectData(TheSortedArray[CurrentProjectSet]?.[1])
                            }}> 
                        <button className='DefaultButton'>
                            <article className={DisplayWindow ? "DisplayedWindow" : "Main"}>
                                <article ref={ProjectCardRef} style={DisplayImage ? { border: "none" } : undefined} className={DisplayWindow ? 'MainProjectEnlarged' : 'MainProject'}>

                                    {<div className={!DisplayWindow ? 'ContentArea' : "ContentArea Disappear"}>
                                        <div className="ContentTitle">
                                            {TheSortedArray[CurrentProjectSet]?.[1]?.ProjectTitle || ""}
                                        </div>
                                        <div className='ContentAreaBody'>
                                                <p>{TheSortedArray[CurrentProjectSet]?.[1]?.Description1 || ""}</p>
                                            </div>
                                            <div className='ContentAreaBody'>
                                                <img style={{width: "45%", cursor: "pointer", borderRadius: "1rem"}} className='ContentAreaBodyImage1' src={`${process.env.PUBLIC_URL}${TheSortedArray[CurrentProjectSet]?.[1]?.Img1}` || ""} alt="" />

                                                { TheSortedArray[CurrentProjectSet]?.[1]?.Img2 ? <img style={{width: "45%", cursor: "pointer", borderRadius: "1rem"}} className='ContentAreaBodyImage2' src={`${process.env.PUBLIC_URL}${TheSortedArray[CurrentProjectSet]?.[1]?.Img2}` || ""} alt="" /> : null}
                                            </div>
                                            <div>
                                                <h3 className='ProjectViewMore'>{TheSortedArray[CurrentProjectSet]?.[1]?.ProjectTitle ? "View More" : ""}</h3>
                                            </div>
                                    </div>}

                                    {DisplayImage && 
                                        <article>
                                            <div>
                                                <img style={{borderRadius: "2rem", height: "inherit"}} src={`${process.env.PUBLIC_URL}${DisplayImage}`} alt='ClickedImageOne'></img>
                                            </div>
                                        </article>}
                                    
                                    {DisplayProjectData && !DisplayImage && <div>
                                        <article className={`DisplayedWindowData ${DisplayContent ? 'FadeIn' : ''}`}>
                                            <h2 className='DisplayedWindowTitle'>{DisplayProjectData.ProjectTitle || ""}</h2>
                                            <div className='ProjectSkillSection'>
                                                <div className='ProjectSkillCarouselContainer'>
                                                    <div className='ProjectSkillCarouselTrack'>
                                                        {[...Skills].concat([...Skills]).map((skill, index) => (
                                                        <div
                                                            className='ProjectSkills'
                                                            key={`${skill}-${index}/${Skills.length*2}`}
                                                        >
                                                            {skill}
                                                        </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='ProjectLinkContainer'>
                                                <a className='ProjectGithubLink' href={DisplayProjectData.Link || null}>View the Code!</a>                      
                                                <a className='ProjectGithubLink'  href={DisplayProjectData.TryableLink || null}>Try it out!</a>
                                            </div>

                                            <div className='DisplayedWindowBody'>
                                                <div className='DisplayedWindowBodyRow1'>
                                                    <img className="ProjectImg" onClick={() => {
                                                        setDisplayWindow(true)
                                                        setDisplayImage(DisplayProjectData.Img1)
                                                    }} style={{width: "20rem", borderRadius: "1rem", cursor: "pointer"}} src={`${process.env.PUBLIC_URL}${DisplayProjectData.Img1}` || ""} alt="" />
                                                    <p style={(WinWidth < 1050) ? {textAlign: "center", maxWidth: "35rem"} : {textAlign: "left", maxWidth: "35rem"}}> {DisplayProjectData.Description1 || ""}</p>
                                                </div>
                                                <div className='DisplayedWindowBodyRow2'>
                                                    <p style={(WinWidth < 1050) ? {textAlign: "center", maxWidth: "35rem"} : {textAlign: "right", maxWidth: "35rem"}}>{DisplayProjectData.Description2 || ""}</p>
                                                    <img onClick={() => {
                                                        setDisplayWindow(true)
                                                        setDisplayImage(DisplayProjectData.Img1)
                                                    }} className="ProjectImg" style={{width: "20rem", borderRadius: "1rem", cursor: "pointer"}} src={`${process.env.PUBLIC_URL}${DisplayProjectData.Img2}` || ""} alt="" />
                                                </div>
                                                <div  className='DisplayedWindowBodyRow3'>
                                                    <img onClick={() => {
                                                        setDisplayWindow(true)
                                                        setDisplayImage(DisplayProjectData.Img1)
                                                    }} className="ProjectImg" style={{width: "20rem", borderRadius: "1rem", cursor: "pointer"}} src={`${process.env.PUBLIC_URL}${DisplayProjectData.Img3}` || ""} alt="" />
                                                    <p style={(WinWidth < 1050) ? {textAlign: "center", maxWidth: "35rem"} : {textAlign: "left", maxWidth: "35rem"}}>{DisplayProjectData.Description3 || ""}</p>
                                                </div>
                                                <div className='DisplayedWindowBodyRow4'>
                                                    <p style={(WinWidth < 1050) ? {textAlign: "center", maxWidth: "35rem"} : {textAlign: "right", maxWidth: "35rem"}}>{DisplayProjectData.Description4 || ""}</p>
                                                    <img onClick={() => {
                                                        setDisplayWindow(true)
                                                        setDisplayImage(DisplayProjectData.Img1)
                                                    }} className="ProjectImg" style={{width: "20rem", borderRadius: "1rem", cursor: "pointer"}} src={`${process.env.PUBLIC_URL}${DisplayProjectData.Img4}` || ""} alt="" />
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                    }
                                </article>
                            </article>
                        </button>
                    </article>
                    




                    
                    {!DisplayWindow && WinWidth < 1000 && (
                        <button className='RightTriangleButton' onClick={() => switchProj(0)}>
                            <div style={{transform: "scale(0.8)"}} className='RightAlignedButton'>
                                <div className='RightTriangle'></div>
                            </div>
                        </button>
                    )}


                    {!DisplayWindow && WinWidth > 1000 && (
                        <button className='DefaultButton' onClick={() => switchProj(0)}>
                            <article role='button' className='RightProject'>
                                <div className='ContentArea'>
                                    <div className='ContentTitle'>
                                        {TheSortedArray[CurrentProjectSet]?.[2]?.ProjectTitle || ""}
                                    </div>
                                </div>
                            </article>
                        </button>
                    )}
                </article>
                {!DisplayWindow && <article className='UpDownButtons'>
                    <div>
                        {CurrentProjectSet > 0 && <button className='UpTriangleButton' onClick={() => viewMoreProj(1)}>
                            <div className='UpAlignedButton'>
                                <div className='UpTriangle'></div>
                            </div>
                        </button>}
                        {TheSortedArray.length-1 > CurrentProjectSet && <button className='DownTriangleButton' onClick={() => viewMoreProj(-1)}>
                            <div className='DownAlignedButton'>
                                <div className='DownTriangle'></div>
                            </div>
                        </button>}
                    </div>
                </article>}
            </section>}





        </>
    );
}  