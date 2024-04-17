// #########################################################

// Venn Polygram : A Relational Rorschach Test
// 16 February 2024

/*
TODO:
- two canvases next to each other
  - french text in between them?
  
- fix my terrible const vars and janky implementation of delay changing
- fix resetting when different delay
- make fade more consistent with different delays
- fix priority bold
- oh no I just discovered erase
*/

// #########################################################

// x

// #########################################################
// VARS & CONSTS
// #########################################################

const DIM = 600;
const BG_COLOR = 240;
const ELLIPSE_SIZE = 300;
var DELAY = 200; // shhhh
var fade = {}; 
// var DELAY = 1;
const DEF_FPS = 30;

const WORD_LIST = ['Bills', 'Boundaries', 'Catharsis', 'Children', 'Comfort', 'Community', 'Deadlines', 'Debts', 'Dreams', 'Emotions', 'Escape', 'Expectations', 'Family', 'Food', 'Freedom', 'Friends', 'Fulfillment', 'Goals', 'Grades', 'Happiness', 'Health', 'Inspiration', 'Medication', 'Money', 'Motivation', 'Partners', 'Rent', 'Responsibilities', 'Rest', 'Schedules', 'School', 'Sleep', 'Space', 'Spoons', 'Time', 'Trauma', 'Travel', 'Water', 'Work']; // can you handle more than 7±2 core needs..?


var currentWords = [...WORD_LIST];

var cnv;
var graphics;

// #########################################################

// x

// #########################################################
// SETUP SETUP SETUP SETUP SETUP SETUP SETUP SETUP SETUP
// #########################################################

function setFade() {
  // fade.value = 0.0095 / DELAY;
  
  // move these later
  fade.MIN = 0.0055;
  fade.MAX = 0.06;
  fade.lastPosition = null;
  
  let minPoint = 0.0055;
  let midPoint = 0.01;
  let maxPoint = 0.06;
  let cutoff = 150;
  
//   if (DELAY < cutoff) {
//     fade.value = map(1/DELAY, 1/200, 1/cutoff, maxPoint, midPoint, true);
    
//   } else {
//     // fade.value = constrain(0.25 / DELAY, 0.006, 0.15);  
//     fade.value = map(1/DELAY, 1/cutoff, 1, midPoint, minPoint, true);  
//   }
  
  // fade.value = map(1/DELAY, 1/200, 1, minPoint, maxPoint, true);
  fade.value = map(DELAY, 200, 1, minPoint, maxPoint, true);
  
  // console.log(fade.value);
}

function setup() {
  // --------------------------------------------
  
  cnv = createCanvas(DIM, DIM);
  graphics = {
    shapes: createGraphics(DIM, DIM),
    text_: createGraphics(DIM, DIM),
    title: createGraphics(DIM, DIM),
    comp: createGraphics(DIM, DIM),
    speed: createGraphics(DIM, DIM),
  };
  // --------------------------------------------
  
  cnv.mousePressed(() => {
    cnv.mouseOriginX = mouseX;
    cnv.mouseOriginY = mouseY;
    cnv.lastDelay = DELAY;
  });
  
  // --------------------------------------------
  
  colorMode(HSL);
  graphics.shapes.colorMode(HSL);
  graphics.text_.colorMode(HSL);
  graphics.title.colorMode(HSL);
  graphics.comp.colorMode(HSL);
  graphics.speed.colorMode(HSL);
  
  graphics.shapes.ellipseMode(CENTER);
  graphics.shapes.stroke("black");
  graphics.shapes.noFill();
  graphics.shapes.strokeWeight(2);

  graphics.text_.textAlign(CENTER, CENTER);
  graphics.text_.textFont("Times New Roman");
  graphics.text_.textSize(20);
  graphics.text_.strokeWeight(0.5);
  graphics.text_.stroke("black");
  // graphics.text_.textStyle(BOLD);
  
  graphics.title.textAlign(CENTER, TOP);
  graphics.title.textSize(30);
  graphics.title.stroke("black");
  graphics.title.strokeWeight(0.2);
  graphics.title.textFont("Times New Roman");
  
  graphics.speed.stroke(360, 0.6);
  graphics.speed.fill(0, 0.3);
  graphics.speed.lastPosition = null;
  
  // --------------------------------------------
  
  graphics.title.text("Priorities", DIM/2, DIM/15);
  
  background(BG_COLOR);
  
  graphics.comp.image(graphics.title, 0, 0);
  
  // --------------------------------------------
  
  frameRate(DEF_FPS);
  
  // --------------------------------------------
  
  graphics.fade = true;
  
  setFade();
  
  // --------------------------------------------
  
  graphics.pauseTimer = 0;
  
  graphics.pause = function (n) {
    graphics.shapes.clear();
    graphics.text_.clear();
    graphics.pauseTimer = n * frameRate();    
  }
    
  // --------------------------------------------
  
  graphics.drawEllipse = function (n) {
    
    if (n === undefined) n = 1;
  
    this.shapes.push();
    this.text_.push();
      this.shapes.translate(DIM/2, DIM/2);
      this.text_.translate(DIM/2, DIM/2);
    
      for (let i = 0; i < n; i++) {

        let padding = DIM/2 - ELLIPSE_SIZE/2 - random(DIM/10);
        
        let textPadding = ELLIPSE_SIZE/2 * (1/3);
        
        let x = constrain(random(-DIM/2, DIM/2), -padding, padding);
        let y = constrain(random(-DIM/2, DIM/2), -padding, padding);
        
        // console.log(x + " " + y);
        
        this.shapes.ellipse(x, y, ELLIPSE_SIZE, ELLIPSE_SIZE);

        let word = currentWords.splice(floor(random(currentWords.length)), 1);
        
        if (!currentWords.length) currentWords = [...WORD_LIST];
        
        this.text_.text(word, x + random(-textPadding, textPadding),
                              y + random(-textPadding, textPadding));
      }
    this.text_.pop();
    this.shapes.pop();
  };
  
  // --------------------------------------------
}

