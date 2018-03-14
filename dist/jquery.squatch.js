// This function is called immediately. The second function is passed in
// as the factory parameter to this function.
(function (factory) {
  // If there is a variable named module and it has an exports property,
  // then we're working in a Node-like environment. Use require to load
  // the jQuery object that the module system is using and pass it in.
  if(typeof module === "object" && typeof module.exports === "object") {
    factory(require("jquery"), window, document);
  }
  // Otherwise, we're working in a browser, so just pass in the global
  // jQuery object.
  else {
    factory(jQuery, window, document);
  }
}(function($, window, document, undefined) {
// This code will receive whatever jQuery object was passed in 
    $.squatch = function(element, options) {
        var defaults = {
            activeClass: 'active',
            toggleAttr: 'data-toggle',
            targetAttr: 'data-target',
            onFinished: function() {}
        }
        var plugin = this;
        plugin.settings = {}

        var $element = $(element),  
             element = element;  
        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            $element.click(function(e){
                e.preventDefault();
                var classToToggle = $element.attr(plugin.settings.toggleAttr),
                    elToToggle = $element.attr(plugin.settings.targetAttr);
                    $element.toggleClass(plugin.settings.activeClass);
                if (elToToggle) {       
                    $(elToToggle).toggleClass(classToToggle);   
                } 
                else {    
                    var exList = $element.closest('ul'),
                            elToToggle = exList ? exList.attr(plugin.settings.targetAttr) : false;
                    if (exList && elToToggle) {
                        var els = exList.find('[' + plugin.settings.toggleAttr + ']'),
                                classes = '';
                        els.each(function(i,e){
                            $(e).removeClass(plugin.settings.activeClass);
                            classes = classes + ' ' + $(e).attr(plugin.settings.toggleAttr);
                        })
                        $element.addClass(plugin.settings.activeClass);
                        $(elToToggle).removeClass(classes).addClass(classToToggle);
                    } else if (classToToggle.indexOf('#') >= 0) {   
                      $element.siblings().removeClass(plugin.settings.activeClass);         
                        $(classToToggle).addClass(plugin.settings.activeClass).siblings().removeClass(plugin.settings.activeClass);
                    } else {
                        $element.closest('li').toggleClass(classToToggle);
                    }
                 }
                 plugin.settings.onFinished();
            });
        }
        plugin.init();
    }

    $.fn.squatch = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('squatch')) {
                var plugin = new $.squatch(this, options);
                $(this).data('squatch', plugin);
            }
        });
    }
}));
