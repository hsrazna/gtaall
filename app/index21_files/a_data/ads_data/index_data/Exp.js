var expSplashArray = new Array();
var expArray2 = new Array();

var farr = new Array();

function drawBalck()
	{
		var nCanvas = document.createElement("CANVAS");		
		var w = 100;		
		var h = 92;		
		nCanvas.width = w;
		nCanvas.height = h;	
		var ctx = nCanvas.getContext('2d');	
		ctx.drawImage(expImg.exp,0,0);
		try{

		var buffer = ctx.getImageData(0, 0, w, h),
			data = buffer.data,
			len = data.length,
			i = 0,
			c = {r:-170, g: -80, b: -70, a:10};
		
		for(i=0; i < len; i += 4) {
			data[i] = data[i] + c.r;
			data[i + 1] = data[i + 1] + c.g;
			data[i + 2] = data[i + 2] + c.b;
			data[i + 3] = data[i + 3] + c.a;
		}
		ctx.putImageData(buffer, 0, 0);

	}catch(e){}
		
		
		expImg.bExp = nCanvas;
		//ctxInt.drawImage(expImg.bExp,0,0);		
	}


function addExp(x,y,scale)
{
	var i=0;
	var eObj = {};
	eObj.smokeArray = new Array();
	eObj.fireArray = new Array();
	eObj.sparkArray = new Array();	
	eObj.randomArray = new Array();	
	eObj.x = x;
	eObj.y = y;
	eObj.scale = scale;
	eObj.lineScale = 0;
	eObj.lineAlpha = 1;
	for(i=0;i<2;i++)
	{
		var obj = {};
		obj.x = 0;
		obj.y = 0;
		obj.scale = 0;
		obj.sScale = 0.9+Math.random()*0.3;
		obj.dScale = 0;
		obj.ang = -1.57+Math.random()*2-1;
		obj.sDist =10+Math.random()*10;
		obj.dist = 0;
		obj.alpha = 0.8+Math.random()*0.6;
		eObj.smokeArray.push(obj)
	}
	
	for(i=0;i<15;i++)
	{
		var obj = {};
		obj.x = 0;
		obj.y = 0;
		obj.scale = 0.2;
		obj.sScale = 0.4+Math.random()*0.3;	
		obj.dScale = 0;
		obj.ang = Math.random()*5;
		obj.pAng = Math.random()*5;
		obj.dAng =obj.pAng-Math.cos(obj.ang)*1.1;  //+Math.random()*3-1.5;
		obj.sDist =6+Math.random()*16;
		//obj.sScale = (22-obj.sDist)/10;
		obj.dist = 0;
		obj.speed = 12+Math.random()*6;
		obj.alpha = 3;
		obj.bAlpha = 0;
		obj.bFAlpha = 0.8;
		obj.dy = 0;
		obj.dDy = Math.random()*0.3;
		
		if(i==0)
		{	
			//obj.alpha = 0.6;
			obj.sScale = 0.6;
			
			var a =  JSON.stringify(obj);
			a =  JSON.parse(a);
		a.pAng = Math.random()*5;
		a.dAng =a.pAng+Math.cos(obj.ang)*1.8;
		
		a.sScale *= 1.2;
			eObj.fireArray.push(a);
			eObj.fireArray.push(obj);
			
		}
		else
		{
		
		var a =  JSON.stringify(obj);
			a =  JSON.parse(a);
		a.pAng = Math.random()*5;
		a.dAng =a.pAng+Math.cos(obj.ang)*1.8;
		a.sScale *= 1.2;
			TweenLite.delayedCall(i/30,addFire2,[eObj,a]);
			TweenLite.delayedCall(i/30,addFire2,[eObj,obj]);
		}
		
	}
	for(i=0;i<0;i++)
	{
		var obj = {};
		obj.ang = -1.57+Math.random()*2-1;
		obj.sx = 0;
		obj.sy = 0;
		obj.x = obj.sx;
		obj.y = obj.sy;		
		obj.fx = 0;
		obj.fy = 0;
		obj.color = parseInt(Math.random()*30)+180;
		obj.scale = 3.4+Math.random()*0.8;
		obj.alpha = 1+Math.random();
		obj.dist = Math.random()*60+120;
		obj.length = 0;
		obj.sparks = new Array();
		eObj.sparkArray.push(obj);
	}	
	for(i=0;i<120;i++)
	{
		eObj.randomArray.push(Math.random());
	}
	expArray2.push(eObj);
	
}