// #########################################################

// x

// #########################################################
// DRAW DRAW DRAW DRAW DRAW DRAW DRAW DRAW DRAW DRAW DRAW
// #########################################################

function draw() {
  
  // --------------------------------------------
  graphics.speed.erase(0.45);
  graphics.speed.square(0, 0, DIM);
  graphics.speed.noErase();
  
  if (mouseIsPressed && cnv.mouseOriginX !== null) {
    
    let mouseDiff = { x: mouseX - cnv.mouseOriginX,
                      y: mouseY - cnv.mouseOriginY };
    
    
    console.log(mouseDiff);
    
    DELAY = constrain((cnv.lastDelay || 0) + floor(map(mouseDiff.x, -DIM/2, DIM/2, 200, -200, true)), 1, 200);
    setFade();
    // console.log(DELAY);
    
    fade.value = constrain((fade.lastPosition || 0) + floor(map(mouseDiff.y, -DIM/2, DIM/2, -fade.MAX, fade.MAX, true)), fade.MIN, fade.MAX); // hmmmmm TODO TODO TODO
    
    console.log(fade.value);
    
    let indicatorSize = 30;
    let indicatorPosition = { x: map(DELAY, 200, 1, indicatorSize/2, DIM-(indicatorSize/2)),
                              y: map(fade.value, fade.MIN, fade.MAX, indicatorSize/2, DIM-(indicatorSize/2))};
    
    if (graphics.speed.lastPosition !== null)
      indicatorPosition.x = constrain((indicatorPosition.x + graphics.speed.lastPosition) / 2, 0, DIM);
    
    graphics.speed.lastPosition = indicatorPosition.x;
    
    if (fade.lastPosition !== null)
      indicatorPosition.y = constrain((indicatorPosition.y + fade.lastPosition) / 2, 0, DIM);
    
    fade.lastPosition = indicatorPosition.y;
    
    // graphics.speed.circle(indicatorPosition.x, indicatorPosition.y, indicatorSize);
    graphics.speed.circle(indicatorPosition.x, DIM/2 - 20, indicatorSize);
    // graphics.speed.circle(indicatorPosition.x, mouseY, indicatorSize);
  }
  
  // --------------------------------------------
  
  clear();
  
  graphics.shapes.clear();
  graphics.text_.clear();
  
  // --------------------------------------------
  
  background(BG_COLOR);
  
  if (graphics.fade) {
    // graphics.comp.background(BG_COLOR, fade.value);

    graphics.comp.erase(fade.value);
      graphics.comp.square(0, 0, DIM);
    graphics.comp.noErase();
  }

  // --------------------------------------------
  
  if (graphics.pauseTimer !== 0) {
    graphics.pauseTimer = max(0, graphics.pauseTimer-1);

    if (graphics.pauseTimer < frameRate()*3.5)
      graphics.comp.background(BG_COLOR, 0.4);
    else
      graphics.comp.background(BG_COLOR, 0.1);
    
    graphics.comp.image(graphics.title, 0, 0);
    
    // console.log(graphics.pauseTimer);
  }
  
  else if (frameCount % DELAY === 0) {
    graphics.drawEllipse();
  }
  
  // --------------------------------------------
  
  graphics.comp.image(graphics.shapes, 0, 0);
  graphics.comp.image(graphics.text_, 0, 0);
  // graphics.comp.image(graphics.title, 0, 0);
    
  image(graphics.comp, 0, 0);
  
  // image(graphics.title, 0, 0);
  
  image(graphics.speed, 0, 0);
  
  // --------------------------------------------
}

// #########################################################

function keyPressed(event) {
  
  switch (event.code) {
    case 'KeyR':
      currentWords = [...WORD_LIST];
      graphics.pause(5);
      break;
      
    case 'KeyP':
      let newFPS = frameRate() ? 0 : DEF_FPS;
      frameRate(newFPS);
      console.log(newFPS ? "Unpaused" : "Paused"); // I'm confused
      break;
    
    case 'KeyF':
      graphics.fade = !graphics.fade;
      console.log("Fade : " + graphics.fade);
      break;
  }
  
}

function mouseReleased() {
  cnv.mouseOriginX = null;
  cnv.mouseOriginY = null;
  graphics.speed.lastPosition = null;
}