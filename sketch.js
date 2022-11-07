String field_img;  //declares String field_img
String mole_img;  //declares String mole_img
String mole_img2;  //declares String mole_img2
String hill_img;  //declares String hill_img
String hill_img2;  //declares String hill_img2

int game_time;  //declares int game_time
Score score;  //declares Score score

int mole_size;  //declares int mole_size  
int num_moles;  //declares int num_moles

Mole[] moles;  //declares Mole[] moles
Field field;  //declares Field field


//called once at the start of the program
void setup() {
  size(1100, 650);  //sets the window size to 1100 by 650
   
  field_img = "field.jpg";  //initializes field_img
  mole_img = "mole.png";  //initializes mole_img
  mole_img2 = "mole2.png";  //initializes mole_img2
  hill_img = "mole_hill.png";  //initializes hill_img
  hill_img2 = "mole_hill2.png";  //initializes hill_img2
   
  game_time = 30;  //sets game_time to 60 seconds
  score = new Score();  //creates a Score object and assigns it to score

  mole_size = 180;  //sets mole_size to 180 pixels
  num_moles = 6;  //sets num_moles to 6
 
  moles = new Mole[num_moles];  //creates an array of Mole objects and assigns it to moles
  
  //initializes the num_moles Mole objects
  moles[0] = new Mole(mole_img, hill_img, 230, 325, mole_size, 1);
  moles[1] = new Mole(mole_img2, hill_img2, 760, 280, mole_size, 0.9);
  moles[2] = new Mole(mole_img, hill_img, 80, 230, mole_size, 0.8);
  moles[3] = new Mole(mole_img2, hill_img2, 440, 250, mole_size, 0.8);
  moles[4] = new Mole(mole_img, hill_img, 630, 210, mole_size, 0.6);
  moles[5] = new Mole(mole_img2, hill_img2, 940, 230, mole_size, 0.6);

  field = new Field(field_img, moles);  //creates a Field object and assigns it to field
}


//called repeatedly throughout the program
void draw() {
  field.update();  //changes the state of the field
  field.show();  //displays the field on screen
  
  if (millis() >= game_time * 1000) {  //if the game is over
    field.clear();  //resets the state of the field
    field.show();  //displays the field
    
    //displays game over text on screen
    textSize(100);  //sets the font size to 100 pixels
    textAlign(CENTER);  //sets the text alignment to center
    text("Game Over", width / 2, height / 2);  //displays "Game Over" text
    
    noLoop();  //ends the program, by preventing further draw() calls
  }
}


//called when a mouse key has been pressed
void mousePressed() {
  for(int i = 0; i < moles.length; ++i) {  //for every Mole in the moles array
    moles[i].hit();  //calls the Mole's hit() method
  }
}


class Field {
  PImage image;  //declares PImage image
  Mole[] mole_lst;  //declares Mole[] mole_lst
  
  //constructor
  Field(String field_img, Mole[] lst) {
    image = loadImage(field_img);  //creates PImage object and assigns it to image
    mole_lst = lst;  //assigns lst parameter to Field variable mole_lst
  }
  
  //changes the state of the Field
  void update() {
    for(int i = 0; i < mole_lst.length; ++i) {  //for every Mole in mole_lst
      mole_lst[i].update();  //changes the state of each Mole
    }
  }
  
  //displays the field
  void show() {
    background(130, 200, 255);  //sets the background color to blue
    image(image, 0, 0, width, height);  //displays image at 0, 0, scaling it to window width, height
    
    for(int i = 0; i < mole_lst.length; ++i) {  //for every Mole in mole_lst
      mole_lst[i].show();  //displays each Mole
    }
    score.show();  //displays the score
  }
  
  //removes all Moles from the Field
  void clear() {
    for(int i = 0; i < mole_lst.length; ++i) {  //for every Mole in mole_lst
      mole_lst[i].hide();  //remove each Mole
    }
  }
}

class Mole {
  PImage mole_img;  //declares PImage mole_img
  PImage hill_img;  //declares PImage hill_img

  PVector pos;  //declares PVector pos
  int size;  //declares int size
  float scale;  //declares float scale
  boolean alive;  //declares boolean alive
  
  int respawn_timer;  //declares int respawn_timer
  int display_timer;  //declares int display_timer
  
  Mallet mallet;  //declares Mallet mallet
  
  //defines nested class Mallet
  class Mallet {
    PImage image;  //declares PImage image
    int w;  //declares int w
    int h;  //declares int h
    
    //Mallet's constructor
    Mallet (String img, int sz) {
      image = loadImage(img);  //creates PImage object and assigns it to image
      w = sz;  //assigns sz to Mallet variable w
      h = int(sz * 1.5);  //calculates the Mallet's height and assigns it to h
    }
  } 
  
