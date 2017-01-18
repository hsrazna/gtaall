var shipSmokeArray = new Array();
var shipSmokeArray2 = new Array();
var fireArray = new Array();
var smokeTimer = 0;
///
function addSmoke(x,y,scale)
{
	var obj = {};
	//obj.sx = x;
	//obj.sy = y;
	obj.x = x;
	obj.y = y;
	obj.sScale = scale+Math.random()* 0.2;
	obj.dScale = 0;
	obj.scale = 0;
	obj.alpha = 1;
	obj.rotate = Math.random()*5;
	shipSmokeArray.push(obj);
	if(goToLanding)
	{
		shipSmokeArray.splice(obj);
	}
}
function addSmoke2(x,y,scale)
{
	var obj = {};
	//obj.sx = x;
	//obj.sy = y;
	obj.x = x;
	obj.y = y;
	obj.sScale = scale+Math.random()* 0.2;
	obj.dScale = 0;
	obj.scale = 0;
	obj.alpha = 0.55;
	obj.rotate = Math.random()*5;
	shipSmokeArray2.push(obj);
	if(goToLanding)
	{
		shipSmokeArray2.splice(obj);
	}
}

function addFire(x,y,scale)
{
	var obj = {};	
	obj.x = x;
	obj.y = y;
	obj.sScale = scale+Math.random()*0.8;
	obj.dScale = 0;
	obj.scale = 0;
	obj.alpha = 0.8;
	obj.rotate = Math.random()*5;
	fireArray.push(obj);
	if(goToLanding)
	{
		fireArray.splice(obj);
	}
}
//
function drawBackground(ctx, obj)
{
	ctx.save();
	ctx.clearRect(0, 0, w, h);
	ctx.globalAlpha = obj.alpha;
	ctx.translate(obj.x, obj.y)
	ctx.scale (obj.scale, obj.scale);
	//
	ctx.drawImage(obj.pic, 0, 0, obj.pic.width, obj.pic.height);
	//
	drawShadow(ctxBackground, img_shadow)
	//
	drawTank(ctxBackground, img_tank);
	//
	drawHealth(ctxBackground, gfx_health)
	//
	drawHealth2(ctxBackground, gfx_health2)
	//
	drawContour(ctxBackground, img_tank)
	//
	drawWheel(ctxBackground, img_wheel)
	//
	drawWheel2(ctxBackground, img_wheel2)
	//
	drawTrack(ctxBackground, img_track)
	//
	drawCrash(ctxBackground, gfx_crash)
	//


	//DRAW SMOKE Background
	
	/*for(i =0;i<shipSmokeArray.length;i++)
	{
		shipSmokeArray[i].y -= 0.6;		
		shipSmokeArray[i].x -=((shipSmokeArray[i].scale+shipSmokeArray[i].sScale)/2 - 0.25);
		shipSmokeArray[i].dScale +=(shipSmokeArray[i].sScale-shipSmokeArray[i].dScale)/22;
		shipSmokeArray[i].scale +=0.005;
		shipSmokeArray[i].alpha +=(0-shipSmokeArray[i].alpha)/76;
		
		ctx.save();
			ctx.translate(shipSmokeArray[i].x,shipSmokeArray[i].y);
			ctx.scale(shipSmokeArray[i].scale+shipSmokeArray[i].dScale,shipSmokeArray[i].scale+shipSmokeArray[i].dScale);			
			ctx.rotate(shipSmokeArray[i].rotate);		
			ctx.globalAlpha = shipSmokeArray[i].alpha*obj.alpha;
			ctx.drawImage(img_smoke.pic,-30,-23);
		ctx.restore();
		if(shipSmokeArray[i].alpha<0.03)
		{
			shipSmokeArray.splice(i,1);
			i--;
		}
	}*/
	//DRAW FIRE Background
	for(i =0;i<fireArray.length;i++)
	{
		fireArray[i].y -=fireArray[i].sScale/2;
		fireArray[i].x -=fireArray[i].sScale/2.4;
		fireArray[i].dScale +=(fireArray[i].sScale-fireArray[i].dScale)/8;
		fireArray[i].scale -=0.016;
		fireArray[i].alpha +=(0-fireArray[i].alpha)/20;
		
		ctx.save();
			ctx.translate(fireArray[i].x,fireArray[i].y);
			ctx.scale(fireArray[i].scale+fireArray[i].dScale,fireArray[i].scale+fireArray[i].dScale);			
			ctx.rotate(fireArray[i].rotate);		
			ctx.globalAlpha = fireArray[i].alpha*obj.alpha;
			ctx.drawImage(img_fire.pic,-7,-10);
		ctx.restore();
		if(fireArray[i].alpha<0.03)
		{
			fireArray.splice(i,1);
			i--;
		}
	}
		////////////////
	//DRAW SMOKE Window
	/*for(i =0;i<shipSmokeArray2.length;i++)
	{
		shipSmokeArray2[i].y -= 0.3;		
		shipSmokeArray2[i].x -=((shipSmokeArray2[i].scale+shipSmokeArray2[i].sScale)/2 - 0.25);
		shipSmokeArray2[i].dScale +=(shipSmokeArray2[i].sScale-shipSmokeArray2[i].dScale)/22;
		shipSmokeArray2[i].scale +=0.005;
		shipSmokeArray2[i].alpha +=(0-shipSmokeArray2[i].alpha)/76;
		
		ctx.save();
			ctx.translate(shipSmokeArray2[i].x,shipSmokeArray2[i].y);
			ctx.scale(shipSmokeArray2[i].scale+shipSmokeArray2[i].dScale,shipSmokeArray2[i].scale+shipSmokeArray2[i].dScale);			
			ctx.rotate(shipSmokeArray2[i].rotate);		
			ctx.globalAlpha = shipSmokeArray2[i].alpha*obj.alpha;
			ctx.drawImage(img_smoke.pic,-30,-23);
		ctx.restore();
		if(shipSmokeArray2[i].alpha<0.03)
		{
			shipSmokeArray2.splice(i,1);
			i--;
		}
	}*/

	//
	drawTrack(ctxBackground, img_track)
	//
	drawRuins(ctxBackground, img_ruins)
	//
	ctx.restore();

	smokeTimer++;
	smokeTimer=smokeTimer%10;
	if(smokeTimer==0)
	{	
		// window smoke
	   // addSmoke2(114+Math.random()*10,345+Math.random()*10,0.25);	
	    //right smoke
		//addSmoke(375+Math.random()*30,415+Math.random()*10,1.4);
		if(hitsNum === 1)
		{
			//tank smoke
			//addSmoke(img_tank.x + 140 +Math.random(),392+Math.random()*10,0.6);
		}		
	}
	if(smokeTimer==5)
	{
		//right smoke
		//addSmoke(365+Math.random()*50,415+Math.random()*10,1.7);
		if(hitsNum === 2)
		{
			//tank smoke
			//addSmoke(225+Math.random()*50,415+Math.random()*5,1);
		}
	}
	
	if(smokeTimer%2==0)
	{
		//right fire
		addFire(370+Math.random()*30,410+Math.random()*5,2.5);
		//town fire
		//addFire(70+Math.random()*30,436+Math.random()*5,1);
		if(hitsNum === 2)
		{
			//tank fire
			addFire(245+Math.random()*30,415+Math.random()*10,1.2);
		}
	}
}
function drawTank(ctx, obj)
{
	ctx.save();
	ctx.globalAlpha = obj.alpha;
	ctx.translate(obj.x , obj.y)
	ctx.scale (obj.scale, obj.scale);
	//
	ctx.beginPath();
	ctx.moveTo(181.25,49.4);
	ctx.lineTo(204.45,50.35);
	ctx.lineTo(208.78,54.554);
	ctx.lineTo(209.2,60.651);
	ctx.lineTo(213,66.2011);
	ctx.lineTo(212.9,69.3501);
	ctx.lineTo(210.25,69.4511);
	ctx.lineTo(210.95,72.1511);
	ctx.lineTo(211.2,76);
	ctx.lineTo(208.099,80.9);
	ctx.lineTo(204.349,83.549);
	ctx.lineTo(203.5488,84.849);
	ctx.lineTo(201.1,85);
	ctx.lineTo(199.6508,87.6);
	ctx.lineTo(196.2,88.2);
	ctx.lineTo(195.7,89.45);
	ctx.lineTo(191.95,90.849);
	ctx.lineTo(191.6498,92.299);
	ctx.lineTo(188,92.9);
	ctx.lineTo(187.55,94.599);
	ctx.lineTo(183.4502,94.95);
	ctx.lineTo(183,95.8);
	ctx.lineTo(97.2,100.95);
	ctx.lineTo(79.8,101.1);
	ctx.lineTo(75.25,100);
	ctx.lineTo(63.8,95.35);
	ctx.lineTo(63.094,95.951);
	ctx.lineTo(60.49,96.201);
	ctx.lineTo(59.844,95.3009);
	ctx.lineTo(58.196,95.1008);
	ctx.lineTo(57.8,95.9);
	ctx.lineTo(55.8,96.299);
	ctx.lineTo(54.25,95.599);
	ctx.lineTo(52.2,95.799);
	ctx.lineTo(51.7,96.549);
	ctx.lineTo(49.4,96.9);
	ctx.lineTo(48.9,95.95);
	ctx.lineTo(47.1,95.95);
	ctx.lineTo(46.65,97.1);
	ctx.lineTo(43.4,97);
	ctx.lineTo(42.946,95.9);
	ctx.lineTo(41.24,95.9);
	ctx.lineTo(40.5,97.35);
	ctx.lineTo(36.9,97);
	ctx.lineTo(36.4,95.9);
	ctx.lineTo(34.25,96.3);
	ctx.lineTo(30.2,95.55);
	ctx.lineTo(26.55,94.4);
	ctx.lineTo(15.9,88.7);
	ctx.lineTo(7.801,83.3);
	ctx.lineTo(4.701,79.85);
	ctx.lineTo(3.15,78.95);
	ctx.lineTo(2.65,77.45);
	ctx.lineTo(3.7,76.85);
	ctx.lineTo(2.8003,74.75);
	ctx.lineTo(3.1504,72.4);
	ctx.lineTo(1.9,71.3);
	ctx.lineTo(3.95,70);
	ctx.lineTo(4.95,65.15);
	ctx.lineTo(7.2,63.85);
	ctx.lineTo(6.85,63.1);
	ctx.bezierCurveTo(6.183,63.167,5.449,63.333,4.6495,63.6);
	ctx.bezierCurveTo(3.0494,64.134,1.8995,64.967,1.1993,66.1);
	ctx.lineTo(-0.15,64.9);
	ctx.bezierCurveTo(0.65,63.633,2.117,62.406,4.25,61.2);
	ctx.bezierCurveTo(8.517,58.804,14.017,57.75,20.75,58.054);
	ctx.lineTo(21.15,54.304);
	ctx.lineTo(22.547,52.85);
	ctx.lineTo(28.348,55.5);
	ctx.bezierCurveTo(32.15,54.134,36.416,52.833,41.15,51.6);
	ctx.bezierCurveTo(50.65,49.167,57.75,48.35,62.45,49.15);
	ctx.lineTo(64.5,46.85);
	ctx.lineTo(70.5,45.9);
	ctx.lineTo(69,44.95);
	ctx.lineTo(69,40);
	ctx.lineTo(48.9,38.45);
	ctx.lineTo(47.35,39.75);
	ctx.lineTo(31.25,39.8);
	ctx.lineTo(31.1,32.094);
	ctx.lineTo(47.25,31);
	ctx.lineTo(49.15,33.05);
	ctx.lineTo(70.9,32.65);
	ctx.lineTo(71.75,31.598);
	ctx.lineTo(70.05,27.9);
	ctx.lineTo(70.05,26.047);
	ctx.lineTo(70.75,25.196);
	ctx.lineTo(77.4,24.645);
	ctx.lineTo(77.31,23.395);
	ctx.lineTo(78.51,22.696);
	ctx.lineTo(80.01,23.645);
	ctx.lineTo(82.31,22.696);
	ctx.lineTo(82.22,21.094);
	ctx.lineTo(83.6502,21.094);
	ctx.lineTo(84.2501,22.544);
	ctx.lineTo(88.3501,22.594);
	ctx.lineTo(88.3501,20.493);
	ctx.lineTo(90.61,20.294);
	ctx.lineTo(91.2,22.442);
	ctx.lineTo(100.95,21.993);
	ctx.lineTo(101.3,23.89);
	ctx.lineTo(104.35,25.34);
	ctx.lineTo(120.8,24.942);
	ctx.lineTo(121.5,0.14147);
	ctx.lineTo(122.95,24.79);
	ctx.lineTo(135.6,24.79);
	ctx.lineTo(140,33.69);
	ctx.lineTo(144.7,38.84);
	ctx.lineTo(145.7,38.84);
	ctx.lineTo(146.0498,33.29);
	ctx.lineTo(148.78,32.99);
	ctx.lineTo(150.35,38.74);
	ctx.lineTo(151.3,39);
	ctx.lineTo(151.12,40.65);
	ctx.lineTo(146.3,42);
	ctx.lineTo(148.05,44.6);
	ctx.lineTo(147.9502,46.7);
	ctx.lineTo(147.0992,47.906);
	ctx.lineTo(149.4,46.7);
	ctx.lineTo(174.049,47.906);
	ctx.lineTo(181.25,49.4);
	ctx.closePath();
	ctx.moveTo(168.5,88.1);
	ctx.lineTo(173.2,92.901);
	ctx.lineTo(170.88,92.8);
	ctx.lineTo(169.7497,91.75);
	ctx.lineTo(168.6498,93.4);
	ctx.lineTo(165.6498,92.95);
	ctx.lineTo(168.5,88.1);
	ctx.closePath();
	ctx.moveTo(119.85,95.35);
	ctx.lineTo(122.85,95.1);
	ctx.lineTo(123.651,94.25);
	ctx.lineTo(125.151,94.75);
	ctx.lineTo(127.55,94.75);
	ctx.lineTo(124.9,92.3);
	ctx.lineTo(118.5,93.5);
	ctx.lineTo(119.85,95.35);
	ctx.closePath();
	ctx.moveTo(97.6,92.95);
	ctx.lineTo(100.85,95.45);
	ctx.lineTo(97,95.9);
	ctx.lineTo(95.65,94.849);
	ctx.lineTo(93.75,96.549);
	ctx.lineTo(91,95.45);
	ctx.lineTo(92.7,94);
	ctx.lineTo(97.6,92.95);
	ctx.closePath();
	ctx.moveTo(146.85,94.1);
	ctx.lineTo(145.7,93.15);
	ctx.lineTo(144.6,94.5);
	ctx.lineTo(142.9008,94.025);
	ctx.lineTo(146.3,89.9);
	ctx.bezierCurveTo(149.067,92.4,150.3,93.65,150,93.65);
	ctx.lineTo(146.85,94.1);
	ctx.closePath();
	ctx.moveTo(22.85,85.95);
	ctx.lineTo(18.75,83.05);
	ctx.lineTo(22.7,81.3);
	ctx.lineTo(22.85,85.95);
	ctx.closePath();
	ctx.moveTo(49.5,91.7);
	ctx.lineTo(48.3,92.95);
	ctx.lineTo(44.446,92.3);
	ctx.bezierCurveTo(46.1829,90.5,47.196,88.75,47.49,87.05);
	ctx.lineTo(48.79,86.55);
	ctx.lineTo(51,89.2);
	ctx.bezierCurveTo(52.667,91.033,53.9,92.167,54.7,92.599);
	ctx.lineTo(53.85,93.2);
	ctx.lineTo(50.4,93.05);
	ctx.lineTo(49.5,91.7);
	ctx.closePath();
	//
	var pattern = ctx.createPattern(img_tank.pic, "no-repeat");
	ctx.fillStyle = pattern;
	ctx.fill();
	//
	//drawTrack(ctxBackground, img_tank)
	//

	ctx.restore();

}
//
function drawShadow(ctx, obj)
{
	ctx.save();
	ctx.globalAlpha = obj.alpha;
	ctx.translate(img_tank.x , img_tank.y + 75)
	ctx.scale (obj.scale, obj.scale);
	//
	ctx.drawImage(obj.pic, 0, 0, obj.pic.width, obj.pic.height);
	//
	ctx.restore();

}

