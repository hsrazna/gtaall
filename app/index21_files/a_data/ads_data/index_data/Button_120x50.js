var Button = {}
Button.glowAng = -Math.PI/2;
Button.glowCounter = 0;
Button.glowMax = 2;
Button.alpha = 0;
Button.isOver = false;
Button.clickable = true;

var drawButton = function(ctx) {
	ctx.clearRect(0, 0, w, h);
	ctx.save();
	ctx.translate(Button.x,Button.y);
	ctx.scale(Button.scale,Button.scale);
	ctx.globalAlpha = Button.alpha;

	ctx.beginPath();
	ctx.moveTo(60,-22);
	ctx.quadraticCurveTo(60,-25,57,-25);
	ctx.lineTo(-57,-25);
	ctx.quadraticCurveTo(-60,-25,-60,-22);
	ctx.lineTo(-60,22);
	ctx.quadraticCurveTo(-60,25,-57,25);
	ctx.lineTo(57,25);
	ctx.quadraticCurveTo(60,25,60,22);
	ctx.lineTo(60,-22);
	ctx.closePath();

	ctx.translate(-60, -25);
	var pattern = ctx.createPattern(Button.pic, 'repeat');
	ctx.fillStyle = pattern;
	ctx.shadowColor = "black";
	ctx.shadowBlur = 10;
	ctx.shadowOffsetY = 2;
	ctx.fill();
	ctx.shadowColor = "transparent";
	ctx.translate(+60, +25);		

	ctx.font = "bold 17pt "+font;
	ctx.shadowColor = "#8E1A0D";
	ctx.shadowBlur = 0; 
	ctx.shadowOffsetX = 1 * Button.scale;
	ctx.shadowOffsetY = 1 * Button.scale;
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("В БОЙ", 0, 0);
	
	var grd = ctx.createLinearGradient(Math.cos(Button.glowAng)*-70,Math.sin(Button.glowAng)*-70,Math.cos(Button.glowAng)*70,Math.sin(Button.glowAng)*70);
	grd.addColorStop(0.9, "rgba(255, 255, 255, 0)");
	grd.addColorStop(0.53, "rgba(255, 255, 255, "+Math.round((Math.sin(Button.glowAng)+1)/2.5*100)/100+")");
	grd.addColorStop(0.47, "rgba(255, 255, 255, "+Math.round((Math.sin(Button.glowAng)+1)/2.5*100)/100+")");		
	grd.addColorStop(0.1, "rgba(255, 255, 255, 0)");			
	ctx.fillStyle = grd;		
	ctx.globalCompositeOperation = "lighter";
	ctx.fill();
	ctx.restore();	
};

function showButton()
{
	Button.alpha = 1.2;
	Button.glowAng =  -Math.PI/2;
	Button.scale = 1;	
	Button.glowCounter = 0;
	Button.isOver = false;
	Button.outComp = true;
	TweenLite.from(Button, 0.8, {scale:1.8, alpha:0, ease: Bounce.easeOut, onUpdate:drawButton, onUpdateParams:[Button.ctx], onComplete:setButtonMouse});
}

function setButtonMouse()
{
	canvasInteractive.addEventListener('mousemove', buttonMove, false);
	canvasInteractive.addEventListener('mouseout', buttonOut, false);	
	canvasInteractive.addEventListener('click', buttonClick, false);
	if(Button.glowCounter<Button.glowMax)
	{
		showGlow();
	}	
}

function showGlow()
{
	Button.glowCounter++;
	Button.glowAng =  -Math.PI/2;
	TweenLite.to(Button, 2, {glowAng:3*Math.PI/2, ease:Power1.easeOut, onUpdate:drawButton, onUpdateParams:[Button.ctx]});
	if(Button.glowCounter<Button.glowMax)
	{
		TweenLite.delayedCall(5,showGlow);
	}
}

function buttonClick(evt)
{
	mousePos = getMousePos(evt);
	if(hitTestButton(mousePos)==true&&Button.clickable==true)
	{
		setURL();
	}
}

function buttonMove(evt)
{
	mousePos = getMousePos(evt);
	if(Button.isOver==false&&hitTestButton(mousePos)==true)
	{
		Button.isOver = true;				
		buttonOver();
	}	
	if(Button.isOver==true&&hitTestButton(mousePos)==false)
	{
		Button.isOver = false;					
		buttonOut();
	}
}

function hitTestButton(mousePos)
{
	var leftBorder = Button.x-Button.pic.width*Button.scale/2;
	var topBorder = Button.y-Button.pic.height*Button.scale/2;
	if(mousePos.x > leftBorder && mousePos.x < (leftBorder + Button.pic.width*Button.scale) && mousePos.y > topBorder && mousePos.y < topBorder+Button.pic.height*Button.scale)
	{		
		return true;
	}
	else
	{	
		return false;	
	}		
}

function hideButton()
{
	TweenLite.killTweensOf(Button);
	TweenLite.to(Button, 0.4, {alpha:0, scale:0.8, ease:Power1.easeOut, onUpdate:drawButton, onUpdateParams:[Button.ctx]});
	canvasInteractive.removeEventListener('mousemove', buttonMove, false);
	canvasInteractive.removeEventListener('mouseout', buttonOut, false);	
	canvasInteractive.removeEventListener('click', buttonClick, false);
}

function buttonOver(e)
{		
	Button.outComp = true;
	TweenLite.to(Button, 0.9, {scale:1.2, ease: Elastic.easeOut, onUpdate:drawButton, onUpdateParams:[Button.ctx]});			
}
function buttonOut(e)
{	
	if(Button.outComp==true)
	{
		Button.outComp = false;
		TweenLite.to(Button, 0.7, {scale:1, ease: Elastic.easeOut, onUpdate:drawButton, onUpdateParams:[Button.ctx], onComplete:function (){Button.outComp = true;}});
	}
}
