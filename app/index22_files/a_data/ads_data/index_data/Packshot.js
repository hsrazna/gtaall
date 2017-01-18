function drawPackshot(ctx, obj)
{
	ctx.save();
	ctx.clearRect(0, 0, w, h);
	ctx.globalAlpha = obj.alpha;
	ctx.translate(obj.x, obj.y)
	ctx.scale (obj.scale, obj.scale);
	ctx.translate(- obj.pic.width/2, - obj.pic.height/2);
	//
	ctx.drawImage(obj.pic, 0, 0, obj.pic.width, obj.pic.height);

	ctx.restore();
}