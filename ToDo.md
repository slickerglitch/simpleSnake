
Set up the canvas;
Set score to zero;
Create snake;
Create apple;

Every 100 milliseconds { 

  Clear the canvas;
  Draw the current score on the screen;
  Move snake in the current direction;

  if (snake collides with wall or itself) { 
    End the game;
  } else if (snake eats an apple) { 
    Add 1 to the score; 
    Move apple to new location;
    Make snake grow;
  }

  for (each segment of the snake) { 
    Draw the segment; 
  }
  Draw apple;
  Draw border;
}

When(user presses a key) { 
  if (the key is an arrow) { 
    Update the direction of the snake;
  }
}

### HTML
[ ] Create basic HTML file with boilerplate
[ ] Add appropriate <script></script> tags to bring-in JS fxns 

### JavaScript
  # Constructors
  [ ] Apple
  [ ] Block
  [ ] Square

  
  # Functions

  