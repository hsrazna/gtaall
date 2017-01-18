// DRAW BENZIN & DIEZEL ICONS
function drawIcoBnz(imgObj)
{
	var ctx = imgObj.canvas.getContext('2d');
	//
	ctx.save();
	//
	ctx.shadowColor = "rgb(155, 175, 210)";
	ctx.shadowBlur = imgObj.shPower;
	ctx.shadowOffsetY = 1;
	ctx.globalAlpha = imgObj.alpha;
	//
	ctx.translate(imgObj.x, imgObj.y);
	ctx.scale(imgObj.scale * 0.7, imgObj.scale * 0.7);
	//
	ctx.beginPath();
	//
	ctx.moveTo(-44.938,37.089);
	ctx.lineTo(-48.563,-37.286);
	ctx.bezierCurveTo(-48.563,-37.286,-49.382000000000005,-37.857,-49.334,-38.744);
	ctx.bezierCurveTo(-49.286,-39.631,-48.188,-40.036,-48.188,-40.036);
	ctx.bezierCurveTo(-48.188,-40.036,-10.425000000000004,-58.011,-9.453000000000003,-58.42400000000001);
	ctx.bezierCurveTo(-8.481000000000002,-58.83700000000001,-6.564000000000004,-58.784000000000006,-5.938000000000002,-58.66100000000001);
	ctx.bezierCurveTo(-5.312000000000001,-58.53800000000001,47.598,-48.092000000000006,47.598,-48.092000000000006);
	ctx.bezierCurveTo(47.598,-48.092000000000006,49.146,-47.83200000000001,49.317,-46.76500000000001);
	ctx.bezierCurveTo(49.447,-45.95100000000001,48.812,-45.03600000000001,48.812,-45.03600000000001);
	ctx.lineTo(46.812,25.96399999999999);
	ctx.bezierCurveTo(46.812,25.96399999999999,47.724,26.499999999999993,47.76,27.638999999999992);
	ctx.bezierCurveTo(47.784,28.415999999999993,46.562,29.71399999999999,46.562,29.71399999999999);
	ctx.bezierCurveTo(46.562,29.71399999999999,16.775,57.846,16.182,58.377);
	ctx.bezierCurveTo(15.588999999999999,58.90800000000001,10.357,58.813,9.325999999999999,58.456);
	ctx.bezierCurveTo(8.294999999999998,58.099000000000004,-44.562,39.83800000000001,-44.562,39.83800000000001);
	ctx.bezierCurveTo(-44.562,39.83800000000001,-45.394999999999996,39.531000000000006,-45.550999999999995,38.34900000000001);
	ctx.bezierCurveTo(-45.654,37.58,-44.938,37.089,-44.938,37.089);
	//
	ctx.closePath();
	//
	ctx.translate(-50, -59);
	//
	var pattern = ctx.createPattern(imgObj.pic, 'repeat');
	ctx.fillStyle = pattern;
	ctx.fill();
	//
	ctx.restore();
}

