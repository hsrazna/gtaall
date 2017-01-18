////////////////////////////////////////////////////////////////////////////////////// VARS
var canvasInteractive, 
	canvasDarker,
	canvasLogo,
	canvasPlateBnz,
	canvasPlateDzl,
	canvasPlateOr,
	canvasFon,
	w, h;
	
var imagesToLoad = 
	{
		logo: "gfx/Logo.jpg",
		button: "gfx/Button.png",
		patt: "gfx/Pattern.png",
		fon1: "gfx/Fon1.jpg",
		fon2: "gfx/Fon2.jpg",
		ico_benz: "gfx/Benzin_Ico.jpg",
		ico_diez: "gfx/Diesel_Ico.jpg",
		fire: "gfx/Fire.png",
		dust: "gfx/Dust.png",
		fuel_ind: "gfx/FuelIndicator.png",
		fuel_inf: "gfx/FuelInfo.jpg",
		fuel_lgt: "gfx/FuelLight.png",
		gas: "gfx/Gas.jpg",
		tank_benz: "gfx/Tank1.jpg",
		tank_diez: "gfx/Tank2.jpg",
		wh1_tnkdz: "gfx/Wheel1_Tank2.png",
		wh2_tnkdz: "gfx/Wheel2_Tank2.png",
		wh1_tnkbn: "gfx/Wheel1_Tank1.png",
		wh2_tnkbn: "gfx/Wheel2_Tank1.png"
 	};
	
var img_logo = {},
	img_button = {},
	img_fon1 = {}, img_fon2 = {},
	img_patt = {},
	img_ico_bnz = {}, img_ico_dzl = {},
	img_plt_bnz = {}, img_plt_dzl = {}, img_plt_or = {},
	img_fire = {},
	img_dust = {},
	img_fuel = {},
	img_gas = {},
	img_tnk_bnz = {}, img_tnk_dzl = {},
	img_plate = {}, img_again = {},
	img_dark = {},
	img_age = {};

var bannerTexts = new Array("БЕНЗИН", "ИЛИ", "ДИЗЕЛЬ",
							"ЗАДАЙ", "ЖАРУ", "ДИЗЕЛЯМ!", "ПОКАЖИ,", "НА ЧТО", "СПОСОБЕН", "ДИЗЕЛЬ!",
							"В БОЙ", "ПОПРОБОВАТЬ", "ЕЩЁ РАЗ");

var butFontSize = 14;
var butX = 630;

var logoX = 80;

var fuelX = 640;

var pattBottomDelta = 10;

var txtPlateWidth = 160;
var plateTxtFontSize = 16;

var againPlateHeight = 15;
var plateAgainFontSize = 8;

///////////
var mousePos = {};
//
var overFl = false;
var allowFl = false;
var autoplayFl = false;
var isAutoplay = false;
var isButtonAppear = false;
var isButtonOver = false;
var linkFl = false;
var restartFl = false;
//
var requestID;


///////////////
//
var autoplayTmr = 0;
var autoplayTmrMax = 60 * 9.8;

//
var userChoise = "benzin";
var bannerStatus = "interaction";

//
var dustArr = [];
var dustName = 0;
//
var delta, oldTime = 0;

