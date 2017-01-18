// DRAW BUTTON WITH TEXT
function drawButton(butObj)
{
	var ctx = butObj.canvas.getContext('2d');
	//
	ctx.save();
	//
	ctx.translate(butObj.x, butObj.y);
	ctx.scale(butObj.scale, butObj.scale);
	//
	ctx.shadowColor = "black";
	ctx.shadowBlur = 10;
	ctx.shadowOffsetY = 2;
	ctx.globalAlpha = butObj.alpha;
	//
	ctx.drawImage(butObj.pic, 0, 0, butObj.pic.width, butObj.pic.height);
	//
	ctx.font = 'bold '+butFontSize*buttonTextScale+'pt '+font;	
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.fillStyle = "#ffffff";
	//
	ctx.shadowColor = "#14090a";
	ctx.shadowBlur = 2;
	ctx.shadowOffsetY = 1;
	//
	ctx.fillText(buttonText, butObj.pic.width / 2, butObj.pic.height / 2);
	//
	ctx.restore();
}