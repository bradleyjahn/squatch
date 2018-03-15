// This function is called immediately. The second function is passed in
// as the factory parameter to this function.
(function(factory) {
  // If there is a variable named module and it has an exports property,
  // then we're working in a Node-like environment. Use require to load
  // the jQuery object that the module system is using and pass it in.
  if (typeof module === 'object' && typeof module.exports === 'object') {
    factory(require('jquery'), window, document);
  } else {
    // Otherwise, we're working in a browser, so just pass in the global
    // jQuery object.
    factory(jQuery, window, document);
  }
})(function($, window, document, undefined) {
  // This code will receive whatever jQuery object was passed in
  $.squatch = function(element, options) {
    // set default classes and toggle attr, can be changed if in conflict with another plugin
    var defaults = {
      activeClass: 'active',
      toggleAttr: 'data-toggle',
      targetAttr: 'data-target',
      onFinished: function() {}
    };
    var plugin = this;
    plugin.settings = {};

    var $element = $(element),
      element = element;
    plugin.init = function() {
      plugin.settings = $.extend({}, defaults, options);
      $element.click(function(e) {
        e.preventDefault();
        var classToToggle = $element.attr(plugin.settings.toggleAttr),
          elToToggle = $element.attr(plugin.settings.targetAttr);
        $element.toggleClass(plugin.settings.activeClass);
        if (elToToggle) {
          // both target and toggle class are defined
          $(elToToggle).toggleClass(classToToggle);
        } else {
          // no target is found, try to get target from parent ul
          var exList = $element.closest('ul'),
            elToToggle = exList ? exList.attr(plugin.settings.targetAttr) : false;
          if (exList && elToToggle) {
            // found parent ul's target, so we're in one at a time list mode
            var els = exList.find('[' + plugin.settings.toggleAttr + ']'),
              classes = '';
            els.each(function(i, e) {
              $(e).removeClass(plugin.settings.activeClass);
              classes = classes + ' ' + $(e).attr(plugin.settings.toggleAttr);
            });
            $element.addClass(plugin.settings.activeClass);
            $(elToToggle)
              .removeClass(classes)
              .addClass(classToToggle);
          } else if (classToToggle.indexOf('#') >= 0) {
            // data-toggle is an id, so we're doing tabs
            $element.siblings().removeClass(plugin.settings.activeClass);
            $(classToToggle)
              .addClass(plugin.settings.activeClass)
              .siblings()
              .removeClass(plugin.settings.activeClass);
          } else {
            // no target so we're opening a dropdown menu
            $element.closest('li').toggleClass(classToToggle);
          }
        }
        plugin.settings.onFinished(); // optional callback
      });
    };
    plugin.init();
  };

  $.fn.squatch = function(options) {
    return this.each(function() {
      if (undefined == $(this).data('squatch')) {
        var plugin = new $.squatch(this, options);
        $(this).data('squatch', plugin);
      }
    });
  };
});