////////////////////////////////////////////////////////////////////////////////////// FUNCTIONS
function start()
{
	canvasInteractive = document.querySelector("#Interactive");
	canvasDarker      = document.querySelector("#Darker");
	canvasLogo        = document.querySelector("#Logo");
	canvasPlateBnz    = document.querySelector("#PlateBnz");
	canvasPlateDzl    = document.querySelector("#PlateDzl");
	canvasPlateOr     = document.querySelector("#PlateOr");	
	canvasFon         = document.querySelector("#Fon");

	//
	w = canvasInteractive.width; 
	h = canvasInteractive.height;

	//
	canvasInteractive.addEventListener('mouseover', mOver, false);
	canvasInteractive.addEventListener('mouseout', mOut, false);
	canvasInteractive.addEventListener('mousemove', mMove, false);
	canvasInteractive.addEventListener('click', mClick, false);
	//
	loadImages(imagesToLoad, function(imagesLoaded)
	{
		img_logo.canvas       = canvasLogo;
		img_button.canvas     = canvasLogo;
		img_age.canvas        = canvasLogo;
		img_logo.pic          = imagesLoaded.logo;
		img_button.pic        = imagesLoaded.button;

		//
		img_dark.canvas       = canvasDarker;

		//
		img_fon1.canvas        = canvasFon;
		img_fon1.pic           = imagesLoaded.fon1;
		img_fon2.canvas        = canvasFon;
		img_fon2.pic           = imagesLoaded.fon2;

		//
		img_patt.canvas        = canvasLogo;
		img_patt.pic           = imagesLoaded.patt;

		//
		img_ico_bnz.canvas     = canvasFon;
		img_ico_bnz.pic        = imagesLoaded.ico_benz;
		img_ico_dzl.canvas     = canvasFon;
		img_ico_dzl.pic        = imagesLoaded.ico_diez;

		img_plt_bnz.canvas     = canvasPlateBnz;
		img_plt_bnz.pic        = imagesLoaded.patt;
		img_plt_dzl.canvas     = canvasPlateDzl;
		img_plt_dzl.pic        = imagesLoaded.patt;
		img_plt_or.canvas      = canvasPlateOr;
		img_plt_or.pic         = imagesLoaded.patt;

		//
		img_fire.canvas        = canvasFon;
		img_fire.pic           = imagesLoaded.fire;

		//
		img_dust.canvas        = canvasFon;
		img_dust.pic           = imagesLoaded.dust;

		// 
		img_gas.canvas         = canvasPlateBnz;
		img_gas.pic            = imagesLoaded.gas;

		//
		img_fuel.canvas        = canvasInteractive;
		img_fuel.pic_ind       = imagesLoaded.fuel_ind;
		img_fuel.pic_inf       = imagesLoaded.fuel_inf;
		img_fuel.pic_lgt       = imagesLoaded.fuel_lgt;

		//
		img_tnk_bnz.canvas     = canvasFon;
		img_tnk_bnz.pic        = imagesLoaded.tank_benz;
		img_tnk_bnz.pic_wh1    = imagesLoaded.wh1_tnkbn;
		img_tnk_bnz.pic_wh2    = imagesLoaded.wh2_tnkbn;
		img_tnk_dzl.canvas     = canvasFon;
		img_tnk_dzl.pic        = imagesLoaded.tank_diez;
		img_tnk_dzl.pic_wh1    = imagesLoaded.wh1_tnkdz;
		img_tnk_dzl.pic_wh2    = imagesLoaded.wh2_tnkdz;

		//
		img_plate.canvas       = canvasPlateDzl;
		img_plate.pic          = imagesLoaded.patt;

		//
		img_again.canvas       = canvasLogo;

		//
		init();
		
		//
		requestID = window.requestAnimationFrame(update);
	});
}

