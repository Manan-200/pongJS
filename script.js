const paddeVel = 5;
const paddleHeight = 100;
const paddleWidth = 20;
const ballHeight = 20;
const ballWidth = 20;
const ballVel = 5;

//Paddle class
class Paddle
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
		this.up = false;
		this.down = false;
	}

	draw(ctx)
	{
		ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, paddleWidth, paddleHeight);
	}

	move(vel)
	{
		if (this.up == true && this.y > 0)
		{
			this.y -= vel;
		}
		if (this.down == true && this.y + paddleHeight < canvas.height)
		{
			this.y += vel;
		}
	}
}

class Ball
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
		this.x_dir = Math.random() < 0.5 ? -1 : 1;
		this.y_dir = Math.random() < 0.5 ? -1 : 1;
	}

	draw(ctx)
	{
		ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, ballWidth, ballHeight);
	}

	move(vel)
	{
		this.x += vel * this.x_dir;
		this.y += vel * this.y_dir;
	}

	checkWallCollision()
	{
		if(this.y < 0 || this.y + ballHeight > canvas.height)
		{
			this.y_dir *= -1;
		}

		if(this.x < 0 || this.x + ballWidth > canvas.width)
		{
			this.x = (canvas.width - ballWidth)/2;
			this.y = (canvas.height - ballHeight)/2;
			this.x_dir = Math.random() < 0.5 ? -1 : 1;
			this.y_dir = Math.random() < 0.5 ? -1 : 1;
		}
	}

	checkPaddleCollision(paddle1, paddle2)
	{
		if(this.x + ballWidth > paddle2.x && this.y >= paddle2.y && this.y + ballHeight <= paddle2.y + paddleHeight)
		{
			this.x_dir *= -1;
		}
		if(this.x < paddle1.x + paddleWidth && this.y >= paddle1.y && this.y + ballHeight <= paddle1.y + paddleHeight)
		{
			this.x_dir *= -1;
		}
	}
}

//Functions called after a key is pressed
function keyDown(event)
{
	if(event.keyCode == 87)
	{
		paddle1.up = true;
	}
	if(event.keyCode == 83)
	{
		paddle1.down = true;
	}

	if(event.keyCode == 38)
	{
		paddle2.up = true;
	}
	if(event.keyCode == 40)
	{
		paddle2.down = true;
	}
}

function keyUp()
{
	if(event.keyCode == 87)
	{
		paddle1.up = false;
	}
	if(event.keyCode == 83)
	{
		paddle1.down = false;
	}

	if(event.keyCode == 38)
	{
		paddle2.up = false;
	}
	if(event.keyCode == 40)
	{
		paddle2.down = false;
	}
}



//Main game loop
function main()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	paddle1.draw(ctx);
	paddle1.move(paddeVel);

	paddle2.draw(ctx);
	paddle2.move(paddeVel);

	ball.draw(ctx)
	ball.move(ballVel)
	ball.checkWallCollision();
	ball.checkPaddleCollision(paddle1, paddle2);

	window.requestAnimationFrame(main);
}

//Defining paddle object
var paddle1 = new Paddle(5, canvas.height/2 - paddleHeight/2);
var paddle2 = new Paddle(canvas.width - paddleWidth - 10, canvas.height/2 - paddleHeight/2);

//Defining ball object
var ball = new Ball((canvas.width - ballWidth)/2, (canvas.height - ballHeight)/2)

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

//Detecting keys
document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

main();