  //Mole's constructor
  Mole(String img, String img2, float x, float y, float sz, float scl) {
    mole_img = loadImage(img);  //creates PImage object and assigns it to mole_img
    hill_img = loadImage(img2);  //creates PImage object and assigns it to mole_img
    pos = new PVector(x, y);  //creates PVector with x, y parameters and assigns it to pos
    size = int(sz * scl);  //calculates the Mole's size and assigns it to size
    scale = scl;  //assigns scl parameter to Mole variable scale
    
    display_timer = int(random(2 * frameRate, 5 * frameRate));  //initializes the display_timer
    respawn_timer = int(random(1 * frameRate, 3 * frameRate));  //initializes the respawn_timer
    
    mallet = new Mallet("mallet.png", 90);  //creates Mallet object and assigns it to mallet
    
    //randomly initializes alive to true or false
    if (int(random(2)) == 0) {  //if random number is 0
      alive = false;  //Mole is dead
    }
    else {  //if random number is 1
      alive = true;  //Mole is alive
      ++score.total_moles;  //increments Score object's total_moles variable
    }
  }
  
  //changes the state of the Mole
  void update() {
    if (respawn_timer == 0) {  //if it's time for the Mole to be respawned
      alive = true;  //respawns the Mole
      reset_respawn_timer();  //resets the respawn_timer
      reset_display_timer();  //resets the display_timer
      ++score.total_moles;  //increments the Score object's total_moles variable
    }
    --respawn_timer;  //decrements the respawn_timer
  }
  
  //displays the Mole
  void show() {
    if (alive && display_timer > 0) {  //if Mole is alive and display_timer hasn't run out
      image(mole_img, pos.x, pos.y, size, size);  //displays mole_image at pos.x, pos.y, scaling it to size, size
      --display_timer;  //decrements the display_timer
    }
    else {  //if Mole is dead or display_timer ran out
      image(hill_img, pos.x, pos.y, size, size);  //displays hill_img at pos.x, pos.y, scaling it to size, size
    }
  }
  
  //called when Mole is hit
  void hit() {
    if (alive && mouse_over()) {  //if Mole is alive and mouse cursor is over its hitbox
      alive = false;  //Mole is dead
      reset_respawn_timer();  //resets the respawn_timer

      //displays mallet.image at mouseX, mouseY - mallet.h / 4, scaling it to mallet.w * scale, mallet.h * scale
      image(mallet.image, mouseX, mouseY - mallet.h / 4,
            mallet.w * scale, mallet.h * scale);  
            
      score.mole_hit();  //adds points to score for hitting a Mole
      score.reaction_bonus(display_timer);  //adds points to score based on reaction time
      ++score.moles_hit;  //increments Score object's moles_hit variable
    }
  }
  
  //resets the respawn_timer
  void reset_respawn_timer() {
    //assigns a random number to the respawn_timer
    respawn_timer = int(random(3 * frameRate, 5 * frameRate));  
  }
  
  //resets the display_timer
  void reset_display_timer() {
    //assigns a random number to the display_timer
    display_timer = int(random(2 * frameRate, 4 * frameRate));
  }
  
  //removes the Mole
  void hide() {
    alive = false;  //Mole is dead
  }
  
  //determines whether or not the mouse cursor is over the Mole
  boolean mouse_over() {
    //if mouse cursor is over the Mole's hitbox, returns true
    if (mouseX > pos.x && mouseX < pos.x + size &&
        mouseY > pos.y && mouseY < pos.y + size)
        return true;
    //if mouse cursor is not over the Mole's hitbox, returns false
    return false;
  }
}

class Score {
  int points = 0;  //declares and initializes int points to 0
  int moles_hit = 0;  //declares and initializes int moles_hit to 0
  int total_moles = 0;  //declares and initializes int total_moles to 0
  
  int per_hit_pts = 50;  //declares and initializes int per_hit_pts to 50
  int play_time_mult = 20;  //declares and initializes int play_time_mult to 20
  int react_time_mult = 15;  //declares and initializes int react_time_mult to 15
  int accuracy_mult = 10;  //declares and initializes int accuracy_mult to 10

  //displays the Score
  void show() {
    if (millis() >= game_time * 1000) {  //if the game is over
      result();  //calculate the final score
    }
    
    //displays score text on screen
    textSize(40);  //sets font size to 40 pixels
    text("Score: ", width / 2, 60);  //displays "Score: " text
    
    //displays score value on screen
    textSize(50);  //sets font size to 50 pixels
    text(points, width / 2, 120);  //displays number of points
  }
  
  //adds points each time a Mole is hit
  void mole_hit() {
    points += per_hit_pts;  //increments points by per_hit_pts
  }
  
  //adds points based on reaction time
  void reaction_bonus(int time) {
    //calculates reaction time points and increments points by that value
    points += (time / frameRate) * react_time_mult; 
  }
  
  //calculates the final score
  void result() {
    if (total_moles > 0) {  //if total_moles denominator is not 0
      //calculates accuracy points and increments points by that value
      points += accuracy_mult * (100 * moles_hit / total_moles);
    }
    //calculates play time points and increments points by that value
    points += play_time_mult * (millis() / 1000); 
  }
}