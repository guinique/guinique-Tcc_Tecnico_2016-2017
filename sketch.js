var joaninhas = [];
var cores = [];
var ladyCount = [];
var gramas = [];
var corImg = 0;
var idadeRepro;
var deathAge;
var adultAge;
var deathChance;
var mouseDelay = 0;
var lastColor = "255,0,0";
var nav = false;
var quadrantes;
var lastQuadColor = [0, 255, 0];
var timer = 0;
var tempoGeracao;
var maiorGen;
var cont = 0;
var contGeracao = 1;
var grama;

function preload() {
  cores.push(loadImage("imagens/joanaoVerd.png"));
  cores.push(loadImage("imagens/joanaoAzul.png"));
  cores.push(loadImage("imagens/joanaoVerm.png"));
  cores.push(loadImage("imagens/joanaoAmar.png"));
  cores.push(loadImage("imagens/joanaoCiano.png"));
  cores.push(loadImage("imagens/joanaoPreto.png"));
  cores.push(loadImage("imagens/joanaoBranco.png"));
  cores.push(loadImage("imagens/joanaoRoxo.png"));
  grama = loadImage("imagens/grassVerm.png");
  gramas.push(loadImage("imagens/grassVerde.png"));
  gramas.push(loadImage("imagens/grassAzul.png"));
  gramas.push(loadImage("imagens/grassVerm.png"));
  gramas.push(loadImage("imagens/grassAmar.png"));

}
var corQuad = [0, 255, 0];



function drawQuads() {
  //quadrante 1
  quad = createSprite(width / 2, height / 2, width, height);
  quad.shapeColor = corQuad;
}

function deleteAll() {
  joaninhas.forEach(function (joaninha) {
    joaninha.joana.remove();

  });
  joaninhas = [];
}

function addLady(quant) {
  for (var i = 0; i < quant; i++) {
    var coresRand = [];
    do {
      if (random(0, 100) >= 50) {
        coresRand[0] = 0;
      } else {
        coresRand[0] = 255;
      }
      if (random(0, 100) >= 50) {
        coresRand[1] = 0;
      } else {
        coresRand[1] = 255;
      }
      if (random(0, 100) >= 50) {
        coresRand[2] = 0;
      } else {
        coresRand[2] = 255;
      }
    } while (coresRand[0] == coresRand[1] && coresRand[1] == coresRand[2]);
    joaninhas.push(new Joaninha(Math.ceil(maiorGen) + 1, random(canvas.width / 20, canvas.width - (canvas.width / 20)), random(canvas.height / 20, canvas.height - (canvas.height / 20)), coresRand));
  }
}

var numjoa = 0;

function setup() {
  background(grama);
  quadrantes = new Group();
  document.querySelector(".numjoa").innerHTML = numjoa;
  document.querySelector(".geracao").innerHTML = contGeracao;
  canvas = createCanvas(innerWidth - innerWidth * 0.3, innerHeight);
  //desenha canvas na div 'a'
  canvas.parent("canvas");
  drawQuads();
  /*for(var i = 0; i < numjoa; i++){
      joaninhas[i] = new Joaninha(0);
      joaninhas[i].debug = mouseIsPressed;
    }*/
  tempoGeracao = document.getElementById("tempoGen");
  canvas.addImage;
}



function windowResized() {
  var lastWidth = width;
  if (lastWidth != width) {
    resizeCanvas(innerWidth - innerWidth * 0.3, innerHeight);
  }
}

var lastCalledTime;
var fps;

function requestAnimFrame() {

  if (!lastCalledTime) {
    lastCalledTime = Date.now();
    fps = 0;
    return;
  }
  delta = (Date.now() - lastCalledTime) / 1000;
  lastCalledTime = Date.now();
  fps = 1 / delta;
  return Math.floor(fps);
}

