﻿var expArray = new Array();

function addShot(fx,fy,scale)
{		
	var expObj = {};
	
	var fireObj = {};
	fireObj["img"] = img_shotFire.pic;
	fireObj["x"] = 0;
	fireObj["y"] = 0;
	fireObj["scaleX"] = 0.1;
	fireObj["scaleY"] = 0.1;
	fireObj["rotation"] = 0;
	fireObj["alpha"] = 1;
	
	var fireObj2 = {};
	fireObj2["img"] = img_shotFire.pic;
	fireObj2["x"] = 0;
	fireObj2["y"] = 0;
	fireObj2["scaleX"] = 0.1;
	fireObj2["scaleY"] = 0.1;
	fireObj2["rotation"] = 0;
	fireObj2["alpha"] = 1;
	
	var smokeObj = {};
	smokeObj["img"] = img_shotSmoke.pic;
	smokeObj["x"] = 20;
	smokeObj["y"] = 0;
	smokeObj["scaleX"] = 0;
	smokeObj["scaleY"] = 0;
	smokeObj["rotation"] = 0;
	smokeObj["alpha"] = 0;
	
	var smokeObj2 = {};
	smokeObj2["img"] = img_shotSmoke.pic;
	smokeObj2["x"] = 20;
	smokeObj2["y"] = 0;
	smokeObj2["scaleX"] = 0;
	smokeObj2["scaleY"] = 0;
	smokeObj2["rotation"] = 0;
	smokeObj2["alpha"] = 0;
	
	var smokeObj3 = {};
	smokeObj3["img"] = img_shotSmoke.pic;
	smokeObj3["x"] = 20;
	smokeObj3["y"] = 0;
	smokeObj3["scaleX"] = 0;
	smokeObj3["scaleY"] = 0;
	smokeObj3["rotation"] = 0;
	smokeObj3["alpha"] = 0;
	
	expObj["fire"] = fireObj;
	expObj["fire2"] = fireObj2;
	expObj["smoke1"] = smokeObj;
	expObj["smoke2"] = smokeObj2;
	expObj["smoke3"] = smokeObj3;
	
	expObj["x"] = fx;
	expObj["y"] = fy;
	expObj["scale"] = scale;
	//Угол наклона
	expObj["ang"] = 0;		
	expObj["flashAlpha"] = 1;
	
	fireObj["rotation"] = Math.random()*360;
	fireObj2["rotation"] = fireObj["rotation"]+2;	
	
	TweenLite.to(fireObj, 0.15, {x:0,scaleX:1,scaleY:1.0,  ease: Power1.easeOut});	
	TweenLite.to(fireObj, 0.15, {delay:0.1,alpha:0,  ease: Power1.easeOut});

	TweenLite.to(fireObj2, 0.15, {delay:0.15,x:0,scaleX:0.5,scaleY:0.5,  ease: Power1.easeOut});	
	TweenLite.to(fireObj2, 0.2, {delay:0.2,alpha:0,  ease: Power1.easeOut});
	
	smokeObj["rotation"] = 5;
	smokeObj2["rotation"] = smokeObj["rotation"]+3.6;
	smokeObj3["rotation"] = smokeObj["rotation"]+1;
	if(contourAlpha === 1 )
	{
		TweenLite.to(smokeObj, 0.7, {x:0, alpha:0.6, scaleX:0.9,  scaleY:1.1,  onComplete:smokeHide});	
		TweenLite.to(smokeObj, 1.6, {rotation:smokeObj["rotation"]+1,  ease: Power1.easeOut});	
		
		TweenLite.to(smokeObj3, 0.7, {x:5, alpha:0.6, scaleX:1.2,  scaleY:1.2,  onComplete:smokeHide});	
		TweenLite.to(smokeObj3, 1.6, {rotation:smokeObj3["rotation"]+1.4,  ease: Power1.easeOut});	
		
		TweenLite.to(smokeObj2, 1.75, {x:10, alpha:0.5, scaleX:-1.4,  scaleY:1.5, onComplete:smokeHide2});			
		TweenLite.to(smokeObj2, 1.6, {rotation:smokeObj2["rotation"]+1.6,  ease: Power1.easeOut});
	}else{
		TweenLite.to(smokeObj, 0.7, {x:0, alpha:0.6, scaleX:2.8,  scaleY:2.8,  onComplete:smokeHide});	
		TweenLite.to(smokeObj, 1.6, {rotation:smokeObj["rotation"]+1,  ease: Power1.easeOut});	
		
		TweenLite.to(smokeObj3, 0.7, {x:5, alpha:0.6, scaleX:3.9,  scaleY:3.9,  onComplete:smokeHide});	
		TweenLite.to(smokeObj3, 1.6, {rotation:smokeObj3["rotation"]+1.4,  ease: Power1.easeOut});	
		
		TweenLite.to(smokeObj2, 1.75, {x:15, alpha:0.5, scaleX:-3.5,  scaleY:-3.5, onComplete:smokeHide2});			
		TweenLite.to(smokeObj2, 1.6, {rotation:smokeObj2["rotation"]+1.6,  ease: Power1.easeOut});
	}
	
	function smokeHide()
	{
		canvasInteractive.addEventListener('click', mClick, false);
		TweenLite.to(smokeObj, 1.5, {alpha:0,  scaleX:smokeObj["scaleX"]*1.4,  scaleY:smokeObj["scaleY"]*1.4, ease: Sine.easeOut});	
		TweenLite.to(smokeObj3, 1.6, {alpha:0,  scaleX:smokeObj3["scaleX"]*1.4,  scaleY:smokeObj3["scaleY"]*1.4, ease: Sine.easeOut});				
	}
	function smokeHide2()
	{
		TweenLite.to(smokeObj2, 1.7, {alpha:0,  scaleX:smokeObj2["scaleX"]*1.4,  scaleY:smokeObj2["scaleY"]*1.4, ease: Sine.easeOut, onComplete:removeEXP});	
	}
	
	function removeEXP()
	{
		expArray.shift();
	}
	
	expArray.push(expObj);			
}
	
