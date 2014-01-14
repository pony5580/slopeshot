/*---------------------------------------------------------------
-----------------------------------------------------------------
geisai javascript
-----------------------------------------------------------------

.Set Class
.click Event
.formSubmit
.informMobileUrl
.browserCheck
.addEvent
.scrollAdd
.initRollovers
.external links
.is_all_ws
.minmax.js: make IE5+/Win support CSS min/max-width/height

-----------------------------------------------------------------
---------------------------------------------------------------*/

/*=================================================================
//
// .Set Class
//
=================================================================*/
function setClass(_target, _class) {
	var elm;
	if((typeof _target).toLowerCase() == 'string'){
		elm = $(_target);
	}else{
		elm = _target;
	}
	if(document.all){
		if(navigator.userAgent.indexOf("Opera") != -1){
			elm.setAttribute('class', _class);
		}else {
			elm.setAttribute('className', _class);
		}
	}else{
		elm.setAttribute('class', _class);
	}
}


/*=================================================================
//
// .click Event
//
=================================================================*/
function clicklink(linkLoc) {
	if(linkLoc != "")	{
		location.href = linkLoc;
	}
}

function blanklink(_url) {
		window.open(_url);
		return false;
}

/*=================================================================
//
// .formSubmit
//
=================================================================*/
function formSubmit(_target) {
	var form = document.forms[_target];
	form.submit();
	return false;
}

function clearMlocal() {
  if ($('mlocal').value == "mail address")
    $('mlocal').value = "";
  return true;
}

function informMobileUrl() {
  var pattern = /\S+@\S+/i;
  var localpart = $('mlocal').value;
  if (localpart == "")
    return;
  var mdomain   = $('carrierSelectForm').value;
  if (mdomain == "") {
    if (!pattern.test(localpart)) {
      showOptions();
      return;
    }
  }
    
  var par       = 'e='+localpart+mdomain;

  var a = new Ajax.Request('/inform_url.cgi',
			   {
			     method:     'post',
			     parameters: par,
			     onComplete: function(origreq) {
			       var st;
			       eval("st = "+origreq.responseText);
			       alert(st.msg)
			     }
			   });
}

/*=================================================================
//
// .browserCheck
//
=================================================================*/
function BrowserCheck(){
		var b = navigator.appName;
		if (b == "Netscape") this.b = "NN";
		else if (b == "Microsoft Internet Explorer") this.b = "IE";
		else this.b = b;
		this.version = navigator.appVersion;
		this.vSub = navigator.vendorSub;
		this.userAgent = navigator.userAgent;
		this.appVersion = navigator.appVersion;
		this.v = parseInt(this.version);
		this.vs = parseFloat(this.vSub);
		
		this.NN = (this.b == "NN");
		this.NN3 = (this.b == "NN" && this.v == 3);
		this.NN4 = (this.b == "NN" && this.v == 4);
		this.NN6x = (this.b == "NN" && this.v == 5 && this.vs >= 6.01);
		this.NN6 = (this.b == "NN" && this.v == 5);
		this.NN7 = (this.b == "NN" && this.v == 5 && this.vs >= 7);
		
		this.IE = (this.b == "IE");
		this.IE3 = (this.userAgent.indexOf('MSIE 3')>0);
		this.IE45 = (this.userAgent.indexOf('MSIE 4.5')>0);
		this.IE401 = (this.userAgent.indexOf('MSIE 4.01')>0);
		this.IE4 = (this.userAgent.indexOf('MSIE 4')>0);
		this.IE51 = (this.userAgent.indexOf('MSIE 5.1')>0);
		this.IE512 = (this.userAgent.indexOf('MSIE 5.12')>0);
		this.IE514 = (this.userAgent.indexOf('MSIE 5.14')>0);
		this.IE52 = (this.userAgent.indexOf('MSIE 5.2')>0);
		this.IE5 = (this.userAgent.indexOf('MSIE 5')>0);		
		this.IE6 = (this.userAgent.indexOf('MSIE 6')>0);
		
		this.GEK = (this.userAgent.indexOf("Gecko") != -1);
		this.SAF = (this.userAgent.indexOf("Safari",0) != -1);
		this.FF = (this.userAgent.indexOf("Firefox") != -1);
		this.CAB = (this.userAgent.indexOf("iCab",0) != -1);
		this.OPE = (this.userAgent.indexOf("Opera",0) != -1);
		
		this.Win = (this.userAgent.indexOf('Win',0) != -1);
		this.Mac = (this.userAgent.indexOf('Mac',0) != -1);
		this.MacOSX = (this.userAgent.indexOf('Mac OS X',0) != -1);
		if(this.IE512 || this.IE52){
			this.MacOSX=true;
		}
		else if(this.IE514){
			if (navigator.plugins) {
				for (i=0; i < navigator.plugins.length; i++ ) {
					if (navigator.plugins[i].name.indexOf('QuickTime') >= 0 && navigator.plugins[i].filename.indexOf('.plugin')!=-1){
						this.MacOSX=true;
					}
				}
			}
		}
		this.Unix = (this.appVersion.indexOf('X11',0) != -1);
}

