[Research Project Two Demo](http://www.06-90.com/projects/p2/index.html). 



## Welcome to my Research Project Two

Here, I have to say that the game engine which I used is Phaser and its URL is [Phaser](http://phaser.io/). The link of my previous project is [Research Project One Demo](https://github.com/ChenLyu01/Research-Project-1).

This is also a technical study for [Navigable Video](http://www.06-90.com/final/finalprojectChenLyu.html). In this project, I studied mouse click events on images.

### Required technology

In the picture below.

![Image text](https://github.com/ChenLyu01/Research-Project-2/blob/master/image/image1.png) 

The audience can click the **Honeycomb** button.





- Code without the game engine

```
initEvent(){
	// 
	this.mousedownHandler2 = this.mousedownHandler.bind(this);
	this.mousemoveHandler2 = this.mousemoveHandler.bind(this);
	this.mouseupHandler2 = this.mouseupHandler.bind(this);
	
	this.canvas.addEventListener("mousedown", this.mousedownHandler2);
	this.canvas.addEventListener("mousemove", this.mousemoveHandler2);
	this.canvas.addEventListener("mouseup", this.mouseupHandler2);
	
	this.choiceDiv.addEventListener("click", this.choiceHandler.bind(this));
}
	
resetBlock(){
	this.toScaleIndex = -1;
	this.toMoveIndex = -1;
	this.todo = '';
}
	
mousedownHandler(e){
	this.isMouseDown = true;
	this.origin = [e.offsetX, e.offsetY];
	
	this.resetBlock();
		for(let i = 0; i < this.rects.length; i++){
			if(this.isPointInRect(this.origin, this.rects[i].coord)){
				this.todo = 'BBclick';
				this.toMoveIndex = i;
				this.rects[i].selected=1
				//ClickRectHandler(i, this.rects[i].coord);
			}
		}

	
}
	
mousemoveHandler(e){
	this.modifyCursorStyle([e.offsetX, e.offsetY]);
	
	if(!this.isMouseDown){
		return;
	}
	
	let end = [e.offsetX, e.offsetY];
	this.wh = [end[0] - this.origin[0], end[1] - this.origin[1]];
	
	let rectCoord = [...this.origin, ...this.wh];
	
	for(let i = 0; i < this.rects.length; i++){
		if(this.isPointInRect(this.end, this.rects[i].coord)){
			this.todo = 'move';
			this.toMoveIndex = i;
			this.rects[i].selected=1
		}
	}       
	
	switch (this.todo){
		case "move":
			this.MoveRectHandler(this.toMoveIndex, rectCoord);
			break;
		case "BBclick":
			this.ClickRectHandler(this.toMoveIndex, rectCoord);
			break;              
	}
	this.choiceDiv.style.display = 'none';
}
	

mouseupHandler(e){
	this.isMouseDown = false;
	
	let end = [e.offsetX, e.offsetY];
	this.wh = [end[0] - this.origin[0], end[1] - this.origin[1]];
	let rectCoord = [...this.origin, ...this.wh];

	switch (this.todo){
		case "move":
			this.MoveRectHandler(this.toMoveIndex);
			this.activeIndex = this.toMoveIndex;
			break;
		case "BBclick":
			this.ClickRectHandler(this.toMoveIndex, rectCoord);
			break;   
	}
	
	this.resetBlock();

}
	
	
ClickRectHandler(rectIndex, rectCoord){
	console.log("BBclick");
	let selectedRectCoord = this.rects[rectIndex].coord;
	let newRectCoord = [selectedRectCoord[0] + rectCoord[2], selectedRectCoord[1] + rectCoord[3], selectedRectCoord[2], selectedRectCoord[3]];
	this.clearCanvas();
	this.FormatRect(rectIndex);

}
	
MoveRectHandler(rectIndex, rectCoord){
	console.log("Move");
	let selectedRectCoord = this.rects[rectIndex].coord;
	let newRectCoord = [selectedRectCoord[0] + rectCoord[2], selectedRectCoord[1] + rectCoord[3], selectedRectCoord[2], selectedRectCoord[3]];
	
	this.FormatRect(rectIndex);
}   
	
FormatRect(index){
	this.ctx = this.canvas.getContext('2d') || null;
	let ctx = this.ctx;

	let img = document.getElementsByName("honeycomb");
	let imgArray = document.getElementById("honeycombarray");

	
	for(let i = 0; i < this.rects.length; i++){
		ctx.drawImage(img[0], this.rects[i].coord[0],this.rects[i].coord[1]);
		//var ntID = this.rects[i].rnd;
		//ctx.drawImage(imgArray,window.navaigation[ntID].coord[0],window.navaigation[ntID].coord[1],108,93, this.rects[i].coord[0],this.rects[i].coord[1],108,93);
		if(i !== index){
			let coord = this.rects[i].coord;
			if (this.rects[i].selected !== 1){
				var ntID = this.rects[i].rnd;
				ctx.drawImage(img[1], this.rects[i].coord[0],this.rects[i].coord[1]);
				//ctx.drawImage(imgArray,window.navaigation[ntID].coord[0],window.navaigation[ntID].coord[1],108,93, this.rects[i].coord[0],this.rects[i].coord[1],108,93);
			}
			//this.fillText(this.rects[i]);
		}else {
			var ntID = this.rects[i].rnd;
			var ntPlayID = window.navaigation[ntID].ntvideodataID;
			ctx.drawImage(imgArray,window.navaigation[ntID].coord[0],window.navaigation[ntID].coord[1],108,93, this.rects[i].coord[0],this.rects[i].coord[1],108,93);
			this.fillText(this.rects[i]);
			this.fillClips(ntPlayID);
		}
	}
}

```
This link [Research Project One](http://www.06-90.com/projects/p1/index.html) is the work without the Phaser. I have to say that this is a very complicated programming process. First, we're going to write the mouse down event. Besides, we also need to write mouse up event. The most important thing is not just that. This **initEvent()** is similar to a detector or a handler, You might notice this **.addEventListener**，It's always watching the **Canvas'** status. This requires a lot of code to manage these events. So let's see how the Phaser engine works.









- Code after using the Phaser

```
	create: function ()
	{
		var hcID = 0
		var honeycomb = [];
		this.add.image(400, 300, 'bg');

		for(var i=0;i<3;i++){
			for(var j=0; j<4; j++){			
				var x = 162*(j)+160;
				var y = 93*(i)+220;
				var box = this.add.image(x, y, 'honeycombBlue');
				box.setInteractive();
			}
		}

		for(var i=0;i<2;i++){
			for(var j=0; j<3; j++){			
				var x = 162*(j)+160+81;
				var y = 93*(i)+220+46;
				var box = this.add.image(x, y, 'honeycombRed');
				box.setInteractive();
			}
		}
		
		this.input.on('gameobjectup', this.clickHandler, this);
	},

	clickHandler: function (pointer, box)
	{
		if (box.input.enabled = true){
			box.input.enabled = false;
			box.setVisible(false);
			var box = this.add.image(box.x, box.y, 'honeycomb1');
		}
		this.events.emit('addScore');
	}
	
});
		
	
```

This link [Research Project Two Demo](http://www.06-90.com/projects/p2/index.html). In this game engine, I have to say that the events are very **simple**. Only the **setInteractive**, You can think this way, it turns a static picture into an activated button. In other words, the image can be operated by keyboard or mouse. Besides that the key **input.enabled** could be considered to be the switch of one of its Interactive events.






### Source code description

```
var GameScene = new Phaser.Class({
	
var UIScene = new Phaser.Class({
	
	//We can see that there are two Phaser classes. They all belong to **Phaser.Scene**.
```	
Here:

********************************************************

```
var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: '#000000',
	parent: 'Navigable Video',
	**scene: [ GameScene, UIScene ]** //  Here, we can find some evidence, They are all in the scene
};

var game = new Phaser.Game(config);	
```
********************************************************	





Another important thing is that the statement of Config must be placed at the bottom of the whole function. This is a rule. Please pay attention to it. When I first debug it, I didn't notice this problem, so the program does not work.   ：（




### Reference
[The official example](https://labs.phaser.io/edit.html?src=src\scenes\ui%20scene.js) 

