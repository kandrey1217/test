class Score {
    constructor() {
        var points = 0;  //declares and initializes var points to 0
        var moles_hit = 0;  //declares and initializes var moles_hit to 0
        var total_moles = 0;  //declares and initializes var total_moles to 0

        var per_hit_pts = 50;  //declares and initializes var per_hit_pts to 50
        var play_time_mult = 20;  //declares and initializes var play_time_mult to 20
        var react_time_mult = 15;  //declares and initializes var react_time_mult to 15
        var accuracy_mult = 10;  //declares and initializes var accuracy_mult to 10
    }
    

    //displays the Score
    show() {
        if (millis() >= game_time * 1000) {  //if the game is over
            result();  //calculate the final score
        }
    
        //displays score text on screen
        textSize(40);  //sets font size to 40 pixels
        text("Score: ", width / 2, 60);  //displays "Score: " text

        //displays score value on screen
        textSize(50);  //sets font size to 50 pixels
        text(this.points, width / 2, 120);  //displays number of points
    }

    //adds points each time a Mole is hit
    mole_hit() {
        this.points += this.per_hit_pts;  //increments points by per_hit_pts
    }

    //adds points based on reaction time
    reaction_bonus(time) {
        //calculates reaction time points and increments points by that value
        this.points += (time / frameRate) * this.react_time_mult;
    }

    //calculates the final score
    result() {
        if (this.total_moles > 0) {  //if total_moles denominator is not 0
            //calculates accuracy points and increments points by that value
            this.points += this.accuracy_mult * (100 * this.moles_hit / this.total_moles);
        }
        //calculates play time points and increments points by that value
        this.points += this.play_time_mult * (millis() / 1000);
    }
}