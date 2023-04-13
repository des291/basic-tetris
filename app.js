document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const width = 10;
    const score_display = document.querySelector('#score');
    const start_button = document.querySelector('#start-button');
    let next_random = 0;
    let timer_id
    console.log(squares);
    let score = 0;
    const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'blue'
    ];
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
            squares[current_position + index].style.backgroundColor = colors[random];
        })
    }

    function undraw() {
        current.forEach(index => {
            squares[current_position + index].classList.remove('tetromino');
            squares[current_position + index].style.backgroundColor = "";
        })
    }

    //make the tetromino move down every second
    // let timer_id = setInterval(moveDown, 1000);

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
            addScore();
            gameOver();
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
    const display_index = 0;

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
            square.style.backgroundColor = "";
        })
        up_next_tetrominoes[next_random].forEach(index => {
            display_squares[display_index + index].classList.add('tetromino');
            display_squares[display_index + index].style.backgroundColor = colors[next_random];
        })
    }

    //add functionality to the button
    start_button.addEventListener('click', () => {
        if (timer_id) {
            clearInterval(timer_id);
            timer_id = null;
        } else {
            draw();
            timer_id = setInterval(moveDown, 1000);
            next_random = Math.floor(Math.random() * theTetrominoes.length);
            display_shape();
        }
    })

    function addScore() {
        for (let i = 0; i < 199; i += width) {
            const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];

            if (row.every(index => squares[index].classList.contains('taken'))) {
                score += 10;
                score_display.innerHTML = score;
                row.forEach(index => {
                    squares[index].classList.remove('taken');
                    squares[index].classList.remove('tetromino');
                    squares[index].style.backgroundColor = "";
                })
                const squares_removed = squares.splice(i, width);
                squares = squares_removed.concat(squares);
                squares.forEach(cell => grid.appendChild(cell));
            }
        }

    }

    //game over
    function gameOver() {
        if (current.some(index => squares[current_position + index].classList.contains('taken'))) {
            score_display.innerHTML = 'end';
            clearInterval(timer_id);
        }
    }
})