function addFire2(eObj, obj)
{
	eObj.fireArray.push(obj);
}


function drawExp(ctx)
{
	for(var i=0;i<expArray2.length;i++)
	{
		expArray2[i].x+=0.1*expArray2[i].scale;
		expArray2[i].y-=0.3*expArray2[i].scale;
		ctx.save();	
		ctx.translate(expArray2[i].x,expArray2[i].y+img_background.y);
		ctx.scale(expArray2[i].scale,expArray2[i].scale);		
		var sArray = expArray2[i].smokeArray;
		var fArray = expArray2[i].fireArray;
		var sparkArray = expArray2[i].sparkArray;		
		for(var s=0;s<sArray.length;s++)
		{
			sArray[s].scale+=(sArray[s].sScale-sArray[s].scale)/14;
			sArray[s].dScale +=0.008;
			sArray[s].dist+=(sArray[s].sDist-sArray[s].dist)/12;
			sArray[s].x = Math.cos(sArray[s].ang)*sArray[s].dist;
			sArray[s].y = Math.sin(sArray[s].ang)*sArray[s].dist-sArray[s].dScale*15;
			//sArray[s].alpha +=(0-sArray[s].alpha)/50;
			sArray[s].alpha -=0.008;
			ctx.save();			
			ctx.translate(sArray[s].x,sArray[s].y-10);
			ctx.scale(sArray[s].scale+sArray[s].dScale,sArray[s].scale+sArray[s].dScale);
			ctx.globalAlpha = sArray[s].alpha;
			
			ctx.rotate(sArray[s].ang+sArray[s].sScale);
			ctx.drawImage(expImg.smoke,-40,-40);
			ctx.restore();
			if(sArray[s].alpha<0.01)
			{
				sArray.splice(s,1);
				s--;
			}
		}		
		
		expArray2[i].lineScale += (110-expArray2[i].lineScale)/2;
		expArray2[i].lineAlpha *=0.9;
		
		var tpgr = ctx.createRadialGradient(0,0,6,0,0,50);
		tpgr.addColorStop(0, "rgba(250, 240, 200, "+Math.round(expArray2[i].lineAlpha*100)/100+")");	
		tpgr.addColorStop(1, "rgba(250, 200, 150, "+0+")");	
		
		ctx.strokeStyle = tpgr;		
		ctx.beginPath();
		for(var l = 0; l<360;l+=4)
		{
			ctx.moveTo(0,0);
			ctx.lineTo(Math.cos(radian(l))*expArray2[i].randomArray[(l)/4]*expArray2[i].lineScale,Math.sin(radian(l))*expArray2[i].randomArray[(l)/4]*expArray2[i].lineScale);
		}
		ctx.closePath();
		//ctx.strokeStyle = "#ffffff";
		ctx.stroke();
		
		for(var sp=0;sp<sparkArray.length;sp++)
		{
			ctx.save();
				sparkArray[sp].length = sparkArray[sp].length+(sparkArray[sp].dist-sparkArray[sp].length)/sparkArray[sp].dist*5;
				sparkArray[sp].x = sparkArray[sp].sx+Math.cos(sparkArray[sp].ang)*sparkArray[sp].length;
				sparkArray[sp].y = sparkArray[sp].sy+Math.sin(sparkArray[sp].ang)*sparkArray[sp].length;
				sparkArray[sp].sy += 2;
				sparkArray[sp].fx -= 0.5;
				sparkArray[sp].alpha -=0.02;
				ctx.fillStyle = "rgba(255, " + sparkArray[sp].color +", 60, " + sparkArray[sp].alpha +")";
				ctx.strokeStyle = "rgba(255, " + sparkArray[sp].color +", 60, " + sparkArray[sp].alpha +")";
				ctx.beginPath();
				ctx.moveTo(sparkArray[sp].sx,sparkArray[sp].sy);
				ctx.lineTo(Math.cos(sparkArray[sp].ang)*sparkArray[sp].length,Math.sin(sparkArray[sp].ang)*sparkArray[sp].length)
				ctx.closePath();
				//ctx.stroke();
				for(var s=0;s<sparkArray[sp].sparks.length;s++)
				{
					sparkArray[sp].sparks[s].y += 0.1;
					ctx.fillStyle = "#ffffff";
					sparkArray[sp].sparks[s].alpha*=0.9;
					
					sparkArray[sp].sparks[s].scale+=0.2;
					ctx.globalAlpha = sparkArray[sp].sparks[s].alpha;	
					ctx.save();		
										
						ctx.translate(sparkArray[sp].sparks[s].x,sparkArray[sp].sparks[s].y);
						ctx.scale(sparkArray[sp].sparks[s].scale/20,sparkArray[sp].sparks[s].scale/20);
						ctx.rotate(sparkArray[sp].sparks[s].ang)
						//ctx.drawImage(expImg.smoke,-40,-40);
						
					//	ctx.drawImage(expImg.exp,-50,-46);
					ctx.restore();
					
					ctx.fillRect(sparkArray[sp].sparks[s].x,sparkArray[sp].sparks[s].y,sparkArray[sp].sparks[s].scale,sparkArray[sp].sparks[s].scale);
				}
				var obj = {};				
				obj.x = sparkArray[sp].x+Math.random()*2-1;
				obj.y = sparkArray[sp].y+Math.random()*2-1;
				obj.alpha = sparkArray[sp].alpha;
				obj.scale = 1;
				obj.ang = Math.random()*5;
				sparkArray[sp].sparks.push(obj)
				
			//	ctx.fillRect(sparkArray[sp].x+sparkArray[sp].fx,sparkArray[sp].y+sparkArray[sp].fy,sparkArray[sp].scale,sparkArray[sp].scale);
				if(sparkArray[sp].alpha<0)
				{
					sparkArray.splice(sp,1);
					sp--;
				}
			ctx.restore();
		}
		for(var f=0;f<fArray.length;f++)
		{
			fArray[f].scale+=(fArray[f].sScale-fArray[f].scale)/12;
			fArray[f].dScale +=0.002;
			fArray[f].dist+=(fArray[f].sDist-fArray[f].dist)/12;
			fArray[f].x = Math.cos(fArray[f].ang)*fArray[f].dist*1.2;
			fArray[f].y = Math.sin(fArray[f].ang)*fArray[f].dist/2;
			fArray[f].alpha +=(0-fArray[f].alpha)/fArray[f].speed*1.6;
			fArray[f].bAlpha +=(fArray[f].bFAlpha-fArray[f].bAlpha)/30;
			fArray[f].bFAlpha +=(0-fArray[f].bFAlpha)/fArray[f].speed/3;
			//fArray[f].bFAlpha-=0.01;
			fArray[f].dy -= fArray[f].dDy+fArray[f].alpha/2;
			fArray[f].pAng+=(fArray[f].dAng-fArray[f].pAng)/40;
			ctx.save();			
			ctx.translate(fArray[f].x,fArray[f].y+fArray[f].dy);
			ctx.scale(fArray[f].scale+fArray[f].dScale,fArray[f].scale+fArray[f].dScale);
			
			
			ctx.rotate(fArray[f].pAng);
			ctx.globalAlpha = Math.round(fArray[f].bAlpha*100)/100;
			ctx.drawImage(expImg.bExp,-50,-46);
			
			ctx.globalAlpha = Math.round(fArray[f].alpha*100)/100;
			if(Math.round(fArray[f].alpha*100)/100>1)
			{
			ctx.globalAlpha = 1;	
			}
		ctx.globalCompositeOperation = 'lighter';
			ctx.drawImage(expImg.exp,-50,-46);
			
			ctx.restore();
			if(fArray[f].bAlpha<0.02)
			{
				fArray.splice(f,1);
				f--;
			}
		}
		
		
		
		if(fArray.length>0)
		{
		var tpgr = ctx.createRadialGradient(0,0,14,0,0,32);

		var koef = fArray[0].alpha / 3;
		if(koef < 0.01)
		{
			koef = 0;
		}
		else if(koef > 0.99)
		{
			koef = 1;
		}
		//
		tpgr.addColorStop(0, "rgba(250, 240, 200, "+ koef +")");	
		tpgr.addColorStop(1, "rgba(250, 200, 150, 0)");	
	
		ctx.fillStyle = tpgr;		
		ctx.globalCompositeOperation = "lighter";	
	
		ctx.fillRect(-60,-60,120,120);
		}
		
		ctx.restore();
		if(sArray.length==0&&fArray.length==0&&sparkArray.length==0)
		{
			expArray2.splice(i,1);
			i--;
		}
	}
	
}


