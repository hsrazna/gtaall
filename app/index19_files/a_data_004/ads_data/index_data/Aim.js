var translX = 0
var translY = 0
var drawAim = function(ctx, obj) 
{
	translX = a_dx + a * Math.cos(radian(angRot + 270)) 
	translY = b_dy + b * Math.sin(radian(angRot + 270)) 
	//if(enableMousePos)
	//{
		growAngle();
	//}
	//////////////
	var centerX = w/2 + obj.x + addedW;
	var centerY = h/2 + obj.y + addedW
	ctx.clearRect(-addedW, -addedW, w + addedW*2, h + addedW*2);
	//
	if(obj.alpha > 0.99)
	{
		obj.alpha = 1;
	}
	else if(obj.alpha < 0.01)
	{
		obj.alpha = 0;
	}
	//
	ctx.save();
	ctx.translate(translX , translY)
	ctx.scale(obj.scale,obj.scale);
	//Black grd
	var grd = ctx.createRadialGradient(w/2 + obj.x + addedW,h/2 + obj.y + addedW, 108,w/2 + obj.x + addedW,h/2 + obj.y + addedW, 109);
	grd.addColorStop(0,"rgba(0, 0, 0, 0)");
	grd.addColorStop(1,"rgba(0, 0, 0, "+ 0.6*obj.alpha + ")");
	ctx.fillStyle = grd;
	ctx.fillRect(obj.x,obj.y,w + addedW*2,h + addedW*2);

	//Strelka
	ctx.beginPath();
	ctx.moveTo(centerX - 14,centerY + 8 );
	ctx.lineTo(centerX ,centerY - 8 );
	ctx.lineTo(centerX + 14,centerY + 8 );
	ctx.lineWidth = 2;
	ctx.strokeStyle = "rgba(0, 255, 0, "+ 1*obj.alpha +")";
	ctx.stroke();

	//Black big lines
	ctx.beginPath();
	ctx.moveTo(centerX ,centerY - 80 );
	ctx.lineTo(centerX ,centerY - 104 );

	ctx.moveTo(centerX ,centerY + 80 );
	ctx.lineTo(centerX ,centerY + 104 );

	ctx.moveTo(centerX - 80 ,centerY );
	ctx.lineTo(centerX - 104 ,centerY );

    ctx.moveTo(centerX + 80 ,centerY );
	ctx.lineTo(centerX + 104 ,centerY );

	ctx.lineWidth = 2;
	ctx.strokeStyle = "rgba(0, 0, 0, "+ 1*obj.alpha +")";
	ctx.stroke();

    //Small Green lines
    ctx.translate(centerX , centerY)
    for(var i = 1; i<30; i++)
    {
		ctx.rotate(3 * Math.PI / 180);
    	ctx.beginPath();
	    ctx.moveTo(-96 , 0 );
	    ctx.lineTo(-104 , 0 );
	    ctx.lineWidth = 2;
	    ctx.strokeStyle = "rgba(0, 255, 0, "+ 1*obj.alpha +")";
	    ctx.stroke();
    }

    for(var i = 1; i<30; i++)
    {
		ctx.rotate(3 * Math.PI / 180);
    	ctx.beginPath();
	    ctx.moveTo(0 , -96 );
	    ctx.lineTo(0 , - 104 );
	    ctx.lineWidth = 2;
	    ctx.strokeStyle = "rgba(0, 255, 0, "+ 1*obj.alpha +")";
	    ctx.stroke();
    }

    //Small Black lines
    for(var i = 1; i< 9; i++)
    {
		ctx.rotate(11 * Math.PI / 180);
    	ctx.beginPath();
	    ctx.moveTo(0 , - 96 );
	    ctx.lineTo(0 , - 104 );
	    ctx.lineWidth = 2;
	    ctx.strokeStyle = "rgba(0, 0, 0, "+ 1*obj.alpha +")";
	    ctx.stroke();
    }
    for(var i = 1; i< 9; i++)
    {
		ctx.rotate(11 * Math.PI / 180);
    	ctx.beginPath();
	    ctx.moveTo(96 , 0 );
	    ctx.lineTo(104 , 0);
	    ctx.lineWidth = 2;
	    ctx.strokeStyle = "rgba(0, 0, 0, "+ 1*obj.alpha +")";
	    ctx.stroke();
    }
	ctx.restore();

};