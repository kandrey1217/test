class Field {
    //constructor
    constructor(img, lst) {
        this.image_field_class = loadImage(img);  //creates PImage object and assigns it to image
        this.mole_lst = lst;  //assigns lst parameter to Field variable mole_lst
    }

    //changes the state of the Field
    update() {
        for (i = 0; i < this.mole_lst.length; ++i) {  //for every Mole in mole_lst
            this.mole_lst[i].update();  //changes the state of each Mole
        }
    }

    //displays the field
    show() {
        background(130, 200, 255);  //sets the background color to blue
        image(this.image_field_class, 0, 0, width, height);  //displays image at 0, 0, scaling it to window width, height

        for (i = 0; i < this.mole_lst.length; ++i) {  //for every Mole in mole_lst
            this.mole_lst[i].show();  //displays each Mole
        }
        score.show();  //displays the score
    }

    //removes all Moles from the Field
    clear() {
        for (i = 0; i < this.mole_lst.length; ++i) {  //for every Mole in mole_lst
            this.mole_lst[i].hide();  //remove each Mole
        }
    }
}