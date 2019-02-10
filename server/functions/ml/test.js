const model = require('./model.js');
const brain = require('brain.js');

const net = new brain.NeuralNetwork();
net.fromJSON({"sizes":[7,3,3],"layers":[{"0":{},"1":{},"2":{},"3":{},"4":{},"5":{},"6":{}},{"0":{"bias":-0.14570027589797974,"weights":{"0":-0.1892891228199005,"1":0.11510484665632248,"2":-0.0018423907458782196,"3":0.14121203124523163,"4":0.1983938068151474,"5":-0.15534734725952148,"6":-0.06980093568563461}},"1":{"bias":-0.07448254525661469,"weights":{"0":0.18036900460720062,"1":-0.013449998572468758,"2":-0.054655786603689194,"3":-0.05741317570209503,"4":0.03869996592402458,"5":0.01300174742937088,"6":0.09542755037546158}},"2":{"bias":0.17129038274288177,"weights":{"0":0.15112651884555817,"1":-0.15287303924560547,"2":0.15995576977729797,"3":-0.12273408472537994,"4":0.006677593570202589,"5":0.15994946658611298,"6":-0.00129404675681144}}},{"0":{"bias":-2.243316173553467,"weights":{"0":-0.9520623087882996,"1":-1.2270301580429077,"2":-0.05313573777675629}},"1":{"bias":-1.8285962343215942,"weights":{"0":-1.0548471212387085,"1":-1.1343475580215454,"2":-0.2690037190914154}},"2":{"bias":1.7420716285705566,"weights":{"0":1.15442955493927,"1":1.8806687593460083,"2":-0.3618180751800537}}}],"outputLookup":false,"inputLookup":false,"activation":"sigmoid","trainOpts":{"iterations":5000,"errorThresh":0.05,"log":true,"logPeriod":10,"learningRate":0.35,"momentum":0.1,"callbackPeriod":10,"beta1":0.9,"beta2":0.999,"epsilon":1e-8}})

const params = require('../compile_params');
const scraper = require('../SearchAndScrapeText');

async function main (link) {
    let toPush = await scraper.scrape(link);
    toPush = await params(toPush);
    // console.log("TOPUSHHH",toPush);
    console.log(net.run(toPush));
}

main("http://www.mikeblaber.org/oldwine/chm1045/notes/Struct/Bohr/Struct03.htm");

//hard:http://tutorial.math.lamar.edu/Classes/CalcII/PolarSurfaceArea.aspx
//medium:http://www.mikeblaber.org/oldwine/chm1045/notes/Struct/Bohr/Struct03.htm
//easy:https://www.ducksters.com/history/native_americans/crazy_horse.php