function draw() {
  print(width);
  // if (joaninhas.length != 0) {
  //     print(ladyCount);
  //print(joaninhas[0].shapeColor.toString() == [255,0,0].toString());
  //}
  for (var i = 0; i < joaninhas.length; i++) {
    joaninhas[i].moveLady();
  }
  if (!modalOpen) {
    if (mouseWentDown(LEFT) && frameCount >= mouseDelay + 30) {
      if (mouseX > width * 0.05 || mouseY > height * 0.05) {
        var joaninhaPressed = false;
        for (var i = 0; i < joaninhas.length; i++) {
          if (joaninhas[i].joana.mouseIsPressed) {
            joaninhaPressed = true;
            joaninhas[i].idade++;
            joaninhas[i].t = frameCount;
            var rgbPai = joaninhas[i].spriteTOrgb();
            var rgbMae = lastColor.split(",");
            var cor = [];
            //caracteristicas pai e mae de verdade
            if (random(0, 100) >= 50) {
              cor[0] = rgbPai[0];
              //print("cor 0",cor[0]);
            } else {
              cor[0] = parseInt(rgbMae[0]);
              //print("cor 0",cor[0]);
            }
            if (random(0, 100) >= 50) {
              cor[1] = rgbPai[1];
              //print("cor 1",cor[1]);
            } else {
              cor[1] = parseInt(rgbMae[1]);
              //print("cor 1",cor[1]);
            }
            if (random(0, 100) >= 50) {
              cor[2] = rgbPai[2];
              //print("cor 2",cor[2]);
            } else {
              cor[2] = parseInt(rgbMae[2]);
              //print("cor 2",cor[2]);
            }
            if (cor.toString() == "0,0,0" || cor.toString() == "255,255,255") {
              if (Math.floor(random(0, 1.999)) == 1)
                cor = rgbPai;
              else
                cor = rgbMae;
            }
            joaninhas.push(new Joaninha(Math.ceil(joaninhas[i].gen) + 1, joaninhas[i].joana.position.x, joaninhas[i].joana.position.y, cor));
            document.querySelector(".numjoa").innerHTML = joaninhas.length;
            //print(cor);
            break;
          }
        }
        if (!joaninhaPressed && (!nav || mouseX > $(".sidebar").width()) && mouseX < canvas.width - 5) {
          createLady();
        }
      }
      mouseDelay = frameCount;
    } else if (mouseWentDown(RIGHT)) {
      for (var i = 0; i < joaninhas.length; i++) {
        if (joaninhas[i].joana.mouseIsPressed) {
          joaninhas[i].deleteLady();
        }
      }
    }

  }
  if (joaninhas.length == 0 && joaninhas.length != numjoa) {
    for (var i = 0; i < numjoa; i++) {
      joaninhas[i] = new Joaninha(0);
    }
    $(".numjoa").text(joaninhas.length);
  }
  //print(quad1.shapeColor.toString());
  //    print(lastColor);
  //    print(corQuad);
  //print("repro",idadeRepro.value);
  //print(deathAge.value);
  //print(adultAge.value);
  //print(deathChance.value);
  if (!modalOpen) {
    if (frameCount >= timer + (tempoGeracao.value * 60) && joaninhas.length != null) {
      if (joaninhas.length != 0)
        reproduct();
      timer = frameCount;
    }
  } else {
    timer = frameCount;
  }

  //teste atração das joaninhas
  //    var closest;
  //    var auxI;
  //    if(joaninhas.length >= 2){
  //    for(var x = 0; x < joaninhas.length; x++){
  //      if(joaninhas[x].idade >= idadeRepro.value){
  //        for(var i = 0; i < joaninhas.length; i++){
  //          if(x == 0 && i == 1){
  //            closest = (Math.abs(joaninhas[x].joana.position.x - joaninhas[i].joana.position.x) + Math.abs(joaninhas[x].joana.position.y - joaninhas[i].joana.position.y))/2;
  //            auxI = 1;
  //          }
  //
  //          if(i != x && i != null && i != undefined && x != null && x != undefined && joaninhas[x].idade >= idadeRepro.value && joaninhas[i].idade >= idadeRepro.value){
  //            if((Math.abs(joaninhas[x].joana.position.x - joaninhas[i].joana.position.x) + Math.abs(joaninhas[x].joana.position.y - joaninhas[i].joana.position.y))/2 < closest){
  //              closest = (Math.abs(joaninhas[x].joana.position.x - joaninhas[i].joana.position.x) + Math.abs(joaninhas[x].joana.position.y - joaninhas[i].joana.position.y))/2;
  //              auxI = i;
  //            }
  //          }
  //        }
  //        joaninhas[x].joana.attractionPoint(100, joaninhas[auxI].joana.position.x, joaninhas[auxI].joana.position.y);
  //        joaninhas[auxI].joana.attractionPoint(100, joaninhas[x].joana.position.x, joaninhas[x].joana.position.y);
  //      }
  //    }
  //  }
  quad.addImage(gramas[corImg]);
  drawSprites();
}

function createLady() {

  joaninhas.forEach(function (element) {
    if (cont == 0)
      maiorGen = element.gen;
    else
    if (maiorGen <= element.gen) {
      if (element.gen == 0) {
        maiorGen = 1;
      } else
        maiorGen = element.gen;
    }
    cont++;
  });
  if (maiorGen === undefined || maiorGen == 0)
    maiorGen = 1;
  //print('Maior',maiorGen);
  joaninhas.push(new Joaninha(maiorGen, mouseX, mouseY, lastColor));
  $(".numjoa").text(joaninhas.length);
  numjoa = joaninhas.length;
}

