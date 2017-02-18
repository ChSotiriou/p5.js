const int enA = 10;
const int in1 = 9;
const int in2 = 8;
const int in3 = 7;
const int in4 = 6;
const int enB = 5;

const int lSensor = 3;
const int llSensor = 4;

const int rSensor = 2;
const int rrSensor = 12;

void setup ( ) {
  for (int i = 5; i < 11; i++) {
    pinMode(i, OUTPUT);
  }
  pinMode(rSensor, INPUT);
  pinMode(lSensor, INPUT);
}

void loop ( ) {
  if (digitalRead(rSensor)) {
    stopMove('r');
    while (!digitalRead(lSensor)) {

    }
  }
  else if (digitalRead(lSensor)) {
    stopMove('l');
    while (!digitalRead(rSensor)) {

    }
  }
  moveF(200, 200);
}

void moveF (int pow1, int pow2) {
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);

  analogWrite(enA, pow1);

  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);

  analogWrite(enB, pow2);
}

void stopMove (char n) {
  if (n == 'b') {
    analogWrite(enA, LOW);
    analogWrite(enB, LOW);
  }
  else if (n == 'l') analogWrite(enA, LOW);
  else if (n == 'r') analogWrite(enB, LOW);

}


