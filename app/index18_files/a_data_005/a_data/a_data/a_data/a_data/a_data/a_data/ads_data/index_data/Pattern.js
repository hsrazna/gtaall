var Pattern = {};
Pattern.tPattern = {};
Pattern.bPattern = {};
Pattern.tPattern.height = 100;
Pattern.bPattern.height = 70;
Pattern.tPattern.alpha = 0;
Pattern.bPattern.alpha = 0;

function drawPattern(ctx)
{
	ctx.clearRect(0, 0, w, h);	
	ctx.globalAlpha = Pattern.tPattern.alpha;
	ctx.drawImage(Pattern.tPattern.pic,0,0);	
	ctx.globalAlpha = Pattern.bPattern.alpha;
	ctx.drawImage(Pattern.bPattern.pic,0,0);	
}

function drawPatternElements()
{		
	var nCanvas = document.createElement("CANVAS");		
	nCanvas.width = w;
	nCanvas.height = h;	
	ctx = nCanvas.getContext('2d');			
	tpgr = ctx.createLinearGradient(0, 0, 0, Pattern.tPattern.height);
	tpgr.addColorStop(0, "rgba(0, 0, 0, 0.9)");
	tpgr.addColorStop(0.6, "rgba(0, 0, 0, 0.5)");	
	tpgr.addColorStop(1, "rgba(0, 0, 0, 0)");		
		
	
	ctx.fillStyle=tpgr;
	ctx.fillRect(0,0,w,h);	
	
	iPattern = ctx.createPattern(Pattern.pic, 'repeat');
	ctx.fillStyle = iPattern;
	ctx.fillRect(0,0,w,h);
	ctx.globalCompositeOperation = "source-in";
	ctx.fillStyle = tpgr;
	ctx.fillRect(0,0,w,h);	
	ctx.globalCompositeOperation = "source-over";	
	Pattern.tPattern.pic = nCanvas;	
	
	//////////////////////////////////////////////////////////
	var nCanvas = document.createElement("CANVAS");		
	nCanvas.width = w;
	nCanvas.height = h;	
	ctx = nCanvas.getContext('2d');			
	tpgr = ctx.createLinearGradient(0, h-Pattern.bPattern.height, 0, h);
	tpgr.addColorStop(0, "rgba(0, 0, 0, 0)");
	tpgr.addColorStop(0.4, "rgba(0, 0, 0, 0.5)");	
	tpgr.addColorStop(1, "rgba(0, 0, 0, 0.9)");		
		
	
	ctx.fillStyle=tpgr;
	ctx.fillRect(0,0,w,h);	
	
	iPattern = ctx.createPattern(Pattern.pic, 'repeat');
	ctx.fillStyle = iPattern;
	ctx.fillRect(0,0,w,h);
	ctx.globalCompositeOperation = "source-in";
	ctx.fillStyle = tpgr;
	ctx.fillRect(0,0,w,h);	
	ctx.globalCompositeOperation = "source-over";		
	Pattern.bPattern.pic = nCanvas;
	
}

