var router = require('express').Router();
var scraper = require('../functions/SearchAndScrapeText.js');
var compile_params = require('../functions/compile_params.js');


const brain = require('brain.js');

const EASY = "EASY";
const MEDIUM = "MEDIUM";
const HARD = "HARD";

const net = new brain.NeuralNetwork();
net.fromJSON({"sizes":[7,3,3],"layers":[{"0":{},"1":{},"2":{},"3":{},"4":{},"5":{},"6":{}},{"0":{"bias":0.08304888755083084,"weights":{"0":-0.013766818679869175,"1":0.17774835228919983,"2":0.1951090544462204,"3":0.13307033479213715,"4":0.08599738776683807,"5":0.10677196830511093,"6":-0.18570680916309357}},"1":{"bias":0.07224981486797333,"weights":{"0":0.11969106644392014,"1":0.07228177785873413,"2":-0.1283435970544815,"3":0.19779828190803528,"4":0.1349460631608963,"5":-0.01401554886251688,"6":-0.042236074805259705}},"2":{"bias":-0.1201203241944313,"weights":{"0":-0.16170096397399902,"1":-0.06078861281275749,"2":0.02497178688645363,"3":-0.1979866474866867,"4":0.05002874508500099,"5":0.1677977442741394,"6":0.048130959272384644}}},{"0":{"bias":0.3514273464679718,"weights":{"0":-1.182511806488037,"1":-0.051538266241550446,"2":0.2851322293281555}},"1":{"bias":-1.521161437034607,"weights":{"0":0.6657328009605408,"1":-0.02424081228673458,"2":-0.2171812653541565}},"2":{"bias":-1.1628774404525757,"weights":{"0":0.826225221157074,"1":-0.024586103856563568,"2":-0.15461917221546173}}}],"outputLookup":false,"inputLookup":false,"activation":"sigmoid","trainOpts":{"iterations":20000,"errorThresh":0.05,"log":true,"logPeriod":1,"learningRate":0.0005,"momentum":0.8,"callbackPeriod":10,"beta1":0.9,"beta2":0.999,"epsilon":1e-8}})

async function main (req) {

  let links = await scraper.getLinks(req.query.keyword);
  console.log("Links",links);
  let rawText = await scraper.searchAndScrapeText(req.query.keyword);
  console.log("RawText",rawText);
  let mlFeed = [];
  for (var i = 0;i<rawText.length;i++)
  {
    let toPush = await compile_params(rawText[i]);
    mlFeed.push(toPush);
  }

  console.log(mlFeed);

  let results = [];
  for (var i = 0;i<mlFeed.length;i++)
  {
    if(mlFeed[i]==null)
    {
      results.push([0,0,0]);
      continue;
    }
    results.push(net.run(mlFeed[i]));
  }
  console.log(results);


  var j = -1;
  if(req.query.difficulty == EASY)
  {
    j=0;
  }
  if(req.query.difficulty == MEDIUM)
  {
    j=1;
  }
  if(req.query.difficulty == HARD)
  {
    j=2;
  }

  let avgScores  = [];
  var index = 0;
  var max = 0;

  for (var i = 0;i<results.length;i++)
  {
    avgSco = (results[i][j])/((results[i][0]+results[i][1]+results[i][2])/3);
    console.log("LINK:",links[i],"\nSCORE:",avgSco);
    console.log("RAWSCORE:",results[i]);
    if(avgSco>max)
    {
      console.log("MAXINCREASED!!!!");
      index = i;
      max = avgSco;
    }
  }
  console.log("INDEX",index);
  return(links[index]);

  // let relResults = [];
  // var index = 0;
  // var max = 0;
  // for (var i = 0;i<results.length;i++)
  // {
  //   if(results[j]>max)
  //   {
  //     index = i;
  //     max = results[j];
  //   }
  // }
  // return(links[index]);
}
router.get('/',function (req,res) {
  console.log("REQ",req.params);
  main(req).then(
    (ree) =>{
      console.log(ree);
      res.send(ree);
    }
  );
});


module.exports = router;
