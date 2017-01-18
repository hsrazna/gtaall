//
function drawRoad(picObj)
{
	var ctx = picObj.canvas.getContext('2d');
	//
	ctx.save();
	//
	ctx.drawImage(picObj.pic, 0,                                 0, picObj.pic.width, picObj.slice1_H,                      picObj.slice1_X,                                 0, picObj.pic.width, picObj.slice1_H);
	ctx.drawImage(picObj.pic, 0,                                 0, picObj.pic.width, picObj.slice1_H, - picObj.pic.width + picObj.slice1_X,                                 0, picObj.pic.width, picObj.slice1_H);
	ctx.drawImage(picObj.pic, 0,                                 0, picObj.pic.width, picObj.slice1_H,   picObj.pic.width + picObj.slice1_X,                                 0, picObj.pic.width, picObj.slice1_H);
	//
	/*ctx.drawImage(picObj.pic, 0,                   picObj.slice1_H, picObj.pic.width, picObj.slice2_H,                      picObj.slice2_X,                   picObj.slice1_H, picObj.pic.width, picObj.slice2_H);
	ctx.drawImage(picObj.pic, 0,                   picObj.slice1_H, picObj.pic.width, picObj.slice2_H, - picObj.pic.width + picObj.slice2_X,                   picObj.slice1_H, picObj.pic.width, picObj.slice2_H);
	ctx.drawImage(picObj.pic, 0,                   picObj.slice1_H, picObj.pic.width, picObj.slice2_H,   picObj.pic.width + picObj.slice2_X,                   picObj.slice1_H, picObj.pic.width, picObj.slice2_H);
	//
	ctx.drawImage(picObj.pic, 0, picObj.slice1_H + picObj.slice2_H, picObj.pic.width, picObj.slice3_H,                      picObj.slice3_X, picObj.slice1_H + picObj.slice2_H, picObj.pic.width, picObj.slice3_H);
	ctx.drawImage(picObj.pic, 0, picObj.slice1_H + picObj.slice2_H, picObj.pic.width, picObj.slice3_H, - picObj.pic.width + picObj.slice3_X, picObj.slice1_H + picObj.slice2_H, picObj.pic.width, picObj.slice3_H);
	ctx.drawImage(picObj.pic, 0, picObj.slice1_H + picObj.slice2_H, picObj.pic.width, picObj.slice3_H,   picObj.pic.width + picObj.slice3_X, picObj.slice1_H + picObj.slice2_H, picObj.pic.width, picObj.slice3_H);*/
	//
	ctx.restore();
}

