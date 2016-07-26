function randomSeed(len, bits){
    bits = bits || 36;
    var outStr = "", newStr;
    while (outStr.length < len)
    {
        newStr = Math.random().toString(bits).slice(2);
        outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
    }
    return outStr.toUpperCase();
};


function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function rand(min,max){
    return getRandomInt(min,max);
}

function getStartBet(multipliers,balance,safepercent){
	var safeAmount = balance / 100 * safepercent;
    var maxPalyBalance = balance - safeAmount; 
    baseBet = 0.00000001;
    theBet = baseBet;
    totalBet = theBet;  
    for (var i = 0; i <multipliers.length; i++) {
	   theBet = theBet * multipliers[i];
       totalBet += Number(theBet);
	}
    return Number(baseBet * Number(maxPalyBalance / totalBet)).toFixed(8);
}


function secondsToTimeDisplay(bseconds){
    var hours = parseInt( bseconds / 3600 ) % 24;
    var minutes = parseInt( bseconds / 60 ) % 60;
    var seconds = bseconds % 60;
    return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
}

function dateDispTime(theDate){
    var betDate = new Date(Number(theDate));
    var yr      = betDate.getFullYear();
    var mth     = betDate.getMonth();
    var day     = betDate.getDate();
    var hrs     = betDate.getHours();
    var mins    = betDate.getMinutes();
    var secs    = betDate.getSeconds();
    
    mth = mth + 1;
    if(mth < 10){ mth = '0' + String(mth);}
    if(day < 10){ day = '0' + String(day);}
    
    if(hrs < 10){ hrs = '0' + String(hrs);}
    if(mins < 10){ mins = '0' + String(mins);}
    if(secs < 10){ secs = '0' + String(secs);}
    
    return hrs + ':' + mins + ':' + secs;
}

Math.seedrandom(randomSeed(32));