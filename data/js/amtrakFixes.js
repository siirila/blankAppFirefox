var departureEl = $("#wdfdate1") || null;
var returnEl = $("#wdfdate2") || null;

console.log("Fixing Amtrak date selecting issues");
allowEdits(departureEl);
allowEdits(returnEl);

function allowEdits(d) {
 element = $('#wdfdate'+d);
  if(element) {
  	console.log("DING DING! Matched a Date with element:",element);
        element.parent().append('<input class="wdfDate ie6-text" type="date" size="22" id="date'+d+'" maxlength="22" dfield="'+d+'">');
        element.hide();
        $('#date'+d).change(setDate);
        console.log('complete');
  } else {
  	console.log("WHY!!! Why didn't an element match");
  }
}

function setDate() {
  console.log('hello there');
  val = $(this).val();
  dfield = $(this).attr('dfield');
  newDate = new Date(val);
  if(isValidDate(newDate)) {
  	$('wdfdate'+dfield).val(formatDate(newDate));
  }
}

/*function allowEdits(element) {
  if(element) {
  	console.log("DING DING! Matched a Date with element:" + element);
    element.removeAttr("readonly");
	element.attr("type", "date");
	element.change(setDate);
  } else {
  	console.log("WHY!!! Why didn't an element match");
  }
}

function setDate() {
  var val = $(this).val(),
      newDate;
  console.log("!!!!!!!" + val);
  
  newDate = new Date(val);

  if(isValidDate(newDate)) {
  	$(this).val(formatDate(newDate));
  }
}*/

function isValidDate(d) {
  if ( Object.prototype.toString.call(d) !== "[object Date]" )
    return false;
  return !isNaN(d.getTime());
}

var gsMonthNames = new Array(
'January',
'February',
'March',
'April',
'May',
'June',
'July',
'August',
'September',
'October',
'November',
'December'
);

var gsMonthNamesAbbr = new Array(
'Jan',
'Feb',
'Mar',
'Apr',
'May',
'Jun',
'Jul',
'Aug',
'Sep',
'Oct',
'Nov',
'Dec'
);

// a global day names array
var gsDayNames = new Array(
'Sunday',
'Monday',
'Tuesday',
'Wednesday',
'Thursday',
'Friday',
'Saturday'
);

// the date format prototype
function formatDate(d)
{
    var day = gsDayNames[d.getDay()].substr(0, 3);
    var month = gsMonthNames[d.getMonth()].substr(0, 3);
    
    var date = d.getDate();
    //if (date < 10) {
      //date = "0" + date;
    //}
    
    return day + ", " + month + " " + date + ", " + d.getFullYear();
}