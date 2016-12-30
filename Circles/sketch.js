var c = [];
var lastInf = true;

function setup() {
  createCanvas(1500, 1500);
  for(var i = 0; i < 300; i++){

    c[i] = new Circle();

  }
  fill(c[0].red, c[0].green, c[0].blue);
}

function draw() {
  background(200);

  for(var i = 0; i < c.length; i++){

    c[i].show();
    c[i].update();

  }
}

function keyPressed() {

  if(key === ' '){

    for(var i = 0; i < c.length; i++){

    c[i].change = true;

    }
  }

  if(key === '0'){

    for(var i = 0; i < c.length; i++){

      c[i].t = 10000000000000000000;

    }
    lastInf = true;

  }

  if(keyCode === RIGHT_ARROW){

    if(lastInf){
      for(var i = 0; i < c.length; i++){

      c[i].t = 1000;

      }
    }
    else
    {
      for(var i = 0; i < c.length; i++){

      c[i].t += 100;

      }
    }

    lastInf = false;
  }

  if(keyCode === LEFT_ARROW){

    if(lastInf){
      for(var i = 0; i < c.length; i++){

      c[i].t = 1000;

      }
    }
    else
    {
      for(var i = 0; i < c.length; i++){

      c[i].t -= 100;
      c[i].t = constrain(c[i].t, 0, 1000000000000000000000000);

      }
    }

    lastInf = false;
  }
  console.log(c[0].t);

}

function mousePressed() {

  console.log('Mouse');

  for(var i = 0; i < c.length; i++){

    c[i].change = true;

  }

}
