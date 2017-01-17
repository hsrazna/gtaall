/* -------------------------------------------------------------------------------------
--------------                        WARGAMING.NET                       --------------
----------------------------------------------------------------------------------------
--------------                 AUTHOR: ALEXEY SERGIENYA                   --------------
----------------------------------------------------------------------------------------
--------------                 © 2016 ALL RIGHTS RESERVED                 --------------
--------------------------------------------------------------------------------------*/



/* -------------------------------------------------------------------------------------
----------------------------------     VARIABLES     -----------------------------------
--------------------------------------------------------------------------------------*/

var canvasInteractive, 	
	canvasDarker,
	canvasButton,
	canvasMain,
	w, h;

var imagesToLoad = 
	{  		
		logo       		: "images/Logo.jpg",		
		pattern    		: "images/pattern.png",		
		button			: "images/Button.jpg",
		bg         		: "images/bg.jpg",
		tankDiffuse		: "images/diffuse_map_2.jpg",
		trackDiffuse	: "images/track.jpg",
		plateDiffuse	: "images/plateDiffuse.jpg",		
		floorDiffuse	: "images/floorDiffuse.jpg"		
 	};
	
var logoImg      = {},
	helpPlateImg = {},
	mouseImg	 = {},
	zoomBarImg 	 = {},
	logoIconImg	 = {},
	textPlate    = {},
	tankImg      = {},	
	bgImg 		 = {},
	cam 		 = {},
	p360Img 	 = {},
	arrowsImg    = {}, 
	darkerImg    = {};

var overFl = false;
var mousePos = {};
var frame = 0;
var interactiveEnable = false;
var isInteractive = false;
var autoPlayTimer = 0;
var isAutoPlay = false;
var rotator;  

var gl;
var programInfo;
var m4 = twgl.m4;
var onePointProgramInfo;
var reflectProgramInfo;

var myObjects = new Array();
var textures;

// Shared values
var baseHue = Math.random()*360;
var lightWorldPosition = [1, 8, -10];
var lightColor = [1, 1, 1, 1];

var camera = m4.identity();
var isDrag = false;

var view = m4.identity();
var viewProjection = m4.identity();

/* -------------------------------------------------------------------------------------
----------------------------------     FUNCTIONS     ----------------------------------- 
--------------------------------------------------------------------------------------*/


