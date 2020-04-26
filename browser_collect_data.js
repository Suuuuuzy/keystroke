var fs = require('fs');
var robot = require("robotjs");
// set no delay after keypress
robot.setKeyboardDelay(0);
robot.setMouseDelay(2);


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var arguments = process.argv.splice(2);
var word = arguments[0]

async function tableCallback(table){
    // this function works when table reading is finished
    var samples = [];
    // skip first row of index
    for(var i=0; i<table.length; i++){
      var row = table[i];
      var len = row[row.length-1];
      samples.push({
                  'word': '', 
                  'PRESS_TIME': [],
                  'LETTER': []
                }
      );
      for(var j=0; j<len; j++){
        samples[samples.length-1].PRESS_TIME.push(row[j+19]);
        // console.log(parseInt(row[j+4],10)+65);
        samples[samples.length-1].LETTER.push(String.fromCharCode(parseInt(row[j+4],10)+97));
      }
      samples[samples.length-1].word = samples[samples.length-1].LETTER.join('');
    }
    try{    
        //delay 10s
        // console.log('delaying 10s...please switch to search box');
        // await sleep(10000);
        // for each sample in sample, deal with time
        var screenSize = robot.getScreenSize();
        console.log(screenSize);
        var mouse = robot.getMousePos();
        console.log('mouse position', mouse);
        for (var i = 0; i<samples.length; i++){
            var LETTER = samples[i].LETTER;
            console.log(samples[i].PRESS_TIME);
            console.log(LETTER);
            // switch to right
            await robot.moveMouse(1200, 700);
            await robot.mouseClick();
            await sleep(1000);
            // clear box   // 800, 160  
            await robot.moveMouse(800, 160);
            await robot.mouseClick('left', 'true');
            // robot.keyToggle("a", "down", ["command"]);
            // robot.keyToggle("a", "up", ["command"]);
            await robot.keyTap("backspace");
            console.log('delete contents');
            // switch to left
            await robot.moveMouse(400, 700);
            await robot.mouseClick();
            await sleep(1000);
            // start recording
            // TODO: send signal to aq server! // 25, 550
            await robot.moveMouse(25, 550);
            await robot.mouseClick();
            console.log('start Timing');
            // input word
            await robot.moveMouse(800, 160);
            await robot.mouseClick();
            await input_word(samples[i].PRESS_TIME, LETTER);
            console.log('delaying 1s...please stop, save file');
            await sleep(1000);
            // switch to left
            await robot.moveMouse(400, 700);
            await robot.mouseClick();
            await sleep(1000);
            // stop recording
            // TODO: send signal to aq server! // 125, 550
            await robot.moveMouse(125, 550);
            await robot.mouseClick();
            console.log('stop Timing');
        }
    } finally {
      console.log('finish');
    }
    console.log('read table finished');
}

function ConvertToTable(data, callBack) {
  data = data.toString();
  var table = new Array();
  var rows = new Array();
  rows = data.split("\n");
  for (var i = 0; i < rows.length; i++) {
      table.push(rows[i].split(",")); // one row, one word
  }
  callBack(table);
}

function Main(fileName){
  fs.readFile(fileName, function (err, data){
    var table = new Array();
    if (err) {
        console.log(err.stack);
        return;
    }
    ConvertToTable(data, tableCallback);
  });
}

// call by each word
async function input_word(PRESS_TIME, LETTER) {
  var realTime = [];
  try {
    await sleep(5000); // let FPS of canvas go steadily
    // send every key except the last key
    for(var i = 0; i<PRESS_TIME.length-1; i++){
        await robot.keyTap(LETTER[i]);
        // push keytime
        realTime.push(Date.now());
        // await sleep(2000);
        await sleep(PRESS_TIME[i]);
    }
    // send last key
    await robot.keyTap(LETTER[PRESS_TIME.length-1]);
    // push keytime
    realTime.push(Date.now());
  } finally {
    path = 'data/' + word
    if(!fs.existsSync(path))
      fs.mkdirSync(path) 
    fs.writeFile( path + '/' + realTime[0] + '.txt', realTime + '$' + LETTER, (err) => {
      if (err) throw err;
      console.log(LETTER.join('') + ' is saved!');
    });
  }
};

keystrokeFile = 'keystroke_dataset/data_' +word + '.csv'

Main(keystrokeFile);
