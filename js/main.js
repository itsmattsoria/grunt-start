
var Main = (function ($) {
	return {
		myFunction: function () {
      console.log("Hey, I'm a function!");
		},
		initMain: function () {
			$(document).ready(function () {
				Main.myFunction();
			})
		}
	};
// Pass in jQuery.
})(jQuery);

Main.initMain();