//
function drawIcoDzl(imgObj)
{
	var ctx = imgObj.canvas.getContext('2d');
	//
	ctx.save();
	//
	ctx.shadowColor = "rgb(155, 175, 210)";
	ctx.shadowBlur = imgObj.shPower;
	ctx.shadowOffsetY = 1;
	ctx.globalAlpha = imgObj.alpha;
	//
	ctx.translate(imgObj.x, imgObj.y);
	ctx.scale(imgObj.scale * 0.7, imgObj.scale * 0.7);
	//
	ctx.beginPath();
	//
	ctx.moveTo(41.42,-32.194);
	ctx.bezierCurveTo(41.42,-32.194,40.803000000000004,-47.191,40.36,-50.286);
	ctx.bezierCurveTo(39.916999999999994,-53.381,33.51,-58.432,30.414,-58.875);
	ctx.bezierCurveTo(27.318000000000005,-59.318,14.702000000000002,-60.5,11.164000000000001,-60.5);
	ctx.bezierCurveTo(7.626000000000001,-60.5,4.8050000000000015,-58.079,3.3310000000000013,-56.458);
	ctx.bezierCurveTo(1.857000000000001,-54.836999999999996,-2.251999999999999,-48.541,-2.251999999999999,-48.541);
	ctx.lineTo(-5.747999999999999,-48.702999999999996);
	ctx.lineTo(-5.747999999999999,-51.06099999999999);
	ctx.lineTo(-0.0019999999999988916,-53.206999999999994);
	ctx.lineTo(-2.6689999999999987,-56.206999999999994);
	ctx.lineTo(-7.074999999999998,-56.218999999999994);
	ctx.lineTo(-9.462999999999997,-53.57999999999999);
	ctx.lineTo(-21.668999999999997,-55.28999999999999);
	ctx.lineTo(-27.336,-55.28999999999999);
	ctx.lineTo(-29.253,-54.28999999999999);
	ctx.lineTo(-32.67,-53.456999999999994);
	ctx.lineTo(-33.337,-50.623999999999995);
	ctx.lineTo(-36.410000000000004,-50.028);
	ctx.lineTo(-36.852000000000004,-47.522999999999996);
	ctx.lineTo(-38.916000000000004,-46.93299999999999);
	ctx.lineTo(-39.505,-44.42699999999999);
	ctx.lineTo(-38.326,-40.29999999999999);
	ctx.lineTo(-34.641,-37.49899999999999);
	ctx.lineTo(-35.083,-35.28799999999999);
	ctx.bezierCurveTo(-35.083,-35.28799999999999,-45.696,-32.92999999999999,-45.696,-23.495999999999988);
	ctx.lineTo(-45.696,37.08600000000001);
	ctx.bezierCurveTo(-45.696,37.08600000000001,-45.696,41.50800000000001,-43.78,43.719000000000015);
	ctx.bezierCurveTo(-42.465,45.232,-32.675,58,-31.102,58.869);
	ctx.bezierCurveTo(-27.169,61.041,-23.437,61.05,-11.350999999999999,58.869);
	ctx.bezierCurveTo(0.735000000000003,56.688,20.93,53.004,30.216,50.056);
	ctx.bezierCurveTo(39.502,47.108,42.156,44.602,43.041,36.2);
	ctx.bezierCurveTo(43.925999999999995,27.79800000000001,45.693999999999996,-27.034999999999997,45.693999999999996,-27.034999999999997);
	ctx.lineTo(41.42,-32.194);
	ctx.closePath();
	ctx.moveTo(23.905,-45.176);
	ctx.bezierCurveTo(18.839000000000002,-46.238,4.947000000000003,-47.382000000000005,4.947000000000003,-47.382000000000005);
	ctx.bezierCurveTo(4.947000000000003,-47.382000000000005,8.297000000000002,-53.510000000000005,9.360000000000003,-54.49100000000001);
	ctx.bezierCurveTo(10.423000000000004,-55.47200000000001,11.157000000000004,-55.79800000000001,13.119000000000003,-55.635000000000005);
	ctx.bezierCurveTo(15.081000000000003,-55.472,33.631,-53.511,34.529,-53.429);
	ctx.bezierCurveTo(35.42700000000001,-53.347,35.673,-51.958,35.509,-50.732);
	ctx.bezierCurveTo(35.345,-49.506,35.556,-37.902,35.556,-37.902);
	ctx.bezierCurveTo(35.556,-37.902,27.677,-44.386,23.905,-45.176);
	//
	ctx.closePath();
	//
	ctx.translate(-46, -61);
	//
	var pattern = ctx.createPattern(imgObj.pic, 'repeat');
	ctx.fillStyle = pattern;
	ctx.fill();
	//
	ctx.restore();
}