//
function init()
{
	//TweenLite.ticker.useRAF(false);
	//TweenLite.lagSmoothing(0);
	//
	img_patt.width = 250;
	img_patt.alpha = 1;
	img_patt.pos = "left"; // top = top pattern, bottom = bottom pattern, double = top & bottom pattern

	//
	img_logo.alpha = 0;
	img_logo.scaleX = 1.0;
	img_logo.scaleY = 1.0;
	img_logo.x = logoX - 50;
	img_logo.y = h / 2;

	//
	img_button.alpha = 0;
	img_button.scale = 2.8;
	img_button.x = butX - img_button.pic.width * img_button.scale/ 2;
	img_button.y = h / 2 - img_button.pic.height * img_button.scale / 2;
	
	//
	img_age.alpha = 0;

	//
	TweenLite.to(img_age, 1, {alpha:1, ease:Power0.easeNone});
	TweenLite.to(img_logo, 0.4, {x:logoX, alpha:1, ease:Power3.easeOut, delay:0.1});

	//
	img_fon1.x = 0;
	img_fon1.y = 0;

	//
	img_fon2.slice1_H = 90; // высота куска "небо + город"
	//img_fon2.slice2_H = 40;  // высота куска "дорога"
	//img_fon2.slice3_H = 49;  // высота куска "трава"
	img_fon2.slice1_X = 0;   // координата Х соответствующего куска
	//img_fon2.slice2_X = 0;
	//img_fon2.slice3_X = 0;
	img_fon2.animSpeed = 10;

	//
	img_fire.x = w / 2 + (h * Math.sin(radian(30)) ) / 2 + 8;
	img_fire.y = h / 2;
	img_fire.alpha = 0;
	img_fire.height = 0;
	TweenLite.to(img_fire, 0.4, {alpha:1, height: 1, ease:Power1.easeOut, delay:0.82});

	//
	img_dust.density = 0;
	img_dust.densityMax = 1;

	//
	img_ico_bnz.x = 340 - 60;
	img_ico_bnz.y = h / 2;
	img_ico_bnz.shPower = 20;
	img_ico_bnz.alpha = 0;
	img_ico_bnz.scale = 1;
	img_ico_bnz.isOver = false;
	TweenLite.to(img_ico_bnz, 0.3, {alpha:1, ease:Power0.easeNone, delay:0.3});
	TweenLite.to(img_ico_bnz, 0.8, {x:340,    ease:Elastic.easeOut, delay:0.3});
	
	//
	img_ico_dzl.x = 540 + 60;
	img_ico_dzl.y = h / 2;
	img_ico_dzl.shPower = 20;
	img_ico_dzl.alpha = 0;
	img_ico_dzl.scale = 1;
	img_ico_dzl.isOver = false;
	TweenLite.to(img_ico_dzl, 0.3, {alpha:1, ease:Power0.easeNone, delay:1.2});
	TweenLite.to(img_ico_dzl, 0.8, {x:540,    ease:Elastic.easeOut, delay:1.2});
	//
	TweenLite.delayedCall(2.1, function()
		{
			allowFl = true;
			//
			if(overFl === true)
			{
				mMove(null);
			}
			else
			{
				autoplayFl = true;
			}
		});

	//
	img_plt_bnz.x = 0;
	img_plt_bnz.y = h / 2 - 15;
	img_plt_bnz.alpha = 0;
	img_plt_bnz.scale = 1;
	TweenLite.to(img_plt_bnz, 0.3, {x:150, alpha:1, ease:Power3.easeOut, delay:0.5});
	//
	img_plt_dzl.x = w + 20 + 150;
	img_plt_dzl.y = h / 2 - 15;
	img_plt_dzl.alpha = 0;
	img_plt_dzl.scale = 1;
	TweenLite.to(img_plt_dzl, 0.3, {x:w + 20, alpha:1, ease:Power3.easeOut, delay:1.4});
	//
	img_plt_or.x = 440;
	img_plt_or.y = h / 2 - 30;
	img_plt_or.alpha = 0;
	img_plt_or.scale = 1;
	TweenLite.to(img_plt_or, 0.4, {y:h / 2, alpha:1, ease:Elastic.easeOut, delay:1.1});

	//
	img_gas.x = -80;
	img_gas.y = 130;

	//
	img_fuel.x = fuelX;
	img_fuel.y = h / 2 - 40;
	img_fuel.alpha = 0;
	img_fuel.fuel = 0;

	//
	img_tnk_bnz.x = -110;
	img_tnk_bnz.y = 56;
	img_tnk_bnz.turr_Y   = 0;
	img_tnk_bnz.turr_X   = 0;
	img_tnk_bnz.turr_ang = 0;
	img_tnk_bnz.wheel_ang = 0;

	//
	img_tnk_dzl.x = -110;
	img_tnk_dzl.y = 55;
	img_tnk_dzl.turr_Y   = 0;
	img_tnk_dzl.turr_X   = 0;
	img_tnk_dzl.turr_ang = 0;
	img_tnk_dzl.wheel_ang = 0;

	//
	img_dark.alpha = 1;
	TweenLite.to(img_dark, 0.5, {alpha:0, ease:Power1.easeOut});

	//
	img_plate.x = w;
	img_plate.y = 0;
	img_plate.height = h;
	img_plate.width = txtPlateWidth;
img_plate.alpha = 0;
	
	//
	img_again.height = againPlateHeight;
	img_again.x = w / 4;
	img_again.y = h;
	img_again.isOver = false;
	img_again.isReady = false;
	img_again.alpha = 0.6;
}

