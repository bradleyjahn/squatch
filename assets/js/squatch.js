$(document).ready(function(){
	$('.navbar-toggle').click(function(){
		$(this).closest('.navbar').toggleClass('open');
	});
	$('.dropdown-toggle').click(function(){
		$(this).closest('li').toggleClass('open');
	});//
	$( '[data-toggle]' ).click(function(e) {
		e.preventDefault();
		var classToToggle = $(this).attr('data-toggle'),
				elToToggle = $(this).attr('data-target');
		$(this).toggleClass('active');		
		$(elToToggle).toggleClass(classToToggle);	
	});
});
