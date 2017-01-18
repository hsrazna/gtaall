//
function drawDarker(dObj)
{
	if(dObj.alpha > 0.99)
	{
		dObj.alpha = 1;
	}
	else if(dObj.alpha < 0.01)
	{
		dObj.alpha = 0;
	}
	var ctx = dObj.canvas.getContext("2d");
	//
	ctx.clearRect(0, 0, w, h);
	//
	var grd=ctx.createRadialGradient(w/2,h/2,15,w/2,h/2,w/2);
	grd.addColorStop(0,"rgba(0, 0, 0, " + dObj.alpha + ")");
	grd.addColorStop(1,"rgba(0, 0, 0, " + dObj.alpha*1.2 + ")");	
	ctx.fillStyle=grd;
	ctx.fillRect(0,0,w,h);
}