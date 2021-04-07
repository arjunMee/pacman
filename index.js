const grid = document.querySelector('.grid');
const score = document.getElementById('score');
const width = 28;
let squares = [];


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
        } else if ( layout[i] ===  3){
            squares[i].classList.add('power-pellet');
        } else if ( layout[i] === 2){
            squares[i].classList.add('ghost-lair');
        }
    }
}

createGrid();



let pacLocation = 500;
squares[pacLocation].classList.add('pacman');

document.addEventListener('keyup', e =>{ 
    e.defaultPrevented;
    squares[pacLocation].classList.remove('pacman');

    if (e.keyCode === 40){   // e.kry  // dowm / Arrowdown // switch case
        console.log('pressdown'); 
        if(pacLocation + width < width * width 
            && !squares[pacLocation + width].classList.contains('wall') 
            && !squares[pacLocation + width].classList.contains('ghost-lair')) pacLocation += width;
    } else if (e.keyCode === 38){
        console.log('press up');
        if(pacLocation - width >= 0 
            && !squares[pacLocation - width].classList.contains('wall')
            && !squares[pacLocation + width].classList.contains('ghost-lair')) pacLocation -= width; 
    } else if ( e.keyCode === 37) {
        console.log('prress left');
        if(pacLocation % width !== 0 
            && !squares[pacLocation - 1].classList.contains('wall')
            && !squares[pacLocation + width].classList.contains('ghost-lair')) 
            
            pacLocation -=1;

            if (pacLocation === 364) {
                pacLocation = 391
            }
    } else if ( e.keyCode ===39) {
        console.log('press right');
        if(pacLocation % width < width -1 
            && !squares[pacLocation + 1].classList.contains('wall')
            && !squares[pacLocation + width].classList.contains('ghost-lair')) 
            
            pacLocation += 1;

            if (pacLocation === 391) {
                pacLocation = 364
            }
    } 
    squares[pacLocation].classList.add('pacman');
})


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