//
function drawGas(imgObj)
{
	var ctx = imgObj.canvas.getContext('2d');
	//
	drawShadow(imgObj, imgObj.x, imgObj.y + 1, 6, 0.8, 22);
	//
	ctx.save();
	//
	ctx.translate(imgObj.x, imgObj.y);
	ctx.scale(0.85, 0.85);
	//
	ctx.beginPath();
	ctx.moveTo(62.708,-31.111);
	ctx.lineTo(23.155,-31.111);
	ctx.lineTo(23.155,-34.098);
	ctx.lineTo(22.217000000000002,-34.098);
	ctx.lineTo(22.217000000000002,-103.848);
	ctx.lineTo(24.967000000000002,-103.848);
	ctx.lineTo(24.967000000000002,-105.973);
	ctx.lineTo(22.342000000000002,-105.973);
	ctx.lineTo(22.342000000000002,-107.223);
	ctx.lineTo(23.092000000000002,-107.223);
	ctx.lineTo(23.092000000000002,-109.723);
	ctx.lineTo(22.217000000000002,-109.723);
	ctx.lineTo(22.217000000000002,-124.098);
	ctx.bezierCurveTo(22.217000000000002,-124.098,21.467000000000002,-130.223,19.092000000000002,-132.723);
	ctx.bezierCurveTo(16.717000000000002,-135.223,12.154000000000003,-135.306,8.904000000000002,-135.306);
	ctx.bezierCurveTo(5.654,-135.306,-5.845999999999998,-135.306,-9.970999999999998,-135.306);
	ctx.bezierCurveTo(-14.095999999999998,-135.306,-22.782999999999998,-135.098,-22.782999999999998,-128.598);
	ctx.bezierCurveTo(-22.782999999999998,-122.09800000000001,-22.782999999999998,-122.09800000000001,-22.782999999999998,-122.09800000000001);
	ctx.lineTo(-24.407999999999998,-122.34800000000001);
	ctx.lineTo(-25.782999999999998,-119.72300000000001);
	ctx.lineTo(-30.657999999999998,-119.72300000000001);
	ctx.lineTo(-31.657999999999998,-117.09800000000001);
	ctx.lineTo(-31.657999999999998,-114.09800000000001);
	ctx.lineTo(-34.908,-114.09800000000001);
	ctx.lineTo(-34.658,-111.84800000000001);
	ctx.lineTo(-33.658,-111.22300000000001);
	ctx.lineTo(-31.908,-111.22300000000001);
	ctx.lineTo(-31.658,-104.34800000000001);
	ctx.bezierCurveTo(-31.658,-104.34800000000001,-37.283,-93.59800000000001,-39.908,-86.97300000000001);
	ctx.bezierCurveTo(-42.533,-80.34800000000001,-46.503,-68.69600000000001,-46.628,-64.32100000000001);
	ctx.bezierCurveTo(-50.752,-61.72100000000001,-52.138,-57.676000000000016,-51.763,-52.551000000000016);
	ctx.bezierCurveTo(-51.388,-47.426000000000016,-45.784,-40.96100000000001,-39.064,-40.99200000000002);
	ctx.bezierCurveTo(-35.335,-41.01500000000002,-24.658,-42.77500000000002,-24.408,-67.99900000000002);
	ctx.bezierCurveTo(-24.783,-86.09800000000003,-28.283,-100.22300000000001,-28.283,-100.22300000000001);
	ctx.lineTo(-26.908,-99.84800000000001);
	ctx.lineTo(-23.783,-96.97300000000001);
	ctx.lineTo(-23.783,-31.598000000000013);
	ctx.lineTo(-59.533,-31.598000000000013);
	ctx.lineTo(-73.283,-25.723000000000013);
	ctx.lineTo(-73.283,-13.223000000000013);
	ctx.lineTo(-72.158,-12.723000000000013);
	ctx.lineTo(-72.158,-9.348000000000013);
	ctx.lineTo(-72.658,-7.098000000000013);
	ctx.lineTo(-72.506,0);
	ctx.lineTo(71.481,0);
	ctx.lineTo(71.481,-14.912);
	ctx.lineTo(73.282,-14.912);
	ctx.lineTo(73.282,-24.361);
	ctx.lineTo(62.708,-31.111);
	ctx.closePath();
	ctx.moveTo(-47.623,-61.126);
	ctx.bezierCurveTo(-48.815,-55.465999999999994,-48.144,-48.391,-42.186,-43.251);
	ctx.bezierCurveTo(-47.417,-43.753,-54.028,-54.518,-47.623,-61.126);
	ctx.closePath();
	ctx.moveTo(-35.186,-46.454);
	ctx.bezierCurveTo(-37.942,-43.922,-40.971000000000004,-44.116,-43.527,-47.273);
	ctx.bezierCurveTo(-44.793,-48.836000000000006,-48.443,-56.804,-44.868,-63.656000000000006);
	ctx.bezierCurveTo(-41.293,-63.88,-36.899,-64.402,-34.218,-59.785000000000004);
	ctx.bezierCurveTo(-31.537000000000006,-55.168000000000006,-32.43,-48.986,-35.186,-46.454);
	ctx.closePath();
	ctx.moveTo(-26.695,-70.208);
	ctx.bezierCurveTo(-26.695,-58.292,-28.032,-52.188,-30.047,-50.992);
	ctx.bezierCurveTo(-29.377,-57.471,-31.151,-59.443999999999996,-33.385,-62.199999999999996);
	ctx.bezierCurveTo(-35.619,-64.95599999999999,-40.772,-66.11099999999999,-44.793,-65.58999999999999);
	ctx.bezierCurveTo(-43.324,-76.16199999999999,-36.973,-89.571,-30.939999999999998,-100.445);
	ctx.bezierCurveTo(-28.557,-92.998,-26.695,-82.124,-26.695,-70.208);
	ctx.closePath();
	ctx.moveTo(-23.657,-106.099);
	ctx.lineTo(-28.032,-106.099);
	ctx.lineTo(-28.032,-108.599);
	ctx.lineTo(-24.782,-112.974);
	ctx.lineTo(-23.657,-112.974);
	ctx.lineTo(-23.657,-106.099);
	ctx.closePath();
	//
	ctx.translate(-75, -136);
	//
	ctx.shadowColor = "rgba(10, 8, 6, 0.35)";
	ctx.shadowBlur = 12;
	ctx.shadowOffsetY = 4;
	//
	var pattern = ctx.createPattern(imgObj.pic, 'repeat');
	ctx.fillStyle = pattern;
	ctx.fill();
	//
	ctx.restore();
}