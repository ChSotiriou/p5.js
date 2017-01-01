function Player(n) {
   var s = n*(width/2.34);
   this.speed = 9;
   this.pos = createVector(width/2 - s, height/2);
   this.vel = createVector(0, 0);
   var rWidth  = width/70;
   var rHeight = width/12;

   this.render = function( ) {
      rect(this.pos.x, this.pos.y, rWidth, rHeight);
   }

   this.update = function( ) {
      this.vel.setMag(this.speed);
      this.pos.add(this.vel);
   }

   this.edge = function( ) {
      if (this.pos.y < 0) {
         this.pos.y = 0;
      }
      else if(this.pos.y > height - rHeight) {
         this.pos.y = height - rHeight;
      }
   }

   this.hitBall = function(ball) {
      var xb = this.pos.x + rWidth;
      if(n == 1) {
         if(abs(ball.pos.x - xb) < ball.r && ball.pos.y > this.pos.y && ball.pos.y < this.pos.y + rHeight) {
            ball.vel.x *= random(-1, -0.9);
         }
      }
      else if(n == -1) {
         if(abs(ball.pos.x - this.pos.x) < ball.r && ball.pos.y > this.pos.y && ball.pos.y < this.pos.y + rHeight) {
            ball.vel.x *= random(-1, -0.9);
         }
      }
   }


}