//
function update(time)
{
	delta = timer(time);
	//
	clearCanvas(canvasLogo);
	drawObjects();
	//
	if(bannerStatus === "interaction")
	{
		clearCanvas(canvasFon);
		clearCanvas(canvasPlateBnz);
		clearCanvas(canvasPlateDzl);
		clearCanvas(canvasPlateOr);
		//
		drawFon(img_fon1);
		drawFire(img_fire);
		drawIcoBnz(img_ico_bnz);
		drawIcoDzl(img_ico_dzl);

		//
		drawPlateBnz(img_plt_bnz);
		drawPlateDzl(img_plt_dzl);
		drawPlateOr(img_plt_or);
		//
		if(autoplayFl === true)
		{
			autoplayTmr ++;
			//
			if(autoplayTmr === Math.floor(autoplayTmrMax / 8))
			{
				showBenz();
			}
			//
			if(autoplayTmr === Math.floor(2 * autoplayTmrMax / 8))
			{
				showNeutral();
			}
			//
			if(autoplayTmr === Math.floor(3 * autoplayTmrMax / 8))
			{
				showDiezel();
			}
			//
			if(autoplayTmr === Math.floor(4 *autoplayTmrMax / 8))
			{
				showNeutral();
			}
			//
			if(autoplayTmr === Math.floor(5 * autoplayTmrMax / 8))
			{
				showBenz();
			}
			//
			if(autoplayTmr === Math.floor(6 * autoplayTmrMax / 8))
			{
				showNeutral();
			}
			//
			if(autoplayTmr === Math.floor(7 * autoplayTmrMax / 8))
			{
				showDiezel();
			}
			//
			if(autoplayTmr === autoplayTmrMax)
			{
				allowFl = false;
				showNeutral();
				TweenLite.to(img_dark, 0.6, {alpha: 1, ease:Power1.easeIn, onComplete:goAnimation, onCompleteParams:[true], delay:0.6});
			}
		}
	}
	else if(bannerStatus === "animation")
	{
		clearAll();
		//
		moveFon(delta);
		//
		drawRoad(img_fon2);
		//
		if(userChoise === "benzin")
		{
			drawTankBnz(img_tnk_bnz);
		}
		else
		{
			drawTankDzl(img_tnk_dzl);
		}
		
		//
		img_dust.density ++;
		//
		if(img_dust.density >= img_dust.densityMax)
		{
			img_dust.density = 0;
			//
			var tankX = 0;
			var tankY = 0;
			//
			img_dust.alphaKoef = 0;
			//
			if(userChoise === "benzin")
			{
				tankX = img_tnk_bnz.x;
				tankY = img_tnk_bnz.y + 42 + Math.random() * 8;
			}
			else
			{
				tankX = img_tnk_dzl.x + 20;
				tankY = img_tnk_dzl.y + 44 + Math.random() * 12;
				img_dust.alphaKoef = 0.1 +  Math.random() * 0.1;
			}
			//
			addDust(tankX -50 + Math.random() * 150, tankY);
		}
		//
		for(var i = 0; i < dustArr.length; i ++)
		{
			dustArr[i].update(img_dust);
		}
		//
		drawGas(img_gas);
		//
		drawFuel(img_fuel);
		//
		drawPlateText(img_plate);
		//
		drawPlateAgain(img_again);
		//
		if(restartFl === true)
		{
			if(autoplayTmr < autoplayTmrMax)
			{
				autoplayTmr ++;
			}
			else
			{
				autoplayTmr = 0;
				restartFl = false;
				restartBanner();
			}
		}
	}
	
	//
	drawDarker(img_dark);
	
	//
	requestID = window.requestAnimationFrame(update);
}

//
function checkSide()
{
	TweenLite.killTweensOf(img_ico_dzl);
	TweenLite.killTweensOf(img_ico_bnz);
	TweenLite.killTweensOf(img_plt_bnz);
	TweenLite.killTweensOf(img_plt_dzl);
	TweenLite.killTweensOf(img_fire);
	//
	if(img_ico_dzl.isOver === true)
	{
		TweenLite.to(img_plt_bnz, 0.45, {x:150 - 30, alpha: 0, ease:Back.easeOut});
		TweenLite.to(img_plt_dzl, 0.45, {y: h / 2 - 25, scale:1.4, ease:Back.easeOut});
		//
		TweenLite.to(img_ico_bnz, 0.5, {x: 340 - 40, alpha:0, scale:0.25, ease:Expo.easeOut});
		TweenLite.to(img_ico_dzl, 0.5, {x: 440, scale:1.2, shPower: 80, ease:Expo.easeOut});
		//
		TweenLite.to(img_fire, 0.5, {x: w / 2 + (h * Math.sin(radian(30)) ) / 2 + 8 - 185, alpha: 0, ease:Expo.easeOut});
		//
		userChoise = "diezel";
	}
	else if(img_ico_bnz.isOver === true)
	{
		TweenLite.to(img_plt_dzl, 0.45, {x: w + 20 - 30, alpha: 0, ease:Back.easeOut});
		TweenLite.to(img_plt_bnz, 0.45, {y: h / 2 - 25, scale:1.4, ease:Back.easeOut});
		//
		TweenLite.to(img_ico_bnz, 0.5, {x: 440, scale:1.2, shPower: 80, ease:Expo.easeOut});
		TweenLite.to(img_ico_dzl, 0.5, {x: 540 + 40, alpha:0, scale:0.25, ease:Expo.easeOut});
		//
		TweenLite.to(img_fire, 0.5, {x: w / 2 + (h * Math.sin(radian(30)) ) / 2 + 8 + 185, alpha: 0, ease:Expo.easeOut});
	}
	else
	{
		TweenLite.to(img_plt_dzl, 0.45, {x: w + 20 - 30, alpha: 0, ease:Back.easeOut});
		TweenLite.to(img_plt_bnz, 0.45, {y: h / 2 - 25, scale:1.4, ease:Back.easeOut});
		//
		TweenLite.to(img_ico_bnz, 0.5, {x: 440, scale:1.2, shPower: 80, ease:Expo.easeOut});
		TweenLite.to(img_ico_dzl, 0.5, {x: 540 + 40, alpha:0, scale:0.25, ease:Expo.easeOut});
		//
		TweenLite.to(img_fire, 0.5, {x: w / 2 + (h * Math.sin(radian(30)) ) / 2 + 8 + 185, alpha: 0, ease:Expo.easeOut});
		//
		TweenLite.killTweensOf(img_plt_or);
		TweenLite.to(img_plt_or,  0.35, {x: 440 + 30, scale:0.5, alpha:0, ease:Expo.easeOut});
	}
	//
	TweenLite.to(img_dark, 0.6, {alpha: 1, ease:Power1.easeIn, onComplete:goAnimation, onCompleteParams:[false], delay:0.6});
}

