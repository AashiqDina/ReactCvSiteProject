import Header from '../Header.jsx';
import '../Header.css';
import StarryBackground from '../StarryBackground.jsx';
import './Projects.css';
import { useEffect, useState, useRef } from 'react';
import ProjectData from './ProjectData.jsx'
import { Link } from 'react-router-dom'


export default function Projects() {
    const [WinWidth, setWinWidth] = useState(window.innerWidth);
    const [CurrentProjectSet, SetProjectSet] = useState(0);
    const [TheSortedArray, SetSortedArray] = useState([]);
    const [DisplayWindow, setDisplayWindow] = useState(false);
    const [DisplayImage, setDisplayImage] = useState(null);
    const [DisplayProjectData, setDisplayProjectData] = useState(null);
    const [AnimateMainProjectTest, setAnimateMainProjectText] = useState(false);
    const ProjectCardRef = useRef(null);

    function handleMouseMove(e){
        const ProjCard = ProjectCardRef.current;
        const ArticleSpecs = ProjCard.getBoundingClientRect();

        const xDistanceInArticle = e.clientX - ArticleSpecs.left;
        const yDistanceInArticle = e.clientY - ArticleSpecs.top;

        const ProjCardCenterX = ArticleSpecs.width / 2;
        const ProjCardCenterY = ArticleSpecs.height / 2;

        const RotateX = ((yDistanceInArticle - ProjCardCenterY) / ProjCardCenterY) * 20;
        const RotateY = ((xDistanceInArticle - ProjCardCenterX) / ProjCardCenterX) * 20;

        ProjCard.style.transform = `rotateX(${-RotateX}deg) rotateY(${RotateY}deg)`
    }

    function handleMouseLeave() {
        ProjectCardRef.current.style.transform = "rotateX(0) rotateY(0)";
    }

    useEffect(() => {
        const handleResize = () => setWinWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        var Test = ProjectData();
        var SortedArray = [];
        var Counter = 1;
        var ArrayCounter = 0;

        for(let i = 0; i < Test.length; i++){
            if(Counter === 1){
                SortedArray.push([Test[i]]);
            }
            else if(Counter <= 3){
                SortedArray[ArrayCounter].push(Test[i]);
            }
            if(Counter === 3){
                Counter = 0;
                ArrayCounter++;
            }
            Counter += 1;
        }
        SetSortedArray(SortedArray);
        const timeout = setTimeout(() => {
        setAnimateMainProjectText(true);
        }, 100);
    }, []);

    function MoveRight() {
        SetSortedArray(prevArray => {
            const tempSA = prevArray.map(inner => [...inner]);
            const current = tempSA[CurrentProjectSet];
            const temp = current[0];
            current[0] = current[1];
            current[1] = current[2];
            current[2] = temp;
            return tempSA;
        });
    }

        function MoveLeft() {
            SetSortedArray(prevArray => {
                const tempSA = prevArray.map(inner => [...inner]);
                const current = tempSA[CurrentProjectSet];
                const temp = current[0];
                current[0] = current[2];
                current[2] = current[1];
                current[1] = temp;
                return tempSA;
            });
    }

        function MoveDown(){
            if(TheSortedArray.length > CurrentProjectSet){
                triggerAnimation()
                SetProjectSet(CurrentProjectSet+1)
            }
        }

        function MoveUp(){
            if(CurrentProjectSet > 0){
                triggerAnimation()
                SetProjectSet(CurrentProjectSet-1)
            }
        }

        function triggerAnimation() {
            document.getElementById("ProjectsDisplayed").classList.remove("Animated");
            void document.getElementById("ProjectsDisplayed").offsetWidth;
            document.getElementById("ProjectsDisplayed").classList.add("Animated");

            document.getElementById("ProjectsDisplayed").addEventListener('animationend', () => {
                document.getElementById("ProjectsDisplayed").classList.remove("Animated");
            }, { once: true });
        }


    return (
        <>
            {!DisplayWindow && <Header />}
            <StarryBackground />
            {!DisplayWindow && <section className='ProjectsTitleSection'>
                <h2 className='PageTitleProjects'>{'Projects'.split('').map((char, index) => {
                                    return (
                                        <span
                                            key={index}
                                            className={`MainProjectLetter ${AnimateMainProjectTest ? 'show' : ''}`}
                                            style={{ transitionDelay: `${index * 0.1}s` }}
                                            >{char}</span>)
                                })}</h2>
            </section>}
            {!DisplayWindow && <section className='ProjectsMainSection' id='ProjectsMainSection'>
                <article role='button' className='ProjectsDisplayed' id='ProjectsDisplayed'>

                    {WinWidth > 1000  && (
                        <button className='DefaultButton' onClick={MoveLeft}>
                            <article className='LeftProject'>
                                <div className='ContentArea'>
                                    <div className='ContentTitle'>
                                        {TheSortedArray[CurrentProjectSet]?.[0]?.ProjectTitle || ""}
                                    </div>
                                </div>
                            </article>
                        </button>
                    )}
                    
                    {WinWidth < 1000 && (
                        <button style={{padding: "0.8rem", marginLeft: "-2.5rem", marginRight: "-2.5rem"}} className='LeftTriangleButton' onClick={MoveLeft}>
                            <div style={{transform: "scale(0.8)"}} className='LeftAlignedButton'>
                                <div className='LeftTriangle'></div>
                            </div>
                        </button>
                    )}
                    <button className='DefaultButton' style={{zIndex: '3'}} onClick={() => {
                            setDisplayWindow(true)
                            setDisplayProjectData(TheSortedArray[CurrentProjectSet]?.[1])
                        }}>
                        <article ref={ProjectCardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={WinWidth < 730 ? { width: '80vw', height: '80vw' } : WinWidth < 850 ? { width: '65vw', height: '65vw' } : WinWidth < 1000 ? { width: '50vw', height: '50vw' } : {}} className='MainProject'>

                            <div className='ContentArea'>
                                <div className="ContentTitle">
                                    {TheSortedArray[CurrentProjectSet]?.[1]?.ProjectTitle || ""}
                                </div>
                                <div className='ContentAreaBody'>
                                        <p style={WinWidth < 480 ? {fontSize: "0.6rem"} : {fontSize: "0.8rem"}}>{TheSortedArray[CurrentProjectSet]?.[1]?.Description1 || ""}</p>
                                    </div>
                                    <div className='ContentAreaBody'>
                                        <img style={{width: "45%", cursor: "pointer", borderRadius: "1rem"}} onClick={() => {
                                            setDisplayWindow(true)
                                            setDisplayImage(TheSortedArray[CurrentProjectSet]?.[1]?.Img1)
                                        }} src={TheSortedArray[CurrentProjectSet]?.[1]?.Img1 || ""} alt="" />

                                        { TheSortedArray[CurrentProjectSet]?.[1]?.Img2 ? <img style={{width: "45%", cursor: "pointer", borderRadius: "1rem"}} onClick={() => {
                                            setDisplayWindow(true)
                                            setDisplayImage(TheSortedArray[CurrentProjectSet]?.[1]?.Img2)
                                        }} src={TheSortedArray[CurrentProjectSet]?.[1]?.Img2 || ""} alt="" /> : null}
                                    </div>
                                    <div>
                                        <h3 className='ProjectViewMore'>{TheSortedArray[CurrentProjectSet]?.[1]?.ProjectTitle ? "View More" : ""}</h3>
                                    </div>
                            </div>
                        </article>
                    </button>
                    
                    {WinWidth < 1000 && (
                        <button style={{padding: "0.8rem", marginLeft: "-2.5rem", marginRight: "-2.5rem"}} className='RightTriangleButton' onClick={MoveRight}>
                            <div style={{transform: "scale(0.8)"}} className='RightAlignedButton'>
                                <div className='RightTriangle'></div>
                            </div>
                        </button>
                    )}


                    {WinWidth > 1000 && (
                        <button className='DefaultButton' onClick={MoveRight}>
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
                <article className='UpDownButtons'>
                    <div>
                        {CurrentProjectSet > 0 && <button className='UpTriangleButton' onClick={MoveUp}>
                            <div className='UpAlignedButton'>
                                <div className='UpTriangle'></div>
                            </div>
                        </button>}
                        {TheSortedArray.length-1 > CurrentProjectSet && <button className='DownTriangleButton' onClick={MoveDown}>
                            <div className='DownAlignedButton'>
                                <div className='DownTriangle'></div>
                            </div>
                        </button>}
                    </div>
                </article>
            </section>}
            {DisplayWindow && <section className='DisplayedWindow' >
                {DisplayImage && <div className='ProjectImageBackButton' onClick={() => {
                        setDisplayImage(null)
                        setDisplayWindow(true)
                        setDisplayProjectData(TheSortedArray[CurrentProjectSet]?.[1])
                    }}>
                        <div className='ProjectBackLineOne'></div>
                        <div className='ProjectBackLineTwo'></div>
                    </div>}
                    <button className='DefaultButton' onClick={() => {
                            setDisplayImage(null)
                            setDisplayWindow(false)
                            setDisplayProjectData(null)
                        }}>
                        <div className='Cross'>
                            <div className='BurgerMenuOpen'>
                                <div className='BurgerOneOpen'></div>
                                <div className='BurgerTwoOpen'></div>
                                <div className='BurgerThreeOpen'></div>
                            </div>
                        </div>
                    </button>
                    {DisplayImage && 
                        <article>
                            <div>
                                <img style={{borderRadius: "2rem", height: "inherit"}} src={DisplayImage} alt='ClickedImageOne'></img>
                            </div>
                        </article>}
                    {DisplayProjectData && !DisplayImage && 
                        <article className='DisplayedWindowData' style={{background: 'linear-gradient(#04080c, #101b31)'}}>
                            <h2 className='DisplayedWindowTitle'>{DisplayProjectData.ProjectTitle || ""}</h2>
                            <span className='ProjectSkillCarousel'>
                                <div className='ProjectSkillsCarouselTrack'>
                                    {
                                    [...DisplayProjectData.TechUsed, ...DisplayProjectData.TechUsed, ...DisplayProjectData.TechUsed].map((Skill, index) => (
                                        <div className='ProjectSkills'>
                                            {Skill}
                                        </div>
                                    )
                                    )}
                                </div>
                            </span>
                            <a className='ProjectGithubLink' href={DisplayProjectData.Link || null}>View the Code!</a>
                            <h4 className='DisplayedWindowMainDesc'>{DisplayProjectData.Description1 || ""}</h4>
                            {DisplayProjectData.TryableLink != null &&                         
                            <Link className='ProjectTryItOut' role="button" to={DisplayProjectData.TryableLink}>
                                Try it out!
                            </Link>}

                            <div className='DisplayedWindowBody'>
                                <div className='DisplayedWindowBodyRow1'>
                                    <img onClick={() => {
                                        setDisplayWindow(true)
                                        setDisplayImage(DisplayProjectData.Img1)
                                    }} style={{width: "20rem"}} src={DisplayProjectData.Img1 || ""} alt="" />
                                    <p style={{maxWidth: "35rem", textAlign: "center"}} >{DisplayProjectData.Description2 || ""}</p>
                                </div>
                                <div onClick={() => {
                                        setDisplayWindow(true)
                                        setDisplayImage(DisplayProjectData.Img2)
                                    }} className='DisplayedWindowBodyRow2'>
                                    <p style={{maxWidth: "35rem", textAlign: "center"}}>{DisplayProjectData.Description3 || ""}</p>
                                    <img  style={{width: "20rem"}} src={DisplayProjectData.Img2 || ""} alt="" />
                                </div>
                                <div onClick={() => {
                                        setDisplayWindow(true)
                                        setDisplayImage(DisplayProjectData.Img3)
                                    }} className='DisplayedWindowBodyRow3'>
                                    <img style={{width: "20rem"}} src={DisplayProjectData.Img3 || ""} alt="" />
                                    <p style={{maxWidth: "35rem", textAlign: "center"}}>{DisplayProjectData.Description4 || ""}</p>
                                </div>
                                <div onClick={() => {
                                        setDisplayWindow(true)
                                        setDisplayImage(DisplayProjectData.Img4)
                                    }} className='DisplayedWindowBodyRow4'>
                                    <p style={{maxWidth: "35rem", textAlign: "center"}}>{DisplayProjectData.Description5 || ""}</p>
                                    <img style={{width: "20rem"}} src={DisplayProjectData.Img4 || ""} alt="" />
                                </div>
                            </div>
                        </article>
                    }
            </section>}
        </>
    );
}  