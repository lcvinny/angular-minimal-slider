angular.module('minimalSlider', [])
	.directive('minimalSlider', function($document){
		var start = 'touchstart mousedown';
		var end = 'touchend touchcancel mouseup';
		var move = 'touchmove mousemove';
		
		return {
			restrict: 'E',
			scope: {
				model: '=',
				change: '&'		
			},
			template: '<div class="minimal-slider"><div class="minimal-slider-thumb"></div></div>',
			link: function(scope, elem, attr, ctrl){
				var slider = angular.element(elem.children()[0]);
				var thumb = angular.element(slider.children()[0]);
				var sliderWidth = slider.prop('offsetWidth');
				var thumbWidth = thumb.prop('offsetWidth');
				var sliderLeft = slider.prop('offsetLeft');
				var thumbLeft = thumb.prop('offsetLeft');
				elem.on(start, function(event){
					$document.on(move, function(event){
						var pos = event.pageX - sliderLeft;
						pos = Math.min(Math.max(pos, 0), sliderWidth);
						thumb.css('left', (pos - thumbWidth / 2) + 'px');
						scope.model = pos / sliderWidth;
						scope.$apply()
						scope.change()
					});
				});
				$document.on(end, function(event){
					$document.off(move);
				});				
			}
		}
	});