function countLady() {
  //function countLady(arr) {
  var prev;
  ladyCount[0] = 0;
  ladyCount[1] = 0;
  ladyCount[2] = 0;
  ladyCount[3] = 0;
  ladyCount[4] = 0;
  ladyCount[5] = 0;
  joaninhas.sort();
  for (var i = 0; i < joaninhas.length; i++) {
    if (joaninhas[i].shapeColor.toString() == [255, 0, 0].toString()) {
      ladyCount[0] += 1;
    }
    if (joaninhas[i].shapeColor.toString() == [0, 255, 0].toString()) {
      ladyCount[1] += 1;
    }
    if (joaninhas[i].shapeColor.toString() == [0, 0, 255].toString()) {
      ladyCount[2] += 1;
    }
    if (joaninhas[i].shapeColor.toString() == [255, 255, 0].toString()) {
      ladyCount[3] += 1;
    }
    if (joaninhas[i].shapeColor.toString() == [0, 255, 255].toString()) {
      ladyCount[4] += 1;
    }
    if (joaninhas[i].shapeColor.toString() == [255, 0, 255].toString()) {
      ladyCount[5] += 1;
    }
  }
  //    var a = [],
  //        b = [],
  //        arr = joaninhas,
  //        prev;
  //
  //    arr.sort();
  //    for (var i = 0; i < arr.length; i++) {
  //        if (arr[i] !== prev) {
  //            a.push(arr[i]);
  //            b.push(1);
  //        } else {
  //            b[b.length - 1]++;
  //        }
  //        prev = arr[i];
  //    }
  //    return b;
}

function reproduct() {
  var pai = [];
  var mae = [];
  var iPai = 0;
  var iMae = 0;
  var novaGen = [];
  var sum = 0;
  var probability = [];
  var sumProb = 0;
  var x = 0;
  for (var i = 0; i < joaninhas.length; i++) { //for all members of population
    joaninhas[i].scoreLady();
    sum += joaninhas[i].score; //sum += fitness of this individual soma de todas as probabilidades
    probability[i] = sum;
  } // end for

  //    for(var i = 0; i < joaninhas.length; i++){//for all members of population
  //        probability[i] = sumProb + joaninhas[i].score;//probability = sum of probabilities + (fitness / sum)
  //        sumProb = probability[i];//sum of probabilities += probability
  //        // divide a chance de reproduzir para cada joaninha
  //    }//end for

  while (pai.length < joaninhas.length) { //faz até a população ser preenchida
    x = 0;
    //print("while1");
    while (x < 2) { //fazer 2x
      number = random(0, sum);
      //print("sum");
      for (var i = 0; i < joaninhas.length; i++) {
        if (i == 0) {
          if (number <= probability[i]) {
            if (x == 0) {
              //print("pai");
              pai[iPai] = joaninhas[i]; //selecionado
              iPai++;
              x++;
            } else if (x == 1) {
              //print("mae");
              mae[iMae] = joaninhas[i]; //selecionado
              iMae++;
              x++;
            }
          }

        } else {
          if (number > probability[i - 1] && number <= probability[i]) {
            if (x == 0) {
              //print("pai");
              pai[iPai] = joaninhas[i]; //selecionado
              iPai++;
              x++;
            } else if (x == 1) {
              //print("mae");
              mae[iMae] = joaninhas[i]; //selecionado
              iMae++;
              x++;
            }
          }
        }
      } //end for
    } //end
    //print("pai", pai);
    //print("mae", mae);
  }
  //create offspring
  for (var i = 0; i < pai.length; i++) {
    var rgbPai = pai[i].spriteTOrgb();
    var rgbMae = mae[i].spriteTOrgb();
    var cor = [];
    var mutacao = 1;
    //caracteristicas pai e mae de verdade
    if (random(0, 100) >= 50) {
      cor[0] = rgbPai[0];
      //print("cor 0",cor[0]);
    } else {
      cor[0] = rgbMae[0];
      //print("cor 0",cor[0]);
    }
    if (random(0, 100) >= 50) {
      cor[1] = rgbPai[1];
      //print("cor 1",cor[1]);
    } else {
      cor[1] = rgbMae[1];
      //print("cor 1",cor[1]);
    }
    if (random(0, 100) >= 50) {
      cor[2] = rgbPai[2];
      //print("cor 2",cor[2]);
    } else {
      cor[2] = rgbMae[2];
      //print("cor 2",cor[2]);
    }
    //mutação um pra cada
    if (random(0, 100) <= mutacao) {
      print("mutação mutcho loka1");
      cor[0] = 255 - cor[0];
    }
    if (random(0, 100) <= mutacao) {
      print("mutação mutcho loka2");
      cor[1] = 255 - cor[1];
    }
    if (random(0, 100) <= mutacao) {
      print("mutação mutcho loka3");
      cor[2] = 255 - cor[2];
    }
    if (cor.toString() == "0,0,0" || cor.toString() == "255,255,255") {

      if (Math.floor(random(0, 1.999)) == 1)
        cor = rgbPai;
      else
        cor = rgbMae;
    }
    novaGen.push(new Joaninha(Math.ceil((pai[i].gen + mae[i].gen) / 2) + 1, random(canvas.width / 20, canvas.width - (canvas.width / 20)), random(canvas.height / 20, canvas.height - (canvas.height / 20)), cor));
  }
  deleteAll();
  joaninhas = novaGen;
  document.querySelector(".numjoa").innerHTML = joaninhas.length;
  numjoa = joaninhas.length;
  contGeracao++;
  countLady();
  document.querySelector(".geracao").innerHTML = contGeracao;
  addRow();
}