//
function goAnimation(isAuto)
{
	bannerStatus = "animation";
	//
	clearCanvas(canvasPlateDzl);
	clearCanvas(canvasPlateOr);
	clearCanvas(canvasPlateBnz);
	//
	TweenLite.to(img_dark, 0.3, {alpha: 0, ease:Power2.easeOut});
	//
	if(isAuto === true)
	{
		linkFl = true;
		img_dust.densityMax = 0;
		img_fon2.animSpeed = -14;
		//
		var rndNum = Math.random();
		//
		if(rndNum > 0.5)
		{
			userChoise = "diezel";
			img_tnk_dzl.x = 378;
		}
		else
		{
			userChoise = "benzin";
			img_tnk_bnz.x = 368;
		}
		//
		TweenLite.to(img_button, 0.4, {x: butX - img_button.pic.width * 0.88 / 2, y: h / 2 - img_button.pic.height * 0.88 / 2, alpha: 1, scale: 0.88, ease:Power3.easeIn, delay:1.5, onComplete:function(){
			isButtonAppear = true;
		}});
		TweenLite.to(img_button, 0.4, {x: butX - img_button.pic.width/ 2,         y: h / 2 - img_button.pic.height / 2,        scale: 1, ease:Elastic.easeOut, delay:1.9});
		//
		TweenLite.delayedCall(2.6, activateRestartButton);
		//
		TweenLite.to(img_again, 0.5, {y: h - img_again.height, ease:Power2.easeOut, delay:2.5});
		//
		TweenLite.delayedCall(3.0, activateRestartFlag);
	}
	else
	{
		TweenLite.to(img_fon2, 2.5, {animSpeed: 0, ease:Power2.easeOut});
		//
		TweenLite.to(img_fon2, 0.2, {animSpeed: 0.5, ease:Power4.easeInOut, delay:9});
		TweenLite.to(img_fon2, 2.5, {animSpeed: -14, ease:Power2.easeIn, delay:9.2});
		//
		TweenLite.to(img_dust, 6, {densityMax: 9, ease:Power2.easeOut, delay:3});
		//
		TweenLite.to(img_fuel, 1.2, {y: h / 2, alpha: 1, ease:Elastic.easeOut, delay:3.5});
		TweenLite.to(img_fuel,   4, {fuel: 1, ease:Sine.easeOut, delay:4.5});
		TweenLite.to(img_fuel, 0.8, {y: h / 2 + 40, alpha: 0, ease:Back.easeIn, delay:9.8});
		//
		if(userChoise === "benzin")
		{
			TweenLite.to(img_tnk_bnz, 1.6, {x: 290, wheel_ang:360, ease:Power1.easeIn, delay:1});
			TweenLite.to(img_tnk_bnz, 1.6, {x: 380, wheel_ang:540, ease:Power3.easeOut, delay:2.6});
			TweenLite.to(img_tnk_bnz, 1.2, {x: 368, wheel_ang:520, ease:Power2.easeOut, delay:3.0, onComplete:function()
				{
					linkFl = true;
					document.getElementById("Interactive").style.cursor = "pointer";
				}});
			TweenLite.to(img_tnk_bnz, 2.2, {turr_ang: 1.5, turr_X: 4, turr_Y: 1, ease:Expo.easeOut, delay:2.4});
			TweenLite.to(img_tnk_bnz, 0.6, {turr_ang: -0.2, turr_X: -0.8, turr_Y: -0.4, ease:Power2.easeOut, delay:3.2});
			TweenLite.to(img_tnk_bnz, 0.4, {turr_ang: 0, turr_X: 0, turr_Y: 0, ease:Power0.easeNone, delay:3.8});
			//
			TweenLite.to(img_tnk_bnz, 0.6, {turr_ang: -1.9, turr_X: -2, turr_Y: 0.8, ease:Power2.easeIn, delay:8.8, onComplete:function()
				{
					img_dust.densityMax = 9;
					TweenLite.to(img_dust, 2, {densityMax: 1, ease:Power2.easeIn});
				}});
			TweenLite.to(img_tnk_bnz, 1.6, {turr_ang: 0, turr_X: 0, turr_Y: 0, ease:Power2.easeInOut, delay:9.6});
		}
		else
		{
			TweenLite.to(img_tnk_dzl, 1.6, {x: 300, wheel_ang:360, ease:Power1.easeIn, delay:1});
			TweenLite.to(img_tnk_dzl, 1.6, {x: 390, wheel_ang:540, ease:Power3.easeOut, delay:2.6});
			TweenLite.to(img_tnk_dzl, 1.2, {x: 378, wheel_ang:520, ease:Power2.easeOut, delay:3.0, onComplete:function()
				{
					linkFl = true;
					document.getElementById("Interactive").style.cursor = "pointer";
				}});
			TweenLite.to(img_tnk_dzl, 2.2, {turr_ang: 1.9, turr_X: 6, turr_Y: -1, ease:Expo.easeOut, delay:2.4});
			TweenLite.to(img_tnk_dzl, 0.6, {turr_ang: -0.2, turr_X: -0.8, turr_Y: 0.4, ease:Power2.easeOut, delay:3.2});
			TweenLite.to(img_tnk_dzl, 0.4, {turr_ang: 0, turr_X: 0, turr_Y: 0, ease:Power0.easeNone, delay:3.8});
			//
			TweenLite.to(img_tnk_dzl, 0.6, {turr_ang: -2.9, turr_X: -3, turr_Y: 0.9, ease:Power2.easeIn, delay:8.8, onComplete:function()
				{
					img_dust.densityMax = 9;
					TweenLite.to(img_dust, 2, {densityMax: 1, ease:Power2.easeIn});
				}});
			TweenLite.to(img_tnk_dzl, 1.6, {turr_ang: 0, turr_X: 0, turr_Y: 0, ease:Power2.easeInOut, delay:9.6});
		}

		//
		TweenLite.to(img_plate, 1.5, {x:w - txtPlateWidth, alpha:1, ease:Elastic.easeOut, delay:10.3});
		TweenLite.to(img_plate, 0.8, {x:w, alpha:0, ease:Back.easeOut, delay:13.8});
		//
		TweenLite.to(img_button, 0.4, {x: butX - img_button.pic.width * 0.88 / 2, y: h / 2 - img_button.pic.height * 0.88 / 2, alpha: 1, scale: 0.88, ease:Power3.easeIn, delay:14.5, onComplete:function(){
			isButtonAppear = true;
		}});
		TweenLite.to(img_button, 0.4, {x: butX - img_button.pic.width/ 2,         y: h / 2 - img_button.pic.height / 2,        scale: 1, ease:Elastic.easeOut, delay:14.9});
		//
		TweenLite.delayedCall(15.6, activateRestartButton);
		//
		TweenLite.to(img_again, 0.5, {y: h - img_again.height, ease:Power2.easeOut, delay:15.5});
		//
		TweenLite.delayedCall(16.0, activateRestartFlag);
	}
}

