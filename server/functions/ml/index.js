// import SearchAndScrapeText from "../SearchAndScrapeText";
// import * as SearchAndScrapeText from '../SearchAndScrapeText';

const scraper = require('../SearchAndScrapeText');
const params = require('../compile_params');
const rawEasy = require('./easyOut.js');
const rawMedium = require('./mediumOut.js');
const rawHard = require('./hardOut.js');

const arr1 = require('./array1.js');
const arr2 = require('./array2.js');
const arr3 = require('./array3.js');

const brain = require('brain.js');
const net = new brain.NeuralNetwork();

const EASY = "EASY";
const MEDIUM = "MEDIUM";
const HARD = "HARD";

var fs = require('fs');
var file = fs.createWriteStream('array.js');
file.write("var rawText3 =  [");


async function processData(){
  var trainingData = [];
  var totalLength = rawEasy.length+rawMedium.length+rawHard.length;

  console.log("EASY",rawEasy.length);
  console.log("MED",rawMedium.length);
  console.log("HARD",rawHard.length);

  trainingData = [
    ...arr1,
    ...arr2,
    ...arr3
  ];

  // for(var i = 0;i<rawEasy.length;i++)
  // {
  //   console.log((i)*100/totalLength,"% done");
  //   let toPush = await scraper.scrape(rawEasy[i]);
  //   toPush = await params(toPush);
  //   console.log("TOPUSH",toPush);
  //   if(toPush == null)
  //   {
  //     console.log("FAILURE",EASY);
  //     continue;
  //   }
  //   file.write(("{input:["+toPush+"],output:EASY}").concat(', '));
  //   trainingData.push({input:toPush,output:EASY});
  // }
  //
  // for(var i = 180;i<rawMedium.length;i++)
  // {
  //   console.log((rawEasy.length+i)*100/totalLength,"% done");
  //   let toPush = await scraper.scrape(rawMedium[i]);
  //   toPush = await params(toPush);
  //   if(toPush == null)
  //   {
  //     console.log("FAILURE",MEDIUM);
  //     continue;
  //   }
  //   file.write(("{input:["+toPush+"],output:MEDIUM}").concat(', '));
  //   trainingData.push({input:toPush,output:MEDIUM});
  // }
  //
  // for(var i = 0;i<rawHard.length;i++)
  // {
  //   console.log((rawEasy.length+rawMedium.length+i)*100/totalLength,"% done");
  //   let toPush = await scraper.scrape(rawHard[i]);
  //   toPush = await params(toPush);
  //   if(toPush == null)
  //   {
  //     console.log("FAILURE",HARD);
  //     continue;
  //   }
  //   file.write(("{input:["+toPush+"],output:HARD}").concat(', '));
  //   trainingData.push({input:toPush,output:HARD});
  // }

  console.log(trainingData);

  file.write("]\nmodule.exports = rawText");
  file.end();
  net.train(trainingData, {log: true});
}

processData();
