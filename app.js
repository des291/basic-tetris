document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const width = 10;
    const score_display = document.querySelector('#score');
    const start_button = document.querySelector('#start-button');
    console.log(squares);

    //The Tetrominoes
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ];

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 1, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ];

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
    ];

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ];

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];


    let current_position = 4;
    let current_rotation = 0;

    //randomly select a Tetromino and it's first rotation
    let random = Math.floor(Math.random() * theTetrominoes.length);
    let current = theTetrominoes[random][current_rotation];

    function draw() {
        current.forEach(index => {
            squares[current_position + index].classList.add('tetromino');
        })
    }

    function undraw() {
        current.forEach(index => {
            squares[current_position + index].classList.remove('tetromino');
        })
    }

    //make the tetromino move down every second
    let timer_id = setInterval(moveDown, 1000);

    function moveDown() {
        undraw();
        current_position += width;
        draw();
        freeze();
    }

    function freeze() {
        if (current.some(index => squares[current_position + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[current_position + index].classList.add('taken'));
            random = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][current_rotation];
            current_position = 4;
            draw();
        }
    }
})