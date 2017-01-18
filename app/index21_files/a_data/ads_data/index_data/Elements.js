
function drawBullet(ctx, obj)
{
	ctx.save();
	ctx.clearRect(0, 0, w, h);
	ctx.globalAlpha = obj.alpha;
	ctx.scale (obj.scale, obj.scale);
	//
	ctx.fillStyle = "rgb(76, 0, 0)"
	ctx.fillRect (0,h-6 ,w, 4)
	//
	ctx.fillStyle = "rgb(231, 0, 0)"
	ctx.fillRect (0,h-6 ,redLineW, 4)
	ctx.drawImage(obj.pic, obj.x, obj.y, obj.pic.width, obj.pic.height);
	//
	ctx.font = "22pt "+ font;
	ctx.textBaseline = "middle";
	ctx.textAlign = "left";
	//
	if(obj.alpha > 0.99)
	{
		obj.alpha = 1;
	}
	else if(obj.alpha < 0.01)
	{
		obj.alpha = 0;
	}
	var gradient = ctx.createLinearGradient(0, 550, 0, 572);
    gradient.addColorStop(0, "rgba(226, 229, 231, " + obj.alpha + ")");
    gradient.addColorStop(0.89, "rgba(243, 242, 243, " + obj.alpha + ")");
    gradient.addColorStop(1, "rgba(167, 176, 184, " + obj.alpha + ")");
	ctx.fillStyle = gradient
	ctx.fillText(bulletNum, 24, 572);
	//
	drawTracer(ctxElements,img_bigBullet)
	//
	drawBigBullet(ctxElements,img_bigBullet)

	ctx.restore();
}
function drawBigBullet(ctx, obj)
{
	ctx.save();
	ctx.globalAlpha = obj.alpha;
	ctx.translate(obj.x, obj.y)
	ctx.scale (obj.scale, obj.scale);
	//
	ctx.beginPath();
	ctx.fillStyle = "rgba(255, 237, 135, 1)";
	ctx.arc(0, 0, 4, 0, 2 * Math.PI, false);
	ctx.fill();
	//
	ctx.beginPath();
	ctx.fillStyle = "rgba(255, 255, 255, 1)";
	ctx.arc(0, 0, 2, 0, 2 * Math.PI, false);
	ctx.fill();
	//
	ctx.restore();
}

function drawTracer(ctx, obj)
{
	ctx.save();
	ctx.globalAlpha = obj.alpha;
	ctx.translate(obj.x, obj.y)
	ctx.scale (obj.scale, obj.scale);
	//
	ctx.beginPath();
	var grd = ctx.createLinearGradient(-2, 0, 3, 16);
    grd.addColorStop(0, "rgba(255, 255, 255, 1)");
    grd.addColorStop(1, "rgba(255, 255, 255, 0)");
	//
	ctx.fillStyle = grd;
	ctx.fillRect(- 2, 0, 3, 16)

	ctx.restore();
}