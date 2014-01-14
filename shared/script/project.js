/*
 * project.js
 * URL
 * 
 * Copyright (c) 2009 IMG SRC Inc.
 *
 */

var Project = function(){}

Project.prototype = {
	init: function(){
		this.loadScript(),
		this.addRollover(),
		this.addTargetBlank(),
		this.addScroll()
	},

	checkOS: {
		//win: navigator.userAgent.indexOf('Win',0) != -1,
		//mac: navigator.userAgent.indexOf('Mac',0) != -1
	},
	
	checkBrowser: {
		//opera: navigator.userAgent.indexOf('Opera') > 0,
		//chrome: navigator.userAgent.indexOf('Chrome') > 0,
		//firefox: navigator.userAgent.indexOf('Firefox') > 0,
		//safari: navigator.userAgent.indexOf('Safari') > 0,
		ie: navigator.userAgent.indexOf('MSIE') > 0,
		ie6: navigator.userAgent.indexOf('MSIE 6') > 0
	},

	loadScript: function(){
		// js directory
		var path = 'shared/script/';
		// js files
		var scripts = [
			'plugin/jquery/easing.js',
			'plugin/jquery/color.js'
		];
		
		if(this.checkBrowser.ie6){
			scripts.push('plugin/iepngfix.js');
		}

		for(var i = 0; i < scripts.length; i++){
			var element = document.createElement('script');
			element.src = path + scripts[i];
			element.type = 'text/javascript';
			document.body.appendChild(element);
		}
	},

	addRollover: function(){
		// add class 'rollover'
		var images = $('img.rollover, input.rollover');

		if(!images.length) return;

		var offSuffix = "_off.";	// e.g. button_off.gif
		var onSuffix = "_on.";		// e.g. button_on.gif

		for(var i = 0; i < images.length; i++){
			if(images[i].getAttribute("src").match(offSuffix)){
				images[i].onmouseover = function(){
					this.setAttribute("src", this.getAttribute("src").replace(offSuffix, onSuffix));
				}
				images[i].onmouseout = function(){
					this.setAttribute("src", this.getAttribute("src").replace(onSuffix, offSuffix));
				}
			}
		}	
	},

	addTargetBlank: function(){
		$('a[rel="external"][href]').attr('target', '_blank');	
	},

	addScroll: function(){
		if(!$('a[href^="#"]')) return;

		var durationTime = 1000;
		var easingType = 'easeInOutCirc';

		$('a[href^="#"]').click(function(){		
			var target = $(this).attr('href');

			if(target == "#"){
				$(this).blur();		
				$('html,body').animate({ scrollTop: 0 }, durationTime, easingType);
				return false;
			}
					
			var targetOffset = $(target).offset().top;
					
			$(this).blur();
			$('html,body').animate({ scrollTop: targetOffset }, durationTime, easingType);
			
			return false;
		})
	}
}

$(function(){
	var ProjectName = new Project();
	ProjectName.init();
});