/* -------------------------------     START BANNER  ---------------------------------*/
function start()
{
	canvasInteractive = document.querySelector("#Interactive");
	canvasDarker      = document.querySelector("#Darker");	
	canvasButton      = document.querySelector("#Button");	
	canvasMain        = document.querySelector("#Main");
	canvasWebGL      = document.querySelector("#WebGL");
	
	if(document.querySelector("#age"))
	{
		document.querySelector("#age").style.fontFamily = font;
	}
	

	//
	w = canvasInteractive.width; 
	h = canvasInteractive.height;	
	

	//
	loadImages(imagesToLoad, function(imagesLoaded)
	{
		logoImg.pic = imagesLoaded.logo;
		logoImg.motto = imagesLoaded.motto;
		Pattern.pic = imagesLoaded.pattern;
		Button.ctx        = canvasButton.getContext('2d');
		Button.pic = imagesLoaded.button;	
		//
		darkerImg.canvas = canvasDarker;			
		
		tankImg.diffuseMap = imagesLoaded.tankDiffuse;
		tankImg.diffuseMapTrack = imagesLoaded.trackDiffuse;
		tankImg.floorMap = imagesLoaded.floorDiffuse;
		tankImg.plateMap = imagesLoaded.plateDiffuse;		
	
		
		bgImg.pic = imagesLoaded.bg;		
		
		//
		init();
	});
		
}

   
/* -------------------------------     INIT BANNER   ---------------------------------*/
function init()
{
	// OBJECTS INIT
	mousePos.x = w/2;
	mousePos.y = h/2;
	
	drawPatternElements();	
	
	darkerImg.alpha = 1;
	drawDarker(darkerImg);
	TweenLite.to(darkerImg, 1.4, {alpha: 0, ease:Power1.easeOut, onUpdate:drawDarker, onUpdateParams:[darkerImg]});
	
	
	
	
	tankImg.dashCanvas = document.createElement("CANVAS");
	tankImg.dashCanvas.width = 64;
	tankImg.dashCanvas.height = 64;
	tankImg.dashCtx = tankImg.dashCanvas.getContext('2d');
	tankImg.dashCtx.drawImage(tankImg.floorMap, 0, 0);
	tankImg.dashCtx.globalAlpha = 0.4;
	tankImg.dashCtx.fillStyle = "rgb(240, 200, 20)";
	tankImg.dashCtx.fillRect(0, 0, 64, 32);
	tankImg.dashCtx.globalAlpha = 0.5;
	tankImg.dashCtx.fillStyle = "rgb(0, 0, 0)";
	tankImg.dashCtx.fillRect(0, 32, 64, 32);
	
	
	helpPlateImg.canvas = document.createElement("CANVAS");
	helpPlateImg.canvas.width = 200;
	helpPlateImg.canvas.height = 200;
	
	var cjs = createjs;	
	
	logoIconImg.shape = new cjs.Shape();
	logoIconImg.shape.graphics.f("#333333").s().p("AkfBzIAAloICbiaIENAAICXCWIAAFsIkgEdgAkAjqIAAFPIEAD+IEBj+IAAlTIiHiFIjvAAgAg4D+IAAngIimAAIB3h5IDUAAIB0B5IimAAIAAHgIg7A7gAA8BgIA0gzIAAjiIBxAAIAAENIhWBWgAjgBYIAAkNIBxAAIAADiIA2AzIhRBOg");
	
	p360Img.shape = new cjs.Shape();
	p360Img.shape.graphics.f("#ffffff").s().p("AijDCQiOgVg4hQQgLg9AogaQghA2AnAkQBCA0BtACIEuAAQBtgCBDg0QAngkgig2QApAagMA9Qg3BQiPAVgAB2A4IAAjlICCAAIAADlgACUAaIBGAAIAAipIhGAAgAg8A4IAAjlICAAAIAAAeIhiAAIAABGIBiAAIAACBgAgeAaIBDAAIAAhFIhDAAgAjwA4IAAgeIBaAAIAAhFIglAAIAAgeIAlAAIAAhGIhaAAIAAgeICCAAIAADHIAAAegAEgiZIAAgoIAoAAIAAAog");
	p360Img.shape.setTransform(43.1,28.9);
	//draw360Pic();
	
	arrowsImg.shape = new cjs.Shape();
	arrowsImg.shape.graphics.lf(["rgba(226,226,226,0)","rgba(249,249,249,1)","rgba(255,255,255,1)"],[0,0.247,1],-38.2,0,38.2,0).s().p("AleC4QFDgvC3jiIhtgTIEgiFIAuC9Ih4gXQjEDsm+BSg");
	arrowsImg.shape.setTransform(36,-26.4);
	
	/////////////
	mouseImg.button = new cjs.Shape();
	mouseImg.button.graphics.c().s().p("AgiBkQgPgPAAgUIAAiAQAAgVAPgPQAQgPASAAQAUAAAPAPQAPAPAAAVIAACAQAAAUgPAPQgPAPgUAAQgTAAgPgPg");
	mouseImg.button.setTransform(0, 29.5);
	
	mouseImg.arrow = new cjs.Shape();
	mouseImg.arrow.graphics.c().s().p("AgrB5IAAh8IhRAAIB8h1IB9B1IhRAAIAAB8g");
	mouseImg.arrow.setTransform(0,22);
	
	mouseImg.zoom = new cjs.Shape();
	mouseImg.zoom.graphics.c().s().p("ACUDKIhOhOQgIgIAAgKQAAgIAFgHIgPgOQgsAkg3AAQhDgBgwgvQgvgvAAhAQAAhEAvgwQAwgvBDAAQBAAAAwAvQAvAwAABEQAAA2giArIAOAOQAHgDAHAAQALABAHAHIBOBPQAIAHAAALQAAAJgHAIIgTATQgHAHgKAAQgLgBgIgHgAiMiMQgnAnAAA3QAAAzAnAmQAnAnA2AAQA0AAAmgnQAmgmAAgzQAAg3gmgnQgmgmg0AAQg2AAgnAmg");
	mouseImg.zoom.setTransform(7,7);

	mouseImg.body = new cjs.Shape();
	mouseImg.body.graphics.c().s().p("Ag6HWQhwgBhQhPQhPhPAAhwIAAiiIKTAAIAACiQAABwhQBPQhPBPhwABgAAKAVIAAhHIAbgIQAUgGAFgGQAWgWAAgfIAAifQAAgfgWgXQgFgFgUgGIgbgIIAAhyIAxAAQBwAABPBPQBQBQAABwIAADbgAlJAVIAAjbQAAhwBPhQQBQhPBwAAIAyAAIAAByIgcAIQgUAGgGAFQgWAXABAfIAACfQgBAfAWAWQANAMApAIIAABHg");
	mouseImg.body.setTransform(0,50);


	// Layer 3
	mouseImg.stroke = new cjs.Shape();
	mouseImg.stroke.graphics.c().s().p("AkIGUQhVhVAAh4IAAmNQAAh4BVhVIABgBQBVhVB4AAIB1AAQB4AABVBVQBWBWAAB4IAAGNQgBB4hVBVIAAAAQhVBVh4AAIh1AAIAAAAQh4ABhWhWg");
	mouseImg.stroke.setTransform(0,50);
	
	drawFloorShadow();
	
	
	
	
	

	
	// LISTENERS
	canvasInteractive.addEventListener('click', mClick, false);
	canvasInteractive.addEventListener('mousemove', mMove, false);
	canvasInteractive.addEventListener('mouseover', mOver, false);
	canvasInteractive.addEventListener('mouseout', mOut, false);
	
	canvasInteractive.addEventListener("mousedown", mDown, false);
	canvasInteractive.addEventListener("mouseup", mUp, false);
	//wheel
	if (canvasInteractive.addEventListener) {
	  if ('onwheel' in document) {
		// IE9+, FF17+, Ch31+
		canvasInteractive.addEventListener("wheel", onWheel);
	  } else if ('onmousewheel' in document) {
		// устаревший вариант события
		canvasInteractive.addEventListener("mousewheel", onWheel);
	  } else {
		// Firefox < 17
		canvasInteractive.addEventListener("MozMousePixelScroll", onWheel);
	  }
	} else { // IE8-
	  canvasInteractive.attachEvent("onmousewheel", onWheel);
	}
	//
	document.addEventListener("visibilitychange", canvasWidthChange);	
	
	setStartPos();
	//WebGL
	gl = twgl.getWebGLContext(canvasWebGL);
	if(gl)
	{
		onePointProgramInfo = twgl.createProgramInfo(gl, ["one-point-vs", "one-point-fs"]);
		initTextures();
		initScene();
		TweenLite.ticker.addEventListener("tick", update);
	}
	else
	{
		logoImg.x = w/2;
		logoImg.y = h/2-30;
		
		Button.x = w/2;
		Button.sy = h/2+36;
		
		showButton();
		TweenLite.ticker.addEventListener("tick", update2D);
		canvasInteractive.removeEventListener('mousemove', mMove, false);
		canvasInteractive.addEventListener('mousemove', mMove2D, false);		
	}
}




