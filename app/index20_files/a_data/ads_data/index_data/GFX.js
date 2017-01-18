// JPEG
function drawFon(picObj)
{
	var ctx = picObj.canvas.getContext('2d');
	//
	ctx.save();
	ctx.translate(picObj.x, picObj.y);
	ctx.scale(picObj.scaleX, picObj.scaleY);
	ctx.globalAlpha = picObj.alpha;
	//
	ctx.drawImage(picObj.pic, 0, 0, picObj.pic.width, picObj.pic.height);
	//
	ctx.restore();
}

var fireSpeed = 3.2;
var fireParam = 1;
var fireParamSpd = 0.02;

//
function drawFire(picObj)
{
	var ctx = picObj.canvas.getContext('2d');
	//
	ctx.save();
	ctx.rotate(radian(30));
	ctx.translate(picObj.x, picObj.y);
	ctx.globalAlpha = picObj.alpha;
	//
	ctx.beginPath();
	ctx.rect(- picObj.pic.width, -picObj.pic.height, picObj.pic.width * 3, picObj.pic.height * 2);
	var grd = ctx.createLinearGradient(- picObj.pic.width, 0, 2 * picObj.pic.width, 0);
	grd.addColorStop(0, "rgba(255, 55, 0, 0)");
	grd.addColorStop(0.5, "rgba(255, 55, 0, " + 0.4 * fireParam + ")");
	grd.addColorStop(1, "rgba(255, 55, 0, 0)");
	ctx.fillStyle = grd;
	ctx.fill();
	//
	ctx.beginPath();
	ctx.rect(0, -picObj.pic.height * picObj.height, picObj.pic.width, picObj.pic.height * 2);
	var pattern = ctx.createPattern(picObj.pic, 'repeat');
	ctx.fillStyle = pattern;
	ctx.fill();
	//
	ctx.restore();
	//
	picObj.y -= fireSpeed;
	//
	var hDelta = picObj.pic.height - h;
	//
	if(picObj.y <= - hDelta - 36 && picObj.pic.height >= 1)
	{
		picObj.y += picObj.pic.height;
	}
}

