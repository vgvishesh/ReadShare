$(document).ready(function() {
	$('.Center').css("margin-top", $(window).height()/2);

	$(window).resize(function() {
		console.log($(window).height()/2);
		$('.Center').css("margin-top", $(window).height()/2);		
	});	
});