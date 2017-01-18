var againPlate = {};
againPlate.height = 19;
againPlate.width = 0;
againPlate.scale = 1;

againPlate.gradient = [0,0.33,0.66,1];
var ctxAgain;
function setAgainPlate()
{
	var againCanvas = document.createElement('canvas');
	againCanvas.id = "AgainPlate";
	againCanvas.width = w;
	againCanvas.height = h;
	againCanvas.style.zIndex = 50;
	againCanvas.style.position = "absolute";
	againCanvas.style.left = 0;
	againCanvas.style.top = 0;

	var body = document.getElementsByTagName("body")[0];
	body.appendChild(againCanvas);
	againCanvas = document.querySelector("#AgainPlate");
	ctxAgain = againCanvas.getContext('2d');	
	
	againPlate.x = w/2;
	
	
	againPlate.sy = h;
	againPlate.y = againPlate.sy;
	againPlate.isOver = false;
	againPlate.alpha = 0.5;
	if(againPlate.width==0)
	{
		againPlate.width = w;
	}
	
}

function hideAgainPlate()
{
	TweenLite.to(againPlate, 0.4, {y: h,  ease:Power2.easeOut, onUpdate:drawAgainPate});
	canvasInteractive.removeEventListener('mousemove', againHitTest, false);
	canvasInteractive.removeEventListener('click', againClick, false);
	canvasInteractive.removeEventListener('mouseout', againOut, false);
	
}

function showAgainPlate()
{
	againPlate.isOver = false;	
	againPlate.alpha = 0.5;
	
	TweenLite.to(againPlate, 0.4, {y: h-againPlate.height*againPlate.scale,  ease:Power2.easeOut, onUpdate:drawAgainPate});
	canvasInteractive.addEventListener('mousemove', againHitTest, false);
	canvasInteractive.addEventListener('click', againClick, false);
	canvasInteractive.addEventListener('mouseout', againOut, false);
	
	
}

function againClick(evt)
{
	mousePos = getMousePos(evt);
	if(againPlate.isOver==true)
	{
		TweenLite.killDelayedCallsTo(restartBanner);
		restartBanner();
		hideAgainPlate();
	}
}

function againHitTest(evt)
{
	mousePos = getMousePos(evt);
	if(mousePos.y>againPlate.y&&againPlate.isOver==false&&mousePos.x>againPlate.x-againPlate.width/2*againPlate.scale&&mousePos.x<againPlate.x+againPlate.width/2*againPlate.scale)
	{				
		againOver();				
	}
	if(mousePos.y<againPlate.y&&againPlate.isOver==true||mousePos.x<againPlate.x-againPlate.width/2*againPlate.scale||mousePos.x>againPlate.x+againPlate.width/2*againPlate.scale)
	{				
		againOut();				
	}
}

function againOver()
{
	againPlate.isOver=true;		
	TweenLite.killTweensOf(againPlate);				
	TweenLite.to(againPlate, 0.4, {y:h - (againPlate.height + 3)*againPlate.scale, /*paramG: 60, paramB: 50,*/ alpha:0.9, ease:Elastic.easeOut, onUpdate:drawAgainPate});
	
}

function againOut()
{
	againPlate.isOver=false;
	TweenLite.killTweensOf(againPlate);
	TweenLite.to(againPlate, 0.2, {y:h - againPlate.height*againPlate.scale, alpha:0.5, ease: Power2.easeOut, onUpdate:drawAgainPate});
}

function drawAgainPate()
{

	var ctx = ctxAgain;
	
	ctx.clearRect(0,0,w,h);
	ctx.save();
	ctx.translate(againPlate.x,againPlate.y);
	ctx.scale(againPlate.scale,againPlate.scale);
	ctx.globalAlpha = againPlate.alpha;
		
		var plateGrad = ctx.createLinearGradient(-againPlate.width/2,0,againPlate.width/2,0);
				plateGrad.addColorStop(againPlate.gradient[0], "rgba(140, 140, 140, 0)");
		plateGrad.addColorStop(againPlate.gradient[1], "rgba(140, 140, 140, 1)");
		plateGrad.addColorStop(againPlate.gradient[2], "rgba(140, 140, 140, 1)");
		plateGrad.addColorStop(againPlate.gradient[3], "rgba(140, 140, 140, 0)");
		ctx.fillStyle = plateGrad;		
		ctx.fillRect(-w/2,0,w,againPlate.height+3);
		
		ctx.font = 'bold 8pt '+font;			
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";		
		
		ctx.fillStyle = "#ffffff";
		
		ctx.fillText("ПОПРОБОВАТЬ ЕЩЕ РАЗ", 0, 10);
		
		
		
	ctx.restore();
}