document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid');
	let squares = Array.from(document.querySelectorAll('.grid div'));
	const ScoreDisplay = document.querySelector('#score');
	const StartBtn = document.querySelector('#start-button');
	const width = 10;
	
	//console.log(squares);
	
	// Tetromino
	const lTetrimino = [
		[1, width+ 1, width * 2 + 1, 2],
		[width, width + 1, width + 2, width * 2 + 2],
		[1, width + 1, width * 2 + 1, width * 2],
		[width, width * 2, width * 2 + 1, width*2+2]
	]
	
	const zTetromino = [
	[0, width, width + 1, width * 2 + 1],
	[width + 1, width + 2, width * 2, width * 2 + 1],
	[0, width, width + 1, width * 2 + 1],
	[width + 1, width + 2, width * 2, width * 2 + 1]
	]
	
	const tTetromino = [
	[1, width, width + 1, width + 2],
	[1, width + 1, width + 2, width * 2 + 1],
	[width, width + 1, width + 2, width * 2 + 1],
	[1, width, width + 1, width * 2 + 1]
	]
	
	const oTetromino = [
	[0, 1, width, width + 1],
	[0, 1, width, width + 1],
	[0, 1, width, width + 1],
	[0, 1, width, width + 1]
	]
	
	const iTetromino = [
	[1, width + 1, width * 2 + 1, width * 3 + 1],
	[width, width + 1, width + 2, width + 3],
	[1, width + 1, width * 2 + 1, width * 3 + 1],
	[width, width + 1, width + 2, width + 3]
	]
	
	
	const theTetrominos = [lTetrimino, zTetromino, tTetromino, oTetromino, iTetromino];
	
	let currentPosition = 2;
	let currentRotation = 0;
	
	let random = Math.floor(Math.random() * theTetrominos.length);
	
	let current = theTetrominos[random][currentRotation];
	//console.log(current);
	
	// draw first rotation in tetromino
	function draw(){
		current.forEach(index => {
			squares[currentPosition + index].classList.add('tetromino');
		})
	}
	
	function undraw(){
		current.forEach(index => {
			squares[currentPosition + index].classList.remove('tetromino');
		})
	}
	
	draw();
})