$(document).ready(function(){
	$('.navbar-toggle').click(function(){
		$(this).closest('.navbar').toggleClass('open');
	});
	$('.dropdown-toggle').click(function(){
		$(this).closest('li').toggleClass('open');
	});
});
