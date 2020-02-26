function Joaninha(g,x,y,rgb){
    this.spriteTOrgb = function (){
        if(this.cor == cores[0]){
            this.auxRGB = [0, 255, 0];
        }
		   if(this.cor == cores[1]){
           this.auxRGB = [0, 0, 255];
        }
        if(this.cor == cores[2]){
            this.auxRGB = [255, 0, 0];
        }
		    if(this.cor == cores[3]){
            this.auxRGB = [255, 255, 0];
        }
        if(this.cor == cores[4]){
            this.auxRGB = [0, 255, 255];
        }
        if(this.cor == cores[5]){
            this.auxRGB = [0, 0, 0];
        }
        if(this.cor == cores[6]){
            this.auxRGB = [255, 255, 255];
        }
		    if(this.cor == cores[7]){
            this.auxRGB = [255, 0, 255];
        }
        //print("aux",this.auxRGB);
        return this.auxRGB;
    }
	this.rgbTOsprite = function(corRGB){
        var sprites;
        //print('c', corRGB.toString());
		corRGB = corRGB.toString();
        //print("cor",corRGB.toString());
        if(corRGB == [0, 255, 0].toString()){
            sprites = 0;
        }if(corRGB == [0, 0, 255].toString()){
            sprites = 1;
        }
        if(corRGB == [255, 0, 0].toString()){
            sprites = 2;
        }
		if(corRGB == [255, 255, 0].toString()){
            sprites = 3;
        }
        if(corRGB == [0, 255, 255].toString()){
            sprites = 4;
        }
		if(corRGB == [0, 0, 0].toString()){
            sprites = 5;
        }
        if(corRGB == [255, 255, 255].toString()){
            sprites = 6;
        }
		if(corRGB == [255, 0, 255].toString()){
            sprites = 7;
        }
        return cores[sprites];
    }

    this.deleteLady = function (){
      this.joana.visible = false;
      this.joana.remove();
      joaninhas.splice(joaninhas.indexOf(this), 1);
      document.querySelector(".numjoa").innerHTML = joaninhas.length;
      numjoa = joaninhas.length;
    }
        this.score = 0;
        var chancePreta = 0;
    this.colisao = function (spriteA, spriteB){
        //print("this.shapeColor[0] = ",this.shapeColor[0]);
        //print("spriteB.shapeColor[0] = ",spriteB.shapeColor[0]);
        this.score = 0;
        if(this.shapeColor[0] == spriteB.shapeColor[0]){
            //print("a0");
            this.score = this.score + 2;
        }
        if(this.shapeColor[1] == spriteB.shapeColor[1]){
            //print("a1");
            this.score = this.score + 2;
        }
        if(this.shapeColor[2] == spriteB.shapeColor[2]){
            //print("a2");
            this.score = this.score + 2;
        }
        
         if(this.score == 0){
             this.score = 1;
         }
        //print(joaninhas.length/10 + parseInt(deathChance.value) + this.score + chancePreta);
        // if(Math.floor(random(0,100) <= joaninhas.length/10 + parseInt(deathChance.value) + this.score + chancePreta)){
        //     //print("morreu");
        //     //this.deleteLady();
        // }
    }

    if(g == 0){
        this.joana = createSprite(random(canvas.width/20,canvas.width-(canvas.width/20)), random(canvas.height/20,canvas.height-(canvas.height/20)), 30, 30);
        this.cor = cores[Math.floor(random(0, 3.99))];
    //Math.floor(random(0, 3.99))
        this.joana.addImage(this.cor);
    } else {
        this.joana = createSprite(x, y, 30, 30);
		    this.cor = this.rgbTOsprite(rgb);
        this.joana.addImage(this.cor);
    }
    this.joana.setCollider ("circle", 0, 0, 17);
    this.joana.velocity.x = Math.random() * (0.5 - (-0.5)) + (-0.5);
    this.joana.velocity.y = Math.random() * (0.5 - (-0.5)) + (-0.5);
    this.joana.rotateToDirection = true;
    this.joana.mouseActive = true;
    this.quadros = frameCount;
    this.habitat = true;
    this.t = frameCount;
    this.deley = frameCount;
    this.gen = g;
    this.idade = 0;
    this.vRGB = this.spriteTOrgb();
    this.shapeColor = this.vRGB;

    this.moveLady = function (){
        this.agingLady();
        if(this.joana.position.x >= (canvas.width-30) && this.joana.velocity.x > 0) {
            this.joana.velocity.x *= -1;
            //print('pegou x');
        }
		if(this.joana.position.x <= 30 && this.joana.velocity.x < 0){
			this.joana.velocity.x *= -1;
		}
        if (this.joana.position.y > canvas.height-30 && this.joana.velocity.y > 0) {
            this.joana.velocity.y *= -1;
           // print('pegou y');
        }
		if(this.joana.position.y < 30 && this.joana.velocity.y < 0){
			this.joana.velocity.y *= -1;
		}
        if(frameCount >= this.quadros + Math.floor(((Math.random() * (520 - (-120))) + 100))){
                this.quadros = frameCount;
                this.changeSpeed();
        }
    }

    this.changeSpeed = function (){
        do{
            // print('change speed');
            this.joana.velocity.x = Math.random() * (0.5 - (-0.5)) + (-0.5);
            this.joana.velocity.y = Math.random() * (0.5 - (-0.5)) + (-0.5);
        } while(this.joana.velocity.x == 0 && this.joana.velocity.y == 0);
    }

    this.scoreLady = function(){
        this.joana.overlap(quad, this.colisao.bind(this));
    }

    this.agingLady = function (){
        if(frameCount >= this.t + 60){
            this.idade += 1
            this.t = frameCount;
        }
		// if(this.idade > parseInt(deathAge.value)){
  //           //print("ja pode morrer");
  //           //if(random(0,100) <= joaninhas.length/100 + 50)
		// 	     //this.deleteLady();
		// 	//print("morreu por idade");
		// }
		// if(this.idade > parseInt(idadeRepro.value)){
		// 	this.joana.scale = 1;
		// }else if(g > 0){
		// 	this.joana.scale = 0.5;
		// }
    }

}