function setStartPos()
{
	Button.x = w/2;
	Button.y = h - 44;
	Button.sx = Button.x;
	Button.sy = Button.y;
	Button.clickable = false;	
	Button.ctxClear = false;
	Button.glowMax = 0;
	
	logoImg.x = w/2;
	logoImg.y = 40;
	logoImg.scale = 1;
	logoImg.alpha = 1;
	logoImg.center = false;
	logoImg.noClear = true;		
	
	textPlate.width = w;
	textPlate.height = 30;
	textPlate.sx = w/2;
	textPlate.sy = h-54;
	textPlate.x = textPlate.sx;
	textPlate.y = textPlate.sy;
	textPlate.scale = 1;
	textPlate.alpha = 1;
	
	
	bgImg.scale = 1;
	
	tankImg.matrix = m4.identity();
	tankImg.rotation = -90; 
	tankImg.cRotation = tankImg.rotation;
	//tankImg.pAng = 26;
	tankImg.sScale = 9;
	tankImg.scale = tankImg.sScale;
	tankImg.dy = -4.5;
	tankImg.aAng = 0;
	tankImg.aDAng = 0;
	tankImg.bAng = 0;
	tankImg.dRot = 0;
	tankImg.scaleMult = 1.5;
	tankImg.angMult = 3.8;
	
	
	cam.x = w/2;
	cam.y = h/2;
	cam.dx = 0;
	cam.dy = 0;
	cam.amp =0;
	cam.ang =0;
	cam.sScale = 1;
	cam.scale = 1;
	cam.rotate = 0;
	cam.dScale = 0;
	cam.pAng = 26;
	
	mouseImg.x = w+100;
	mouseImg.y = h+100;
	mouseImg.scale = 0.4;
	mouseImg.alpha = 1;
	mouseImg.click = false;
	
	p360Img.x = 100;
	p360Img.y = 100;
	p360Img.scale = 1.2;
	p360Img.alpha = 0;
	
	
	zoomBarImg.x = 100;
	zoomBarImg.y = 100;
	zoomBarImg.scale = 1;
	zoomBarImg.alpha = 0;
	zoomBarImg.plus = {};
	zoomBarImg.minus = {};
	zoomBarImg.plus.alpha = 0;
	zoomBarImg.minus.alpha = 0;	

	helpPlateImg.alpha = 0;
	
	arrowsImg.right = {};
	arrowsImg.left = {};
	arrowsImg.timer = 0;
	
	arrowsImg.right.sx = 25;
	arrowsImg.right.sy = 50;
	arrowsImg.right.x = arrowsImg.right.sx;
	arrowsImg.right.y = arrowsImg.right.sy;
	arrowsImg.right.scaleX = 1;
	arrowsImg.right.scaleY = 1;
	arrowsImg.right.rotation = 0;
	arrowsImg.right.alpha = 1;
	
	arrowsImg.left.sx = -40;
	arrowsImg.left.sy = 50;
	arrowsImg.left.x = arrowsImg.left.sx;
	arrowsImg.left.y = arrowsImg.left.sy;
	arrowsImg.left.scaleX = -1;
	arrowsImg.left.scaleY = 1;
	arrowsImg.left.rotation = 0;
	arrowsImg.left.alpha = 1;
	
	
	Pattern.tPattern.alpha = 0.7;
	Pattern.bPattern.alpha = 0.7;		
	
	setStrings();		
	animate();
}

