var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var player1 = {
	x: 10,
	y: 150,
	width: 10,
	height: 80,
	score: 0,
};
var player2 = {
	x: 580,
	y: 150,
	width: 10,
	height: 80,
	score: 0,
};
var ball = {
	x: 300,
	y: 200,
	radius: 10,
	speedX: 5,
	speedY: 5,
};

function drawPlayers() {
	ctx.fillStyle = "white";
	ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
	ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
}

function update() {
	// move the ball
	ball.x += ball.speedX;
	ball.y += ball.speedY;

	// check if the ball hits the top or bottom wall
	if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
		ball.speedY = -ball.speedY;
	}

	// check if the ball hits the left or right wall
	if (ball.x - ball.radius < 0) {
		player2.score++;
		resetBall();
	} else if (ball.x + ball.radius > canvas.width) {
		player1.score++;
		resetBall();
	}

	// check if the ball hits a player
	if (ball.x - ball.radius < player1.x + player1.width &&
		ball.y > player1.y && ball.y < player1.y + player1.height) {
		ball.speedX = -ball.speedX;
	}
	if (ball.x + ball.radius > player2.x &&
		ball.y > player2.y && ball.y < player2.y + player2.height) {
		ball.speedX = -ball.speedX;
	}

	// move the players
	if (upPressed) {
		player1.y -= 5;
	}
	if (downPressed) {
		player1.y += 5;
	}
	if (wPressed) {
		player2.y -= 5;
	}
	if (sPressed) {
		player2.y += 5;
	}

	// keep the players within the canvas
	if (player1.y < 0) {
		player1.y = 0;
	}
	if (player1.y + player1.height > canvas.height) {
		player1.y = canvas.height - player1.height;
	}
	if (player2.y < 0) {
		player2.y = 0;
	}
	if (player2.y + player2.height > canvas.height) {
		player2.y = canvas.height - player2.height;
	}
}

function resetBall() {
	ball.x = canvas.width/2;
	ball.y = canvas.height/2;
	ball.speedX = -ball.speedX;
	ball.speedY
