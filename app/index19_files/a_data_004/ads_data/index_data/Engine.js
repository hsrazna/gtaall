////////////////////////////////////////////////////////////////////////////////////// VARS
var canvasButton, ctxButton,
    canvasInteractive, ctxInteractive,
    canvasLogo,
    canvasDarker,
    canvasPattern, ctxPattern,
    canvasPackshot, ctxPackshot,
    canvasElements, ctxElements,
    canvasPlateText, 
    canvasAim,
    canvasShot,
    canvasBackground, ctxBackground,
	w, h;
	
var imagesToLoad = 
	{
		button:      "images/Button.jpg",
		logo:        "images/Logo.jpg",
		pattern:     "images/Pattern.png",
		tank:        "images/Tank.jpg",
		ruins:       "images/Ruins.jpg",
		packshot:    "images/Packshot.jpg",
		line:        "images/TextLine.png",
		bullet:      "images/Bullet.png",
		shotFire:    "images/Exp.png",
		shotSmoke:   "images/Smoke.png",
		smoke: 		 "images/Smoke.png",
		fire: 		 "images/fire.png",
		background:  "images/Background.jpg",
		track:       "images/Track.jpg",
		shadow:      "images/TankShadow.png",
		//motto:       "images/Motto.png",
		exp: 		 "images/Exp_big.png",
		wheel:       "images/Wheel.png"
 	};
	
var gfx_darker       = {},
    img_button       = {},
    img_logo         = {},
    gfx_Pattern      = {},
    img_tank         = {},
    img_packshot     = {},
    img_ruins        = {},
    gfx_aim          = {},
    gfx_plateText    = {},
    img_line         = {},
    img_bullet       = {},
    img_shotFire     = {},
    img_shotSmoke    = {},
    img_smoke        = {},	
	img_fire         = {},
    img_bigBullet    = {},
    img_wheel        = {},
    img_wheel2       = {},
    img_track        = {},
    img_shadow       = {},
    gfx_health       = {},
    gfx_health2      = {},
    gfx_crash        = {},
    expImg           = {},
    img_age          = {},
    img_background   = {};



var addedW = 300
var bgScale = 0.73;
var contourAlpha = 0;
var aimX = -addedW;
var aimY = -addedW;
var aimMoveTimer = 30;
var aimFl = true;
var txtPlateHeight = 95;
var enableShot = false;
var bulletNum = "x3";
var redLineW = 0;
var endTimer = 0;
var enableMoveTank = true;
var frameTwo =  false;
var success = false;
var shotCount = 0;
var enableMousePos = true;
var hitsNum = 0;
var goToLanding = false;
var autoPlayTimer = 0;
var enableAutoPlay = true;
var tankMoveR = false;
var tankMoveL = false;
var enableElements = true;
var expScale = 0;
var enableBackground = true;
var overFl = false;
var newFl = false
var intervalID
//
var a = 42;
var b = 25;
var a_dx = 0;
var b_dy = 10;
var angRot = 90;
var boost = 0;
//