var checkB = new BrowserCheck();
//window.alert(checkB.IE52);

/*=================================================================
//
// .addEvent
//
=================================================================*/
function addEvent(elm, evType, func, useCapture) {
	if(elm.addEventListener){
		elm.addEventListener(evType, func, useCapture);
		return true;
	} else if(elm.attachEvent){
		var r = elm.attachEvent('on' + evType, func);
		return r;
	} else {
		elm['on' + evType] = func;
	}
}

/*=================================================================
//
// .scrollAdd
//
=================================================================*/
function scrollAdd() {
  $$('a[href^=#]:not([href=#])').each(function(element) {
    element.observe('click', function(event) {
      new Effect.ScrollTo(this.hash.substr(1));
      Event.stop(event);
    }.bindAsEventListener(element))
  })
}
addEvent(window, 'load', scrollAdd, false);


/*=================================================================
//
// .initRollovers
//
=================================================================*/
function initRollovers() {
	if (!document.getElementById) return;
	
	var overPath = "_on";	
	
	var aPreLoad = new Array();
	var sTempSrc;
	var aImages = document.getElementsByTagName('img');

	for (var i = 0; i < aImages.length; i++) {		
		if (aImages[i].className == 'imgover') {
			var src = aImages[i].getAttribute('src');
			var ftype = src.substring(src.lastIndexOf('.'), src.length);
			var hsrc = src.replace(ftype, overPath+ftype);
			//hsrc = 'over' + hsrc;

			aImages[i].setAttribute('hsrc', hsrc);
			
			aPreLoad[i] = new Image();
			aPreLoad[i].src = hsrc;
			
			aImages[i].onmouseover = function() {
				sTempSrc = this.getAttribute('src');
				this.setAttribute('src', this.getAttribute('hsrc'));
			}	
			
			aImages[i].onmouseout = function() {
				if (!sTempSrc) sTempSrc = this.getAttribute('src').replace(overPath+ftype, ftype);
				this.setAttribute('src', sTempSrc);
			}
		}
	}
}

//addEvent(window, 'load', initRollovers, false);


/*=================================================================
//
// .external links
//
=================================================================*/
function externalLinks(){
	if(!document.getElementsByTagName) return;
	var anchors = document.getElementsByTagName("a");
	for(i=0;i<anchors.length;i++){
		var anchorlink = anchors[i];
		if(anchorlink.getAttribute("href") && anchorlink.getAttribute("rel") == "external"){
			anchorlink.target = "_blank";
		}
	}
}

addEvent(window, 'load', externalLinks, false);


