// Space Invaters
// Made by: Christos Soteriou

// The Classic Space Invaders Game

function Bullet( pos_, dirY, ty ) {

   this.pos = createVector( pos_.x, pos_.y );
   this.vel = 33;
   this.toDelete = false;
   this.r = 5;
   this.dir = dirY;

   this.update = function() {

      for ( var i = 0; i < this.vel; i++ ) {
         this.pos.y += this.dir;
      }
      // this.pos.y += this.dir*this.vel;

   }

   this.show = function() {

      if ( ty === 'e' ) {
         fill( 255, 100, 10 );
      } else {
         fill( 10, 100, 255 );
      }
      noStroke();
      ellipse( this.pos.x, this.pos.y, this.r * 2 );

   }

   this.hit = function( obj, type ) {
      if ( type === 'e' ) {
         this.d = dist( this.pos.x, this.pos.y, obj.pos.x, obj.pos.y );
         var hitArea = obj.r + this.r;
         if ( this.d <= hitArea ) {
            return true;
         } else {
            return false;
         }
      } else if ( type === 's' ) {

         if ( pointTriangleIntersection( obj.pos, obj.posB, obj.posC, this.pos ) ) {
            return true;
         } else {
            return false;
         }
      }
   }

   function pointTriangleIntersection( pA, pB, pC, p ) {

      var aAB = ( pA.y - pB.y ) / ( pA.x - pB.x );
      var AeqAB = -1 * aAB;
      var BeqAB = 1;
      var CeqAB = ( aAB * pA.x ) + ( -1 * pA.y );

      var aAC = ( pA.y - pC.y ) / ( pA.x - pC.x );
      var AeqAC = -1 * aAC;
      var BeqAC = 1;
      var CeqAC = ( aAC * pA.x ) + ( -1 * pA.y );

      var d = dist( p.x, p.y, pA.x, pA.y );
      var d2 = dist( p.x, p.y, pB.x, pB.y );
      var d3 = dist( p.x, p.y, pC.x, pC.y );

      var b1 = distLinePoint( AeqAB, BeqAB, CeqAB, p ) <= this.r;
      var b2 = distLinePoint( AeqAC, BeqAC, CeqAC, p ) <= this.r;
      var b3 = d <= this.r || d2 <= this.r || d3 <= this.r;
      var b4 = p.y > pA.y && p.y < height && p.x > pB.x && p.x < pC.x;

      var b5 = b1 || b2 || b3;

      return b4 || b5;
   }

   var distLinePoint = function( An, Bn, Cn, p ) {
      var distR_l = abs( ( An * p.x ) + ( Bn * p.y ) + Cn ) / sqrt( pow( An, 2 ) + pow( Bn, 2 ) );
      return distR_l;
   }

   this.dOut = function() {
      if ( this.pos.y < 0 || this.pos.y >= height ) {
         this.toDelete = true;
      } else {
         this.toDelete = false;
      }
   }

}
