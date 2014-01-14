var blogID;

function getCalendar(blogURL, id, path) {
    blogID = id;
    var cookie = readCookie("AjaxCal" + id);
    if(cookie != null) {
        if(blogURL.lastIndexOf("/") != blogURL.length - 1) {
            path = blogURL + "/calendar/" + cookie + "/";
        } else {
            path = blogURL + "calendar/" + cookie + "/";
        }
    }
    changeMonth(path);
}

function changeMonth(url) {
    url += "?" + (new Date()).getTime();
    new Ajax.Updater({success: 'calendar'},
                     url, {
                         method: 'get',
                         onComplete: endProcess,
                         onFailure: errorProcess
                     });
    return false;
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0, len = ca.length; i < len; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function endProcess() {
    var value = $('calendar').getElementsByTagName('table')[0].getAttribute('summary');
    setWeekendAndHoliday(value.split("/")[0], value.split("/")[1]);
    document.cookie = "AjaxCal" + blogID + "=" + value + "; path=/";
}

function errorProcess() {
    $('calendar').innerHTML = 'File Not Found';
}

function setWeekendAndHoliday(y,m) {
    setCurrentDate();
    var elements = $('calendar').getElementsByTagName("table");
    for (var j = 0, len = elements.length; j < len; j++) {
        var element = elements[j].getAttribute("summary");
        if(element == null){
            return;
        }
        var year = element.split("/")[0];
        var month = element.split("/")[1];
        if(!(year == y && month == m)){
            return;
        }
        var spans = elements[j].getElementsByTagName("span");
        var day;
        for (i = 0; i < spans.length; i++) {
            if (spans[i].parentNode.nodeName == "TD") {
                if(spans[i].innerHTML.indexOf("href") != -1){
                    day = spans[i].getElementsByTagName("a")[0].innerHTML;
                } else {
                    day = spans[i].innerHTML;
                }
                if (isHoliday(year, month, day)) {
                    spans[i].setAttribute('class', 'holiday');
                    spans[i].setAttribute('className', 'holiday');
                } else if(isSaturday(year, month, day)) {
                    spans[i].setAttribute('class', 'saturday');
                   spans[i].setAttribute('className', 'saturday');
                }
								/*
                if (isToday(year, month, day)) {
                    spans[i].parentNode.setAttribute('class', 'today');
                    spans[i].parentNode.setAttribute('className', 'today');
                }
								*/
            }
        }
    }
}
