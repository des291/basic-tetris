document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const width = 10;
    const score_display = document.querySelector('#score');
    const start_button = document.querySelector('#start-button');
    let next_random = 0;
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
        [1, width + 1, width + 2, width * 2 + 1],
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

    //assign functions to keycodes
    function control(e) {
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }

    document.addEventListener('keyup', control);

    function moveDown() {
        undraw();
        current_position += width;
        draw();
        freeze();
    }

    function freeze() {
        if (current.some(index => squares[current_position + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[current_position + index].classList.add('taken'));
            random = next_random;
            next_random = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][current_rotation];
            current_position = 4;
            draw();
            display_shape();
        }
    }

    // move the tetromino left unless it's at the edge or blocked
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (current_position + index) % width === 0)
        if (!isAtLeftEdge) current_position -= 1;

        if (current.some(index => squares[current_position + index].classList.contains('taken'))) {
            current_position += 1;
        }

        draw();
    }

    // move the tetromino right unless it's at the edge or blocked
    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (current_position + index) % width === width - 1)
        if (!isAtRightEdge) current_position += 1;

        if (current.some(index => squares[current_position + index].classList.contains('taken'))) {
            current_position -= 1;
        }

        draw();
    }

    //rotate the tetromino
    function rotate() {
        undraw();
        current_rotation++;
        if (current_rotation === current.length) {
            current_rotation = 0;
        }
        current = theTetrominoes[random][current_rotation];
        draw()
    }

    //show up-next tetromino in mini-grid
    const display_squares = document.querySelectorAll('.mini-grid div');
    const display_width = 4;
    let display_index = 0;

    const up_next_tetrominoes = [
        [1, display_width + 1, display_width * 2 + 1, 2],
        [0, display_width, display_width + 1, display_width * 2 + 1],
        [1, display_width, display_width + 1, display_width + 2],
        [0, 1, display_width, display_width + 1],
        [1, display_width + 1, display_width * 2 + 1, display_width * 3 + 1]
    ];

    function display_shape() {
        display_squares.forEach(square => {
            square.classList.remove('tetromino');
        })
        up_next_tetrominoes[next_random].forEach(index => {
            display_squares[display_index + index].classList.add('tetromino');
        })
    }
})