/*=================================================================
//
// .subWin
//
=================================================================*/
function subWin(var_location, var_target, var_w, var_h, var_toolbar){
	var_width = parseInt(var_w);
	var_height = parseInt(var_h);
	
	if(checkB.Mac) {
		if(checkB.IE52 || checkB.IE51 ) {
			var_width -= 16;
			var_height -= 5;
		} else if(checkB.FF) {
			var_width += 0;
			var_height += 0;
		} else if(checkB.NN7) {
			var_width += 15;
			var_height += 15;
		} else if(checkB.OPE) {
			var_width += 10;
			var_height -= 5;
		} else {
		}
	} else if(checkB.Win) {
		if(checkB.IE) {
			var_width += 0;
			var_height += 0;
		} else if(checkB.FF){
			var_width += 0;
			var_height -= 0;
		} else if(checkB.NN7){
			var_width += 15;
			var_height -= 15;
		} else {
			var_width += 25;
			var_height += 15;
		}
	} else {
	}
	
	var_style = "width="+var_width+",height="+var_height+",toolbar="+var_toolbar+",scrollbars=no,resizable=no,directories=no,menubar=no,status=no,location=no";
	window.open(var_location, var_target, var_style);
}

function subWin2(var_location, var_target, var_w, var_h, var_toolbar){
	var_width = parseInt(var_w);
	var_height = parseInt(var_h);
	
	if(checkB.Mac) {
		if(checkB.IE52 || checkB.IE51 ) {
			var_width -= 16;
			var_height -= 5;
		} else if(checkB.FF) {
			var_width += 0;
			var_height += 0;
		} else if(checkB.NN7) {
			var_width += 15;
			var_height += 15;
		} else if(checkB.OPE) {
			var_width += 10;
			var_height -= 5;
		} else {
		}
	} else if(checkB.Win) {
		if(checkB.IE) {
			var_width += 0;
			var_height += 0;
		} else if(checkB.FF){
			var_width += 0;
			var_height -= 0;
		} else if(checkB.NN7){
			var_width += 15;
			var_height -= 15;
		} else {
			var_width += 25;
			var_height += 15;
		}
	} else {
	}
	
	var_style = "width="+var_width+",height="+var_height+",toolbar="+var_toolbar+",scrollbars=yes,resizable=no,directories=no,menubar=no,status=no,location=no";
	window.open(var_location, var_target, var_style);
}

/*=================================================================
//
// .active navigation
//
=================================================================*/
function activeNavi(){
	var naviHome = $('naviHome');
	var naviInfo = $('naviInfo');
	var naviEntry = $('naviEntry');
	var naviNews = $('naviNews');
	var naviAbout = $('naviAbout');
	var naviArchive = $('naviArchive');
	var naviBlog = $('naviBlog');
	var naviMypage = $('naviMypage');
	
	if($('top')){
		// top page active
		setClass(naviHome, 'active');
	}else if($('info')){
		// news page active
		setClass(naviInfo, 'active');
	}else if($('entry')){
		// news page active
		setClass(naviEntry, 'active');
	}else if($('news')){
		// news page active
		setClass(naviNews, 'active');
	}else if($('about')){
		// news page active
		setClass(naviAbout, 'active');
	}else if($('archive')){
		// news page active
		setClass(naviArchive, 'active');
	}else if($('blog')){
		// news page active
		setClass(naviBlog, 'active');
	}else if($('mypage')){
		// news page active
		setClass(naviMypage, 'active');
	}
}

addEvent(window, 'load', activeNavi, false);


/*=================================================================
//
// .mail magazine form
//
=================================================================*/
function showOptions() {
	Element.addClassName($('optionsDiv'), 'over');
}

function hideOptions(e) {
	Element.removeClassName($('optionsDiv'), 'over');
}


function selectMe(selectFieldId,linkNo,elm) {
	var selectField = $(selectFieldId);
	for(var k = 0; k < selectField.options.length; k++) {
		if(k==linkNo) {selectField.options[k].selected = "selected";}
		else {selectField.options[k].selected = "";}
	}
	
	//alert(selectField.options[linkNo].text);
	
	textVar = $("selectText");
	var newText = document.createTextNode(selectField.options[linkNo].text);
	textVar.replaceChild(newText, textVar.childNodes[0]);
	textVar.className = elm.className;
}


