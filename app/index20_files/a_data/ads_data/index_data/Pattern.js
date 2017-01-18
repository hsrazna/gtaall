//
function drawPattern(patObj)
{
	var ctx = patObj.canvas.getContext('2d');
	//
	ctx.clearRect(0, 0, w, h);
	//
	drawGradient(patObj, 0.8);
	//
	ctx.save();
	var pattern = ctx.createPattern(patObj.pic, 'repeat');
	ctx.fillStyle = pattern;
	ctx.globalCompositeOperation = "source-in";
	ctx.fillRect(0, 0, w, h);
	ctx.restore();
	//
	ctx.globalCompositeOperation = "destination-over";	
	drawGradient(patObj, 0.9);
	ctx.globalCompositeOperation = "source-over";
}

//
function drawGradient(patObj, power)
{
	var ctx = patObj.canvas.getContext('2d');
	//
	ctx.save();
	//
	var pWidth;
	//
	if(patObj.pos != "right")
	{
		pWidth = patObj.width;
		//
		ctx.translate(0, 0);
	}
	else
	{
		pWidth = patObj.width + pattBottomDelta;
		//
		ctx.translate(w, h);
		ctx.rotate(Math.PI);
	}
	//
	if(patObj.alpha < 0.001)
	{
		patObj.alpha = 0;
	}
	else if(patObj.alpha > 1)
	{
		patObj.alpha = 1;
	}
	//
	var grd = ctx.createLinearGradient(0, 0, pWidth, 0);
	grd.addColorStop(0, "rgba(0, 0, 0, 1)"); 
	grd.addColorStop(0.5, "rgba(0, 0, 0, " +  patObj.alpha * power + ")"); 
	grd.addColorStop(1, "rgba(0, 0, 0, 0)");
	//
	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, pWidth, h);
	//
	if(patObj.pos === "double")
	{
		ctx.translate(w, h);
		ctx.rotate(Math.PI);
		//
		grd = ctx.createLinearGradient(0, 0, patObj.width + pattBottomDelta, 0);
		grd.addColorStop(0, "rgba(0, 0, 0, " +  patObj.alpha * power + ")"); 
		grd.addColorStop(1, "rgba(0, 0, 0, 0)");
		//
		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, pWidth + pattBottomDelta, h);
	}
	//
	ctx.restore();
}