//
function activateRestartButton()
{
	img_again.isReady = true;
	//console.log("transform to: " + img_again.isReady);
}

//
function activateRestartFlag()
{
	autoplayTmr = 0;
	restartFl = true;
}

//
function moveFon(dlt)
{
	img_fon2.slice1_X += img_fon2.animSpeed / 3;
	//img_fon2.slice2_X += img_fon2.animSpeed / 3;
	//img_fon2.slice3_X += img_fon2.animSpeed;
	//
	if(img_fon2.slice1_X >= img_fon2.pic.width)
	{
		img_fon2.slice1_X -= img_fon2.pic.width;
	}
	else if(img_fon2.slice1_X <= -img_fon2.pic.width)
	{
		img_fon2.slice1_X += img_fon2.pic.width;
	}
	//
	/*if(img_fon2.slice2_X >= img_fon2.pic.width)
	{
		img_fon2.slice2_X -= img_fon2.pic.width;
	}
	else if(img_fon2.slice2_X <= -img_fon2.pic.width)
	{
		img_fon2.slice2_X += img_fon2.pic.width;
	}
	//
	if(img_fon2.slice3_X >= img_fon2.pic.width)
	{
		img_fon2.slice3_X -= img_fon2.pic.width;
	}
	else if(img_fon2.slice3_X <= -img_fon2.pic.width)
	{
		img_fon2.slice3_X += img_fon2.pic.width;
	}*/

	//
	img_gas.x += convertToTBA(dlt, img_fon2.animSpeed * 60);

	//
	var rotSpd = 0;
	var delta = Math.abs(img_fon2.animSpeed) - 8;
	//
	if(delta < 0)
	{
		rotSpd = img_fon2.animSpeed;
	}
	else
	{
		rotSpd = img_fon2.animSpeed + delta;
	}
	//
	if(userChoise === "benzin")
	{
		img_tnk_bnz.wheel_ang -= rotSpd * 2;
		//
		if(img_fon2.animSpeed < -4)
		{
			img_tnk_bnz.turr_Y = 1 * Math.cos(radian(img_tnk_bnz.wheel_ang / 2));
		}
	}
	else
	{
		img_tnk_dzl.wheel_ang -= rotSpd * 2;
		//
		if(img_fon2.animSpeed < -4)
		{
			img_tnk_dzl.turr_Y = 1 * Math.cos(radian(img_tnk_dzl.wheel_ang / 2));
		}
	}
}