//
function drawFuel(picObj)
{
	var ctx = picObj.canvas.getContext('2d');
	//
	ctx.save();
	ctx.translate(picObj.x, picObj.y);
	ctx.scale(0.85, 0.85);
	ctx.rotate(radian(90));
	ctx.globalAlpha = picObj.alpha;
	//
	ctx.beginPath();
	ctx.moveTo(15.299,65.75);
	ctx.bezierCurveTo(15.299,74.034,8.582999999999998,80.75,0.2989999999999995,80.75);
	ctx.lineTo(-0.2990000000000005,80.75);
	ctx.bezierCurveTo(-8.583000000000002,80.75,-15.299000000000001,74.034,-15.299000000000001,65.75);
	ctx.lineTo(-15.299000000000001,-65.75);
	ctx.bezierCurveTo(-15.299000000000001,-74.034,-8.583000000000002,-80.75,-0.29900000000000126,-80.75);
	ctx.lineTo(0.2989999999999987,-80.75);
	ctx.bezierCurveTo(8.583,-80.75,15.299,-74.034,15.299,-65.75);
	ctx.lineTo(15.299,65.75);
	ctx.closePath();
	//
	ctx.translate(-16, -82);
	//
	ctx.shadowColor = "rgba(10, 8, 6, 1)";
	ctx.shadowBlur = 16;
	ctx.shadowOffsetY = 1;
	//
	var pattern = ctx.createPattern(picObj.pic_inf, 'repeat');
	ctx.fillStyle = pattern;
	ctx.fill();
	//
	ctx.translate(16, 82);
	//
	var dist = picObj.pic_inf.height * 0.0316 * 9 - picObj.pic_inf.height * 0.0316 * picObj.fuel * 18;
	//
	ctx.beginPath();
	ctx.moveTo(0, dist - 3);
	ctx.lineTo(-10.299,dist - 3);
	ctx.lineTo(-10.299,60.25);
	ctx.bezierCurveTo(-10.299,68.534,-8.583,73.25,-0.2989999999999995,73.25);
	ctx.bezierCurveTo(7.985000000000001,73.25,9.701,68.534,9.701,60.25);
	ctx.lineTo(9.7, dist - 3);
	ctx.lineTo(0, dist - 3);
	//
	var grd = ctx.createLinearGradient(0, picObj.pic_inf.height * 0.0316 * 9, 0, - picObj.pic_inf.height * 0.0316 * 9);
	//
	grd.addColorStop(0,    "rgba(230,  20,   0,    1)");
	grd.addColorStop(0.33, "rgba(255, 105,  40,    1)");
	grd.addColorStop(0.66, "rgba(255, 255,  55, 0.80)");
	grd.addColorStop(1,    "rgba(255, 255, 105, 0.35)");
	//
	ctx.fillStyle = grd;
	ctx.fill();
	//
	ctx.beginPath();
	ctx.drawImage(picObj.pic_lgt, -picObj.pic_lgt.width / 2, - picObj.pic_lgt.height / 2 - 3, picObj.pic_lgt.width, picObj.pic_lgt.height);
	//
	for(var i = 0; i < 19; i++)
	{
		ctx.moveTo(-3, - picObj.pic_inf.height * 0.3 + i * picObj.pic_inf.height * 0.0316);
		ctx.lineTo(3, - picObj.pic_inf.height * 0.3 + i * picObj.pic_inf.height * 0.0316);
	}
	//
	ctx.lineWidth = 0.5;
	ctx.strokeStyle = "black";
	ctx.stroke();
	//
	ctx.beginPath();
	ctx.moveTo(-4, - picObj.pic_inf.height * 0.3 +  4 * picObj.pic_inf.height * 0.0316);
	ctx.lineTo( 4, - picObj.pic_inf.height * 0.3 +  4 * picObj.pic_inf.height * 0.0316);
	ctx.moveTo(-6, - picObj.pic_inf.height * 0.3 +  9 * picObj.pic_inf.height * 0.0316);
	ctx.lineTo( 6, - picObj.pic_inf.height * 0.3 +  9 * picObj.pic_inf.height * 0.0316);
	ctx.moveTo(-4, - picObj.pic_inf.height * 0.3 + 14 * picObj.pic_inf.height * 0.0316);
	ctx.lineTo( 4, - picObj.pic_inf.height * 0.3 + 14 * picObj.pic_inf.height * 0.0316);
	//
	ctx.lineWidth = 1;
	ctx.strokeStyle = "black";
	ctx.stroke();
	//
	/*ctx.rotate(radian(90));
	ctx.beginPath();
	// E
	ctx.moveTo(2.5,59.156);
	ctx.lineTo(2.5,57.156);
	ctx.lineTo(-0.5,57.156);
	ctx.lineTo(-2.5,57.156);
	ctx.lineTo(-2.5,59.156);
	ctx.lineTo(-2.5,61.156);
	ctx.lineTo(-2.5,63.156);
	ctx.lineTo(-2.5,65.156);
	ctx.lineTo(-2.5,67.156);
	ctx.lineTo(-0.5,67.156);
	ctx.lineTo(2.5,67.156);
	ctx.lineTo(2.5,65.156);
	ctx.lineTo(-0.5,65.156);
	ctx.lineTo(-0.5,63.156);
	ctx.lineTo(2.5,63.156);
	ctx.lineTo(2.5,61.156);
	ctx.lineTo(-0.5,61.156);
	ctx.lineTo(-0.5,59.156);
	ctx.lineTo(2.5,59.156);
	// F
	ctx.moveTo(2.5,-66.917);
	ctx.lineTo(2.5,-68.917);
	ctx.lineTo(-0.5,-68.917);
	ctx.lineTo(-2.5,-68.917);
	ctx.lineTo(-2.5,-66.917);
	ctx.lineTo(-2.5,-64.917);
	ctx.lineTo(-2.5,-62.917);
	ctx.lineTo(-2.5,-58.917);
	ctx.lineTo(-0.5,-58.917);
	ctx.lineTo(-0.5,-62.917);
	ctx.lineTo(2.5,-62.917);
	ctx.lineTo(2.5,-64.917);
	ctx.lineTo(-0.5,-64.917);
	ctx.lineTo(-0.5,-66.917);
	ctx.lineTo(2.5,-66.917);
	//
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.rotate(radian(-90));*/
	//
	ctx.beginPath();
	//
	ctx.shadowColor = "rgba(10, 8, 6, 1)";
	ctx.shadowBlur = 16;
	ctx.shadowOffsetY = 1;
	//
	ctx.drawImage(picObj.pic_ind, -23, -picObj.pic_ind.height / 2 - 5 + dist, picObj.pic_ind.width, picObj.pic_ind.height);
	//
	ctx.restore();
}