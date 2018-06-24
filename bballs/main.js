// ball counter

var para = document.querySelector('p');
var ballsCount = 0;

function updateCount() {
    para.textContent = 'Ball count: ' + ballsCount;
}

// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min+1)) + min;
  return num;
}

// bouncing balls ---

function Shape(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}

function Ball(x, y, velX, velY, exists, color, size) {
    Shape.call(this, x, y, velX, velY, exists);
    this.color = color;
    this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

Ball.prototype.collisionDetect = function() {
    for (var j = 0; j < balls.length; j++) {
        if (!(this === balls[j]) && balls[j].exists) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
            }
        }
    }
}

Ball.prototype.update = function() {
    if (this.x + this.size >= width ||
        this.x - this.size <= 0) {
        this.velX = -this.velX;
    }

    if (this.y + this.size >= height ||
        this.y - this.size <= 0) {
        this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
}

// evil circle ---
function EvilCircle(x, y, exists) {
    Shape.call(this, x, y, 20, 20, exists);
    this.color = 'white';
    this.size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
}

EvilCircle.prototype.update = function() {
    if (this.x + this.size > width) {
        this.x = width - this.size;
    } else if (this.x - this.size < 0) {
        this.x = this.size;
    }

    if (this.y + this.size > height) {
        this.y = height - this.size;
    } else if (this.y - this.size < 0) {
        this.y = this.size;
    }
}

EvilCircle.prototype.setControls = function() {
    var _this = this; /// set _this to the EvilCircle object
    window.onkeydown = function(e) {
        if (e.keyCode === 65) { 
            // left
            _this.x -= _this.velX;
        } else if (e.keyCode === 68) {
            // right
            _this.x += _this.velX;
        } else if (e.keyCode === 87) {
            // up
            _this.y -= _this.velY;
        } else if (e.keyCode === 83) {
            // down
            _this.y += _this.velY;
        }
    }
}

EvilCircle.prototype.collisionDetect = function() {
    for (var j = 0; j < balls.length; j++) {
        if (balls[j].exists) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.size + balls[j].size) {
                balls[j].exists = false;
                ballsCount--;
                updateCount();
            }
        }
    }
}



// animating the balls

var balls = []
var evilCircle;

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0,width,height);

    if (!evilCircle) {
        evilCircle = new EvilCircle(10, 10, true);
        evilCircle.setControls();
    }

    while (balls.length < 50) {
        var size = random(10, 20);
        var ball = new Ball(
            random(size, width - size),
            random(size, height - size),
            random(-7, 7),
            random(-7, 7),
            true,
            'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')',
            size
        );
        balls.push(ball);
        ballsCount++;
        updateCount();
    }

    for (var i = 0; i < balls.length; i++) {
        if (balls[i].exists) {
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
        }
    }

    evilCircle.draw();
    evilCircle.update();
    evilCircle.collisionDetect();

    requestAnimationFrame(loop);
}

loop();
