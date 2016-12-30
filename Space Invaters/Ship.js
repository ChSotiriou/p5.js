// Space Invaters
// Made by: Christos Soteriou

// The Classic Space Invaders Game

function Ship() {

   this.pos = createVector( width / 2, height - 50 );
   this.posB = createVector( this.pos.x - 20, height );
   this.posC = createVector( this.pos.x + 20, height );
   this.speed = 15;

   this.show = function() {

      fill( 255 );
      noStroke();
      // triangle(30, 75, 58, 20, 86, 75);
      // rect(this.pos.x, this.pos.y, 10, 30);
      triangle( this.pos.x, this.pos.y,
         this.posB.x, this.posB.y,
         this.posC.x, this.posC.y );
   }

   this.move = function( dir ) {

      if ( dir == 1 && this.posC.x < width ) { // Move Right
         this.pos.x += this.speed;
         this.posB.x += this.speed;
         this.posC.x += this.speed;
      } else if ( dir == 0 && this.posB.x > 0 ) {
         this.pos.x -= this.speed;
         this.posB.x -= this.speed;
         this.posC.x -= this.speed;
      }
      // this.pos.x  = constrain(this.pos.x , 0, width - 10);
      // this.posB.x = constrain(this.posB.x, 0, width - 10);
      // this.posC.x = constrain(this.posC.x, 0, width - 10);
   }

}
