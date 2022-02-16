canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

canvasGraph = document.getElementById("graph");
graphCtx = canvasGraph.getContext("2d");

displayTrig = false;
trigtwo = false;

displayGraph = false;
displaySin = false;

document.querySelector("button").addEventListener("click", function (e){
  displayTrig = !displayTrig;
})

document.querySelectorAll("button")[1].addEventListener("click", function(e){
  trigtwo = !trigtwo;
})

document.querySelectorAll("button")[2].addEventListener("click", function(e){
  displayGraph = !displayGraph;
})

document.querySelectorAll("button")[3].addEventListener("click", function(e){
  displaySin = !displaySin;
})

width = canvas.width -20;
height = canvas.height -20;
radios = width/2;

circles = [];
ang = 0;
initialPos = {
  x: width/2+10,
  y: height/2+10
}

function printCircle(x,y,color){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x,y,10,0,Math.PI*2);
    ctx.fill();
    ctx.closePath();
}

function initialize(){
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#111";

    ctx.beginPath();
    ctx.arc(width/2+10,height/2+10,radios,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(width/2+10,10);
    ctx.lineTo(width/2+10,height+10);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(10,height/2);
    ctx.lineTo(width+10,height/2);
    ctx.stroke();
    ctx.closePath();
}

function graph(ctx,x,y,color){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x,y,2,2);
    ctx.closePath();
}

function move(){
    // the cos func gives circular motion on one dimetion because of the inc of angle
    // the initialPos sets the center position of the circular motion
    // then we multiply by the radios of the circle
    circles[2].x = initialPos.x + Math.cos(ang) * (radios);
    circles[2].y = initialPos.y + Math.sin(ang) * (radios);

    circles[0].y = circles[2].y;
    circles[1].x = circles[2].x;
    ang += 0.01;

    if(ang * (180/Math.PI) >= 360){
      ang = 0;
    }
}

function printTriangle(){
  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.moveTo(width/2+10, height/2);
  ctx.lineTo(circles[2].x, circles[2].y);
  ctx.stroke();

  ctx.font= "15px Arial";
  ctx.fillText(`${(ang * (180/Math.PI)).toFixed(2)}°`, 50, 50);
  ctx.closePath();

  ctx.beginPath();
  ctx.strokeStyle = "red";
  if(trigtwo == false){
    ctx.moveTo(width / 2 + 10, height / 2);
    ctx.lineTo(circles[0].x, circles[0].y);
  }
  else{
    ctx.moveTo(circles[0].x, circles[0].y);
    ctx.lineTo(circles[2].x, circles[2].y);
  }
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.strokeStyle = "blue";
  if(trigtwo == false){
    ctx.moveTo(width/2+10, height/2);
    ctx.lineTo(circles[1].x, circles[1].y);
  }
  else{
    ctx.moveTo(circles[1].x, circles[1].y);
    ctx.lineTo(circles[2].x, circles[2].y);
  }
  ctx.stroke();
  ctx.closePath();
}

function frame(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    initialize();

    if(displayTrig == true){
      printTriangle();
    }

    circles.forEach(circle => {
        printCircle(circle.x,circle.y,circle.color);
    });

    if(displayGraph == true){
      if(displaySin == true){
        graph(graphCtx,ang * (180/Math.PI),circles[0].y,"red");
      }
      else{
        graph(graphCtx,ang * (180/Math.PI),circles[1].x,"blue");
      }
    }

    move();
    window.requestAnimationFrame(frame);
} 

circles.push({
  x: width / 2 + 10,
  y: 10,
  color: "red",
});
circles.push({
  x: 10,
  y: height / 2,
  color: "blue",
});
circles.push({
  x: initialPos.x, 
  y: initialPos.y,
  color: "yellow",
});

frame();