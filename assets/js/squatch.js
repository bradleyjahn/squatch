$(document).ready(function(){
	$( '[data-toggle]' ).click(function(e) {
		e.preventDefault();
		var clicked = $(this),
				classToToggle = $(this).attr('data-toggle'),
				elToToggle = $(this).attr('data-target');
		$(this).toggleClass('active');
		if (elToToggle) {		
			$(elToToggle).toggleClass(classToToggle);	
		} else {	
			var exList = $(this).closest('ul'),
					elToToggle = exList ? exList.attr('data-target') : false;
			if (exList && elToToggle) {
				var els = exList.find('[data-toggle]'),
						classes = '';
				els.each(function(i,e){
					$(e).removeClass('active');
					classes = classes + ' ' + $(e).attr('data-toggle');
				})
				clicked.addClass('active');
				$(elToToggle).removeClass(classes).addClass(classToToggle);
			} else if (classToToggle.indexOf('#') >= 0) {	
			  clicked.siblings().removeClass('active');			
				$(classToToggle).addClass('active').siblings().removeClass('active');
			} else {
				$(this).closest('li').toggleClass(classToToggle);
			}
		}
	});
});
