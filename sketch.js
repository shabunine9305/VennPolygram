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


const cnvContainer = document.getElementById("sketch-row");

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

// #########################################################
// SKETCH 1 : LEFT
// #########################################################

let sketches = {
    sk1: null,
    sk2: null
};

for (let s in sketches) {

    sketches[s] = new p5(sk => {
      
        // #########################################################
        // SET_FADE SET_FADE SET_FADE SET_FADE SET_FADE SET_FADE
        // #########################################################
      
        sk.setFade = function () {

          if (sk.fade === null || sk.fade === undefined) sk.fade = {};

          // sk.fade.value = 0.0095 / DELAY;
      
          // move these later
          sk.fade.MIN = 0.0055;
          sk.fade.MAX = 0.06;
          sk.fade.lastPosition = null;
      
          let minPoint = 0.0055;
          let midPoint = 0.01;
          let maxPoint = 0.06;
          let cutoff = 150;
      
          sk.fade.value = sk.map(sk.DELAY, 200, 1, minPoint, maxPoint, true);
        }

        sk.reset = function () {
          sk.currentWords = [...WORD_LIST];
          sk.graphics.pause(5);
          console.log("Resetting! sk.framesSinceReset: " + sk.framesSinceReset);
          sk.framesSinceReset = 0;
        }

        // #########################################################
        // SETUP SETUP SETUP SETUP SETUP SETUP SETUP SETUP SETUP
        // #########################################################
      
        sk.setup = function () {
          // --------------------------------------------

          sk.currentWords = [...WORD_LIST];

          sk.DELAY = 200;

          sk.setFade();

          sk.framesSinceReset = 0;
          sk.resetFrameCount = 0; // 0 is off, non-0 is ons
          
          // console.log(sk.DELAY);
          // console.log("SETUP (sk.fade.value): " + sk.fade.value);

          // --------------------------------------------
      
          sk.cnv = sk.createCanvas(DIM, DIM);
          sk.cnv.parent(cnvContainer);
          sk.cnv.style("order", 1);
      
          sk.graphics = {
            shapes: sk.createGraphics(DIM, DIM),
            text_: sk.createGraphics(DIM, DIM),
            title: sk.createGraphics(DIM, DIM),
            comp: sk.createGraphics(DIM, DIM),
            speed: sk.createGraphics(DIM, DIM),
            fade: true,
          };
          // --------------------------------------------
      
          sk.cnv.mousePressed(() => {
            sk.cnv.mouseOriginX = sk.mouseX;
            sk.cnv.mouseOriginY = sk.mouseY;
            sk.cnv.lastDelay = sk.DELAY;
          });
      
          // --------------------------------------------
      
          sk.colorMode(sk.HSL);
          sk.graphics.shapes.colorMode(sk.HSL);
          sk.graphics.text_.colorMode(sk.HSL);
          sk.graphics.title.colorMode(sk.HSL);
          sk.graphics.comp.colorMode(sk.HSL);
          sk.graphics.speed.colorMode(sk.HSL);
      
          sk.graphics.shapes.ellipseMode(sk.CENTER);
          sk.graphics.shapes.stroke("black");
          sk.graphics.shapes.noFill();
          sk.graphics.shapes.strokeWeight(2);
      
          sk.graphics.text_.textAlign(sk.CENTER, sk.CENTER);
          sk.graphics.text_.textFont("Times New Roman");
          sk.graphics.text_.textSize(20);
          sk.graphics.text_.strokeWeight(0.5);
          sk.graphics.text_.stroke("black");
          // sk.graphics.text_.textStyle(BOLD);
      
          sk.graphics.title.textAlign(sk.CENTER, sk.TOP);
          sk.graphics.title.textSize(30);
          sk.graphics.title.stroke("black");
          sk.graphics.title.strokeWeight(0.2);
          sk.graphics.title.textFont("Times New Roman");
      
          sk.graphics.speed.stroke(360, 0.6);
          sk.graphics.speed.fill(0, 0.3);
          sk.graphics.speed.lastPosition = null;
      
          // --------------------------------------------
      
          sk.graphics.title.text("Priorities", DIM/2, DIM/15);
      
          sk.cnv.background(BG_COLOR);
      
          sk.graphics.comp.image(sk.graphics.title, 0, 0);
      
          // --------------------------------------------
      
          sk.frameRate(DEF_FPS);
      
          // --------------------------------------------
      
          sk.graphics.pauseTimer = 0;
      
          sk.graphics.pause = function (n) {
            sk.graphics.shapes.clear();
            sk.graphics.text_.clear();
            sk.graphics.pauseTimer = n * sk.frameRate();    
          }
      
          // --------------------------------------------
      
          sk.graphics.drawEllipse = function (n) {
      
            if (n === undefined) n = 1;
      
            this.shapes.push();
            this.text_.push();
              this.shapes.translate(DIM/2, DIM/2);
              this.text_.translate(DIM/2, DIM/2);
      
              for (let i = 0; i < n; i++) {
      
                let padding = DIM/2 - ELLIPSE_SIZE/2 - sk.random(DIM/10);
      
                let textPadding = ELLIPSE_SIZE/2 * (1/3);
      
                let x = sk.constrain(sk.random(-DIM/2, DIM/2), -padding, padding);
                let y = sk.constrain(sk.random(-DIM/2, DIM/2), -padding, padding);
      
                // console.log(x + " " + y);
      
                this.shapes.ellipse(x, y, ELLIPSE_SIZE, ELLIPSE_SIZE);
      
                let word = sk.currentWords.splice(Math.floor(sk.random(sk.currentWords.length)), 1);
      
                if (!sk.currentWords.length) sk.currentWords = [...WORD_LIST];
      
                this.text_.text(word, x + sk.random(-textPadding, textPadding),
                                      y + sk.random(-textPadding, textPadding));
              }
            this.text_.pop();
            this.shapes.pop();
          };
      
          // --------------------------------------------
        }
      
        // #########################################################
        // DRAW DRAW DRAW DRAW DRAW DRAW DRAW DRAW DRAW DRAW DRAW
        // #########################################################
      
        sk.draw = function () {
          
          // --------------------------------------------
          sk.graphics.speed.erase(0.45);
          sk.graphics.speed.square(0, 0, DIM);
          sk.graphics.speed.noErase();
          
          // if (sk.mouseIsPressed && sk.cnv.mouseOriginX !== null) {
      
          //   let mouseDiff = { x: sk.mouseX - sk.cnv.mouseOriginX,
          //                     y: sk.mouseY - sk.cnv.mouseOriginY };
      
      
          //   // console.log(mouseDiff);
      
          //   sk.DELAY = sk.constrain((sk.cnv.lastDelay || 0) +
          //                       Math.floor(sk.map(mouseDiff.x, -DIM/2, DIM/2, 200, -200, true)),
          //                     1, 200);
          //   sk.setFade();
          //   // console.log(sk.DELAY);
      
          //   sk.fade.value = (sk.fade.lastPosition || 0) +
          //                   Math.floor(sk.map(mouseDiff.y, -DIM/2, DIM/2, -sk.fade.MAX, sk.fade.MAX, true)); // hmmmmm TODO TODO TODO
      
          //   sk.fade.value = sk.constrain(sk.fade.value,
          //                                sk.fade.MIN, sk.fade.MAX)

          //   console.log("DRAW+mouseIsPressed (sk.fade.value): " + sk.fade.value);

          //   let indicatorSize = 30;
          //   let indicatorPosition = {
          //     x: sk.map(sk.DELAY, 200, 1, indicatorSize/2, DIM-(indicatorSize/2)),
          //     y: sk.map(sk.fade.value, sk.fade.MIN, sk.fade.MAX, indicatorSize/2, DIM-(indicatorSize/2))};
      
          //   if (sk.graphics.speed.lastPosition !== null)
          //     indicatorPosition.x = sk.constrain((indicatorPosition.x +
          //                                       sk.graphics.speed.lastPosition) / 2,
          //                                     0, DIM);
      
          //   sk.graphics.speed.lastPosition = indicatorPosition.x;
      
          //   if (sk.fade.lastPosition !== null)
          //     indicatorPosition.y = sk.constrain((indicatorPosition.y + sk.fade.lastPosition) / 2, 0, DIM);
      
          //   sk.fade.lastPosition = indicatorPosition.y;
      
          //   // sk.graphics.speed.circle(indicatorPosition.x, indicatorPosition.y, indicatorSize);
          //   sk.graphics.speed.circle(indicatorPosition.x, DIM/2 - 20, indicatorSize);
          //   // sk.graphics.speed.circle(indicatorPosition.x, sk.mouseY, indicatorSize);
          // }
      
          // --------------------------------------------
      
          sk.clear();
      
          sk.graphics.shapes.clear();
          sk.graphics.text_.clear();
      
          // --------------------------------------------
      
          sk.background(BG_COLOR);
      
          if (sk.graphics.fade) {
            // sk.graphics.comp.background(BG_COLOR, sk.fade.value);
      
            sk.graphics.comp.erase(sk.fade.value);
              sk.graphics.comp.square(0, 0, DIM);
            sk.graphics.comp.noErase();
          }
      
          // --------------------------------------------
      
          if (sk.graphics.pauseTimer !== 0) {
            sk.graphics.pauseTimer = Math.max(0, sk.graphics.pauseTimer-1);
      
            if (sk.graphics.pauseTimer < sk.frameRate()*3.5)
              sk.graphics.comp.background(BG_COLOR, 0.4);
            else
              sk.graphics.comp.background(BG_COLOR, 0.1);
      
            sk.graphics.comp.image(sk.graphics.title, 0, 0);
      
            // console.log(sk.graphics.pauseTimer);
          
          } else {
            
            if (sk.resetFrameCount &&
                sk.framesSinceReset++ > sk.resetFrameCount)
              sk.reset();

            else if (sk.frameCount % sk.DELAY === 0) {
              // console.log(sk.framesSinceReset);
              
              sk.graphics.drawEllipse();
            }
          }
      
      
          // --------------------------------------------
      
          sk.graphics.comp.image(sk.graphics.shapes, 0, 0);
          sk.graphics.comp.image(sk.graphics.text_, 0, 0);
          // sk.graphics.comp.image(sk.graphics.title, 0, 0);
      
          sk.image(sk.graphics.comp, 0, 0);
      
          // image(sk.graphics.title, 0, 0);
      
          sk.image(sk.graphics.speed, 0, 0);
      
          // --------------------------------------------
        }
      
        // #########################################################
      
        sk.keyPressed = (event) => {
      
          switch (event.code) {
            case 'KeyR':
              sk.reset();
              break;
      
            case 'KeyP':
              let newFPS = sk.frameRate() ? 0 : DEF_FPS;
              sk.frameRate(newFPS);
              console.log(newFPS ? "Unpaused" : "Paused"); // I'm confused
              break;
      
            case 'KeyF':
              sk.graphics.fade = !sk.graphics.fade;
              console.log("Fade : " + sk.graphics.fade);
              break;
          }
      
        }
      
        sk.mouseReleased = () => {
          sk.cnv.mouseOriginX = null;
          sk.cnv.mouseOriginY = null;
          sk.graphics.speed.lastPosition = null;
        }
      
        // #########################################################
        });
}

// #########################################################
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

// #########################################################
// SKETCH MODIFICATION - SKETCH MODIFICATION - SKETCH MOD
// #########################################################

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function postSetup() {
  // --------------------------------

  await sleep(2000);
  console.log("Activating postSetup()");

  /*
  // let minPoint = 0.0055;
  // let midPoint = 0.01;
  // let maxPoint = 0.06;
  */

  // --------------------------------

  let sk1ResetMinutes = 5;

  sketches.sk1.DELAY = 100;
  sketches.sk1.fade.value = 0.0085;
  sketches.sk1.resetFrameCount = DEF_FPS * 60 * sk1ResetMinutes;

  // --------------------------------

  sketches.sk2.DELAY = 205;
  sketches.sk2.fade.value = 0.006;

  // --------------------------------

}

postSetup();

// #########################################################
// #########################################################

