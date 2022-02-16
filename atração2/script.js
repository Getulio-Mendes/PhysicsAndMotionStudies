const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const speed = 100;
const repulseSpeed = 500;

var centers = [];
var particles = [];

function atraction(x,y){
    centers.push({
        x:x,
        y:y
    })
}

function newParticle(){
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;

    particles.push({
        x:x,
        y:y,
        vel:{
            x:Math.random() * 4,
            y:Math.random() * 2
        }
    })
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    centers.forEach(function(center){
        ctx.beginPath();
        ctx.arc(center.x,center.y,15,0,2*Math.PI);
        ctx.fillStyle = "#888";
        ctx.fill();
    })

    particles.forEach(function(particle){
        ctx.beginPath();
        ctx.arc(particle.x,particle.y,4,0,2*Math.PI);
        ctx.fillStyle = "#f66";
        ctx.fill();
    })
}

function update(){
    draw();
    particles.forEach(function(particle){
        centers.forEach(function(center){
            let Dx = particle.x - center.x;
            let Dy = particle.y - center.y;
            let distance = Math.sqrt(Dx*Dx + Dy*Dy);

            let angle = Math.atan2(Dy,Dx);

            if(distance < 10){
                particle.vel.x += speed*(Math.cos(angle))/distance;
                particle.vel.y += speed*(Math.sin(angle))/distance;
            }
            else{
                particle.vel.x -= repulseSpeed*(Math.cos(angle))/distance;
                particle.vel.y -= repulseSpeed*(Math.sin(angle))/distance;
            }
        })

        particle.x += particle.vel.x;
        particle.y += particle.vel.y;
    })

    window.requestAnimationFrame(update);
}

atraction(canvas.width/2,canvas.height/2)
for (let i = 0; i < 10; i++) {
    newParticle();
}

window.addEventListener("click",(e) => atraction(e.clientX-canvas.offsetLeft,e.clientY-canvas.offsetTop));
window.requestAnimationFrame(update);
