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
    for (int i = 0; i < moles.length; ++i) {  //for every Mole in the moles array
        moles[i].hit();  //calls the Mole's hit() method
    }
}