function selectEvent(e) {
	if (!e) var e = window.event;
	var thecode = e.keyCode;
	switch(thecode){
		case 40: //down
			var fieldId = this.parentNode.parentNode.id.replace(/sarea/g, "");
			var linkNo = 0;
			for(var q = 0; q < selects[fieldId].options.length; q++) {if(selects[fieldId].options[q].selected) {linkNo = q;}}
			++linkNo;
			if(linkNo >= selects[fieldId].options.length) {linkNo = 0;}
			selectMe(selects[fieldId].id, linkNo, fieldId);
			break;
		case 38: //up
			var fieldId = this.parentNode.parentNode.id.replace(/sarea/g, "");
			var linkNo = 0;
			for(var q = 0; q < selects[fieldId].options.length; q++) {if(selects[fieldId].options[q].selected) {linkNo = q;}}
			--linkNo;
			if(linkNo < 0) {linkNo = selects[fieldId].options.length - 1;}
			selectMe(selects[fieldId].id, linkNo, fieldId);
			break;
		default:
			break;
	}
}

/*=================================================================
//
// .is_all_ws
//
=================================================================*/
/**
 * スクリプト全体で、空白文字を以下のいずれかの文字として定義しています。
 *  "\t" TAB \u0009
 *  "\n" LF  \u000A
 *  "\r" CR  \u000D
 *  " "  SPC \u0020
 *
 * JavaScript の \s は非改行スペース(及び他の幾つかの文字)を含んでいる為
 * このスクリプトでは使用しません。
 */


/**
 * ノードのテキスト内容が完全に空白であるか判断
 *
 * @param nod  CharacterData インターフェイスを実装したノード
 *             (例: Text, Comment, CDATASection ノード)
 * @return     nod のテキスト内容が全て空白文字であれば true
 *             それ以外は false
 */
function is_all_ws( nod )
{
  // ECMA-262 第3版 の String 及び RegExp の機能を使用
  return !(/[^\t\n\r ]/.test(nod.data));
}


/**
 * 反復処理関数がノードを無視するべきかどうか判断
 *
 * @param nod  DOM1 の Node インターフェイスを実装したノード
 * @return     ノードが次のいずれかであれば true:
 *                1) 全て空白文字である Text ノード
 *                2) Comment ノード
 *             それ以外は false
 */
function is_ignorable( nod )
{
  return ( nod.nodeType == 8) || // コメントノード
         ( (nod.nodeType == 3) && is_all_ws(nod) ); // 全空白テキストノード
}

/**
 * 完全に空白或いはコメントのノードを無視するようにした nextSibling
 *
 * @param sib  参照ノード
 * @return     次のいずれか:
 *               1) is_ignorable 検査で無視できないと判断された sib に
 *                  最も近い後方の兄弟ノード、或いは
 *               2) 該当するノードがなければ null
 */
function node_after( sib )
{
	var cin = new Array();
	//alert(sib.childNodes.length);
	for(var i=0;i<sib.childNodes.length;i++){
		//alert("hoge");
		var checkNode = sib.childNodes[i];
		if(!is_ignorable(checkNode)){
			cin.push(checkNode);
		}
	}
	return cin;
}



/*=================================================================
//
// minmax.js: make IE5+/Win support CSS min/max-width/height
// version 1.0, 08-Aug-2003
// written by Andrew Clover <and@doxdesk.com>, use freely
//
=================================================================*/