function drawShot(ctx)
{
	var ctx = ctx;		
	//
	for(var e = 0; e < expArray.length; e++)
	{				
		ctx.save();		
		//Сдвиг облака//	
		expArray[e]["x"]-=0.3;	
		expArray[e]["y"]-=0.1;	
		ctx.transform(expArray[e]["scaleX"],0,0,expArray[e]["scaleY"],0,0);			
		ctx.translate(expArray[e]["x"],expArray[e]["y"]);
			
		ctx.scale(expArray[e]["scale"],expArray[e]["scale"]);
		ctx.rotate(expArray[e]["ang"]);
		
		ctx.save();		
		ctx.translate(20,0);				
		var darkerGr = ctx.createRadialGradient(-25, 0, 3, -46, 0, 60);
		darkerGr.addColorStop(0, "rgba(255, 200, 100, "+expArray[e]["flashAlpha"]+")");		
		darkerGr.addColorStop(1, "rgba(255, 255, 255, 0)");	
		ctx.fillStyle = darkerGr;
		ctx.fillRect(-200,-100,400,400);
		expArray[e]["flashAlpha"] = expArray[e]["flashAlpha"]+(-0.1-expArray[e]["flashAlpha"])/7;
		ctx.restore();
		
		ctx.save();		
		ctx.translate(10,0);					
		var darkerGr = ctx.createRadialGradient(0, 0, 4, 0, 0, 20);
		darkerGr.addColorStop(0, "rgba(255, 190, 100, "+expArray[e]["flashAlpha"]*2+")");		
		darkerGr.addColorStop(1, "rgba(255, 255, 200, 0)");	
		ctx.fillStyle = darkerGr;
		ctx.fillRect(-50,-50,100,100);				
		ctx.restore();
	
		 
		ctx.save();
		ctx.translate(expArray[e]["smoke2"]["x"],expArray[e]["smoke2"]["y"])
		ctx.save();	
		ctx.scale(expArray[e]["smoke2"]["scaleX"], expArray[e]["smoke2"]["scaleY"]);
		ctx.rotate(expArray[e]["smoke2"]["rotation"]);	
		ctx.translate(-30,-23);						
		ctx.globalAlpha = expArray[e]["smoke2"]["alpha"];				
		ctx.drawImage(expArray[e]["smoke2"]["img"],0,0);
		ctx.restore();
		ctx.restore();
		
		ctx.save();						
		ctx.translate(expArray[e]["smoke1"]["x"],expArray[e]["smoke1"]["y"])
		ctx.save();	
		ctx.scale(expArray[e]["smoke1"]["scaleX"], expArray[e]["smoke1"]["scaleY"]);
		ctx.rotate(expArray[e]["smoke1"]["rotation"]);	
		ctx.translate(-30,-23);						
		ctx.globalAlpha = expArray[e]["smoke1"]["alpha"];				
		ctx.drawImage(expArray[e]["smoke1"]["img"],0,0);
		ctx.restore();
		ctx.restore();
		
		ctx.save();	
		ctx.translate(expArray[e]["smoke3"]["x"],expArray[e]["smoke3"]["y"])
		ctx.save();	
		ctx.scale(expArray[e]["smoke3"]["scaleX"], expArray[e]["smoke3"]["scaleY"]);
		ctx.rotate(expArray[e]["smoke3"]["rotation"]);	
		ctx.translate(-30,-23);						
		ctx.globalAlpha = expArray[e]["smoke3"]["alpha"];				
		ctx.drawImage(expArray[e]["smoke3"]["img"],0,0);
		ctx.restore();
		ctx.restore();
		
		ctx.shadowColor = '#A14600';
		ctx.shadowBlur = 30;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		
		ctx.save();
		ctx.translate(expArray[e]["fire"]["x"],expArray[e]["fire"]["y"])
		ctx.save();						
		ctx.scale(expArray[e]["fire"]["scaleX"], expArray[e]["fire"]["scaleY"]);
		ctx.rotate(expArray[e]["fire"]["rotation"]);	
		ctx.translate(-30,-23);						
		ctx.globalAlpha = expArray[e]["fire"]["alpha"];				
		ctx.drawImage(expArray[e]["fire"]["img"],0,0);
		ctx.restore();
		ctx.restore();
		ctx.save();							
		ctx.translate(expArray[e]["fire2"]["x"],expArray[e]["fire2"]["y"])
		ctx.save();						
		ctx.scale(expArray[e]["fire2"]["scaleX"], expArray[e]["fire2"]["scaleY"]);
		ctx.rotate(expArray[e]["fire2"]["rotation"]);	
		ctx.translate(-30,-23);						
		ctx.globalAlpha = expArray[e]["fire2"]["alpha"];				
		ctx.drawImage(expArray[e]["fire2"]["img"],0,0);
		ctx.restore();
		ctx.restore();
		//
		ctx.restore();
	}
}
	