const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const baseSpeed = 2;
const repulseSpeed = 1;
const minDistance = 30;

var itens = [];

function create(){

    let color;

    if(Math.random() <= 0.5){
        color = "#000";
    }
    else{
        color =  "#55c";
    }

    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;

    itens.push({
        x: x,
        y: y,
        color: color,
        vel: {
            x: 0,
            y: 0
        }
    })
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    itens.forEach(function(item){
        ctx.beginPath();
        ctx.fillStyle = item.color;
        ctx.arc(item.x,item.y,10,0,2*Math.PI);
        ctx.fill();    
    })
}

function update(){
    itens.forEach(function(item){
        itens.forEach(function(item2){
            if(item.color == item2.color){
                if(item.x != item2.x && item.y != item2.y){
                    let Dx = item.x - item2.x;
                    let Dy = item.y - item2.y;

                    let angle = Math.atan2(Dy,Dx);
                    let distance = Math.sqrt(Dx*Dx + Dy*Dy);
                    
                    
                    item.vel.x = -(Math.cos(angle) * baseSpeed) / distance*distance;
                    item.vel.y = -(Math.sin(angle) * baseSpeed) / distance*distance;

                    item2.vel.x = item.vel.x;
                    item2.vel.y = item.vel.y;
                }       
            }
        }) 

        itens.forEach(function(item2){
            if(item.x != item2.x && item.y != item2.y){
                let Dx = item.x - item2.x;
                let Dy = item.y - item2.y;

                let angle = Math.atan2(Dy,Dx);
                let distance = Math.sqrt(Dx*Dx + Dy*Dy);

                if(distance < 20){
                    item.vel.x = 0;
                    item.vel.y = 0;

                    item2.vel.x = item.vel.x;
                    item2.vel.y = item.vel.y;
                }    
            }
        })

        item.x += item.vel.x;
        item.y += item.vel.y;
    })
    draw();
    window.requestAnimationFrame(update);
}

document.querySelector("button").onclick = create;
window.requestAnimationFrame(update);