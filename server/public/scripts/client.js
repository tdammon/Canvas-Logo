$(document).ready(onReady);
var canvas = document.querySelector("canvas");

canvas.width = 300;
canvas.height = 300;
let bounced = false;
let newPic = `id="taco" width="300" height="300"  src="prime.png"`;

function onReady() {
  $("#submit").on("click", function (event) {
    event.preventDefault();
    updateImage();
  });
  $("#hide").empty();
  $("#hide").append(`<img ${newPic}>`);
  makeCanvas();
}

function updateImage() {
  circleArray = [];
  console.log($("#myFile"));
  newPic = `id="taco" width="300" height="300"  src="${$(
    "#myFile"
  ).val()}" alt="prime.png"`;
  console.log(newPic);
  $("#hide").empty();
  $("#hide").append(`<img ${newPic}>`);
  makeCanvas();
}
let c, can, ctx, img;

function makeCanvas() {
  c = canvas.getContext("2d");
  can = document.getElementById("hide");
  console.log(can);
  can.width = 300;
  can.height = 300;
  ctx = can.getContext("2d");
  img = document.getElementById("taco");
  $("#taco").on("load", renderImage);
}

function renderImage() {
  setup();
  animate();
}

function dist(x1, x2, y1, y2) {
  let a = x1 - x2;
  let b = y1 - y2;
  return Math.sqrt(a * a + b * b);
}

class Circles {
  constructor(begx, begy, radius, color, endx, endy, dx, dy) {
    this.endx = endx;
    this.endy = endy;
    this.radius = radius;
    this.color = color;
    this.begx = begx;
    this.begy = begy;
    this.dx = this.endx - this.begx;
    this.dy = this.endy - this.begy;
  }

  draw() {
    c.beginPath();
    c.arc(this.begx, this.begy, this.radius, 0, Math.PI * 2, false);
    //c.strokeStyle = 'black';
    //c.stroke();
    c.fillStyle = this.color;
    c.fill();
    //console.log(this.color)
  }

  update() {
    //write an if statement so balls never move too slow
    // if(Math.abs(this.endx-this.begx) < .5 && Math.abs(this.endy-this.begy) <.5){
    //     this.dx =0;
    //     this.dy =0;
    // } else if(!bounced && this.begy < canvas.height/2){
    //     this.dx= (this.endx - this.begx)/5;
    //     this.dy = -(this.begy +this.endy)/5
    // } else if(!bounced){
    //     this.dx= (this.endx -this.begx)/5;
    //     this.dy = ((canvas.height-this.endy)+(canvas.height-this.begy))/5;
    // } else{
    //     this.dx=(this.endx -this.begx)/5;
    //     this.dy=(this.endy -this.begy)/5;
    // }
    // if(!bounced && (this.begy >= canvas.height || this.begy <= 0)) {
    //     this.dy = -this.dy;
    //     bounced = true;
    // }

    this.dx = (this.endx - this.begx) / 10;
    this.dy = (this.endy - this.begy) / 10;
    this.begx += this.dx;
    this.begy += this.dy;
    this.draw();
  }
}

let circleArray = [];

function setup() {
  ctx.drawImage(img, 10, 10);

  let e = document.getElementById("size");
  let radius = Number(e.options[e.selectedIndex].value);
  console.log(typeof radius);
  //let radius = 2;

  console.log(radius);
  for (let i = 0; i < 20000; i++) {
    //build a matrix of packed circles based on thier radius
    let endx =
      ((radius * i * 2) % canvas.width) +
      (Math.floor((i * 2 * radius) / canvas.width) % 2);
    let endy =
      radius + Math.ceil(i / (canvas.width / (radius * 2))) * radius * 1.5;

    //randomize the ending position
    //let endx = Math.random()*300;
    //let endy = Math.random()*300;

    //let begx = Math.random()*300;
    //let begy = Math.random()*300;
    //make the beginning balls spawn nearthe edges
    let begx, begy;
    if (i < 5000) {
      begx = Math.random() - 0.5;
      if (begx >= 0) {
        begx = Math.random() * 25 - 225;
        begy = Math.random() * 300;
      } else {
        begx = Math.random() * 25 + 500;
        begy = Math.random() * 300;
      }
    } else {
      begy = Math.random() - 0.5;
      if (begy <= 0) {
        begy = Math.random() * 25 - 225;
        begx = Math.random() * 300;
      } else {
        begy = Math.random() * 25 + 500;
        begx = Math.random() * 300;
      }
    }
    //let radius = (Math.floor(Math.random()))+1
    let dx = endx - begx;
    let dy = endy - begy;
    let pixel = ctx.getImageData(endx, endy, 1, 1);
    //console.log(pixel);
    let data = pixel.data;
    //console.log(data)
    let color = `rgba(${data[0]},${data[1]},${data[2]},${data[3] / 255})`;
    //console.log(color)
    let circle = new Circles(begx, begy, radius, color, endx, endy, dx, dy);

    let overlapping = false;
    for (let j = 0; j < circleArray.length; j++) {
      //for loop makes sure balls are not overlapping
      let other = circleArray[j];
      let d = dist(circle.endx, other.endx, circle.endy, other.endy);
      if (d < circle.radius + other.radius) {
        overlapping = true;
        break;
      }
      if (color === `rgba(0,0,0,0)`) {
        overlapping = true;
        break;
      }
    }
    if (overlapping == false) {
      circleArray.push(circle);
      //console.log(circleArray);
    }
  }
  //console.log(circleArray)
}
// setup();

function animate() {
  //console.log(circleArray)
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].draw();
    circleArray[i].update();
  }
}

// animate();
