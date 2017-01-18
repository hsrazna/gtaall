function timer(currentTime)
{
	var dlt = currentTime - oldTime;
	oldTime = currentTime;
	return dlt;
}

//
var convertToTBA = function (delta, speed)
{
	//console.log(delta + ", " + speed);
	return (speed * delta) / 1000;
};