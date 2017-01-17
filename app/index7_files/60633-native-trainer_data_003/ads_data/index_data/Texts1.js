/* -------------------------------------------------------------------------------------
--------------                        WARGAMING.NET                       --------------
----------------------------------------------------------------------------------------
--------------                 © 2016 ALL RIGHTS RESERVED                 --------------
--------------------------------------------------------------------------------------*/

var string_1 = "ХВАТИТ СМОТРЕТЬ. РЕШАЙСЯ!";

function setStrings()
{
	textPlate.textArray = new Array();
	
	
	var textObj = {};
	textObj.x = 0;
	textObj.y = 0;
	textObj.alpha = 1;
	textObj.font = 'bold 16pt '+font;	
	textObj.text = string_1;
	textPlate.textArray.push(textObj);
	
	
	textPlate.animText = new Array();
	
	textPlate.frame1 = [0];	
}