var time = 1;

 var objects = [];
var s_cAng = 8;
/* -------------------------------   UPDATE BANNER   ---------------------------------*/
function update2D()
{
	var ctx = canvasMain.getContext("2d");
	ctx.fillStyle = "#2c3424";	
	ctx.fillRect(0,0,w,h);
	drawButton(ctx);
	drawLogo(ctx, logoImg);	
}
function mMove2D(evt)
{	
	mousePos = getMousePos(evt);	
	if(Button.isOver == true)
	{
		canvasInteractive.style.cursor = 'pointer';
	}
	else
	{
		canvasInteractive.style.cursor = 'auto';
	}	
}
function update()
{
	
	
	var ctx = canvasMain.getContext("2d");
	ctx.clearRect(0,0,w,h);
	ctx.save();
		ctx.translate(cam.x+cam.dx, cam.y+cam.dy);
		ctx.scale(cam.scale+cam.dScale, cam.scale+cam.dScale);
		ctx.rotate(cam.rotate);
		ctx.translate(bgImg.x, bgImg.y)
		ctx.scale(bgImg.scale+(tankImg.scale-9)/22, bgImg.scale+(tankImg.scale-9)/22);
		ctx.drawImage(bgImg.pic, -bgImg.pic.width/2, -bgImg.pic.height/2)
	ctx.restore();	
	
	drawWebGL();
	
	var ctx = canvasButton.getContext('2d');
	ctx.clearRect(0, 0, w, h);
	
	drawPattern(ctx);
	
	helpPlateImg.canvas.getContext('2d').clearRect(0,0,200,200);
	
	drawZoomBar(ctx);
	draw360Plate(ctx);
	ctx.save();
	ctx.shadowColor = "black";
	ctx.shadowBlur = 12;	
	ctx.globalAlpha = helpPlateImg.alpha;
	ctx.drawImage(helpPlateImg.canvas, w/2-100, h/2-100);
	ctx.restore();
	
	drawTextPlate(ctx);	
	drawButton(ctx);
	
	
	drawLogo(ctx, logoImg);
	if(overFl == false && isAutoPlay == false)
	{
		autoPlayTimer++;
		if(autoPlayTimer > 400)
		{
			isAutoPlay = true;					
			autoPlayAnim();	
		}
	}	
}


