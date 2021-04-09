const grid = document.querySelector('.grid');
let scoreDisplay = document.getElementById('score');
const width = 28;
let squares = [];
let scores = 0;


// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

function createGrid(){
    for(let i = 0; i < layout.length; i++){
        const square = document.createElement('div');
        grid.appendChild(square);
        squares.push(square);

        if(layout[i] === 0){
            squares[i].classList.add('pac-dot');
        } else if ( layout[i] === 1) {
            squares[i].classList.add('wall');
        } else if ( layout[i] === 3){
            squares[i].classList.add('power-pellet');
        } else if ( layout[i] === 2){
            squares[i].classList.add('ghost-lair');
        }
    }
}

createGrid();



let pacLocation = 500;
squares[pacLocation].classList.add('pacman');




function controls(e){
    e.preventDefault();
    squares[pacLocation].classList.remove('pacman');

    switch(e.key){

        case 'ArrowUp': 
        if(pacLocation - width >= 0 
            && !squares[pacLocation - width].classList.contains('wall') 
            && !squares[pacLocation - width].classList.contains('ghost-lair'))
            {
            pacLocation -= width;
        }
        break;

        case 'ArrowDown': 
        if(pacLocation + width <= width * width 
            && !squares[pacLocation + width].classList.contains('wall') 
            && !squares[pacLocation + width].classList.contains('ghost-lair')) 
            {
            pacLocation += width;
        }
        break;

        case 'ArrowLeft': 
        if(pacLocation % 28 !== 0
            && !squares[pacLocation - 1].classList.contains('wall')
            && !squares[pacLocation - 1].classList.contains('ghost-lair'))
            {
            pacLocation -= 1;
        }

        if (pacLocation === 364) {
            pacLocation = 391;
        }
        break;

        case 'ArrowRight':
        if(pacLocation % 28 < width - 1
            && !squares[pacLocation + 1].classList.contains('wall') 
            && !squares[pacLocation + 1].classList.contains('ghost-lair'))
            {
            pacLocation += 1;
        }

        if (pacLocation === 391) {
            pacLocation = 364;
         }
        break;
    }
    squares[pacLocation].classList.add('pacman');
    pacDotEatter();
    powerpelletsEaten();
}

document.addEventListener('keyup', controls);



function pacDotEatter(){
    if(squares[pacLocation].classList.contains('pac-dot')){
        squares[pacLocation].classList.remove('pac-dot')
        scores++;
        scoreDisplay.innerHTML = scores;
    }
}

function powerpelletsEaten(){
    //if square pacman is in contains a power pellet
    if(squares[pacLocation].classList.contains('power-pellet')){
        //remove power pellet class
        squares[pacLocation].classList.remove('power-pallet')
        //add a score of 10
        score +=10;
        //change each of the four ghosts to isScared
        ghosts.forEach(ghost => ghost.isScare = true)
        //use setTimeout to unscare ghosts after 10 seconds  
        setTimeout(unScareGhost, 10000);
    }
}


function unScareGhost(){
    ghosts.forEach(ghost => ghost.isScare = false)
}
 
class Ghost {
    constructor(className, startIndex, speed){
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;

        this.currentIndex = startIndex;
        this.isScare = false;
        this.timeId = NaN;
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
];

//draw my ghosts onto my grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})




//move the ghosts
ghosts.forEach(ghost => moveGhost(ghost));

function moveGhost(ghost){
    const directions = [-1, +1, -width, +width];
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timeId = setInterval(function() {
        //all our code
        //if the next square does NOT contain a wall and does not contain a ghost
        if(!squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost'))
            {
                //remove any ghost
                squares[ghost.currentIndex].classList.remove(ghost.className)
                squares[ghost.currentIndex].classList.remove('ghost','scare-ghost')
                // //add direction to current Index
                ghost.currentIndex += direction;
                // //add ghost class
                squares[ghost.currentIndex].classList.add(ghost.className)
                squares[ghost.currentIndex].classList.add('ghost')
            } else {
                direction = directions[Math.floor(Math.random() * directions.length)]
            }


            //if the ghost is currently scared
            if(ghost.isScare){
                squares[ghost.currentIndex].classList.add('scare-ghost')
            }


            //if the ghost is current scared AND pacman is on it
            if(ghost.isScare && squares[ghost.currentIndex].classList.contains('pacman')){
                //remove classnames - ghost.className, 'ghost', 'scare-ghost'
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scare-ghost')
                // change ghosts currentIndex back to its startIndex
                ghost.currentIndex = ghost.startIndex
                //add a score of 100
                score +=100
                //re-add classnames of ghost.className and 'ghost' to the ghosts new postion
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            }
        
            checkForGameOver()
    },ghost.speed)
}

//check for game over
function checkForGameOver(){
    //if the square pacman is in contains a ghost AND the square does NOT contain a scared ghost 
    if (
        squares[pacLocation].classList.contains('ghost') && 
        !squares[pacLocation].classList.contains('scare-ghost') 
     ) {
     //for each ghost - we need to stop it moving
    ghosts.forEach(ghost => clearInterval(ghost.timeId) )
    //remove eventlistener from our control function
    document.removeEventListener('keyup', controls);
    //tell user the game is over
    scoreDisplay.innerHTML = 'you Lose'
}}


//check for win
function checkForWin{
    undefined(score === 275 ){
        //stop each ghost
        ghosts.forEach(ghost => clearInterval(ghost.timeId))
        //remove the evenlister for controls fuction
        document.removeEventListener('keyup', controls);

        //tell our user we have won
        scoreDisplay.innerHTML = 'You WON **'
    }
}


// document.addEventListener('keyup', e =>{ 
//     e.defaultPrevented;
//     squares[pacLocation].classList.remove('pacman');

//     if (e.keyCode === 40){   // e.kry  // dowm / Arrowdown // switch case
        
        
//         console.log(e.key);  //down
//         if(pacLocation + width < width * width 
//             && !squares[pacLocation + width].classList.contains('wall') 
//             && !squares[pacLocation + width].classList.contains('ghost-lair')) pacLocation += width;
//     } else if (e.keyCode === 38){
       
       
//         console.log(e.key); //up
//         if(pacLocation - width >= 0 
//             && !squares[pacLocation - width].classList.contains('wall')
//             && !squares[pacLocation + width].classList.contains('ghost-lair')) pacLocation -= width; 
//     } else if ( e.keyCode === 37) {
        
        
//         console.log(e.key); //left
//         if(pacLocation % width !== 0 
//             && !squares[pacLocation - 1].classList.contains('wall')
//             && !squares[pacLocation + width].classList.contains('ghost-lair')) 
            
//             pacLocation -=1;

//             if (pacLocation === 364) {
//                 pacLocation = 391
//             }
//     } else if ( e.keyCode ===39) {
        
        
//         console.log(e.key); ///right
//         if(pacLocation % width < width -1 
//             && !squares[pacLocation + 1].classList.contains('wall')
//             && !squares[pacLocation + width].classList.contains('ghost-lair')) 
            
//             pacLocation += 1;

//             if (pacLocation === 391) {
//                 pacLocation = 364
//             }
//     } 
//     pacDotScore()
//     squares[pacLocation].classList.add('pacman');
// })


// move screenLeft
// 490 - 1

// 490 % 28 !==0;

// move right
// 490 + 1;

// 490 % 28 < 28 -1   //503%28    27      

// move down
// 490 +| 28

// 490 + 28 < 28 * 28

// move up
// 490 - 28

// 490 - 28 <= 0