////////////////////////////////////////////////////////////////////////////////////// FUNCTIONS
function start()
{
	canvasDarker         = document.querySelector("#Darker");
	canvasButton         = document.querySelector("#Button");
    Button.ctx           = canvasButton.getContext('2d');
    canvasInteractive    = document.querySelector("#Interactive");
    ctxInteractive       = canvasInteractive.getContext('2d');
    canvasBackground     = document.querySelector("#Background");
    ctxBackground        = canvasBackground .getContext('2d');
    canvasLogo           = document.querySelector("#Logo");
    ctxLogo              = canvasLogo.getContext('2d');
    canvasPattern        = document.querySelector("#Pattern");
	ctxPattern           = canvasPattern.getContext('2d');
	canvasAim            = document.querySelector("#Aim");
    ctxAim               = canvasAim.getContext('2d');
    canvasPackshot       = document.querySelector("#Packshot");
    ctxPackshot          = canvasPackshot.getContext('2d');
    canvasElements       = document.querySelector("#Elements");
    ctxElements          = canvasElements.getContext('2d');
    canvasPlateText      = document.querySelector("#PlateText");
    ctxPlateText         = canvasPlateText.getContext('2d');
    canvasShot           = document.querySelector("#Shot");
	//
	w = canvasInteractive.width; 
	h = canvasInteractive.height;
	//
	loadImages(imagesToLoad, function(imagesLoaded)
	{	
	    gfx_darker.canvas    = canvasDarker;
	    gfx_aim.canvas       = canvasAim;
	    gfx_plateText.canvas = canvasPlateText;
		Button.pic           = imagesLoaded.button;
		img_logo.pic         = imagesLoaded.logo;
        img_logo.motto       = imagesLoaded.motto;
        Pattern.pic          = imagesLoaded.pattern;
        img_tank.pic         = imagesLoaded.tank;
        img_ruins.pic        = imagesLoaded.ruins;
        img_packshot.pic     = imagesLoaded.packshot;
        img_bullet.pic       = imagesLoaded.bullet;
        gfx_plateText.pic    = imagesLoaded.pattern;
        img_line.pic         = imagesLoaded.line;
        img_background.pic   = imagesLoaded.background;
        img_shotFire.pic     = imagesLoaded.shotFire;
		img_shotSmoke.pic    = imagesLoaded.shotSmoke;
		img_bigBullet.pic    = imagesLoaded.bigBullet;
		img_smoke.pic        =  imagesLoaded.smoke;	
		img_fire.pic         =  imagesLoaded.fire;	
		img_wheel.pic        =  imagesLoaded.wheel;
		img_wheel2.pic       =  imagesLoaded.wheel;
		img_track.pic        =  imagesLoaded.track;
		img_shadow.pic       =  imagesLoaded.shadow;
		expImg.smoke 		 = imagesLoaded.smoke;			
		expImg.exp  		 = imagesLoaded.exp;	
		img_age.canvas       = canvasInteractive;
		//
		init();
		requestID = window.requestAnimationFrame(update);
	});

}