/* -------------------------------   ANIMATE BANNER   ---------------------------------*/
var interactiveEnable = false;
function animate()
{
	tankImg.bAng = 20;	
	bgImg.y = 20;
	bgImg.scale = 0.8;	
	TweenLite.to(bgImg, 1, {scale: 1, y:0, ease:Power2.easeOut});
	TweenLite.to(cam, 1.2, {pAng: 18,  ease:Power2.easeOut});
	TweenLite.to(tankImg, 1.3, {delay:0.0, rotation:-30, bAng:-30, ease:Power2.easeOut});
	autoPlayAnim();
	
	
	showText(textPlate.frame1);
	
}

function autoPlayAnim()
{
	
	autoPlayTimer = 0;
	mouseImg.alpha = 1;
	
	
	isAutoPlay = true;
	TweenLite.to(helpPlateImg, 1, {alpha: 0.7,  ease:Power2.easeOut});
	TweenLite.to(p360Img, 1, {delay: 1.6, alpha: 1,  ease:Power2.easeOut});
	TweenLite.to(tankImg, 1.4, {delay: 1.5, dRot:-0.3, sScale:9, bAng:0, ease:Power2.easeInOut});	
	TweenLite.to(p360Img, 1, {delay: 5, alpha: 0,  ease:Power2.easeOut});
	TweenLite.to(zoomBarImg, 1, {delay: 6, alpha: 1,  ease:Power2.easeOut});
	TweenLite.to(zoomBarImg, 1, {delay: 9.4, alpha: 0,  ease:Power2.easeOut});
	TweenLite.to(tankImg, 1.6, {delay: 6, sScale:13, ease:Power3.easeInOut});
	TweenLite.to(zoomBarImg.plus, 0.6, {delay: 6.1, alpha:1, ease:Power2.easeInOut});
	TweenLite.to(zoomBarImg.plus, 0.6, {delay: 7.7, alpha:0, ease:Power2.easeInOut});

	TweenLite.to(tankImg, 1.4, {delay: 7.8, sScale:9, ease:Power3.easeInOut});
	TweenLite.to(zoomBarImg.minus, 0.6, {delay: 7.8, alpha:1, ease:Power2.easeInOut});
	TweenLite.to(zoomBarImg.minus, 0.6, {delay: 9, alpha:0, ease:Power2.easeInOut, onComplete:function(){isAutoPlay = false; interactiveEnable = true;}});

}


function stopAutoPlay()
{

	isAutoPlay = false;
	TweenLite.to(mouseImg, 0.3, {alpha:0,  ease:Power2.easeOut});
	TweenLite.to(helpPlateImg, 1, {alpha: 0,  ease:Power2.easeOut});
	TweenLite.killTweensOf(tankImg);	
	TweenLite.killDelayedCallsTo(autoPlayAnim);
	TweenLite.to(tankImg, 1, {bAng:0, sScale:9, ease:Power2.easeInOut});	
}

function camShake()
{
	//cam.y = 4;
	TweenLite.killTweensOf(cam);	
	TweenLite.to(cam, 0.05, {dy: 10, rotate:-0.02,  ease:Power2.easeOut});
	TweenLite.to(cam, 1.4, {delay:0.05, dy: 0,  ease:Elastic.easeOut});
	TweenLite.to(cam, 2, {delay:0.05, rotate:0,  ease:Elastic.easeOut});	
}

function camScale()
{
	//cam.y = 4;	
	
	TweenLite.to(cam, 0.04, {dScale: 0.08, ease:Power2.easeOut});
	TweenLite.to(cam, 1, {delay:0.04, dScale: 0,  ease:Elastic.easeOut});	
}


/* -------------------------------------------------------------------------------------
----------------------------------      SERVICE      ----------------------------------- 
--------------------------------------------------------------------------------------*/

function drawShape(ctx, parent, shape)
{

if(parent.alpha >0)
{	if(parent.alpha>1){parent.alpha=1;}
	ctx.save();
		ctx.translate(parent.x,parent.y);
		
		if(parent.hasOwnProperty('scaleX'))
		{
			ctx.scale(parent.scaleX,parent.scaleY);
		}
		else
		{
			ctx.scale(parent.scale,parent.scale);
		}
		ctx.rotate(parent.rotation);
		ctx.globalAlpha = parent.alpha;// * p360Img.alpha;
		ctx.translate(shape.x,shape.y);
		shape.draw(ctx);		
	ctx.restore();	
}
}

