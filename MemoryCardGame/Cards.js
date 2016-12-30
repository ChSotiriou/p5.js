// Memorize the Cards
// Made by: Christos Soteriou

// Find The Pairs

function Card(x, y, c) {
   this.pos = createVector(x, y);
   this.color = c;
   this.turned = false;
   this.r = 50;

   this.render = function( ) {
      this.getFill( );
      rect(this.pos.x, this.pos.y, this.r*2, this.r*2);
   }

   this.getFill = function( ) {
      if (this.turned) {
         switch (this.color) {
            case 0:
               fill(0); // Black
               break;

            case 1:
               fill(255); // White
               break;

            case 2:
               fill(255, 0, 0); // Red
               break;

            case 3:
               fill(0, 255, 0); // Green
               break;

            case 4:
               fill(0, 0, 255); // Blue
               break;

            case 5:
               fill(255, 255, 0); // Yellow
               break;

            case 6:
               fill(255, 0, 255); // Magenta
               break;

            case 7:
               fill(0, 255, 255); // Cyan
               break;

            case 8:
               fill(139, 69, 19); // saddleBrown
               break;

            case 9:
               fill(102, 205, 170); // MediumAquamarine
               break;

            case 10:
               fill(153, 50, 204); // DarkOrchid
               break;

            case 11:
               fill(220, 20, 60); // Crimson
               break;

            case 12:
               fill(255, 140, 0); // DarkOrange
               break;

            case 13:
               fill(128, 0, 0); // Maroon
               break;
         }
      }
      else {
         fill(102);
      }
   }
}
