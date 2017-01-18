// DUST EFFECT CLASS & SPECIAL FUNCTIONS (ADD & REMOVE)
function Dust (xPos, yPos, sName)
{
	this._x = xPos + 4 * Math.random() - 2;
	this._y = yPos + 8 * Math.random() - 4;

	//
	var scale = 0.3 + 0.2 * Math.random();
	this._xScale = scale;
	this._yScale = scale;

	//
	this._alpha = 0.4 + 0.2 * Math.random() + img_dust.alphaKoef - (img_dust.densityMax) / 20;

	//
	this._name = sName;

	//
	this._sSpeed = 0.9 + 0.4 * Math.random() - (img_dust.densityMax) / 6;

	//
	this._ang = 360 * Math.random();
}

// Update
Dust.prototype.update = function(dObj)
{
	this._sSpeed *= 1.01;
	//
	this._x -= this._sSpeed * 3;
	this._y -= this._sSpeed / 4 + (img_dust.densityMax) / 6;
	//
	if(this._xScale < 1.3)
	{
		this._xScale *= 1.021;
		this._yScale *= 1.021;
	}
	//
	this._alpha -= 0.005;
	//
	if(this._alpha <= 0)
	{
		removeDust(this._name);
	}
	else
	{
		this._draw(dObj);
	}
}

// Get Name
Dust.prototype.getName = function()
{
	return this._name;
}

// Draw
Dust.prototype._draw = function(dObj)
{
	var ctx = dObj.canvas.getContext("2d");
	//
	ctx.save();
	ctx.translate(this._x, this._y);
	ctx.rotate(radian(this._ang));
	ctx.scale(this._xScale, this._yScale);
	ctx.globalAlpha = this._alpha;
	//
	ctx.drawImage(dObj.pic, - dObj.pic.width / 2,  - dObj.pic.height / 2, dObj.pic.width, dObj.pic.height);
	//
	ctx.restore();
}

// Add New Dust
function addDust(xPos, yPos)
{
	var dust = new Dust(xPos, yPos, dustName);
	//
	dustArr.push(dust);
	//
	dustName ++;
	//
	if(dustName === 10000)
	{
		dustName = 0;
	}
}

// Remove Dust by Name
function removeDust(sName)
{
	for(var i = 0; i < dustArr.length; i ++)
	{
		if(dustArr[i].getName() === sName)
		{
			dustArr.splice(i, 1);
		}
	}
}