// mouse over
function mOver(evt)
{
	overFl = true;
	//
	if(allowFl === true)
	{
		autoplayFl = false;
		autoplayTmr = 0;
	}
}

// mouse out
function mOut(evt)
{
	overFl = false;
	//
	if(allowFl === true)
	{
		showNeutral();
	}
	//
	if(isButtonAppear === true && bannerStatus === "animation")
	{
		if(isButtonOver === true)
		{
			isButtonOver = false;
			TweenLite.to(img_button, 0.7, {x:-(img_button.pic.width - w)  / 2, y:butY, scale:1, ease: Elastic.easeOut});
		}
		//
		if(img_again.isOver === true)
		{
			img_again.isOver = false;
			TweenLite.killTweensOf(img_again);
			TweenLite.to(img_again, 0.5, {y:h - img_again.height, alpha:0.6, ease: Power2.easeOut});
		}
	}
}

// mouse move
function mMove(evt)
{
	if(evt)
	{
		mousePos = getMousePos(evt);
	}
	
	//
	if(allowFl === true)
	{
		var crossLineDelta = 20 * (mousePos.y - h / 2) / (h / 2);
		//
		if(mousePos.x > 80 + w / 2 - crossLineDelta && img_ico_dzl.isOver === false)
		{
			showDiezel();
		}
		
		if(mousePos.x <= 80 + w / 2 - crossLineDelta && img_ico_bnz.isOver === false)
		{
			showBenz();
		}
	}
	//
	if(isButtonAppear === true && bannerStatus === "animation")
	{
		var leftBorder = butX - img_button.pic.width / 2;
		var topBorder = h / 2 - img_button.pic.height / 2;
		//
		if(mousePos.x > leftBorder && mousePos.x < (leftBorder + img_button.pic.width))
		{
			if(mousePos.y > topBorder && mousePos.y < (topBorder + img_button.pic.height))
			{
				if(isButtonOver === false && isButtonAppear === true)
				{
					isButtonOver = true;
					TweenLite.killTweensOf(img_button);
					TweenLite.to(img_button, 0.4, {x: butX - img_button.pic.width * 1.15 / 2, y: h / 2 - img_button.pic.height * 1.15 / 2, scale:1.15, alpha: 1, ease: Back.easeOut});
				}
			}
			else
			{
				if(isButtonOver === true && isButtonAppear === true)
				{
					isButtonOver = false;
					TweenLite.killTweensOf(img_button);
					TweenLite.to(img_button, 0.7, {x:butX - img_button.pic.width / 2, y:h / 2 - img_button.pic.height / 2, scale:1, alpha: 1, ease: Elastic.easeOut});
				}
			}
		}
		else
		{
			if(isButtonOver === true && isButtonAppear === true)
			{
				isButtonOver = false;
				TweenLite.killTweensOf(img_button);
				TweenLite.to(img_button, 0.7, {x:butX - img_button.pic.width / 2, y:h / 2 - img_button.pic.height / 2, scale:1, alpha: 1, ease: Elastic.easeOut});
			}
		}
		//
		if(mousePos.y > (h - img_again.height) && mousePos.x > w / 4 && mousePos.x < 3 * w / 4)
		{
			if(img_again.isOver === false)
			{
				img_again.isOver = true;
				TweenLite.killTweensOf(img_again);
				TweenLite.to(img_again, 0.4, {y:h - img_again.height - 4, ease:Elastic.easeOut});
				TweenLite.to(img_again, 0.24, {alpha:0.9, ease:Power1.easeOut});
				//
				document.getElementById("Interactive").style.cursor = "auto";
			}
		}
		else
		{
			if(img_again.isOver === true)
			{
				img_again.isOver = false;
				TweenLite.killTweensOf(img_again);
				TweenLite.to(img_again, 0.4, {y:h - img_again.height, alpha:0.9, ease: Power2.easeOut});
				//
				document.getElementById("Interactive").style.cursor = "pointer";
			}

		}
	}
}

