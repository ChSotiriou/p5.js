// Memory Game
// Made by: Christos Soteriou

// Press the correct colors in the right order

function Lights(x, y, color) {
   rectMode(RADIUS);
   this.pos = createVector(x, y);
   this.on = false;
   this.r = 40;
   this.pressed = false;

   this.changeTime = 0;
   this.changeTimeP = 0;

   this.render = function( ) {
      if(this.on || this.pressed) {
         switch (color) {
            case 0:
               fill(240, 255, 255);
               break;

            case 1:
               fill(0, 255, 255);
               break;

            case 2:
               fill(120, 255, 255);
               break;

            case 3:
               fill(60, 255, 255);
               break;

            case 4:
               fill(120, 255, 255);
               break;

            case 5:
               fill(0, 255, 255);
               break;
         }
      }
      else {
         switch (color) {
            case 0:
               fill(240, 255, 25);
               break;

            case 1:
               fill(0, 255, 25);
               break;

            case 2:
               fill(120, 255, 25);
               break;

            case 3:
               fill(60, 255, 25);
               break;

            case 4:
               fill(60);
               break;

            case 5:
               fill(60);
               break;
         }
      }
      rect(this.pos.x, this.pos.y, this.r*2, this.r*2);
   }

   this.checkOn = function( ) {
      if(this.on) {
         if(millis( ) - this.changeTime > 1000) {
            cTx = millis( );
            this.on = false;
         }
      }
      if(this.pressed) {
         if(millis( ) - this.changeTimeP > 200) {
            this.pressed = false;
         }
      }
   }
}