/*@cc_on
@if (@_win32 && @_jscript_version>4)

var minmax_elements;

minmax_props= new Array(
  new Array('min-width', 'minWidth'),
  new Array('max-width', 'maxWidth'),
  new Array('min-height','minHeight'),
  new Array('max-height','maxHeight')
);

// Binding. Called on all new elements. If <body>, initialise; check all
// elements for minmax properties

function minmax_bind(el) {
  var i, em, ms;
  var st= el.style, cs= el.currentStyle;

  if (minmax_elements==window.undefined) {
    // initialise when body element has turned up, but only on IE
    if (!document.body || !document.body.currentStyle) return;
    minmax_elements= new Array();
    window.attachEvent('onresize', minmax_delayout);
    // make font size listener
    em= document.createElement('div');
    em.setAttribute('id', 'minmax_em');
    em.style.position= 'absolute'; em.style.visibility= 'hidden';
    em.style.fontSize= 'xx-large'; em.style.height= '5em';
    em.style.top='-5em'; em.style.left= '0';
    if (em.style.setExpression) {
      em.style.setExpression('width', 'minmax_checkFont()');
      document.body.insertBefore(em, document.body.firstChild);
    }
  }

  // transform hyphenated properties the browser has not caught to camelCase
  for (i= minmax_props.length; i-->0;)
    if (cs[minmax_props[i][0]])
      st[minmax_props[i][1]]= cs[minmax_props[i][0]];
  // add element with properties to list, store optimal size values
  for (i= minmax_props.length; i-->0;) {
    ms= cs[minmax_props[i][1]];
    if (ms && ms!='auto' && ms!='none' && ms!='0' && ms!='') {
      st.minmaxWidth= cs.width; st.minmaxHeight= cs.height;
      minmax_elements[minmax_elements.length]= el;
      // will need a layout later
      minmax_delayout();
      break;
  } }
}

// check for font size changes

var minmax_fontsize= 0;
function minmax_checkFont() {
  var fs= document.getElementById('minmax_em').offsetHeight;
  if (minmax_fontsize!=fs && minmax_fontsize!=0)
    minmax_delayout();
  minmax_fontsize= fs;
  return '5em';
}

// Layout. Called after window and font size-change. Go through elements we
// picked out earlier and set their size to the minimum, maximum and optimum,
// choosing whichever is appropriate

// Request re-layout at next available moment
var minmax_delaying= false;
function minmax_delayout() {
  if (minmax_delaying) return;
  minmax_delaying= true;
  window.setTimeout(minmax_layout, 0);
}

function minmax_stopdelaying() {
  minmax_delaying= false;
}

function minmax_layout() {
  window.setTimeout(minmax_stopdelaying, 100);
  var i, el, st, cs, optimal, inrange;
  for (i= minmax_elements.length; i-->0;) {
    el= minmax_elements[i]; st= el.style; cs= el.currentStyle;

    // horizontal size bounding
    st.width= st.minmaxWidth; optimal= el.offsetWidth;
    inrange= true;
    if (inrange && cs.minWidth && cs.minWidth!='0' && cs.minWidth!='auto' && cs.minWidth!='') {
      st.width= cs.minWidth;
      inrange= (el.offsetWidth<optimal);
    }
    if (inrange && cs.maxWidth && cs.maxWidth!='none' && cs.maxWidth!='auto' && cs.maxWidth!='') {
      st.width= cs.maxWidth;
      inrange= (el.offsetWidth>optimal);
    }
    if (inrange) st.width= st.minmaxWidth;

    // vertical size bounding
    st.height= st.minmaxHeight; optimal= el.offsetHeight;
    inrange= true;
    if (inrange && cs.minHeight && cs.minHeight!='0' && cs.minHeight!='auto' && cs.minHeight!='') {
      st.height= cs.minHeight;
      inrange= (el.offsetHeight<optimal);
    }
    if (inrange && cs.maxHeight && cs.maxHeight!='none' && cs.maxHeight!='auto' && cs.maxHeight!='') {
      st.height= cs.maxHeight;
      inrange= (el.offsetHeight>optimal);
    }
    if (inrange) st.height= st.minmaxHeight;
  }
}

// Scanning. Check document every so often until it has finished loading. Do
// nothing until <body> arrives, then call main init. Pass any new elements
// found on each scan to be bound   

var minmax_SCANDELAY= 500;

function minmax_scan() {
  var el;
  for (var i= 0; i<document.all.length; i++) {
    el= document.all[i];
    if (!el.minmax_bound) {
      el.minmax_bound= true;
      minmax_bind(el);
  } }
}

var minmax_scanner;
function minmax_stop() {
  window.clearInterval(minmax_scanner);
  minmax_scan();
}

minmax_scan();
minmax_scanner= window.setInterval(minmax_scan, minmax_SCANDELAY);
window.attachEvent('onload', minmax_stop);

@end @*/
