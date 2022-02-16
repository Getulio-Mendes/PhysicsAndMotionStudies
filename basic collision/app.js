canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

balls = [];

class Ball {
    constructor(x,y,color,size){
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;

        this.vel = {
            x : 1,
            y : 1
        }
        this.acc = {
            x : 0,
            y : 0
        }
    }

    print() {
       ctx.beginPath();
       ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
       ctx.stroke();
       ctx.closePath();
    }

    move(){
        this.x += this.vel.x;
        this.y += this.vel.y;

        if(this.x + this.size >= canvas.width || this.x - this.size <= 0){
            this.vel.x *= -1;
        }
        if(this.y + this.size >= canvas.height || this.y - this.size <= 0){
            this.vel.y *= -1;
        }

        balls.forEach((ball) => {

           if(this === ball){
               return
           }

           let xDist = ball.x - this.x;
           let yDist = ball.y - this.y;

           if(Math.sqrt(Math.pow(xDist,2) + Math.pow(yDist,2)) < this.size + ball.size){
               console.log("colision")
               this.vel.x *= -1;
               this.vel.y *= -1;

               ball.vel.x *= -1;
               ball.vel.x *= -1;
           }

        })

        this.vel.x += this.acc.x;
        this.vel.y += this.acc.y;
    }
}

function frame(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    balls.forEach(ball => {
       ball.print();
       ball.move();
    });
    
    window.requestAnimationFrame(frame);
}

setInterval(() => {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let color = "#" + String(Math.random() * 999);
    let size = Math.random() * 10 + 5;

    balls.push(new Ball(x,y,color,size));
}, 1000);

frame();
