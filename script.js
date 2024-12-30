const starBackground = document.querySelector('.star-background');
const colors = [
    'rgb(244, 219, 214)', 'rgb(240, 198, 198)', 'rgb(245, 189, 230)', 'rgb(198, 160, 246)',
    'rgb(237, 135, 150)', 'rgb(238, 153, 160)', 'rgb(245, 169, 127)', 'rgb(238, 212, 159)',
    'rgb(166, 218, 149)', 'rgb(139, 213, 202)', 'rgb(145, 215, 227)', 'rgb(125, 196, 228)',
    'rgb(138, 173, 244)', 'rgb(183, 189, 248)'
];
const imageNames = [
    'smolbacon.png', 'smolbread.png', 'smolcoffee.png', 'smolonigiri.png',
    'smolstrawberry.png', 'smoltacos.png', 'catbowl.png', 'catdonuts.png',
    'catflamby.png', 'catlemon.png', 'catpistaccio.png', 'catramen.png',
    'catshamallow.png', 'catstrawberry.png', 'mouselemon.png', 'necocake.png',
    'necosandwich.png', 'angry.png', 'Circle-.png', 'Cool.png', 'Derp.png',
    'Muscle-Mummy-.png', 'No.png', 'Oulala.png', 'Sleepy.png', 'Tail.png',
    'Ted.png', 'What.png', 'Witchcraft-.png', 'Wonk.png', 'dunk.png'
];

const stars = [];
const scrollSpeedX = 0.01;
const scrollSpeedY = 0.005;
const numImageStars = 30;
const numStars = 500; 

function createStar(isImage = false, initialLeft = null, initialTop = null) {
    const star = document.createElement('div');
    if(isImage){
        star.classList.add('image-star');
        const imagePath = getRandomImage();
        star.style.backgroundImage = `url(${imagePath})`;
        star.style.backgroundSize = "cover";
        star.style.borderRadius = "50%";
        const size = Math.floor(Math.random() * 45) ;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
    } else {
        star.classList.add('star');
        const color = colors[Math.floor(Math.random() * colors.length)];
        star.style.backgroundColor = color;
        const size = Math.floor(Math.random() * 7);
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.borderRadius = "0px";
    }
    
    const x = initialLeft !== null ? initialLeft : Math.floor(Math.random() * 100);
    const y = initialTop !== null ? initialTop : Math.floor(Math.random() * 100);
    star.style.left = `${x}vw`;
    star.style.top = `${y}vh`;
    
    stars.push({
        element: star,
        originalLeft: x,
        originalTop: y,
        currentLeft: x,
        currentTop: y,
        isImage: isImage
    });
    return star;
}

const fragment = document.createDocumentFragment();
for (let i = 0; i < numStars; i++) {
    const star = createStar();
    fragment.appendChild(star);
}
starBackground.appendChild(fragment);


for (let i = 0; i < numImageStars; i++) {
    const randomIndex = Math.floor(Math.random() * stars.length);
    const starToReplace = stars[randomIndex];

    const initialLeft = starToReplace.originalLeft;
    const initialTop = starToReplace.originalTop;

    starBackground.removeChild(starToReplace.element);
    stars.splice(randomIndex, 1);
    const newStar = createStar(true, initialLeft, initialTop);
    starBackground.appendChild(newStar);
}



function animateStars() {
    for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.currentLeft += scrollSpeedX;
        if(star.currentLeft > 100){
            star.currentLeft = - (Math.random() * 10);
        }
        star.element.style.left = `${star.currentLeft}vw`;

        star.currentTop += scrollSpeedY;
        if (star.currentTop > 100) {
            star.currentTop = -(Math.random() * 10);
        }
         star.element.style.top = `${star.currentTop}vh`;
    }
    requestAnimationFrame(animateStars);
}

animateStars();

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * imageNames.length);
    return "./images/" + imageNames[randomIndex];
}