var font = '\'webFont\', \'Arial Narrow\', sans-serif';
var againSize = 9;
var buttonTextScale = 1;

var buttonText = "В БОЙ";
var againText = "ПОПРОБОВАТЬ ЕЩЕ РАЗ";

var benzText = "БЕНЗИН";
var orText = "ИЛИ";
var dzlText = "ДИЗЕЛЬ";

var tpText1_1 = "ЗАДАЙ";
var tpText1_2 = "ЖАРУ";
var tpText1_3 = "ДИЗЕЛЯМ!";

var tpText2_1 = "ПОКАЖИ,";
var tpText2_2 = "НА ЧТО СПОСОБЕН";
var tpText2_3 = "ДИЗЕЛЬ!";






function drawBenzText(ctx)
{
	ctx.font = 'bold 16pt '+font;	
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";	
	//
	ctx.shadowColor = "rgb(40, 10, 0)";
	ctx.shadowBlur = 2;
	ctx.shadowOffsetY = 1;
	//
	ctx.fillText(benzText, 0, 0);
}
function drawOrText(ctx)
{
	ctx.font = 'bold 14pt '+font;	
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";	
	//
	ctx.shadowColor = "rgb(40, 10, 0)";
	ctx.shadowBlur = 2;
	ctx.shadowOffsetY = 1;
	//
	ctx.fillText(orText, 0, 0);
}
function drawDzlText(ctx)
{
	ctx.font = 'bold 16pt '+font;	
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	
	//
	ctx.shadowColor = "rgb(40, 10, 0)";
	ctx.shadowBlur = 2;
	ctx.shadowOffsetY = 1;
	//
	ctx.fillText(dzlText, 0, 0);
}

function drawTPText(ctx)
{
	if(userChoise === "benzin")
	{
		ctx.font = 'bold 16pt '+font;	
		ctx.fillText(tpText1_1, 0, -23);
		ctx.fillText(tpText1_2, 0, 0);
		ctx.fillText(tpText1_3, 0, 23);
	}
	else
	{
		ctx.font = 'bold 12pt '+font;	
		ctx.fillText(tpText2_1,                        0, -18);
		ctx.fillText(tpText2_2, 0, 0);
		ctx.fillText(tpText2_3,                        0, 18);
	}
}