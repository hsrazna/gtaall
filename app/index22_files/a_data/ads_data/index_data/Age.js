// DRAW 12+ AGE PLATE
function drawAge(ageObj)
{
	var ctx = ageObj.canvas.getContext('2d');
	//
	ctx.clearRect(0, 0, w, h)
	ctx.save();
	//
	ctx.globalAlpha = ageObj.alpha;
	//
	ctx.beginPath();
	ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
	ctx.fillRect(0, 0, 32, 22);
	//
	ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
	ctx.font = ' 12pt '+font;	
	ctx.fillText("12+", 3, 16);
	//
	ctx.restore();
}