// utils

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min+1)) + min;
  return num;
}

function randomColor() {
    var r,g,b;

    r = random(0,255);
    g = random(0,255);
    b = random(0,255);

    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

// ball counter

var para = document.querySelector('p');
function updateCount() {
    para.textContent = 'Ball count: ' + balls.length;
}

// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number


// bouncing balls ---

function Shape(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
}

function Ball(x, y, velX, velY, color, size) {
    Shape.call(this, x, y, velX, velY);
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
        if (!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = randomColor();
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
function EvilCircle(x, y) {
    Shape.call(this, x, y, 20, 20);
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
            // A - left
            _this.x -= _this.velX;
        } else if (e.keyCode === 68) {
            // D - right
            _this.x += _this.velX;
        } else if (e.keyCode === 87) {
            // W - up
            _this.y -= _this.velY;
        } else if (e.keyCode === 83) {
            // S - down
            _this.y += _this.velY;
        }
    }
}

EvilCircle.prototype.collisionDetect = function() {
    for (var j = balls.length - 1; j >= 0; j--) {
        var dx = this.x - balls[j].x;
        var dy = this.y - balls[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.size + balls[j].size) {
            balls.splice(j, 1);
            updateCount();
        }
    }
}



// animating the balls

var initialized;
var balls = []
var evilCircle;

function initialize() {
    evilCircle = new EvilCircle(width / 2, height / 2);
    evilCircle.setControls();

    while (balls.length < 25) {
        var size = random(13, 23);
        var ball = new Ball(
            random(size, width - size),
            random(size, height - size),
            random(-12, 12),
            random(-12, 12),
            randomColor(),
            size
        );
        balls.push(ball);
        updateCount();
    }

    initialized = true;
}

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0,0,width,height);

    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    evilCircle.draw();
    evilCircle.update();
    evilCircle.collisionDetect();

    requestAnimationFrame(loop);
}

initialize();
loop();
