/*
		var config = {
			type: Phaser.AUTO,
			width: 800,
			height: 600,
			backgroundColor: '#2d2d2d',
			scene: [ GameScene, UIScene ]
		};

		var game = new Phaser.Game(config);

		function preload ()
		{
			this.load.setBaseURL('http://localhost/');
			//this.load.setBaseURL('http://www.06-90.com/projects/p1/');
			
			this.load.image('honeycomb1', 'image/honeycombBlue.png');
			this.load.image('honeycomb2', 'image/honeycombRed.png');
		}

		function create ()
		{
			var line1 = new Phaser.Geom.Line(100, 200, 100 + 4 * 162, 200);
			var group1 = this.add.group({ key: 'honeycomb1', frameQuantity: 4 });
			Phaser.Actions.PlaceOnLine(group1.getChildren(), line1);
			
			var line2 = new Phaser.Geom.Line(100 + 81, 200+46, 100 + 81 +3* 162, 200+46);
			var group2 = this.add.group({ key: 'honeycomb2', frameQuantity: 3 });
			Phaser.Actions.PlaceOnLine(group2.getChildren(), line2);			

			var line3 = new Phaser.Geom.Line(100, 200+1 * 93, 100 + 4 * 162, 200+1 * 93);
			var group3 = this.add.group({ key: 'honeycomb1', frameQuantity: 4 });
			Phaser.Actions.PlaceOnLine(group3.getChildren(), line3);
			
			var line4 = new Phaser.Geom.Line(100 + 81 , 200+ 46+1 * 93, 100 + 81 +3* 162 , 200+ 46+1 * 93);
			var group4 = this.add.group({ key: 'honeycomb2', frameQuantity: 3 });
			Phaser.Actions.PlaceOnLine(group4.getChildren(), line4);	
			
			var line5 = new Phaser.Geom.Line(100, 200+2 * 93, 100 + 4 * 162, 200+2 * 93);
			var group5 = this.add.group({ key: 'honeycomb1', frameQuantity: 4 });
			Phaser.Actions.PlaceOnLine(group5.getChildren(), line5);			
			
		}

*/


var GameScene = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

	function GameScene ()
	{
		Phaser.Scene.call(this, { key: 'GameScene' });
	},

	preload: function ()
	{
		this.load.setBaseURL('http://www.06-90.com/projects/p2/');
		this.load.image('bg', 'image/BG.png');
		this.load.image('honeycombBlue', 'image/honeycombBlue.png');
		this.load.image('honeycombRed', 'image/honeycombRed.png');
		this.load.image('honeycomb1', 'image/honeycomb1.png');
		this.load.image('honeycomb2', 'image/honeycomb2.png');
	},

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

var UIScene = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

	function UIScene ()
	{
		Phaser.Scene.call(this, { key: 'UIScene', active: true });

		this.score = 0;
	},

	create: function ()
	{
		//  Our Text object to display the Score
		var info = this.add.text(360, 40, 'Score: 0', { font: '24px Arial', fill: '#ffffff' });

		//  Grab a reference to the Game Scene
		var ourGame = this.scene.get('GameScene');

		//  Listen for events from it
		ourGame.events.on('addScore', function () {

			this.score += 10;

			info.setText('Score: ' + this.score);

		}, this);
	}

});

var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: '#000000',
	parent: 'Navigable Video',
	scene: [ GameScene, UIScene ]
};

var game = new Phaser.Game(config);