<!--
	var today = new Date();
	var year = today.getYear();
	var month = today.getMonth();
	var day = today.getDate();
	if (year < 1900) year += 1900;
	
	var toMonth = new Date(year,month,1);
	var nextMonth = new Date(year,(month + 1),1);
	var monthAfter = new Date(year,(month + 2),1);
	var toWeek = toMonth.getDay();
	var nextWeek = nextMonth.getDay();
	var toDays = (nextMonth.getTime() - toMonth.getTime())/(24*60*60*1000);
	var nextDays = (monthAfter.getTime() - nextMonth.getTime())/(24*60*60*1000);
	var toCnt = (7-(toWeek + toDays)%7)%7;
	var nextCnt =(7-(nextWeek + nextDays)%7)%7;
	var linefeed;
	
	var monthName = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
	
	//’è‹x“ú‚È‚Ç‚ÌF‚Í‚±‚±‚ÅÝ’è‚µ‚Ü‚·B
	//textColors = new Array('•’Ê‚ÌF','1”Ô–Ú‚ÌF','2”Ô–Ú‚ÌF');‚Æ‚È‚è‚Ü‚·B
	
	//’è‹x“ú‚È‚Ç‚Ì•¶ŽšF
	var textColors = new Array('#232323','#990000','#000099');
	//’è‹x“ú‚È‚Ç‚Ì”wŒiF
	var backgroundColors = new Array('#FFFFFF','#FFFFFF','#FFFFFF');
	
	var textColor = '#232323';
	var backgroundColor = '#FFFFFF';
	
	//’è‹x“ú‚È‚Ç‚Í‚±‚±‚ÅÝ’è‚µ‚Ü‚·B
	//holyday[‚±‚±‚É“ú‚É‚¿‚ð”¼Šp‚Å] = X; X‚É‚ÍF‚Ì”z—ñ”Ô†‚ðB

	var holyday = new Object();
	holyday["2006/4/2"] = 1;
	holyday["2006/4/9"] = 1;
	holyday["2006/4/16"] = 1;
	holyday["2006/4/23"] = 1;
	holyday["2006/4/30"] = 1;
	holyday["2006/4/1"] = 2;
	holyday["2006/4/8"] = 2;
	holyday["2006/4/15"] = 2;
	holyday["2006/4/22"] = 2;
	holyday["2006/4/29"] = 2;
	
	document.write("<table border='0' cellspacing='2' cellpadding='0' style='background-color: #FFFFFF; width: 254px;' class='mgnb30'>");
	document.write("<tr><td colspan='7' style='font-size: 10px;'>&nbsp;",monthName[month]," . ",year,"</td></tr>");
	document.write("<tr style='background-color: #FFFFFF;'>");
	document.write("<td style='font-size: 10px;width: 22px;color: #999999;' align='center'>Sun</td>");
	document.write("<td style='font-size: 10px;width: 22px;color: #999999;' align='center'>Mon</td>");
	document.write("<td style='font-size: 10px;width: 22px;color: #999999;' align='center'>Tue</td>");
	document.write("<td style='font-size: 10px;width: 22px;color: #999999;' align='center'>Wed</td>");
	document.write("<td style='font-size: 10px;width: 22px;color: #999999;' align='center'>Thu</td>");
	document.write("<td style='font-size: 10px;width: 22px;color: #999999;' align='center'>Fri</td>");
	document.write("<td style='font-size: 10px;width: 22px;color: #999999;' align='center'>Sat</td>");
	document.write("</tr>");
	
	document.write("<tr>");
	for (i=1; i<=toWeek; i++) {
		document.write("<td style='font-size: 10px;'>&nbsp;</td>");
	}
	for (i=1; i <= toDays; i++) {
		if ((toWeek+i)%7==0) linefeed = "</tr><tr><td colspan='7' style='height: 1px;background-color: #CCCCCC;'></td></tr><tr>"; else linefeed = "";
		var monstr = month + 1;
		var todaystr = year + "/" + monstr + "/" + i;
		
		if(holyday[todaystr]){
			textColor = textColors[holyday[todaystr]];
			backgroundColor = backgroundColors[holyday[todaystr]];
		}
		else if(holyday[todaystr] == 2){
			textColor = textColors[holyday[todaystr]];
			backgroundColor = backgroundColors[holyday[todaystr]];
		}
		else{
			textColor = '#232323';
			backgroundColor = "#FFFFFF";
		}
		
		if(i == day){
			putDay = "<strong>" + i + "</strong>";
		}
		else{
			putDay = i;
		}
		document.write("<td align=center style='font-size: 10px;color: " + textColor + ";background-color: " + backgroundColor + ";'>" + putDay + "</td>" + linefeed);
	}
	for (i=1; i <= toCnt; i++) {
		document.write("<td align='center' style='font-size: 10px;background-color: #FFFFFF;'>&nbsp;</td>");
	}
	document.write("</tr>");
	document.write("</table>");
//-->