function drawHealth(ctx, obj)
{
	ctx.save();
	ctx.globalAlpha = obj.alpha;
	ctx.translate(img_tank.x + 63, img_tank.y)
	ctx.scale (obj.scaleX, obj.scaleY);
	//
	ctx.fillStyle = "rgb(255,255,255)"
	ctx.fillRect(0,0,60,8)
	ctx.strokeStyle = "black"
	ctx.strokeRect(0,0,60,8)

	//
	ctx.restore();

}
function drawHealth2(ctx, obj)
{
	ctx.save();
	ctx.globalAlpha = obj.alpha;
	ctx.translate(img_tank.x + 63 , img_tank.y)
	ctx.scale (obj.scaleX, obj.scaleY);
	//
	ctx.fillStyle = "rgb(237,22,19)"
	ctx.fillRect(0,0,60,8)

	//
	ctx.restore();

}
//
function drawCrash(ctx, obj)
{
	ctx.save();
	ctx.globalAlpha = obj.alpha;
	ctx.translate(img_tank.x, img_tank.y)
	ctx.scale (obj.scale, obj.scale);
	//
	ctx.beginPath();
	ctx.moveTo(125.45,39.1);
	ctx.bezierCurveTo(123.547,40.237,121.763,41.762,120.099,43.6754);
	ctx.bezierCurveTo(118.441,45.585,115.95,46.0474,112.6241,45.075);
	ctx.bezierCurveTo(109.299,44.103,106.5911,43.378,104.4991,42.906);
	ctx.bezierCurveTo(102.4022,42.4291,100.718,41.2461,99.4491,39.351);
	ctx.bezierCurveTo(98.8492,38.4831,98.4491,37.4161,98.2491,36.156);
	ctx.bezierCurveTo(98.117,34.783,98,33.8,97.9,33.2);
	ctx.bezierCurveTo(97.5,31.1333,95.851,29.9333,92.95,29.6);
	ctx.bezierCurveTo(91.215,29.402,88.1151,29.036,83.65,28.5);
	ctx.bezierCurveTo(79.1891,27.959,78.4391,27.159,81.4,26.1);
	ctx.bezierCurveTo(84.3591,25.0433,89.926,25.5433,98.11,27.6);
	ctx.lineTo(107.51,25.703);
	ctx.bezierCurveTo(114.01,24.902,117.8162,25.6664,118.952,28.004);
	ctx.bezierCurveTo(119.551,29.203,121.72,31.3336,125.42,34.406);
	ctx.bezierCurveTo(127.634,36.233,127.65,37.8,125.45,39.1);
	ctx.closePath();
	ctx.moveTo(94.15,41);
	ctx.lineTo(49.156,38.1);
	ctx.lineTo(31.257,39.25);
	ctx.lineTo(31.257,32.85);
	ctx.lineTo(47.656,31.5);
	ctx.lineTo(48.156,33);
	ctx.lineTo(94.15,33);
	ctx.lineTo(96.2,35.55);
	ctx.bezierCurveTo(97.133,37.583,96.45,39.4,94.15,41);
	ctx.closePath();
	ctx.moveTo(29.7,58.65);
	ctx.bezierCurveTo(32.467,55.3826,35.367,54.683,38.4,56.549);
	ctx.bezierCurveTo(39.933,57.516,41.16,58.816,42.16,60.449);
	ctx.bezierCurveTo(33.165,71.088,28.998,70.487,29.7,58.65);
	ctx.closePath();
	ctx.moveTo(24.85,70.75);
	ctx.bezierCurveTo(25.817,69.184,28.733,68.467,33.6,68.6);
	ctx.bezierCurveTo(38.5,68.734,40.6664,69.701,40.1,71.5);
	ctx.bezierCurveTo(39.8674,72.267,38.767,74.017,36.804,76.75);
	ctx.bezierCurveTo(35.167,78.983,34.35,81.184,34.35,83.35);
	ctx.bezierCurveTo(34.35,85.451,35.767,86.817,38.6,87.451);
	ctx.bezierCurveTo(41.633,88.116,43.267,88.800,43.5,89.500);
	ctx.bezierCurveTo(43.9,90.833,41.683,91.917,36.85,92.750);
	ctx.bezierCurveTo(32.317,93.517,28.867,93.684,26.5,93.250);
	ctx.bezierCurveTo(24.833,92.951,22,91.401,18,88.6008);
	ctx.lineTo(12.5,84.500);
	ctx.bezierCurveTo(10.3,82.634,10.383,81.417,12.75,80.8508);
	ctx.bezierCurveTo(12.917,80.8178,15.783,80.5678,21.35,80.1008);
	ctx.bezierCurveTo(23.683,79.901,24.783,78.651,24.652,76.3508);
	ctx.bezierCurveTo(24.483,73.116,24.55,71.25,24.85,70.75);
	ctx.closePath();
	ctx.moveTo(89,48.45);
	ctx.bezierCurveTo(99.667,49.317,107.384,49.6174,112.15,49.35);
	ctx.bezierCurveTo(119.917,48.9164,122.116,49.683,118.75,51.65);
	ctx.bezierCurveTo(115.75,53.3826,111.884,54.66,107.15,55.599);
	ctx.bezierCurveTo(104.2491,56.129,101.274,56.453,98.2251,56.5746);
	ctx.bezierCurveTo(95.177,56.66,91.885,56.717,88.351,56.624);
	ctx.bezierCurveTo(84.8141,56.5294,80.9311,56.570,76.7,56.749);
	ctx.lineTo(69.4,57);
	ctx.bezierCurveTo(65.5,56.1,64.25,55.066,65.65,53.9);
	ctx.bezierCurveTo(66.584,53.167,69.334,51.733,73.9,49.6);
	ctx.bezierCurveTo(76.467,48.2,81.5,47.817,89,48.45);
	ctx.closePath();
	ctx.moveTo(27.85,61.35);
	ctx.bezierCurveTo(27.683,62.651,27.402,63.6174,27,64.25);
	ctx.bezierCurveTo(26.533,64.95,25.483,66.033,23.85,67.5);
	ctx.bezierCurveTo(21.453,69.667,19.916,71.134,19.25,71.9);
	ctx.bezierCurveTo(17.983,73.433,17.733,74.549,18.5,75.25);
	ctx.bezierCurveTo(18.933,75.65,18.817,76.2,18.15,76.9);
	ctx.bezierCurveTo(17.517,77.599,16.65,78.15,15.54,78.549);
	ctx.bezierCurveTo(12.652,79.652,9.5689,79.5761,6.29,78.3241);
	ctx.bezierCurveTo(3.0269,77.0681,2.29387,74.7681,4.09,71.424);
	ctx.bezierCurveTo(5.9079,68.0821,6.7909,66.141,6.7498,65.599);
	ctx.bezierCurveTo(6.65,64.833,6.733,64.017,7,63.15);
	ctx.bezierCurveTo(7.533,61.483,8.733,60.466,10.6,60.099);
	ctx.bezierCurveTo(11.767,59.866,13.133,59.916,14.7,60.2485);
	ctx.bezierCurveTo(15.7329,60.481,17.083,60.1484,18.75,59.2485);
	ctx.bezierCurveTo(20.883,58.1145,23,57.849,25.1,58.449);
	ctx.bezierCurveTo(27.133,59.05,28.05,60.017,27.85,61.35);
	ctx.closePath();
	ctx.moveTo(63.25,51.5);
	ctx.bezierCurveTo(55.617,65.2,50.283,67.15,47.25,57.35);
	ctx.bezierCurveTo(48.45,51.684,51.467,49.017,56.3,49.35);
	ctx.bezierCurveTo(58.733,49.483,61.05,50.2,63.25,51.5);
	ctx.closePath();
	ctx.moveTo(36.7,82.1);
	ctx.bezierCurveTo(35.8674,81.1,36.6664,79.533,39.1,77.401);
	ctx.lineTo(42.95,74.500);
	ctx.bezierCurveTo(45.95,69.567,49.183,67.000,52.656,66.800);
	ctx.bezierCurveTo(54.156,66.734,55.156,67.333,55.656,68.6008);
	ctx.bezierCurveTo(56.2176,70.000,56.0671,72.000,55.2,74.6008);
	ctx.bezierCurveTo(53.6664,79.2018,56.75,84.083,64.45,89.250);
	ctx.bezierCurveTo(68.3171,91.817,72.3171,93.934,76.45,95.6008);
	ctx.lineTo(73.351,97.1008);
	ctx.bezierCurveTo(65.583,95.2,60.5,93.783,58.1,92.85);
	ctx.bezierCurveTo(56.9,92.384,55.017,91.151,52.45,89.151);
	ctx.bezierCurveTo(50.054,87.250,48.433,86.201,47.6,86.000);
	ctx.bezierCurveTo(45.304,85.567,43.4164,85.151,41.95,84.750);
	ctx.bezierCurveTo(39.283,83.983,37.533,83.1,36.7,82.1);
	ctx.closePath();
	//
	ctx.fillStyle = "black";
	ctx.fill()
	//
	ctx.restore();
}
//
function drawRuins(ctx, obj)
{
	ctx.save();
	ctx.globalAlpha = obj.alpha;
	ctx.translate(obj.x, obj.y)
	ctx.scale (obj.scale, obj.scale);
	//
	ctx.beginPath();
	ctx.moveTo(441.25,177.6);
	ctx.lineTo(445.75,175.85);
	ctx.lineTo(452.1,161.5);
	ctx.lineTo(459.85,161.35);
	ctx.lineTo(459.75,819.81);
	ctx.lineTo(0,819.95);
	ctx.lineTo(-0.15,448.955);
	ctx.lineTo(22.35,450.307);
	ctx.lineTo(23,445.455);
	ctx.lineTo(23.6,445.006);
	ctx.bezierCurveTo(24.166,444.705,24.8833,444.6347,25.75,444.807);
	ctx.bezierCurveTo(27.15,445.0676,29.517,446.5676,32.85,449.307);
	ctx.lineTo(44.25,449.307);
	ctx.lineTo(45.75,448.205);
	ctx.lineTo(46.35,444.557);
	ctx.lineTo(48.1,444.057);
	ctx.lineTo(59,449.557);
	ctx.lineTo(64.1,449.057);
	ctx.lineTo(71.5,447.057);
	ctx.lineTo(76.6,449.057);
	ctx.lineTo(81.75,449.307);
	ctx.lineTo(90.1,446.955);
	ctx.lineTo(94.75,446.955);
	ctx.lineTo(99.6,448.455);
	ctx.lineTo(105.1,451.557);
	ctx.lineTo(109.6,449.807);
	ctx.lineTo(114.1,449.705);
	ctx.lineTo(118.5,452.955);
	ctx.lineTo(239.85,457.455);
	ctx.bezierCurveTo(241.017,455.955,242.7168,454.3847,244.951,452.756);
	ctx.bezierCurveTo(249.418,449.455,254.301,447.4341,259.5997,446.705);
	ctx.lineTo(264.3497,442.955);
	ctx.lineTo(267,442.955);
	ctx.lineTo(267,441.205);
	ctx.lineTo(266.1,439.807);
	ctx.lineTo(265.6,436.61);
	ctx.lineTo(266.6,434.256);
	ctx.lineTo(265.5,431.851);
	ctx.lineTo(267.1,430.256);
	ctx.lineTo(267,428.256);
	ctx.lineTo(265.75,425.851);
	ctx.lineTo(267.1,423.506);
	ctx.lineTo(266,419.756);
	ctx.lineTo(268.6,416.256);
	ctx.lineTo(270,413.506);
	ctx.lineTo(269,406.506);
	ctx.lineTo(273.35,402.506);
	ctx.lineTo(274.5,399.256);
	ctx.lineTo(260,388.1);
	ctx.lineTo(263.5,383.35);
	ctx.lineTo(284.35,399);
	ctx.lineTo(291.85,398.25);
	ctx.lineTo(292.75,383.75);
	ctx.lineTo(309.1,381.6);
	ctx.lineTo(314.6,381.75);
	ctx.lineTo(320.85,380.6);
	ctx.lineTo(328.85,378.25);
	ctx.lineTo(333.35,381.5);
	ctx.lineTo(333.85,418);
	ctx.lineTo(353.35,411);
	ctx.lineTo(359.75,410.85);
	ctx.lineTo(360,369.1);
	ctx.lineTo(334.25,369.6);
	ctx.lineTo(336.85,355.6);
	ctx.lineTo(347.6,356);
	ctx.lineTo(355.25,352.25);
	ctx.lineTo(326.25,350.75);
	ctx.lineTo(325.85,341.1);
	ctx.lineTo(332.5,337.5);
	ctx.lineTo(336.75,329.35);
	ctx.lineTo(345.6,327.75);
	ctx.lineTo(345.75,322.1);
	ctx.lineTo(335.35,318.1);
	ctx.lineTo(335.5,316.75);
	ctx.lineTo(341.85,316.1);
	ctx.lineTo(346,317.25);
	ctx.lineTo(346.35,302.85);
	ctx.lineTo(348,303.25);
	ctx.lineTo(349.25,304.1);
	ctx.lineTo(357.25,304.25);
	ctx.lineTo(358.1,320.85);
	ctx.lineTo(369.75,324.35);
	ctx.lineTo(368.85,284);
	ctx.lineTo(373.1,282.1);
	ctx.lineTo(373.35,270.1);
	ctx.lineTo(375.35,267.5);
	ctx.lineTo(437.25,259.1);
	ctx.lineTo(448.85,259.85);
	ctx.lineTo(446.85,212.003);
	ctx.lineTo(445.6,191.503);
	ctx.lineTo(441.6,191.503);
	ctx.lineTo(441.25,177.6);
	ctx.closePath();
	ctx.moveTo(417.85,272.35);
	ctx.lineTo(418.6,317.75);
	ctx.lineTo(433.25,316.35);
	ctx.lineTo(432.35,270);
	ctx.lineTo(417.85,272.35);
	ctx.closePath();
	ctx.moveTo(396,274.85);
	ctx.lineTo(396.85,319.75);
	ctx.lineTo(401,319.5);
	ctx.lineTo(399.75,274);
	ctx.lineTo(396,274.85);
	ctx.closePath();
	ctx.moveTo(386.75,276.1);
	ctx.lineTo(387.85,320);
	ctx.lineTo(394.25,319.35);
	ctx.lineTo(392.5,275.75);
	ctx.lineTo(386.75,276.1);
	ctx.closePath();
	ctx.moveTo(435,362.75);
	ctx.lineTo(436.35,383.5);
	ctx.lineTo(437.85,383.85);
	ctx.lineTo(437.5,375.85);
	ctx.lineTo(439.25,375.35);
	ctx.lineTo(438.75,363.1);
	ctx.lineTo(435,362.75);
	ctx.closePath();
	ctx.moveTo(422.75,395.85);
	ctx.lineTo(422.6,381.35);
	ctx.lineTo(425.25,383);
	ctx.lineTo(425.35,395.75);
	ctx.lineTo(426.75,396.85);
	ctx.lineTo(427.25,390.5);
	ctx.lineTo(432.25,390.25);
	ctx.lineTo(432.6,382.6);
	ctx.lineTo(434.25,382.75);
	ctx.lineTo(431.85,362);
	ctx.lineTo(420.5,373.1);
	ctx.lineTo(419.25,371.6);
	ctx.lineTo(427.5,362);
	ctx.lineTo(413.1,362.5);
	ctx.lineTo(396,367);
	ctx.lineTo(396,416.5);
	ctx.lineTo(416.75,417.25);
	ctx.lineTo(413.6,413.35);
	ctx.lineTo(422.1,404.1);
	ctx.lineTo(422.75,395.85);
	ctx.closePath();
	ctx.moveTo(443.85,366.6);
	ctx.lineTo(443.75,363.25);
	ctx.lineTo(441.5,362.5);
	ctx.lineTo(441.1,376.35);
	ctx.lineTo(443.5,375.85);
	ctx.lineTo(443,370.1);
	ctx.lineTo(445.5,368.75);
	ctx.lineTo(443.85,366.6);
	ctx.closePath();
	//
	var pattern = ctx.createPattern(img_ruins.pic, "no-repeat");
	ctx.fillStyle = pattern;
	ctx.fill();
	//
	ctx.restore();
}