//
function showDiezel()
{
	img_ico_bnz.isOver  = false;
	img_ico_dzl.isOver = true;
	//
	TweenLite.killTweensOf(img_ico_dzl);
	TweenLite.killTweensOf(img_ico_bnz);
	//
	TweenLite.to(img_ico_dzl, 0.35, {x: 540 - 30, scale:1.2, shPower: 80, ease:Back.easeOut});
	TweenLite.to(img_ico_bnz, 0.35, {x: 340 - 15, scale:0.7, shPower: 12, ease:Back.easeOut});
	//
	TweenLite.killTweensOf(img_plt_bnz);
	TweenLite.killTweensOf(img_plt_dzl);
	TweenLite.killTweensOf(img_plt_or);
	//
	TweenLite.to(img_plt_dzl, 0.35, {alpha: 1,  scale:1.3, ease:Back.easeOut, delay:0.1});
	TweenLite.to(img_plt_bnz, 0.35, {alpha:0.6, scale:0.8, ease:Back.easeOut, delay:0.1});
	TweenLite.to(img_plt_or,  0.35, {x: 440 - 30, scale:0.5, alpha:0, ease:Expo.easeOut});
	//
	TweenLite.killTweensOf(img_fire);
	TweenLite.to(img_fire, 0.35, {x: w / 2 + (h * Math.sin(radian(30)) ) / 2 + 8 - 35, ease:Expo.easeOut});
}

//
function showBenz()
{
	img_ico_bnz.isOver  = true;
	img_ico_dzl.isOver = false;
	//
	TweenLite.killTweensOf(img_ico_dzl);
	TweenLite.killTweensOf(img_ico_bnz);
	//
	TweenLite.to(img_ico_bnz, 0.35, {x: 340 + 30, scale:1.2, shPower: 80, ease:Back.easeOut});
	TweenLite.to(img_ico_dzl, 0.35, {x: 540 + 15, scale:0.7, shPower: 12, ease:Back.easeOut});
	//
	TweenLite.killTweensOf(img_plt_bnz);
	TweenLite.killTweensOf(img_plt_dzl);
	TweenLite.killTweensOf(img_plt_or);
	//
	TweenLite.to(img_plt_bnz, 0.35, {alpha: 1,  scale:1.3, ease:Back.easeOut, delay:0.1});
	TweenLite.to(img_plt_dzl, 0.35, {alpha:0.6, scale:0.8, ease:Back.easeOut, delay:0.1});
	TweenLite.to(img_plt_or,  0.35, {x: 440 + 30, scale:0.5, alpha:0, ease:Expo.easeOut});
	//
	TweenLite.killTweensOf(img_fire);
	TweenLite.to(img_fire, 0.35, {x: w / 2 + (h * Math.sin(radian(30)) ) / 2 + 8 + 35, ease:Expo.easeOut});
}

//
function showNeutral()
{
	img_ico_bnz.isOver  = false;
	img_ico_dzl.isOver = false;
	//
	TweenLite.killTweensOf(img_ico_dzl);
	TweenLite.killTweensOf(img_ico_bnz);
	//
	TweenLite.to(img_ico_dzl, 0.35, {x: 540, scale:1, shPower: 20, ease:Back.easeOut});
	TweenLite.to(img_ico_bnz, 0.35, {x: 340, scale:1, shPower: 20, ease:Back.easeOut});
	//
	TweenLite.killTweensOf(img_plt_bnz);
	TweenLite.killTweensOf(img_plt_dzl);
	TweenLite.killTweensOf(img_plt_or);
	//
	TweenLite.to(img_plt_dzl, 0.35, {alpha: 1, scale:1, ease:Expo.easeOut});
	TweenLite.to(img_plt_bnz, 0.35, {alpha: 1, scale:1, ease:Expo.easeOut});
	TweenLite.to(img_plt_or,  0.5,  {x:440, scale:1, alpha:1, ease:Expo.easeOut});
	//
	TweenLite.killTweensOf(img_fire);
	TweenLite.to(img_fire, 0.5, {x: w / 2 + (h * Math.sin(radian(30)) ) / 2 + 8, ease:Expo.easeOut});
	//
	autoplayFl = true;
}