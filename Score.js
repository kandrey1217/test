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