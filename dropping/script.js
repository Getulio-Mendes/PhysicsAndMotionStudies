const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const maxSpeed = 10;

var balls = [];

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    balls.forEach(function(ball){
        ctx.beginPath();
        ctx.fillStyle = "#000";
        ctx.arc(ball.x,ball.y,ball.r,0,2*Math.PI);
        ctx.fill();
    })
}

function update(){
    balls.forEach(function(ball){
        if(ball.velX < maxSpeed)
            ball.velX += ball.accX;
        if(ball.velY < maxSpeed)
            ball.velY += ball.accY;

        ball.x += ball.velX;
        ball.y += ball.velY;

        if(ball.x >= (canvas.width - ball.r)){
            ball.velX *= -1;
        }
        else if((ball.x - ball.r) <= 0){
            ball.velX *= -1;
        }

        if(ball.y >= (canvas.height - ball.r)){
            ball.velY *= -1;
            ball.velY *= 0.8;
        }
        else if((ball.y - ball.r) <= 0){
            ball.velY *= -1;
        }

        if(ball.x == canvas.width){
            ball.velX = 0;
            ball.accX = 0;
        }
        if(ball.y == canvas.height){
            ball.velY = 0;
            ball.accY = 0;
        }

        
        ball.accX = ball.f.x/ball.m;
        ball.accY = ball.f.y/ball.m;
    })
    draw();
    window.requestAnimationFrame(update);
}

function applyForce(f){
    balls.forEach(function(ball){
        ball.f.x += f.x;
        ball.f.y += f.y;
    })
}

for (let i = 0; i < 8; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;

    let m = Math.random() * 10 + 5;
    let r = m;

    balls.push({
        x:x,
        y:y,
        m: m,
        r: r,
        f:{x:0,y:0},
        velX:0,
        velY:0,
        accX:0,
        accY:0
    })
}
applyForce({x:0,y:0.5});
window.requestAnimationFrame(update);