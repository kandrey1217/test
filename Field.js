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