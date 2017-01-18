// 
function drawPlateText(ctx, obj)
{
	var sizes = new Array(0, 0.35, 0.65, 1);
	var finAlpha = 0.4;
	//
	ctx.clearRect(0, 0, w, h);
	//
	ctx.save();
	ctx.translate(obj.x, obj.y);
	ctx.scale(obj.scale,obj.scale);
	//
	ctx.beginPath();
	ctx.rect(0, 0, w, obj.height);
	//
	var plateGrad = ctx.createLinearGradient(0, 0, w, 0);
    plateGrad.addColorStop(sizes[0], "rgba(175, 30, 20, " + finAlpha + ")");
    plateGrad.addColorStop(sizes[1], "rgb(175, 30, 20)");
    plateGrad.addColorStop(sizes[2], "rgb(175, 30, 20)");
    plateGrad.addColorStop(sizes[3], "rgba(175, 30, 20, " + finAlpha + ")");
    ctx.fillStyle = plateGrad;
    ctx.fill();
    //
    var pattern = ctx.createPattern(obj.pic, 'repeat');
	ctx.fillStyle = pattern;
	//
	ctx.globalCompositeOperation = "source-in";
	ctx.beginPath();
	ctx.globalAlpha = 0.35;
	ctx.fillRect(0, 0, w, obj.height);
	//
	ctx.globalAlpha = 1;
	ctx.globalCompositeOperation = "destination-over";
	ctx.beginPath();
	ctx.rect(0, 0, w, obj.height);
	ctx.fillStyle = plateGrad;
    ctx.fill();
    //
    ctx.globalCompositeOperation = "source-over";
    //
    if(frameTwo === false)
    {
        ctx.font = "bold 14pt "+font;
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		ctx.fillStyle = "rgb(255, 255, 255)";
		//
		ctx.fillText(text1, w / 2, obj.height / 2 - 12);
		ctx.fillText(text1_1, w / 2, obj.height / 2 + 12);
    }else{
    	if(success)
    	{
			ctx.textBaseline = "middle";
			ctx.textAlign = "center";
			ctx.fillStyle = "rgb(255, 255, 255)";
			ctx.font = "bold 14pt "+font;
			ctx.fillText(text4, w / 2, obj.height / 2 - 15);
			ctx.font = "bold 12pt "+font;
			ctx.fillText(text5, w / 2, obj.height / 2 + 6);
			ctx.fillText(text5_2, w / 2, obj.height / 2 + 22);
    	}else{
			ctx.textBaseline = "middle";
			ctx.textAlign = "center";
			ctx.fillStyle = "rgb(255, 255, 255)";
			ctx.font = "bold 14pt "+font;
			ctx.fillText(text2, w / 2, obj.height / 2 - 24);
			ctx.fillText(text2_2, w / 2, obj.height / 2 - 5);
			ctx.font = "bold 12pt "+font;
			ctx.fillText(text3, w / 2, obj.height / 2 + 14);
			ctx.fillText(text3_2, w / 2, obj.height / 2 + 29);
    	}
    	
    }
	//
	drawLine(ctxPlateText, img_line)
	//
	ctx.restore();
}

function drawLine(ctx, obj)
{
	ctx.save();
	ctx.globalAlpha = obj.alpha;
	ctx.scale (obj.scale, obj.scale);
	//
	ctx.drawImage(obj.pic, 0, - obj.pic.height / 2);

	ctx.restore();
}