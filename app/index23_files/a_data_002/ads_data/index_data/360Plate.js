/* -------------------------------------------------------------------------------------
--------------                        WARGAMING.NET                       --------------
----------------------------------------------------------------------------------------
--------------                 © 2016 ALL RIGHTS RESERVED                 --------------
--------------------------------------------------------------------------------------*/

function draw360Pic()
{
	var nCanvas = document.createElement("CANVAS");	
	var scale = 1.6;
	nCanvas.width = 100 * scale;
	nCanvas.height = 60 * scale;	
	ctx = nCanvas.getContext('2d');	
	
	ctx.translate(50*scale,30*scale);
	ctx.scale(scale, scale);
	ctx.shadowColor = "black";
	ctx.shadowBlur = 8;		
	p360Img.shape.draw(ctx);
	p360Img.shape.draw(ctx);
	p360Img.shape.draw(ctx);
	p360Img.shape.draw(ctx);
	
	//p360Img.pic = nCanvas;
	//canvasInteractive.getContext('2d').drawImage(nCanvas,150,150);	
}

function draw360Plate(ctx)
{
	arrowsImg.timer += 0.11;

	ctx = helpPlateImg.canvas.getContext('2d');	

	ctx.save();
		ctx.translate(p360Img.x, p360Img.y);
		ctx.scale(p360Img.scale, p360Img.scale);
		ctx.globalAlpha = p360Img.alpha;//*helpPlateImg.alpha;
		//ctx.shadowColor = "black";
		//ctx.shadowBlur = 12;	
		p360Img.shape.draw(ctx);
		
		ctx.save();
		ctx.translate(Math.sin(arrowsImg.timer)*5+10,17);
		ctx.beginPath();
		ctx.moveTo(0,-5.5);
		ctx.lineTo(10, 0);
		ctx.lineTo(0, 5.5);
		ctx.lineTo(0, -5.5);
		ctx.closePath();
		ctx.fillStyle = "rgba(255,255,255,"+p360Img.alpha+")";
		ctx.fill();
		ctx.restore();
		
		ctx.save();
		ctx.translate(Math.sin(arrowsImg.timer)*5-10,17);
		ctx.beginPath();
		ctx.moveTo(0,-5.5);
		ctx.lineTo(-10, 0);
		ctx.lineTo(0, 5.5);
		ctx.lineTo(0, -5.5);
		ctx.closePath();
		ctx.fillStyle = "rgba(255,255,255,"+p360Img.alpha+")";
		ctx.fill();
		ctx.restore();
			
	ctx.restore();
}