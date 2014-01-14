/*
 * 
 * Copyright (c) 2009 IMG SRC Inc.
 *
 */

 function topEntryClick(){
	 $(".newsWrp .article").bind({
			click : function(){
			location.href = $(this).find("a").attr("href");
		},
			mouseover : function(){
				//$(this).animate( { color: "#3d8898" }, 1000);
				$(this).find("a").css( { backgroundColor:"#3d8898", color: "#ffffff" });

			},
			mouseout : function(){
				//$(this).animate( { color: "#000000" }, 1000);
				$(this).find("a").css( { backgroundColor:"#ffffff", color: "#000000" });

			}
	 })
 }