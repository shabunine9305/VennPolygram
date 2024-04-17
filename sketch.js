// #########################################################

// Venn Polygram : A Relational Rorschach Test
// 16 February 2024

// THIS IS A COPY FOR DISPLAYING AT THE STUDENT ART SHOW 

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

const DIM = 600;
const BG_COLOR = 240;
const ELLIPSE_SIZE = 300;
const DEF_FPS = 30;

const WORD_LIST = ['Bills', 'Boundaries', 'Catharsis', 'Children',
                   'Comfort', 'Community', 'Deadlines', 'Debts',
                   'Dreams', 'Emotions', 'Escape', 'Expectations',
                   'Family', 'Food', 'Freedom', 'Friends', 'Fulfillment',
                   'Goals', 'Grades', 'Happiness', 'Health', 'Inspiration', 
                   'Medication', 'Money', 'Motivation', 'Partners', 'Rent',
                   'Responsibilities', 'Rest', 'Schedules', 'School', 'Sleep',
                   'Space', 'Spoons', 'Time', 'Trauma', 'Travel', 'Water', 'Work'];
                    // can you handle more than 7±2 core needs..?


let flexContainer = document.getElementById("sketch-row");

// #########################################################

function setup() {}

function draw() {}

// #########################################################

// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x



// #########################################################
// SKETCH 1 : LEFT
// #########################################################

let sketches = {
    p5s1: null,
    p5s2: null
};

