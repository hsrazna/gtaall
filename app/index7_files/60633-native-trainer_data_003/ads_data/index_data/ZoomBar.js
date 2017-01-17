/* -------------------------------------------------------------------------------------
--------------                        WARGAMING.NET                       --------------
----------------------------------------------------------------------------------------
--------------                 © 2016 ALL RIGHTS RESERVED                 --------------
----------------------------------------------------------------------------------------
--------------                        VERSION: 1.00                       --------------
--------------------------------------------------------------------------------------*/

function drawZoomBar(ctx)
{
	ctx = helpPlateImg.canvas.getContext('2d');	

	ctx.save();
		ctx.translate(zoomBarImg.x, zoomBarImg.y);
		ctx.scale(zoomBarImg.scale, zoomBarImg.scale);
		ctx.globalAlpha = zoomBarImg.alpha;
		ctx.fillStyle = "#ffffff";	
		
		mouseImg.x = -20;
		mouseImg.y = -22;
		mouseImg.scale = 0.5;
		mouseImg.alpha = 1;
	
	
		ctx.save();
			ctx.translate(mouseImg.x,mouseImg.y);		
			ctx.scale(mouseImg.scale,mouseImg.scale);			
			ctx.translate(mouseImg.stroke.x, mouseImg.stroke.y);
			mouseImg.stroke.draw(ctx);
			ctx.translate(-mouseImg.stroke.x, -mouseImg.stroke.y);			
			ctx.fillStyle = "#000000";
			ctx.fill();
			
			ctx.translate(mouseImg.body.x, mouseImg.body.y);
			mouseImg.body.draw(ctx);
			ctx.translate(-mouseImg.body.x, -mouseImg.body.y);
			ctx.fillStyle = "#ffffff";
			ctx.fill();
			
			ctx.translate(mouseImg.button.x, mouseImg.button.y);
			mouseImg.button.draw(ctx);	
			ctx.translate(-mouseImg.button.x, -mouseImg.button.y);			
			ctx.fillStyle = "#ff0000";		
			ctx.fill();
	
			ctx.save();
				ctx.translate(0, (Math.sin(arrowsImg.timer*1.6)*6)-4);
				ctx.scale(1, 1 + (Math.sin(arrowsImg.timer*1.6+radian(180))+1)*0.2);	
				mouseImg.arrow.draw(ctx);	
				//drawShape(ctx, mouseImg, mouseImg.arrow);		
				ctx.fillStyle = "rgba(255,0,0,"+trueAlpha(zoomBarImg.plus.alpha)+")";
				ctx.strokeStyle = "rgba(0,0,0,"+trueAlpha(zoomBarImg.plus.alpha)+")";
					
				ctx.fill();	
				ctx.stroke();
			ctx.restore();

			ctx.translate(0, -(Math.sin(arrowsImg.timer*1.6)*6)+60);
			ctx.scale(1, -(0.9 + (Math.sin(arrowsImg.timer*1.6+radian(180))+1)*0.15));
			mouseImg.arrow.draw(ctx);		
			ctx.fillStyle = "rgba(255,0,0,"+trueAlpha(zoomBarImg.minus.alpha)+")";
			ctx.strokeStyle = "rgba(0,0,0,"+trueAlpha(zoomBarImg.minus.alpha)+")";
			
			ctx.fill();	
			ctx.stroke();

		ctx.restore();	
	
	
		ctx.translate(26, 0);
		ctx.fillStyle = "#ffffff";
		mouseImg.zoom.draw(ctx);
		ctx.fill();
	
		ctx.fillStyle = "rgba(255, 255, 255, "+trueAlpha(zoomBarImg.plus.alpha)+")";
		
		ctx.save();
		ctx.translate(-5, -5);
		ctx.scale(0.9,0.9);
		ctx.beginPath();		
		ctx.moveTo(-8, -2);
		ctx.lineTo(-2, -2);
		ctx.lineTo(-2, -8);
		ctx.lineTo(2, -8);
		ctx.lineTo(2, -2);
		ctx.lineTo(8, -2);
		ctx.lineTo(8, 2);
		ctx.lineTo(2, 2);
		ctx.lineTo(2, 8);
		ctx.lineTo(-2, 8);
		ctx.lineTo(-2, 2);
		ctx.lineTo(-8, 2);
		ctx.lineTo(-8, -2);				
		ctx.closePath();
		ctx.fill();
		ctx.restore();
		
		ctx.save();
		ctx.translate(-5, -5);		
		ctx.scale(0.9,0.9);
		ctx.fillStyle = "rgba(255, 255, 255, "+trueAlpha(zoomBarImg.minus.alpha)+")";
		ctx.fillRect(-8, -2, 16, 4);
		ctx.restore();
	ctx.restore();	
	ctx.restore();
}

