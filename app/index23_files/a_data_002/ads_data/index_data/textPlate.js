/* -------------------------------------------------------------------------------------
--------------                        WARGAMING.NET                       --------------
----------------------------------------------------------------------------------------
--------------                 © 2016 ALL RIGHTS RESERVED                 --------------
--------------------------------------------------------------------------------------*/
function drawTextPlate(ctx)
{
	//textPlate.ang+=0.2;
	ctx.save();
	ctx.translate(textPlate.x,textPlate.y);		
	ctx.scale(1,1);		
		/*var grd = ctx.createLinearGradient(-textPlate.width/2, 0, textPlate.width/2, 0);
		grd.addColorStop(0, "rgba(210, 12, 0, "+trueAlpha(textPlate.alpha*0.6)+")");
		grd.addColorStop(0.2, "rgba(210, 12, 0, "+trueAlpha(textPlate.alpha)+")");
		grd.addColorStop(0.8, "rgba(210, 12, 0, "+trueAlpha(textPlate.alpha)+")");
		grd.addColorStop(1, "rgba(210, 12, 0, "+trueAlpha(textPlate.alpha*0.6)+")");		
		ctx.fillStyle = grd;	
		ctx.fillRect(-textPlate.width/2, -textPlate.height/2, textPlate.width, textPlate.height);
		
		ctx.fillStyle = "#ffffff";
		if(arrowImg.side != 0)
		{
			ctx.fillRect(textPlate.width/2-textPlate.width/300*textPlate.timer, -textPlate.height/2, textPlate.width/300*textPlate.timer, 1);
		}
		*/
		
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";		
		for(var i =0; i<textPlate.animText.length;i++)
		{
			
			ctx.fillStyle = "rgba(255, 255, 255, "+trueAlpha(textPlate.animText[i].alpha*textPlate.alpha)+")";			
			ctx.font = textPlate.animText[i].font;	
	
			var scale = 1;
			if(ctx.measureText(textPlate.animText[i].text.replace("$", "").replace("%", "")).width>150)
			{	
				scale = 150/ctx.measureText(textPlate.animText[i].text.replace("$", "").replace("%", "")).width;					
				//ctx.scale(scale,scale);
			}
			
			ctx.save();
			ctx.translate(0, textPlate.animText[i].y);
			ctx.scale(scale,scale);		
			ctx.shadowColor = "black";
			ctx.shadowBlur = 8;			
			ctx.fillText(textPlate.animText[i].text, textPlate.animText[i].x, 0);							
			ctx.shadowColor = "transparent";			
			
			
		ctx.restore();
		}
	ctx.restore();
}


function showText(textArray, delay)
{	

	var i=0;
	delay = delay || 2.5;	
	
	/*
	for(i=0;i<textPlate.textArray.length;i++)
	{
		textPlate.textArray[i].alpha = 0;
	}*/
	for(i=0;i<textPlate.animText.length;i++)
	{		
		TweenLite.killTweensOf(textPlate.animText[i]);		
		TweenLite.to(textPlate.animText[i], 0.1,{delay: (textPlate.animText.length-i)/8, x:textPlate.animText[i].x-60, alpha:0, ease:Circ.easeIn});
	}
	TweenLite.delayedCall(textPlate.animText.length/8+0.2, function ()
	{
		textPlate.animText.splice(0,textPlate.animText.length);
		textPlate.animText = new Array();
		for(i=0;i<textArray.length;i++)
		{
			textPlate.textArray[textArray[i]].alpha=1;		
			var tx = textPlate.textArray[textArray[i]].x;
			TweenLite.from(textPlate.textArray[textArray[i]], 0.2,{delay: i/8, x:tx+60, alpha:0, ease:Circ.easeOut});		
			//TweenLite.to(textPlate.textArray[textArray[i]], 0.4,{delay: (textArray.length-i)/5+delay, x:tx-100, alpha:0, ease:Circ.easeIn});
			textPlate.animText.push(textPlate.textArray[textArray[i]]);		
		}		
	});	
}

function hideText()
{
	for(i=0;i<textPlate.animText.length;i++)
	{		
		TweenLite.killTweensOf(textPlate.animText[i]);		
		TweenLite.to(textPlate.animText[i], 0.1,{delay: (textPlate.animText.length-i)/8, x:textPlate.animText[i].x-60, alpha:0, ease:Circ.easeIn});
	}
	TweenLite.delayedCall(textPlate.animText.length/8+0.2, function ()
	{
		textPlate.animText.splice(0,textPlate.animText.length);
		textPlate.animText = new Array();
	});
}


function showTextPlate()
{	
	TweenLite.to(textPlate, 0.2, {y: textPlate.sy, alpha:1, ease:Sine.easeOut});
}

function hideTextPlate()
{
	TweenLite.to(textPlate, 0.2, {y: h+textPlate.height, alpha:0,  ease:Sine.easeOut});
}