function drawRoundedRect(ctx,x,y,width,height,radius){
  ctx.beginPath();
  ctx.moveTo(x,y+radius);
  ctx.lineTo(x,y+height-radius);
  ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
  ctx.lineTo(x+width-radius,y+height);
  ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
  ctx.lineTo(x+width,y+radius);
  ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
  ctx.lineTo(x+radius,y);
  ctx.quadraticCurveTo(x,y,x,y+radius);
  ctx.closePath();
}

function drawCutImage(ctx, pic, obj)
{
	ctx.drawImage(pic, obj.box[0], obj.box[1], obj.box[2], obj.box[3], -obj.box[4], -obj.box[5], obj.box[2], obj.box[3]);
}

function rand(min, max)
{
    if (max === undefined) 
	{
        max = min;
        min = 0;
    }
    return min + Math.random() * (max - min);
}


function trueAlpha (alpha)
{
	if(alpha>1)
	{
		return 1;
	}
	else if(alpha<0)
	{
		return 0;
	}
	else
	{
		return Math.round(alpha*100)/100;
	}
}

function onWheel (e)
{
	 e = e || window.event;
	e.preventDefault();
	var delta = e.deltaY || e.detail || e.wheelDelta;

	if(delta>0)
	{
		tankImg.sScale -= 0.6;
	}
	else
	{
		tankImg.sScale += 0.6;
	}
		
	if(tankImg.sScale < 8){tankImg.sScale = 8;}
	if(tankImg.sScale > 12){tankImg.sScale = 12;}	
}

function mDown ()
{
	if(Button.isOver != true)
	{
		isDrag = true;
		cam.sX = mousePos.x+tankImg.rotation;	
	}
}
function mUp ()
{
		if(Button.isOver == true && isDrag == false)
		{
			setURL();	
		}
		isDrag = false;
}


function mOver()
{

	if(overFl == false && gl)
	{
		overFl = true;		
		showButton();		
		hideTextPlate();
		TweenLite.killDelayedCallsTo(autoPlayAnim);		
		autoPlayTimer = 0;
		if(isAutoPlay == true && interactiveEnable == true)
		{
			stopAutoPlay();
		}
	}
}

function mOut()
{
	if(overFl == true && gl)
	{
		isDrag = false;
		overFl = false;			
		showTextPlate();
		hideButton();
		autoPlayTimer = 0;
	}
}

function mMove(evt)
{	
	mousePos = getMousePos(evt);
	if(overFl == false)
	{
		mOver();
	}
	if(isDrag == true)
	{
		tankImg.rotation = cam.sX -  mousePos.x;		
	}
	if(Button.isOver == true)
	{
		canvasInteractive.style.cursor = 'pointer';
	}
	else
	{
		canvasInteractive.style.cursor = 'move';
	}
	
}


// MOUSE CLICK
function mClick(e)
{	
	
}

// GO TO URL
function setURL()
{
	// GOOGLE
	ExitApi.exit();
	Button.isOver = false;
}

// GET URL CLICKTAG FOR YANDEX
function getUrlParam(name) 
{
	  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	  results = regex.exec(location.search);
	  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// GET MOUSE COORDINATES
function getMousePos(e)
{
   var rect = canvasInteractive.getBoundingClientRect();
   return {
	  x: e.clientX - rect.left,
	  y: e.clientY - rect.top
   };
}

// LOADING IMAGES
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
		imagesLoaded[name].crossOrigin='Anonymous';
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

// DISABLING BUG IN CHROME TAB
function canvasWidthChange()
{              
    canvasMain.width = w + 1;
    canvasMain.width = w;      
}

// CLEAR ANY CANVAS
function clearCanvas(canv)
{
	var ctx = canv.getContext("2d");
	//
	ctx.clearRect(0, 0, w, h);
}

// CLEAR ALL ACTIVE CANVASES
function clearAll()
{
	clearCanvas(canvasMain);
}

// CONVERT DEGREES TO RADIANS
function radian(a)
{
	return a * Math.PI / 180;
}


/* -------------------------------------------------------------------------------------
----------------------------------      ACTIONS      ----------------------------------- 
--------------------------------------------------------------------------------------*/

//
window.onLoad = loadFonts();