//
function init()
{
	drawBalck();

	//Bullet
	img_bullet.x = 5;
	img_bullet.y = h + 2;
	img_bullet.scale = 1;
	img_bullet.alpha = 0;

	//Plate Text
	gfx_plateText.x  = 0
	gfx_plateText.y = h + 7;
	gfx_plateText.height = txtPlateHeight;
	gfx_plateText.scale = 1
    gfx_plateText.alpha = 1
    drawPlateText(ctxPlateText, gfx_plateText)

	//Darker
	gfx_darker.alpha = 1;
	drawDarker(gfx_darker);

	//Aim
	gfx_aim.alpha = 0;
	gfx_aim.scale = 1
	gfx_aim.x = -addedW 
	gfx_aim.y = -addedW 
	aimCurrX = gfx_aim.x;
    aimCurrY = gfx_aim.y;
    drawAim(ctxAim, gfx_aim)
	//moveAim()

	//Button
	Button.x = w/2;
	Button.y = 534;
	Button.glowMax = 0;
	Button.clickable = false;
	//showButton();

	//Logo
	img_logo.x = w/2;
	img_logo.y = 40;
	img_logo.scale = 1;
	img_logo.alpha = 1;
	drawLogo (ctxLogo,img_logo);

	//Again
	setAgainPlate()
	//showAgainPlate()

	//Pattern
	drawPatternElements();
	Pattern.tPattern.alpha = 1;
	Pattern.bPattern.alpha = 0;
	drawPattern(ctxPattern);

	//Ruins
	img_ruins.x = 0;
	img_ruins.y = 0;

	//Wheel
	img_wheel.x = 0;
	img_wheel.y = 0;
	img_wheel.alpha = 1
	img_wheel.scale = 1
	img_wheel.rot = 0;

	//Wheel2
	img_wheel2.x = 0;
	img_wheel2.y = 0;
	img_wheel2.alpha = 1
	img_wheel2.scale = 1
	img_wheel2.rot = 0;


    //Tank
	img_tank.x = 195;
	img_tank.y = 354;
	moveTank()

	//Track
	img_track.x = 0;
	img_track.y = 0;
	img_track.alpha = 0.25
	img_track.scale = 1

	//Tank shadow
	img_shadow.x = 0;
	img_shadow.y = 0;
	img_shadow.alpha = 0.8
	img_shadow.scale = 1

	//Tank health
	gfx_health.x = 0;
	gfx_health.y = 0;
	gfx_health.alpha = 0;
	gfx_health.scaleX = 1;
	gfx_health.scaleY = 1;
	//
	gfx_health2.x = 0;
	gfx_health2.y = 0;
	gfx_health2.alpha = 0;
	gfx_health2.scaleX = 1;
	gfx_health2.scaleY = 1;
	//Tank crash
	gfx_crash.x = 0;
	gfx_crash.y = 0;
	gfx_crash.alpha = 0;

	//Background
	img_background.x =  (w -  img_background.pic.width*bgScale) /2;
	img_background.y =  (h -  img_background.pic.height*bgScale) /2;
	img_background.scale = bgScale;
	img_background.alpha = 1;
	//drawBackground(ctxBackground, img_background);

	//Big Bullet
	img_bigBullet.x = w/2
	img_bigBullet.y = h/2
	img_bigBullet.scale = 1;
	img_bigBullet.alpha = 0;

	//Packshot
	img_packshot.alpha = 0;
	img_packshot.scale = 2;
	img_packshot.x = w/2;
	img_packshot.y = h/2;

	canvasInteractive.addEventListener('mousemove', mMove, false);
	canvasInteractive.addEventListener('mouseover', mOver, false);
	canvasInteractive.addEventListener('mouseout', mOut, false);
	canvasInteractive.addEventListener('click', mClick, false);

	startAnimation();

///////////////
//var intervalID
var secNum = 0;

	intervalID = setInterval(function () 
	{
		secNum ++
		if(secNum === 10)
		{
			clearInterval(intervalID)
			autoPlay();
			enableAutoPlay = false;
		}
	}, 1000);

}
function startAnimation()
{
	//overFl = true
	document.getElementById("Interactive").style.cursor = "none";
	TweenLite.to(gfx_darker, 1.4, {alpha: 0, ease:Power1.easeOut, onUpdate:drawDarker, onUpdateParams:[gfx_darker]});
	TweenLite.to(gfx_plateText, 0.7, { y:h - 95, ease:Expo.easeOut, onUpdate:drawPlateText, onUpdateParams:[ctxPlateText, gfx_plateText], delay: 0.3});
}
///// vars for tank
var moveDelay;
var moveX;
var startX = 0;
/////
function moveTank()
{
	if(enableMoveTank)
	{
		moveDelay = Math.random()/4;
		moveX = Math.round(Math.random()*40)
		startX = img_tank.x;
		TweenLite.to(img_track, 1.25, {y: - ((190 + moveX) / 12) , ease:Power2.easeInOut})
	    TweenLite.to(img_tank, 1.1, {x: 190 + moveX, ease:Power2.easeInOut, onUpdate:moveWheelR, delay:moveDelay, onComplete:function()
	    	{
	    		startX = img_tank.x;
	    		TweenLite.to(img_track, 1.25, {y: (126 + moveX) / 12, ease:Power2.easeInOut})
	    		TweenLite.to(img_tank, 1.1, {x: 126 + moveX, ease:Power2.easeInOut,onUpdate:moveWheelL, delay:moveDelay, onComplete:function()
	    			{
	    				moveTank();
	    			}});
	    	}});
    }
}
function moveWheelR()
{
	img_wheel.x = img_tank.x + 84
	img_wheel.y = img_tank.y + 84
	img_wheel.rot += (img_tank.x - startX)*7
	//
	img_wheel2.x = img_tank.x + 110
	img_wheel2.y = img_tank.y + 84
	img_wheel2.rot += (img_tank.x - startX)*7
	//
	startX = img_tank.x;
}
function moveWheelL()
{ 
	img_wheel.x = img_tank.x + 84
	img_wheel.y = img_tank.y + 84
	img_wheel.rot -= ( startX - img_tank.x)*7
	//
	img_wheel2.x = img_tank.x + 110
	img_wheel2.y = img_tank.y + 84
	img_wheel2.rot -= ( startX - img_tank.x)*7
	//
	startX = img_tank.x;
}
function secondFrame()
{
	document.getElementById("Interactive").style.cursor = "auto";
	enableShot = false;
	aimFl = false;
	enableMoveTank = false;
	frameTwo = true;
	gfx_plateText.height = 95;
	TweenLite.to(gfx_aim, 0.7, {  alpha:0, ease:Power3.easeOut});
	TweenLite.to(img_background, 1.4, {scale: bgScale, x: (w -  img_background.pic.width*bgScale) /2, y: (h -  img_background.pic.height*bgScale) /2,ease:Expo.easeOut});
	TweenLite.to(img_bullet, 0.4, {alpha:0});
	TweenLite.killTweensOf(img_tank);
	if(hitsNum === 2)
	{
		success = true;
	}	
	TweenLite.to(gfx_plateText, 0.9, { y:h - 95, ease:Power3.easeOut, onUpdate:drawPlateText, onUpdateParams:[ctxPlateText, gfx_plateText], delay: 0.4});
	TweenLite.delayedCall(3,goToPackshot);
}
function goToPackshot()
{
	TweenLite.delayedCall(0.6,showButton);
	TweenLite.delayedCall(1.3,showAgainPlate);
	TweenLite.to(Pattern.bPattern, 0.4, { alpha:1, onUpdate:drawPattern, onUpdateParams:[ctxPattern], delay:1.2});
	TweenLite.to(img_packshot, 0.8, {alpha:1, scale:1, x:w /2, y:h /2,ease:Power1.easeIn, onUpdate:drawPackshot, onUpdateParams:[ctxPackshot, img_packshot], onComplete:function()
		{
             endTimer = 0;
             goToLanding = true;
             document.getElementById("Interactive").style.cursor = "pointer";
		}});
	TweenLite.to(img_packshot, 0.1, {alpha:1, onUpdate:drawPackshot, onUpdateParams:[ctxPackshot, img_packshot], delay:2, onComplete:function()
		{
             enableBackground = false
		}});
}
//
function autoPlay()
{
	newFl = true
	TweenLite.to(img_bullet, 0.3, {alpha:0, y:h + 2, ease:Power3.easeOut});
	{
		TweenLite.to(img_background, 3.5, { alpha:1, ease:Power1.easeOut,onComplete:function()
			{
				enableElements = false;
				enableShot = false;
				aimFl = false;
				enableMoveTank = false;
				firstFl = false;
			}});
		TweenLite.to(gfx_aim, 0.6, { alpha:1, ease:Power1.easeOut});
		TweenLite.to(gfx_aim, 1.6, { x: aimX + 10, y:aimY + 10, ease:Back.easeOut, onComplete:function()
			{
				TweenLite.to(gfx_aim, 2, { x: aimX - 50, y:aimY, ease:Power1.easeInOut, delay:1, onComplete:function()
					{
						autoShot();
					}});
			}});
	}
}
function autoShot()
{
    img_bigBullet.scale = 4
    img_bigBullet.alpha = 1;
    var endX = gfx_aim.x + w/2 + addedW;
    var endY = gfx_aim.y + h/2 + addedW;
	img_bigBullet.x = endX;
    img_bigBullet.y = endY - 140 ;
	TweenLite.to(img_bigBullet, 0.3, { x:endX, y:endY - 10, scale: 0.1, ease:Power2.easeOut, onComplete:function()
		{
		    img_bigBullet.alpha = 0
			TweenLite.killTweensOf(img_tank);
			addShot(endX , endY, 0.5);
	        TweenLite.to(img_background, 0.1, {scale:bgScale + 0.05, x: (w -  img_background.pic.width*(bgScale + 0.05)) /2, y: (h -  img_background.pic.height*(bgScale + 0.05)) /2 , ease:Power2.easeIn});
			TweenLite.to(img_background, 0.2, {scale:bgScale, x: (w -  img_background.pic.width*bgScale) /2, y: (h -  img_background.pic.height*bgScale) /2 , ease:Power2.easeOut, delay: 0.1});
	        TweenLite.delayedCall(1,goToPackshot);
		}});
}
function update()
{
	if(goToLanding)
	{
		endTimer ++;
		if(endTimer === 600)
		{
			goToLanding = false;
			endTimer = 0;
			restartBanner();
			hideAgainPlate();
		}
	}
	if(enableBackground)
	{
		drawBackground(ctxBackground, img_background);
		drawBullet (ctxElements,img_bullet);
	    drawAim(ctxAim, gfx_aim)
	}
	if(goToLanding === false)
	{
		var shotCtx = canvasShot.getContext("2d");
		shotCtx.clearRect(0, 0, w, h);
		drawShot(shotCtx);
		drawExp(shotCtx);
	}
	//
	//check tank contour
	if(enableShot)
	{
		//
		endTimer ++;
		redLineW += w / 600
		if(overFl === true && shotCount > 0)
		{
			if(endTimer === 600 || hitsNum === 2 || shotCount === 3)
			{
				TweenLite.delayedCall(0.5,secondFrame);
				enableElements = false;
			}
		}
		if(overFl === true && shotCount === 0)
		{
			if(endTimer === 600 || hitsNum === 2 || shotCount === 3)
			{
				//document.getElementById("Interactive").style.cursor = "auto";
				enableShot = false;
				aimFl = false;
				enableMoveTank = false;
				TweenLite.to(gfx_aim, 0.7, {  alpha:0, ease:Power3.easeOut});
				TweenLite.to(img_background, 1.4, {scale: bgScale, x: (w -  img_background.pic.width*bgScale) /2, y: (h -  img_background.pic.height*bgScale) /2,ease:Expo.easeOut});
				TweenLite.to(img_bullet, 0.4, {alpha:0});
				TweenLite.killTweensOf(img_tank);
				TweenLite.to(gfx_plateText, 0.9, { y:h + 1, ease:Power3.easeOut, onUpdate:drawPlateText, onUpdateParams:[ctxPlateText, gfx_plateText], delay: 0.4});
				TweenLite.delayedCall(0.3,goToPackshot);
				//
				enableElements = false;
			}
		}
		if(overFl === false)
		{
			if(endTimer === 600)
			{
				aimX = -addedW;
                aimY = -addedW;
			    enableAutoPlay = true;
			    enableElements = false;
				enableShot = false;
				aimFl = false;
				enableMoveTank = false;
				firstFl = false;
			    autoPlay();
		        enableAutoPlay = false;
		        document.getElementById("Interactive").style.cursor = "auto";
			}
		}
		//
		if(overFl === true && gfx_aim.x > img_tank.x - 150  - addedW  - w/2 - translX && gfx_aim.x < 124 - addedW - w/2 - translX && gfx_aim.y > img_tank.y - 72 - addedW - h/2 - translY && gfx_aim.y < img_tank.y - 20 - addedW - h/2 - translY && enableShot)
	    {
			contourAlpha = 1;
		}else if(overFl === true && gfx_aim.x > img_tank.x - 81  - addedW  - w/2 - translX && gfx_aim.x < img_tank.x - 10 - addedW - w/2 - translX && gfx_aim.y > img_tank.y - 102 - addedW - h/2 - translY && gfx_aim.y < img_tank.y - 68 - addedW - h/2 - translY)
		{
			contourAlpha = 1;
		}else{
			contourAlpha = 0;
		}
	}else{
		contourAlpha = 0;
	}
	//
	drawAge(img_age);
	//
	requestID = window.requestAnimationFrame(update);
}
//
function mClick(evt)
{
	enableAutoPlay = false;
	autoPlayTimer = 0;
	if(enableShot)
	{
		shot();
	}
	if(goToLanding)
	{
		if(againPlate.isOver==false)
		{	
			setURL();
		}
	}
}
function setURL()
{
	ExitApi.exit();
}
//
function mMove(evt)
{
	clearInterval(intervalID)
	if(newFl === true && gfx_plateText.y < h)
	{
		TweenLite.to(gfx_plateText, 0.4, { y:h + 7, ease:Expo.easeIn, onUpdate:drawPlateText, onUpdateParams:[ctxPlateText, gfx_plateText], onComplete:function()
			{
				TweenLite.to(img_bullet, 0.4, {alpha:1, y: h - 47, ease:Back.easeOut});
			}});
		newFl = false
		
	}
	if(overFl === false)
	{
		mOver()
	}
	enableAutoPlay = false;
	TweenLite.to(gfx_health2, 0.6, {alpha: 1, ease:Power2.easeOut})
	TweenLite.to(gfx_health, 0.6, {alpha: 0.6, ease:Power2.easeOut})
	if(enableMousePos)
	{
		mousePos = getMousePos(evt);
		aimX = mousePos.x  - w/2  - addedW
		aimY = mousePos.y  - h/2  - addedW
	}
	if(enableElements)
	{
		TweenLite.to(gfx_aim, 0.3, { x: aimX , y:aimY})
	}
	if(gfx_aim.alpha === 0 && enableElements)
	{
		enableShot = true;
		TweenLite.killTweensOf(gfx_plateText);
		TweenLite.to(gfx_aim, 0.7, { alpha: 1});
		TweenLite.to(img_bullet, 0.4, {alpha:1, y: h - 47, ease:Back.easeOut, delay:0.5});
		TweenLite.to(gfx_plateText, 0.4, { y:h + 7, ease:Expo.easeIn, onUpdate:drawPlateText, onUpdateParams:[ctxPlateText, gfx_plateText], onComplete:function()
			{
				TweenLite.to(img_bullet, 0.4, {alpha:1, y: h - 47, ease:Back.easeOut});
			}});
		TweenLite.to(img_background, 1.4, {scale: 1, x: (w -  img_background.pic.width) /2, y: (h -  img_background.pic.height) /2 - 20,ease:Expo.easeOut});
	}
	
	
}
function mOver(evt)
{
	overFl =  true;
	if(enableElements && endTimer < 600)
	{
		enableShot = true;
		//TweenLite.killTweensOf(gfx_plateText);
		TweenLite.to(gfx_aim, 0.7, { alpha: 1});
		//TweenLite.to(img_bullet, 0.4, {alpha:1, y: h - 47, ease:Back.easeOut, delay:0.5});
		//TweenLite.to(gfx_plateText, 0.4, { y:h + 7, ease:Expo.easeIn, onUpdate:drawPlateText, onUpdateParams:[ctxPlateText, gfx_plateText]});
		TweenLite.to(img_background, 1.4, {scale: 1, x: (w -  img_background.pic.width) /2, y: (h -  img_background.pic.height) /2 - 20,ease:Expo.easeOut});
		TweenLite.to(gfx_health, 0.6, {alpha: 0.6, ease:Power2.easeOut})
		TweenLite.to(gfx_health2, 0.6, {alpha: 1, ease:Power2.easeOut})
	}
}
function mOut(evt)
{
	overFl =  false;
	if(enableElements && endTimer < 600)
	{
		TweenLite.killTweensOf(img_bullet);
		TweenLite.to(gfx_aim, 0.7, { alpha:0, ease:Power3.easeOut});
		//TweenLite.to(img_bullet, 0.3, {alpha:0, y:h + 2, ease:Power3.easeOut});
		//TweenLite.to(gfx_plateText, 0.7, { y:h - 95, ease:Expo.easeOut, onUpdate:drawPlateText, onUpdateParams:[ctxPlateText, gfx_plateText]});
		TweenLite.to(img_background, 1.4, {scale: bgScale, x: (w -  img_background.pic.width*bgScale) /2, y: (h -  img_background.pic.height*bgScale) /2,ease:Expo.easeOut});
		TweenLite.to(gfx_health, 0.6, {alpha: 0, ease:Power2.easeOut})
		TweenLite.to(gfx_health2, 0.6, {alpha: 0, ease:Power2.easeOut})
	}
	
}
//
function shot()
{
	canvasInteractive.removeEventListener('click', mClick, false);
	if(shotCount < 3 && hitsNum < 2)
	{
		if(enableMousePos)
		{
			enableMousePos = false;
			shotCount ++;
			bulletNum = "x" + (3 - shotCount);
			drawBullet (ctxElements,img_bullet);
			img_bigBullet.scale = 3
		    img_bigBullet.alpha = 1;
		    var endX = gfx_aim.x + addedW   + w/2 + translX;
		    var endY = gfx_aim.y + addedW   + h/2 + translY
		    //var endX = mousePos.x ;
		    //var endY = mousePos.y ;
			img_bigBullet.x = endX;
		    img_bigBullet.y = endY + 20;
		    if(contourAlpha === 1 )
		    {
		    	hitsNum ++;
		    	if(hitsNum === 1)
		    	{
		    		TweenLite.to(gfx_health2, 0.6, {scaleX: 0.5, ease:Power2.easeOut, delay: 0.5})
		    	}
		    	if(hitsNum === 2)
		    	{
		    		TweenLite.to(gfx_health2, 0.6, {scaleX: 0, ease:Power2.easeOut, delay: 0.5})
		    		TweenLite.to(gfx_crash, 0.6, {alpha: 0.65, ease:Power2.easeOut, delay: 0.5})
		    	}
		    	expScale = 2.2;
		    }else{
		    	expScale = 0.5;
		    }
			TweenLite.to(img_bigBullet, 0.3, { x:endX, y:endY - 10, scale: 0.1, ease:Power2.easeOut, onComplete:function()
				{
					enableMousePos = true;
					img_bigBullet.alpha = 0
					if(contourAlpha === 1 )
					{
						addShot(endX , endY, expScale);
						//TweenLite.killTweensOf(img_tank);
						TweenLite.to(img_background, 0.1, {scale:0.95, x: (w -  img_background.pic.width*0.95) /2, y: (h -  img_background.pic.height*0.96) /2 - 20, ease:Power2.easeIn});
						TweenLite.to(img_background, 0.2, {scale:1, x: (w -  img_background.pic.width) /2, y: (h -  img_background.pic.height) /2 - 20, ease:Power2.easeOut,  delay: 0.1, onComplete:function()
							{
								//canvasInteractive.addEventListener('click', mClick, false);
								//moveTank()
							}});
					}
					if(contourAlpha === 0 )
					{
						//TweenLite.killTweensOf(img_tank);
						addShot(endX , endY, expScale);
						TweenLite.to(img_background, 0.1, {scale:0.95, x: (w -  img_background.pic.width*0.95) /2, y: (h -  img_background.pic.height*0.96) /2 - 20, ease:Power2.easeIn});
						TweenLite.to(img_background, 0.2, {scale:1, x: (w -  img_background.pic.width) /2, y: (h -  img_background.pic.height) /2 - 20, ease:Power2.easeOut, delay: 0.1, onComplete:function()
							{
								//canvasInteractive.addEventListener('click', mClick, false);
								//moveTank()
							}});
					}

					if(hitsNum === 2)
					{
						addExp(img_tank.x - 50,img_tank.y + 5, 3.4);
					}
				}});
		}
	}
	if(hitsNum === 2 || shotCount === 3)
	{
		enableElements = false;
	}
}
function restartBanner()
{
	hideButton()
	TweenLite.to(gfx_darker, 1.4, {alpha: 1, ease:Power1.easeOut, onUpdate:drawDarker, onUpdateParams:[gfx_darker], onComplete:function()
		{
			//VARS
			 bgScale = 0.73;
			 contourAlpha = 0;
			 aimX = -addedW;
			 aimY = -addedW;
			 aimMoveTimer = 30;
			 aimFl = true;
			 txtPlateHeight = 95;
			 enableShot = false;
			 bulletNum = "x3";
			 redLineW = 0;
			 endTimer = 0;
			 enableMoveTank = true;
			 frameTwo =  false;
			 success = false;
			 shotCount = 0;
			 enableMousePos = true;
			 hitsNum = 0;
			 goToLanding = false;
			 autoPlayTimer = 0;
			 enableAutoPlay = true;
			 tankMoveR = false;
             tankMoveL = false;
             enableElements = true;
             expScale = 0;
             enableBackground = true;
             overFl = false
             newFl = false
			 //
			 canvasDarker.getContext('2d').clearRect(0, 0, w, h);
			 canvasButton.getContext('2d').clearRect(0, 0, w, h);
		     canvasInteractive.getContext('2d').clearRect(0, 0, w, h);
		     canvasBackground.getContext('2d').clearRect(0, 0, w, h);
		     canvasLogo.getContext('2d').clearRect(0, 0, w, h);
		     canvasPattern.getContext('2d').clearRect(0, 0, w, h);
			 canvasAim.getContext('2d').clearRect(0, 0, w, h);
		     canvasPackshot.getContext('2d').clearRect(0, 0, w, h);
		     canvasElements.getContext('2d').clearRect(0, 0, w, h);
		     canvasPlateText.getContext('2d').clearRect(0, 0, w, h);
		     canvasShot.getContext('2d').clearRect(0, 0, w, h);
		     //
		     init();
		      //
		    expSplashArray = [];
			expArray2 =      [];
			farr =           [];
		}});
}
function loadImages(imagesToBeLoaded, drawCallback)
{
	var imagesLoaded = {};
	var loadedImages = 0;
	var numberOfImagesToLoad = 0;
	//
	for(var name in imagesToBeLoaded)
	{
		numberOfImagesToLoad++;
	}
	
	for(var name in imagesToBeLoaded)
	{
		imagesLoaded[name] = new Image();
		imagesLoaded[name].onload = function()
		{
			if(++loadedImages >= numberOfImagesToLoad)
			{
				drawCallback(imagesLoaded);
			}
		};
		//
		imagesLoaded[name].src = imagesToBeLoaded[name];
	}
}
//
function getMousePos(evt)
{
   var rect = canvasInteractive.getBoundingClientRect();
   return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
   };
}
//
function radian(a)
{
	return a * Math.PI / 180;
}
function growAngle()
{
	angRot += boost / 1.7;
	//
	if (angRot < 180)
	{
		boost = angRot / 50 + 2;
	}
	else if (angRot >= 180 && angRot < 360)
	{
		boost = (360 - angRot) / 50 + 2;
	}
	else
	{
		angRot = 0;
	}
}
////////////////////////////////////////////////////////////////////////////////////// ACTIONS
window.onLoad = loadFonts();