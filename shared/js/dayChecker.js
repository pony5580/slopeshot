// Copyright (c) 2004-2007 koikikukan All Rights Reserved.
// http://www.koikikukan.com/
// License is granted if and only if this entire
// copyright notice is included. By Yujiro ARAKI.

// Ver1.00 2006.03.15 initial version.
// Ver1.01 2006.04.11 fix bug.
// Ver1.02 2006.04.15 fix bug.
// Ver1.03 2006.04.16 fix bug.
// Ver1.04 2006.08.03 fix bug.
// Ver1.05 2007.04.21 fix bug.

var currentYear;
var currentMonth;
var currentDay;

function setCurrentDate() {
    data = new Date();
    currentYear = data.getYear();
    currentYear = (currentYear < 2000) ? currentYear + 1900 : currentYear;
    currentMonth = data.getMonth() + 1;
    currentDay = data.getDate();
}

function isToday(year, month, day) {
    if (year == currentYear && parseInt(month,10) == currentMonth && day == currentDay) {
        return true;
    }
    return false;
}

function isSaturday(year, month, day) {
    var week = new Date(year, month - 1, day).getDay();
    if (week == 6) {
        return true;
    }
    return false;
}

function isHoliday(year, month, day) {
    var week = new Date(year, month - 1, day).getDay();
    if (week == 0) {
        return true;
    }
    switch(parseInt(month,10)) {
    case 1:
        if (day == 1) {
            return true;
        }
        if (day == 2 && isSunday(year, month, 1)) {
            return true;
        }
        if (day == (getFirstMonday(year, month) + 7)) {
            return true;
        }
        break;
    case 2:
        if (day == 11) {
            return true;
        }
        if (day == 12 && isSunday(year, month, 11)) {
            return true;
        }
        break;
    case 3:
        if(year > 1979 && year < 2100) {
            if (day == parseInt(20.8431 + 0.242194 * (year - 1980) - parseInt((year - 1980) / 4))) {
                return true;
            }
            if (day == (parseInt(20.8431 + 0.242194 * (year - 1980) - parseInt((year - 1980) / 4)) + 1) && isSunday(year, month, day - 1)) {
                return true;
            }
        }
        break;
    case 4:
        if (day == 29) {
            return true;
        }
        if (day == 30 && isSunday(year, month, 29)) {
            return true;
        }
        break;
    case 5:
        if (day == 3 || day == 4 || day == 5) {
            return true;
        }
        if (day == 6 && (isSunday(year, month, 3) ||
                         isSunday(year, month, 4) ||
                         isSunday(year, month, 5))) {
            return true;
        }
        break;
    case 7:
        if (day == (getFirstMonday(year, month) + 14)) {
            return true;
        }
        break;
    case 9:
        if (day == (getFirstMonday(year, month) + 14)) {
            return true;
        }
        if(year > 1979 && year < 2100) {
            if (day == parseInt(23.2488 + 0.242194 * (year - 1980) - parseInt((year - 1980) / 4))) {
                return true;
            }
            if (day == (parseInt(23.2488 + 0.242194 * (year - 1980) - parseInt((year - 1980) / 4)) + 1) && isSunday(year, month, day - 1)) {
                return true;
            }
        }
        break;
    case 10:
        if (day == (getFirstMonday(year, month) + 7)) {
            return true;
        }
        break;
    case 11:
        if (day == 3 || day == 23) {
            return true;
        }
        if (day == 4 && isSunday(year, month, 3)) {
            return true;
        }
        if (day == 24 && isSunday(year, month, 23)) {
            return true;
        }
        break;
    case 12:
        if (day == 23) {
            return true;
        }
        if (day == 24 && isSunday(year, month, 23)) {
            return true;
        }
        break;
    }
    return false;
}

function isSunday(year, month, day) {
    var week = new Date(year, month - 1, day).getDay();
    if (week == 0) {
        return true;
    }
    return false;
}

function getFirstMonday(year, month) {
    var monday;
    for(monday = 1; monday < 8; monday++) {
        if(new Date(year, month - 1, monday).getDay() == 1) {
            break;
        }
    }
    return monday;
}
