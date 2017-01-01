function Ball(n) {
   this.pos = createVector(width/2 - n*300, height/2);
   this.vel = createVector(random(n, n*0.5), random(-1, 1));
   this.r = 10;
   this.speed = 7;

   this.render = function( ) {
      ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
   }

   this.update = function( ) {
      this.vel.setMag(this.speed);
      this.pos.add(this.vel);
   }

   this.edge = function( ) {
      if(this.pos.y > height-this.r || this.pos.y < this.r) {
         this.vel.y *= -1;
      }
   }

   this.scorePoint = function( ) {
      if(this.pos.x < 0) {
         return -1;
      }
      else if(this.pos.x > width) {
         return  1;
      }
      else {
         return  0;
      }
   }
}
