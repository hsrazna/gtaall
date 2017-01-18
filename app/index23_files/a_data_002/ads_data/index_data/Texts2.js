/* -------------------------------------------------------------------------------------
--------------                        WARGAMING.NET                       --------------
----------------------------------------------------------------------------------------
--------------                 © 2016 ALL RIGHTS RESERVED                 --------------
--------------------------------------------------------------------------------------*/

var string_1 = "ХВАТИТ";
var string_2 = "СМОТРЕТЬ.";
var string_3 = "РЕШАЙСЯ!";

function setStrings()
{
	textPlate.textArray = new Array();
	
	
	var textObj = {};
	textObj.x = 0;
	textObj.y = -25;
	textObj.alpha = 1;
	textObj.font = 'bold 16pt '+font;	
	textObj.text = string_1;
	textPlate.textArray.push(textObj);
	
	var textObj = {};
	textObj.x = 0;
	textObj.y = 0;
	textObj.alpha = 1;
	textObj.font = 'bold 16pt '+font;	
	textObj.text = string_2;
	textPlate.textArray.push(textObj);
	
	var textObj = {};
	textObj.x = 0;
	textObj.y = 25;
	textObj.alpha = 1;
	textObj.font = 'bold 16pt '+font;	
	textObj.text = string_3;
	textPlate.textArray.push(textObj);
	
	textPlate.animText = new Array();
	
	textPlate.frame1 = [0, 1, 2];	
}