for (let s in sketches) {

    sketches[s] = new p5(sketch => {
        // let cnv;
        
        // let DELAY = 200; // shhhh
        // var DELAY = 1;
      
        let currentWords = [...WORD_LIST];
      
        // let graphics;
      
        // #########################################################
      
        // x
      
        // #########################################################
        // SETUP SETUP SETUP SETUP SETUP SETUP SETUP SETUP SETUP
        // #########################################################
      
        sketch.setFade = function () {
          // sketch.fade.value = 0.0095 / DELAY;
      
          // move these later
          sketch.fade.MIN = 0.0055;
          sketch.fade.MAX = 0.06;
          sketch.fade.lastPosition = null;
      
          let minPoint = 0.0055;
          let midPoint = 0.01;
          let maxPoint = 0.06;
          let cutoff = 150;
      
        //   if (DELAY < cutoff) {
        //     sketch.fade.value = sketch.map(1/DELAY, 1/200, 1/cutoff, maxPoint, midPoint, true);
      
        //   } else {
        //     // sketch.fade.value = sketch.constrain(0.25 / DELAY, 0.006, 0.15);  
        //     sketch.fade.value = sketch.map(1/DELAY, 1/cutoff, 1, midPoint, minPoint, true);  
        //   }
      
          // sketch.fade.value = sketch.map(1/DELAY, 1/200, 1, minPoint, maxPoint, true);
          sketch.fade.value = sketch.map(sketch.DELAY, 200, 1, minPoint, maxPoint, true);
      
          // console.log(sketch.fade.value);
        }
      
        sketch.setup = function () {
          // --------------------------------------------
      
          sketch.cnv = sketch.createCanvas(DIM, DIM);
          sketch.cnv.parent(flexContainer);
          sketch.cnv.style("order", 1);
      
          sketch.graphics = {
            shapes: sketch.createGraphics(DIM, DIM),
            text_: sketch.createGraphics(DIM, DIM),
            title: sketch.createGraphics(DIM, DIM),
            comp: sketch.createGraphics(DIM, DIM),
            speed: sketch.createGraphics(DIM, DIM),
          };
          // --------------------------------------------
      
          sketch.cnv.mousePressed(() => {
            sketch.cnv.mouseOriginX = sketch.mouseX;
            sketch.cnv.mouseOriginY = sketch.mouseY;
            sketch.cnv.lastDelay = sketch.DELAY;
          });
      
          // --------------------------------------------
      
          sketch.colorMode(sketch.HSL);
          sketch.graphics.shapes.colorMode(sketch.HSL);
          sketch.graphics.text_.colorMode(sketch.HSL);
          sketch.graphics.title.colorMode(sketch.HSL);
          sketch.graphics.comp.colorMode(sketch.HSL);
          sketch.graphics.speed.colorMode(sketch.HSL);
      
          sketch.graphics.shapes.ellipseMode(sketch.CENTER);
          sketch.graphics.shapes.stroke("black");
          sketch.graphics.shapes.noFill();
          sketch.graphics.shapes.strokeWeight(2);
      
          sketch.graphics.text_.textAlign(sketch.CENTER, sketch.CENTER);
          sketch.graphics.text_.textFont("Times New Roman");
          sketch.graphics.text_.textSize(20);
          sketch.graphics.text_.strokeWeight(0.5);
          sketch.graphics.text_.stroke("black");
          // sketch.graphics.text_.textStyle(BOLD);
      
          sketch.graphics.title.textAlign(sketch.CENTER, sketch.TOP);
          sketch.graphics.title.textSize(30);
          sketch.graphics.title.stroke("black");
          sketch.graphics.title.strokeWeight(0.2);
          sketch.graphics.title.textFont("Times New Roman");
      
          sketch.graphics.speed.stroke(360, 0.6);
          sketch.graphics.speed.fill(0, 0.3);
          sketch.graphics.speed.lastPosition = null;
      
          // --------------------------------------------
      
          sketch.graphics.title.text("Priorities", DIM/2, DIM/15);
      
          sketch.cnv.background(BG_COLOR);
      
          sketch.graphics.comp.image(sketch.graphics.title, 0, 0);
      
          // --------------------------------------------
      
          sketch.frameRate(DEF_FPS);
      
          // --------------------------------------------
      
          sketch.graphics.fade = true;
      
          sketch.DELAY = 200;

          sketch.fade = {};
          sketch.setFade();
      
          // --------------------------------------------
      
          sketch.graphics.pauseTimer = 0;
      
          sketch.graphics.pause = function (n) {
            sketch.graphics.shapes.clear();
            sketch.graphics.text_.clear();
            sketch.graphics.pauseTimer = n * sketch.frameRate();    
          }
      
          // --------------------------------------------
      
          sketch.graphics.drawEllipse = function (n) {
      
            if (n === undefined) n = 1;
      
            this.shapes.push();
            this.text_.push();
              this.shapes.translate(DIM/2, DIM/2);
              this.text_.translate(DIM/2, DIM/2);
      
              for (let i = 0; i < n; i++) {
      
                let padding = DIM/2 - ELLIPSE_SIZE/2 - sketch.random(DIM/10);
      
                let textPadding = ELLIPSE_SIZE/2 * (1/3);
      
                let x = sketch.constrain(sketch.random(-DIM/2, DIM/2), -padding, padding);
                let y = sketch.constrain(sketch.random(-DIM/2, DIM/2), -padding, padding);
      
                // console.log(x + " " + y);
      
                this.shapes.ellipse(x, y, ELLIPSE_SIZE, ELLIPSE_SIZE);
      
                let word = currentWords.splice(Math.floor(sketch.random(currentWords.length)), 1);
      
                if (!currentWords.length) currentWords = [...WORD_LIST];
      
                this.text_.text(word, x + sketch.random(-textPadding, textPadding),
                                      y + sketch.random(-textPadding, textPadding));
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
      
        sketch.draw = function () {
      
          // --------------------------------------------
          sketch.graphics.speed.erase(0.45);
          sketch.graphics.speed.square(0, 0, DIM);
          sketch.graphics.speed.noErase();
          
          if (sketch.mouseIsPressed && sketch.cnv.mouseOriginX !== null) {
      
            let mouseDiff = { x: sketch.mouseX - sketch.cnv.mouseOriginX,
                              y: sketch.mouseY - sketch.cnv.mouseOriginY };
      
      
            console.log(mouseDiff);
      
            sketch.DELAY = sketch.constrain((sketch.cnv.lastDelay || 0) +
                                Math.floor(sketch.map(mouseDiff.x, -DIM/2, DIM/2, 200, -200, true)),
                              1, 200);
            sketch.setFade();
            // console.log(sketch.DELAY);
      
            sketch.fade.value = sketch.constrain((sketch.fade.lastPosition || 0) +
                                     Math.floor(sketch.map(mouseDiff.y, -DIM/2, DIM/2, -sketch.fade.MAX, sketch.fade.MAX, true)), 
                                   sketch.fade.MIN, sketch.fade.MAX); // hmmmmm TODO TODO TODO
      
            console.log(sketch.fade.value);
      
            let indicatorSize = 30;
            let indicatorPosition = {
              x: sketch.map(sketch.DELAY, 200, 1, indicatorSize/2, DIM-(indicatorSize/2)),
              y: sketch.map(sketch.fade.value, sketch.fade.MIN, sketch.fade.MAX, indicatorSize/2, DIM-(indicatorSize/2))};
      
            if (sketch.graphics.speed.lastPosition !== null)
              indicatorPosition.x = sketch.constrain((indicatorPosition.x +
                                                sketch.graphics.speed.lastPosition) / 2,
                                              0, DIM);
      
            sketch.graphics.speed.lastPosition = indicatorPosition.x;
      
            if (sketch.fade.lastPosition !== null)
              indicatorPosition.y = sketch.constrain((indicatorPosition.y + sketch.fade.lastPosition) / 2, 0, DIM);
      
            sketch.fade.lastPosition = indicatorPosition.y;
      
            // sketch.graphics.speed.circle(indicatorPosition.x, indicatorPosition.y, indicatorSize);
            sketch.graphics.speed.circle(indicatorPosition.x, DIM/2 - 20, indicatorSize);
            // sketch.graphics.speed.circle(indicatorPosition.x, sketch.mouseY, indicatorSize);
          }
      
          // --------------------------------------------
      
          sketch.clear();
      
          sketch.graphics.shapes.clear();
          sketch.graphics.text_.clear();
      
          // --------------------------------------------
      
          sketch.background(BG_COLOR);
      
          if (sketch.graphics.fade) {
            // sketch.graphics.comp.background(BG_COLOR, sketch.fade.value);
      
            sketch.graphics.comp.erase(sketch.fade.value);
              sketch.graphics.comp.square(0, 0, DIM);
            sketch.graphics.comp.noErase();
          }
      
          // --------------------------------------------
      
          if (sketch.graphics.pauseTimer !== 0) {
            sketch.graphics.pauseTimer = Math.max(0, sketch.graphics.pauseTimer-1);
      
            if (sketch.graphics.pauseTimer < sketch.frameRate()*3.5)
              sketch.graphics.comp.background(BG_COLOR, 0.4);
            else
              sketch.graphics.comp.background(BG_COLOR, 0.1);
      
            sketch.graphics.comp.image(sketch.graphics.title, 0, 0);
      
            // console.log(sketch.graphics.pauseTimer);
          }
      
          else if (sketch.frameCount % sketch.DELAY === 0) {
            sketch.graphics.drawEllipse();
          }
      
          // --------------------------------------------
      
          sketch.graphics.comp.image(sketch.graphics.shapes, 0, 0);
          sketch.graphics.comp.image(sketch.graphics.text_, 0, 0);
          // sketch.graphics.comp.image(sketch.graphics.title, 0, 0);
      
          sketch.image(sketch.graphics.comp, 0, 0);
      
          // image(sketch.graphics.title, 0, 0);
      
          sketch.image(sketch.graphics.speed, 0, 0);
      
          // --------------------------------------------
        }
      
        // #########################################################
      
        sketch.keyPressed = (event) => {
      
          switch (event.code) {
            case 'KeyR':
              currentWords = [...WORD_LIST];
              sketch.graphics.pause(5);
              break;
      
            case 'KeyP':
              let newFPS = sketch.frameRate() ? 0 : DEF_FPS;
              sketch.frameRate(newFPS);
              console.log(newFPS ? "Unpaused" : "Paused"); // I'm confused
              break;
      
            case 'KeyF':
              sketch.graphics.fade = !sketch.graphics.fade;
              console.log("Fade : " + sketch.graphics.fade);
              break;
          }
      
        }
      
        sketch.mouseReleased = () => {
          sketch.cnv.mouseOriginX = null;
          sketch.cnv.mouseOriginY = null;
          sketch.graphics.speed.lastPosition = null;
        }
      
        // #########################################################
        });
}
/*
let p5s1 = new p5(sketch => {
  let cnv;
  
  let DELAY = 200; // shhhh
  sketch.fade = {}; 
  // var DELAY = 1;

  let currentWords = [...WORD_LIST];

  let graphics;

  // #########################################################

  // x

  // #########################################################
  // SETUP SETUP SETUP SETUP SETUP SETUP SETUP SETUP SETUP
  // #########################################################

  setFade = function () {
    // sketch.fade.value = 0.0095 / DELAY;

    // move these later
    sketch.fade.MIN = 0.0055;
    sketch.fade.MAX = 0.06;
    sketch.fade.lastPosition = null;

    let minPoint = 0.0055;
    let midPoint = 0.01;
    let maxPoint = 0.06;
    let cutoff = 150;

  //   if (DELAY < cutoff) {
  //     sketch.fade.value = sketch.map(1/DELAY, 1/200, 1/cutoff, maxPoint, midPoint, true);

  //   } else {
  //     // sketch.fade.value = sketch.constrain(0.25 / DELAY, 0.006, 0.15);  
  //     sketch.fade.value = sketch.map(1/DELAY, 1/cutoff, 1, midPoint, minPoint, true);  
  //   }

    // sketch.fade.value = sketch.map(1/DELAY, 1/200, 1, minPoint, maxPoint, true);
    sketch.fade.value = sketch.map(DELAY, 200, 1, minPoint, maxPoint, true);

    // console.log(sketch.fade.value);
  }

  sketch.setup = function () {
    // --------------------------------------------

    cnv = sketch.createCanvas(DIM, DIM);
    cnv.parent(flexContainer);
    cnv.style("order", 1);

    graphics = {
      shapes: sketch.createGraphics(DIM, DIM),
      text_: sketch.createGraphics(DIM, DIM),
      title: sketch.createGraphics(DIM, DIM),
      comp: sketch.createGraphics(DIM, DIM),
      speed: sketch.createGraphics(DIM, DIM),
    };
    // --------------------------------------------

    cnv.mousePressed(() => {
      cnv.mouseOriginX = sketch.mouseX;
      cnv.mouseOriginY = sketch.mouseY;
      cnv.lastDelay = DELAY;
    });

    // --------------------------------------------

    sketch.colorMode(sketch.HSL);
    graphics.shapes.colorMode(sketch.HSL);
    graphics.text_.colorMode(sketch.HSL);
    graphics.title.colorMode(sketch.HSL);
    graphics.comp.colorMode(sketch.HSL);
    graphics.speed.colorMode(sketch.HSL);

    graphics.shapes.ellipseMode(sketch.CENTER);
    graphics.shapes.stroke("black");
    graphics.shapes.noFill();
    graphics.shapes.strokeWeight(2);

    graphics.text_.textAlign(sketch.CENTER, sketch.CENTER);
    graphics.text_.textFont("Times New Roman");
    graphics.text_.textSize(20);
    graphics.text_.strokeWeight(0.5);
    graphics.text_.stroke("black");
    // graphics.text_.textStyle(BOLD);

    graphics.title.textAlign(sketch.CENTER, sketch.TOP);
    graphics.title.textSize(30);
    graphics.title.stroke("black");
    graphics.title.strokeWeight(0.2);
    graphics.title.textFont("Times New Roman");

    graphics.speed.stroke(360, 0.6);
    graphics.speed.fill(0, 0.3);
    graphics.speed.lastPosition = null;

    // --------------------------------------------

    graphics.title.text("Priorities", DIM/2, DIM/15);

    cnv.background(BG_COLOR);

    graphics.comp.image(graphics.title, 0, 0);

    // --------------------------------------------

    sketch.frameRate(DEF_FPS);

    // --------------------------------------------

    graphics.fade = true;

    setFade();

    // --------------------------------------------

    graphics.pauseTimer = 0;

    graphics.pause = function (n) {
      graphics.shapes.clear();
      graphics.text_.clear();
      graphics.pauseTimer = n * sketch.frameRate();    
    }

    // --------------------------------------------

    graphics.drawEllipse = function (n) {

      if (n === undefined) n = 1;

      this.shapes.push();
      this.text_.push();
        this.shapes.translate(DIM/2, DIM/2);
        this.text_.translate(DIM/2, DIM/2);

        for (let i = 0; i < n; i++) {

          let padding = DIM/2 - ELLIPSE_SIZE/2 - sketch.random(DIM/10);

          let textPadding = ELLIPSE_SIZE/2 * (1/3);

          let x = sketch.constrain(sketch.random(-DIM/2, DIM/2), -padding, padding);
          let y = sketch.constrain(sketch.random(-DIM/2, DIM/2), -padding, padding);

          // console.log(x + " " + y);

          this.shapes.ellipse(x, y, ELLIPSE_SIZE, ELLIPSE_SIZE);

          let word = currentWords.splice(Math.floor(sketch.random(currentWords.length)), 1);

          if (!currentWords.length) currentWords = [...WORD_LIST];

          this.text_.text(word, x + sketch.random(-textPadding, textPadding),
                                y + sketch.random(-textPadding, textPadding));
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

  sketch.draw = function () {

    // --------------------------------------------
    graphics.speed.erase(0.45);
    graphics.speed.square(0, 0, DIM);
    graphics.speed.noErase();
    
    if (sketch.mouseIsPressed && cnv.mouseOriginX !== null) {

      let mouseDiff = { x: sketch.mouseX - cnv.mouseOriginX,
                        y: sketch.mouseY - cnv.mouseOriginY };


      console.log(mouseDiff);

      DELAY = sketch.constrain((cnv.lastDelay || 0) +
                          Math.floor(sketch.map(mouseDiff.x, -DIM/2, DIM/2, 200, -200, true)),
                        1, 200);
      setFade();
      // console.log(DELAY);

      sketch.fade.value = sketch.constrain((sketch.fade.lastPosition || 0) +
                               Math.floor(sketch.map(mouseDiff.y, -DIM/2, DIM/2, -sketch.fade.MAX, sketch.fade.MAX, true)), 
                             sketch.fade.MIN, sketch.fade.MAX); // hmmmmm TODO TODO TODO

      console.log(sketch.fade.value);

      let indicatorSize = 30;
      let indicatorPosition = {
        x: sketch.map(DELAY, 200, 1, indicatorSize/2, DIM-(indicatorSize/2)),
        y: sketch.map(sketch.fade.value, sketch.fade.MIN, sketch.fade.MAX, indicatorSize/2, DIM-(indicatorSize/2))};

      if (graphics.speed.lastPosition !== null)
        indicatorPosition.x = sketch.constrain((indicatorPosition.x +
                                          graphics.speed.lastPosition) / 2,
                                        0, DIM);

      graphics.speed.lastPosition = indicatorPosition.x;

      if (sketch.fade.lastPosition !== null)
        indicatorPosition.y = sketch.constrain((indicatorPosition.y + sketch.fade.lastPosition) / 2, 0, DIM);

      sketch.fade.lastPosition = indicatorPosition.y;

      // graphics.speed.circle(indicatorPosition.x, indicatorPosition.y, indicatorSize);
      graphics.speed.circle(indicatorPosition.x, DIM/2 - 20, indicatorSize);
      // graphics.speed.circle(indicatorPosition.x, sketch.mouseY, indicatorSize);
    }

    // --------------------------------------------

    sketch.clear();

    graphics.shapes.clear();
    graphics.text_.clear();

    // --------------------------------------------

    sketch.background(BG_COLOR);

    if (graphics.fade) {
      // graphics.comp.background(BG_COLOR, sketch.fade.value);

      graphics.comp.erase(sketch.fade.value);
        graphics.comp.square(0, 0, DIM);
      graphics.comp.noErase();
    }

    // --------------------------------------------

    if (graphics.pauseTimer !== 0) {
      graphics.pauseTimer = Math.max(0, graphics.pauseTimer-1);

      if (graphics.pauseTimer < sketch.frameRate()*3.5)
        graphics.comp.background(BG_COLOR, 0.4);
      else
        graphics.comp.background(BG_COLOR, 0.1);

      graphics.comp.image(graphics.title, 0, 0);

      // console.log(graphics.pauseTimer);
    }

    else if (sketch.frameCount % DELAY === 0) {
      graphics.drawEllipse();
    }

    // --------------------------------------------

    graphics.comp.image(graphics.shapes, 0, 0);
    graphics.comp.image(graphics.text_, 0, 0);
    // graphics.comp.image(graphics.title, 0, 0);

    sketch.image(graphics.comp, 0, 0);

    // image(graphics.title, 0, 0);

    sketch.image(graphics.speed, 0, 0);

    // --------------------------------------------
  }

  // #########################################################

  sketch.keyPressed = (event) => {

    switch (event.code) {
      case 'KeyR':
        currentWords = [...WORD_LIST];
        graphics.pause(5);
        break;

      case 'KeyP':
        let newFPS = sketch.frameRate() ? 0 : DEF_FPS;
        sketch.frameRate(newFPS);
        console.log(newFPS ? "Unpaused" : "Paused"); // I'm confused
        break;

      case 'KeyF':
        graphics.fade = !graphics.fade;
        console.log("Fade : " + graphics.fade);
        break;
    }

  }

  sketch.mouseReleased = () => {
    cnv.mouseOriginX = null;
    cnv.mouseOriginY = null;
    graphics.speed.lastPosition = null;
  }

  // #########################################################
  });
*/
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x
// x

// #########################################################
// SKETCH 2 : RIGHT
// #########################################################


/* CHANGES TO SKETCH 2

    cnv.style("order", 2);


*/


// #########################################################
// #########################################################

