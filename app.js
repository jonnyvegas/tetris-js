document.addEventListener('DOMContentLoaded', () => {
	// Collect info from html/css
	const grid = document.querySelector('.grid');
	let boardSquares = Array.from(document.querySelectorAll('.grid div'));
	const ScoreDisplay = document.querySelector('#score');
	const StartBtn = document.querySelector('#start-button');
	
	document.addEventListener('keydown', handleInput);
	
	// Default value
	const width = 10;
	let nextRandom = 0;
	
	//console.log(boardSquares);
	
	// Tetrominos
	const lTetrimino = 
	[
		[1, width+ 1, width * 2 + 1, 2],
		[width, width + 1, width + 2, width * 2 + 2],
		[1, width + 1, width * 2 + 1, width * 2],
		[width, width * 2, width * 2 + 1, width*2+2]
	]
	
	const zTetromino = 
	[
		[0, width, width + 1, width * 2 + 1],
		[width + 1, width + 2, width * 2, width * 2 + 1],
		[0, width, width + 1, width * 2 + 1],
		[width + 1, width + 2, width * 2, width * 2 + 1]
	]
	
	const tTetromino = 
	[
		[1, width, width + 1, width + 2],
		[1, width + 1, width + 2, width * 2 + 1],
		[width, width + 1, width + 2, width * 2 + 1],
		[1, width, width + 1, width * 2 + 1]
	]
	
	// square shape
	const oTetromino = 
	[
		[0, 1, width, width + 1],
		[0, 1, width, width + 1],
		[0, 1, width, width + 1],
		[0, 1, width, width + 1]
	]
	
	const iTetromino = 
	[
		[1, width + 1, width * 2 + 1, width * 3 + 1],
		[width, width + 1, width + 2, width + 3],
		[1, width + 1, width * 2 + 1, width * 3 + 1],
		[width, width + 1, width + 2, width + 3]
	]
	
	
	const theTetrominos = [lTetrimino, zTetromino, tTetromino, oTetromino, iTetromino];
	
	// currentTetromino position in the array (of 0-199 of the game board, width is 10, so 10x20)
	// row depends on /10 and the position is % 10.
	let currentTetrominoPosition = 4;
	let currentTetrominoRotation = 0;
	
	// Random shapes are the core of Tetris...
	let random = Math.floor(Math.random() * theTetrominos.length);
	
	let currentTetromino = theTetrominos[random][currentTetrominoRotation];
	//console.log(currentTetromino);
	
	// draw first rotation in tetromino
	function draw()
	{
		currentTetromino.forEach(index => 
		{
			boardSquares[currentTetrominoPosition + index].classList.add('tetromino');
		})
	}
	
	// Get rid of the previously drawn Tetromino.
	function undraw()
	{
		currentTetromino.forEach(index => {
			boardSquares[currentTetrominoPosition + index].classList.remove('tetromino');
		})
	}
	
	// Make Tetrominmos move down every second.
	timerId = setInterval(moveDown, 1000);
	
	function moveDown()
	{
		undraw();
		// This will move the tetromino down. Since the width is 10 in this case (right now anyway), this will move down.
		currentTetrominoPosition += width;
		draw();
		freeze();
	}
	//draw();

	function freeze() 
	{
		if(currentTetromino.some(index => boardSquares[currentTetrominoPosition + index + width].classList.contains('taken')))
		{
			currentTetromino.forEach(index => boardSquares[currentTetrominoPosition + index].classList.add('taken'));
			random = nextRandom;
			nextRandom = Math.floor(Math.random() * theTetrominos.length);
			currentTetromino = theTetrominos[random][currentTetrominoRotation];
			currentTetrominoPosition = 4;
			draw();
			displayShape();
		}
	}
	
	
	function moveLeft(bLeft)
	{
		undraw();
		var numToCheck = 0;
		if(bLeft)
		{
			numToCheck = 0;
		}
		else
		{
			numToCheck = width - 1;
		}
		const isAtEdge = currentTetromino.some(index => (currentTetrominoPosition + index) % width === numToCheck);
		if(!isAtEdge && bLeft)
		{
			currentTetrominoPosition -= 1;
		}
		else if(!isAtEdge && !bLeft)
		{
			currentTetrominoPosition += 1;
		}
		if(currentTetromino.some(index => boardSquares[currentTetrominoPosition + index].classList.contains("taken")))
		{
			if(bLeft)
			{
				currentTetrominoPosition += 1;
			}
			else
			{
				currentTetrominoPosition -= 1;
			}
		}
		draw();
		// Previous working move left code. Changed to accomodate L/R without dupication.
		/* undraw();
		const isAtEdge = currentTetromino.some(index => (currentTetrominoPosition + index) % width === 0)
		if(!isAtEdge)
		{
			currentTetrominoPosition -= 1;
			console.log(currentTetrominoPosition);
		}
		if(currentTetromino.some(index => boardSquares[currentTetrominoPosition + index].classList.contains('taken')))
		{
			currentTetrominoPosition += 1;
		}
		draw(); */
	}

	function rotate()
	{
		undraw();
		if(currentTetrominoRotation + 1 < currentTetromino.length)
		{
			currentTetrominoRotation++;
		}
		else
		{
			currentTetrominoRotation = 0;
		}
		currentTetromino = theTetrominos[random][currentTetrominoRotation];
		draw();
	}
	
	
	function handleInput(e)
	{
		// left is 37, right is 39
		if(e.keyCode === 37)
		{
			moveLeft(true);
		}
		// Move right, not left.
		else if(e.keyCode === 39)
		{
			moveLeft(false);
		}
		// Up arrow key
		else if (e.keyCode === 38)
		{
			rotate();
		}
		else if(e.keyCode === 40)
		{
			// speed up the process.
			moveDown();
		}
	}
	
	// Next up Tetromino
	const displaySquares = document.querySelectorAll('.mini-grid div');
	const displayWidth = 4;
	let displayIndex = 0;
	
	// Don't need to display rotations.
	const upNextTetrominos = 
	[
		[1, displayWidth+ 1, displayWidth * 2 + 1, 2],
		[0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
		[1, displayWidth, displayWidth+ 1, displayWidth+ 2],
		[0, 1, displayWidth, displayWidth+ 1],
		[1, displayWidth+ 1, displayWidth* 2 + 1, displayWidth* 3 + 1]
	];
	
	// Display the shape
	function displayShape()
	{
		displaySquares.forEach(square => 
		{
			square.classList.remove('tetromino');
		})
		upNextTetrominos[nextRandom].forEach(index => {
			displaySquares[displayIndex + index].classList.add('tetromino');
		});
	}
})


















