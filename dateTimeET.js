const dateFormattedET = function(rahvakalender){
	let timeNow = new Date();
	const monthNamesET = ['jaanuar', 'veebruar', 'marts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'];
	
	const folkMonthNamesET = ['naarikuu', 'radokuu', 'paastukuu', 'jurikuu', 'lehekuu', 'jaanipaevakuu', 'heinakuu', 'loikuskuu', 'mihklikuu', 'porikuu', 'talvekuu', 'joulukuu'];

	let monthName;

	if(rahvakalender ==1){
		monthName = folkMonthNamesET[timeNow.getMonth()];
	}

	else{
		monthName = monthNamesET[timeNow.getMonth()];
	}

	return timeNow.getDate() + '. ' + monthName + ' ' + timeNow.getFullYear();
	}

	const addLeadZero = function(numValue){
	if(numValue < 10){
		//numValue = '0' + numValue;
		numValue = numValue.padStart(2, '0');
	}
	return numValue;
}

const timeFormattedET = function(){
	let timeNow = new Date();
	let hourNow = timeNow.getHours();
	let minuteNow = timeNow.getMinutes();
	let secondNow = timeNow.getSeconds();
	let timeFormatted = hourNow + ':' + addLeadZero(minuteNow) + ':' + addLeadZero(secondNow);
	return timeFormatted;
}

const weekdayFormattedET = function() {
	let timeNow = new Date();
	
	const weekdayNamesET = ['puhapaev', 'esmaspaev', 'teisipaev', 'kolmapaev', 'neljapaev', 'reede', 'laupaev'];

	return weekdayNamesET[timeNow.getDay()];
}

//ekspordin koik vajaliku
module.exports = {fullDate: dateFormattedET, fullTime: timeFormattedET, fullWeekday: weekdayFormattedET}