//
function mClick(evt)
{
	if(allowFl === true)
	{
		checkSide();
		//
		allowFl = false;
	}
	//
	if(linkFl === true)
	{
		if(mousePos.y > (h - img_again.height) && img_again.isReady === true)
		{
			autoplayTmr = 0;
			restartFl = false;
			restartBanner();
		}
		else
		{
			ExitApi.exit();
		}
	}
}

//
function autoplay()
{
	document.getElementById("Interactive").style.cursor = "auto";
	//
	allowFl = false;
	//
	var prLen = presents.length;
	var prToGoNum = Math.floor(Math.random() * prLen);
	var prToGo = presents[prToGoNum];
	//
	TweenLite.to(img_aim, 1, {x: this["img_present" + prToGo].x, y: this["img_present" + prToGo].y + 74, ease: Power2.easeOut, onUpdate: drawAim, onUpdateParams:[img_aim], onComplete:autoplayShot, onCompleteParams:[prToGo, this]});
	TweenLite.to(img_plate, 0.5, {y:h + 1, ease:Power2.easeIn,  onUpdate:drawPlateText, onUpdateParams:[img_plate]});
}

//
function restartBanner()
{
	isButtonAppear = false;
	//
	linkFl = false;
	//
	img_again.isReady = false;
	//
	document.getElementById("Interactive").style.cursor = "auto";
	//
	TweenLite.to(img_again, 0.8, {y:h, ease: Power3.easeOut});
	//
	TweenLite.to(img_dark, 1.2, {alpha:1, ease: Power1.easeIn, delay:0.4, onComplete:function()
		{
			bannerStatus = "interaction";
			userChoise = "benzin";
			isAuto = false;
			//
			dustArr = [];
			dustName = 0;
			//
			allowFl = false;
			clickFl = false;
			//
			//finFl = false;
			isButtonOver = false;
			//
			autoplayTmr = 0;
			autoplayFl = false;
			isAutoplay = false;
			//
			clearAll();
			//
			init();
		}});
}

//
function clearAll()
{
	clearCanvas(canvasFon);
	clearCanvas(canvasInteractive);
	clearCanvas(canvasPlateBnz);
	clearCanvas(canvasPlateDzl);
}

/////////////////////////////////////////////// DRAW
function drawObjects()
{
	var ctx = canvasLogo.getContext("2d");
	//
	drawPattern(img_patt);
	drawButton(img_button);
	drawLogo(img_logo);
	drawAge(img_age);
}

/////////////////////////////////////////////// SERVICE
function getMousePos(evt)
{
   var rect = canvasInteractive.getBoundingClientRect();
   return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
   };
}

//
function loadImages(imagesToBeLoaded, drawCallback)
{
	var imagesLoaded = {};
	var loadedImages = 0;
	var numberOfImagesToLoad = 0;
	//
	for(var name in imagesToBeLoaded)
	{
		numberOfImagesToLoad++;
	}
	
	for(var name in imagesToBeLoaded)
	{
		imagesLoaded[name] = new Image();
		imagesLoaded[name].onload = function()
		{
			if(++loadedImages >= numberOfImagesToLoad)
			{
				drawCallback(imagesLoaded);
			}
		};
		//
		imagesLoaded[name].src = imagesToBeLoaded[name];
	}
}

//
function drawShadow(imgObj, x, y, h, _alpha, _scale)
{
	var ctx = imgObj.canvas.getContext('2d');
	//
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(_scale, 1);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, h, 0, 2 * Math.PI);
    //
	var grd = ctx.createRadialGradient(0, 0, 1, 0, 0, h);
	grd.addColorStop(0.2,"rgba(0, 0, 0, " + _alpha + ")");
	grd.addColorStop(1,"rgba(0, 0, 0, 0)");
	ctx.fillStyle = grd;
	ctx.fill();
	//
    ctx.restore();
}

//
function clearCanvas(canv)
{
	var ctx = canv.getContext("2d");
	//
	ctx.clearRect(0, 0, w, h);
}

// Convert To Radians
function radian(a)
{
	return a * Math.PI / 180;
}

////////////////////////////////////////////////////////////////////////////////////// ACTIONS
window.onLoad = start();