function drawContour(ctx,obj)
{
	ctx.save();
	ctx.globalAlpha = contourAlpha;
	ctx.translate(obj.x, obj.y)
	ctx.scale (obj.scale, obj.scale);
	//
    ctx.beginPath();
	ctx.moveTo(181.25,49.4);
	ctx.lineTo(204.45,50.35);
	ctx.lineTo(208.78,54.554);
	ctx.lineTo(209.2,60.651);
	ctx.lineTo(213,66.2011);
	ctx.lineTo(212.9,69.3501);
	ctx.lineTo(210.25,69.4511);
	ctx.lineTo(210.95,72.1511);
	ctx.lineTo(211.2,76);
	ctx.lineTo(208.099,80.9);
	ctx.lineTo(204.349,83.549);
	ctx.lineTo(203.5488,84.849);
	ctx.lineTo(201.1,85);
	ctx.lineTo(199.6508,87.6);
	ctx.lineTo(196.2,88.2);
	ctx.lineTo(195.7,89.45);
	ctx.lineTo(191.95,90.849);
	ctx.lineTo(191.6498,92.299);
	ctx.lineTo(188,92.9);
	ctx.lineTo(187.55,94.599);
	ctx.lineTo(183.4502,94.95);
	ctx.lineTo(183,95.8);
	ctx.lineTo(97.2,100.95);
	ctx.lineTo(79.8,101.1);
	ctx.lineTo(75.25,100);
	ctx.lineTo(63.8,95.35);
	ctx.lineTo(63.094,95.951);
	ctx.lineTo(60.49,96.201);
	ctx.lineTo(59.844,95.3009);
	ctx.lineTo(58.196,95.1008);
	ctx.lineTo(57.8,95.9);
	ctx.lineTo(55.8,96.299);
	ctx.lineTo(54.25,95.599);
	ctx.lineTo(52.2,95.799);
	ctx.lineTo(51.7,96.549);
	ctx.lineTo(49.4,96.9);
	ctx.lineTo(48.9,95.95);
	ctx.lineTo(47.1,95.95);
	ctx.lineTo(46.65,97.1);
	ctx.lineTo(43.4,97);
	ctx.lineTo(42.946,95.9);
	ctx.lineTo(41.24,95.9);
	ctx.lineTo(40.5,97.35);
	ctx.lineTo(36.9,97);
	ctx.lineTo(36.4,95.9);
	ctx.lineTo(34.25,96.3);
	ctx.lineTo(30.2,95.55);
	ctx.lineTo(26.55,94.4);
	ctx.lineTo(15.9,88.7);
	ctx.lineTo(7.801,83.3);
	ctx.lineTo(4.701,79.85);
	ctx.lineTo(3.15,78.95);
	ctx.lineTo(2.65,77.45);
	ctx.lineTo(3.7,76.85);
	ctx.lineTo(2.8003,74.75);
	ctx.lineTo(3.1504,72.4);
	ctx.lineTo(1.9,71.3);
	ctx.lineTo(3.95,70);
	ctx.lineTo(4.95,65.15);
	ctx.lineTo(7.2,63.85);
	ctx.lineTo(6.85,63.1);
	ctx.bezierCurveTo(6.183,63.167,5.449,63.333,4.6495,63.6);
	ctx.bezierCurveTo(3.0494,64.134,1.8995,64.967,1.1993,66.1);
	ctx.lineTo(-0.15,64.9);
	ctx.bezierCurveTo(0.65,63.633,2.117,62.406,4.25,61.2);
	ctx.bezierCurveTo(8.517,58.804,14.017,57.75,20.75,58.054);
	ctx.lineTo(21.15,54.304);
	ctx.lineTo(22.547,52.85);
	ctx.lineTo(28.348,55.5);
	ctx.bezierCurveTo(32.15,54.134,36.416,52.833,41.15,51.6);
	ctx.bezierCurveTo(50.65,49.167,57.75,48.35,62.45,49.15);
	ctx.lineTo(64.5,46.85);
	ctx.lineTo(70.5,45.9);
	ctx.lineTo(69,44.95);
	ctx.lineTo(69,40);
	ctx.lineTo(48.9,38.45);
	ctx.lineTo(47.35,39.75);
	ctx.lineTo(31.25,39.8);
	ctx.lineTo(31.1,32.094);
	ctx.lineTo(47.25,31);
	ctx.lineTo(49.15,33.05);
	ctx.lineTo(70.9,32.65);
	ctx.lineTo(71.75,31.598);
	ctx.lineTo(70.05,27.9);
	ctx.lineTo(70.05,26.047);
	ctx.lineTo(70.75,25.196);
	ctx.lineTo(77.4,24.645);
	ctx.lineTo(77.31,23.395);
	ctx.lineTo(78.51,22.696);
	ctx.lineTo(80.01,23.645);
	ctx.lineTo(82.31,22.696);
	ctx.lineTo(82.22,21.094);
	ctx.lineTo(83.6502,21.094);
	ctx.lineTo(84.2501,22.544);
	ctx.lineTo(88.3501,22.594);
	ctx.lineTo(88.3501,20.493);
	ctx.lineTo(90.61,20.294);
	ctx.lineTo(91.2,22.442);
	ctx.lineTo(100.95,21.993);
	ctx.lineTo(101.3,23.89);
	ctx.lineTo(104.35,25.34);
	ctx.lineTo(135.6,24.79);
	ctx.lineTo(140,33.69);
	ctx.lineTo(144.7,38.84);
	ctx.lineTo(145.7,38.84);
	ctx.lineTo(146.0498,33.29);
	ctx.lineTo(148.78,32.99);
	ctx.lineTo(150.35,38.74);
	ctx.lineTo(151.3,39);
	ctx.lineTo(151.12,40.65);
	ctx.lineTo(146.3,42);
	ctx.lineTo(148.05,44.6);
	ctx.lineTo(147.9502,46.7);
	ctx.lineTo(147.0992,47.906);
	ctx.lineTo(149.4,46.7);
	ctx.lineTo(174.049,47.906);
	ctx.lineTo(181.25,49.4);
	ctx.closePath();
	//
	ctx.strokeStyle = "red";
	ctx.lineWidth= 1.5;
	ctx.stroke()

	ctx.restore();
}
//
function drawWheel(ctx, obj)
{
	ctx.save();
	ctx.globalAlpha = obj.alpha;
	ctx.translate(obj.x, obj.y)
	ctx.scale (0.75, 0.9);
	ctx.rotate(radian(obj.rot));
	ctx.translate(- obj.pic.width/2, - obj.pic.height/2);
	//
    ctx.drawImage(obj.pic, 0, 0, obj.pic.width, obj.pic.height);
	//
	ctx.restore();
}
function drawWheel2(ctx, obj)
{
	ctx.save();
	ctx.globalAlpha = obj.alpha;
	ctx.translate(obj.x, obj.y)
	ctx.scale (0.72, 0.87);
	ctx.rotate(radian(obj.rot));
	ctx.translate(- obj.pic.width/2, - obj.pic.height/2);
	//
    ctx.drawImage(obj.pic, 0, 0, obj.pic.width, obj.pic.height);
	//
	ctx.restore();
}
function drawTrack(ctx, obj)
{
	ctx.save()
	ctx.globalAlpha = obj.alpha;
	ctx.scale (obj.scale, obj.scale);
	ctx.translate(img_tank.x, img_tank.y)
	//
	//left track
	ctx.beginPath();
	ctx.moveTo(3.2,71.2);
	ctx.bezierCurveTo(2.133,75.766,3.033004,79.066,5.9,81.099);
	ctx.bezierCurveTo(10.467,84.366,18.967,89.033,31.4,95.099);
	ctx.lineTo(34.25,95.099);
	ctx.lineTo(11.149,78.599);
	ctx.bezierCurveTo(10.517,78.1331,10.0328,77.349,9.7,76.2491);
	ctx.bezierCurveTo(9.067,74.049,9.5828,71.4161,11.25,68.349);
	ctx.lineTo(8.9,65.1);
	ctx.lineTo(5.65,65);
	ctx.lineTo(3.2,71.2);
    ctx.closePath()
    ctx.clip();
    //
    
    ctx.translate(obj.x, obj.y)
    var pattern = ctx.createPattern(img_track.pic, "repeat");
	ctx.fillStyle = pattern;
    ctx.fillRect(0,0,300,100)
    ///
    ctx.restore()

	//right track
	ctx.save()
	ctx.globalAlpha = obj.alpha;
	ctx.scale (obj.scale, obj.scale);
	ctx.translate(img_tank.x, img_tank.y)
	//
	ctx.beginPath();
    ctx.moveTo(43.3,63.85);
	ctx.bezierCurveTo(40.967,65.85,39.844,68.5671,39.946,72);
	ctx.bezierCurveTo(40.083,76.533,40.666,79.667,41.696,81.4);
	ctx.bezierCurveTo(42.99,83.7,45.967,85.9,50.594,88);
	ctx.bezierCurveTo(57.166,91,66.583,94.533,78.85,98.6);
	ctx.lineTo(79.19,96.5);
	ctx.lineTo(55.1,83);
	ctx.bezierCurveTo(53.30004,81,52.083,78.684,51.45,76.05);
	ctx.bezierCurveTo(50.25,70.817,52.633,66.634,58.6,63.5);
	ctx.lineTo(58.45,61.85);
	ctx.lineTo(46.85,61.85);
	ctx.lineTo(43.3,63.85);
	ctx.closePath();
	///
    ctx.clip();

    //
    ctx.translate(obj.x, obj.y)
    var pattern = ctx.createPattern(img_track.pic, "repeat");
	ctx.fillStyle = pattern;
    ctx.fillRect(0,0,300,100)
    //
    ctx.restore()
}
