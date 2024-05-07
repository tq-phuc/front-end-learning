// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const ballCount = document.querySelector("p");
const ballCountText = ballCount.textContent;
let numberOfBall = 0;

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}



class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = true;
  }
}


class Ball extends Shape {
    constructor(x, y, velX, velY, color, size) {
      super(x, y, velX, velY);
      this.color = color;
      this.size = size;
      numberOfBall += 1;
    }

    draw() {
      if(this.exists) {
        ctx.beginPath();
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    update() {
      if((this.x + this.size) >= width) {
          this.velX = -(this.velX);
      }

      if((this.x - this.size) <= 0) {
          this.velX = -(this.velX);
      }

      if((this.y + this.size) >= height) {
          this.velY = -(this.velY);
      }
      
      if((this.y - this.size) <= 0) {
          this.velY = -(this.velY);
      }
      
      this.x += this.velX;
      this.y += this.velY;
    }

    collisionDetect() {
      for (const ball of balls) {
        if (this !== ball && ball.exists) {
          const dx = this.x - ball.x;
          const dy = this.y - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
    
          if (distance < this.size + ball.size) {
            ball.color = this.color = randomRGB();
          }
        }
      }
    }
}


class EvilCircle extends Shape{
  constructor(x, y) {
    super(x, y, 10, 10);
    this.color = "white";
    this.size = 10;
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.x -= this.velX;
          break;
        case "d":
          this.x += this.velX;
          break;
        case "w":
          this.y -= this.velY;
          break;
        case "s":
          this.y += this.velY;
          break;
      }
    });
  }

  draw() {
    if(this.exists) {
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }

  update() {
    if((this.x + this.size) >= width) {
        this.x -= this.size;
    }

    if((this.x - this.size) <= 0) {
        this.x += this.size;
    }

    if((this.y + this.size) >= height) {
        this.y -= this.size;
    }
    
    if((this.y - this.size) <= 0) {
        this.y += this.size;
    }
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + ball.size) {
          this.size += Math.floor(ball.size / 3);
          ball.exists = false;
          numberOfBall -= 1;
        }
      }
    }
  }
}

const balls = [];

while(balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-6, 6),
    random(-6, 6),
    randomRGB(),
    size
  );
  balls.push(ball);
}

const evilCircle = new EvilCircle(random(10 , width-10), random(10 , height-10));

function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  evilCircle.draw();
  evilCircle.update();
  evilCircle.collisionDetect();

  ballCount.textContent = `${ballCountText}${numberOfBall}`;
  
  requestAnimationFrame(loop);
}

loop();
