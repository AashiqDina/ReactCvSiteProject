export function sortProjects(data){
    var SortedArray = [];

    for(let i = 0; i<data.length; i++){
        if(i % 3 === 0) SortedArray.push([data[i]])
        else{
            SortedArray[SortedArray.length-1].push(data[i])
        }
    }

    return SortedArray
}

export function applyTilt(element, clientX, clientY){
    const ArticleSpecs = element.getBoundingClientRect();

    const xDistanceInArticle = clientX - ArticleSpecs.left;
    const yDistanceInArticle = clientY - ArticleSpecs.top;
    const ProjCardCenterX = ArticleSpecs.width / 2;
    const ProjCardCenterY = ArticleSpecs.height / 2;

    const RotateX =
        ((yDistanceInArticle - ProjCardCenterY) / ProjCardCenterY) * 10;
    const RotateY =
        ((xDistanceInArticle - ProjCardCenterX) / ProjCardCenterX) * 10;

    element.style.transform = `
        perspective(43rem)
        scale(1.03)
        rotateX(${-RotateX}deg)
        rotateY(${RotateY}deg)
    `;
}