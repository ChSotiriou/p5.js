function Circle() {
  
  this.Sfactor = 1;
  this.tr = 255;
  this.red = random(0, 255);
	this.green = random(0, 255);
	this.blue = random(0, 255);
  
   this.getxVel = function(){
    
    if(random(0, 10) > 5){
        this.xVel = -1 * map(this.z, 1, 500, (-1 * this.Sfactor), this.Sfactor);
      }
      else
      {
        this.yVel = map(this.z, 1, 500, (-1 * this.Sfactor), this.Sfactor);
      }
  }
  
  this.getyVel = function(){
    
    if(random(0, 10) > 5){
        this.yVel = -1 * map(this.z, 1, 500, (-1 * this.Sfactor), this.Sfactor);
      }
      else
      {
        this.yVel = map(this.z, 1, 500, (-1 * this.Sfactor), this.Sfactor);
      }
    
  }
  
  this.chnage = false;
  this.xVel;
  this.yVel;
  this.start = 0;
  this.changeTime = 0;
  this.x = random(0, width);
  this.y = random(0, height);
  this.z = random(1, 500);
  this.getxVel();
  this.getyVel();
  this.r = map(this.z, 1, 500, 20, 100);
  this.t = 1000000000000000000000000000;
  
  this.update = function() {
    
    this.x += this.xVel;
    this.y += this.yVel;
    
    if(this.x < 0 || this.x > width || this.y < 0 || this.y > height){
      
      this.x = random(0, width);
      this.y = random(0, height);
      this.z = random(1, 500);
      this.getxVel();
      this.getyVel();
      
    }
    
  }
  
  this.show = function() {
    
   if(millis() - this.changeTime > this.t || this.change){
      this.change = false;
	    this.changeTime = millis();
	    this.red = random(0, 255);
	    this.green = random(0, 255);
	    this.blue = random(0, 255);
      fill(this.red, this.green, this.blue, this.tr);
  }
    ellipse(this.x, this.y, this.r);
    
  }
  
 
  
  
  
  
  
  
  
  
  
}