angular.module('minimalSlider', [])
	.directive('minimalSlider', function($document){
		
		var setPos = function(scope, elem, eventX){
			var slider = angular.element(elem.children()[0]);
			var thumb = angular.element(slider.children()[0]);
			var sliderWidth = slider.prop('offsetWidth');
			var thumbWidth = thumb.prop('offsetWidth');
			var sliderLeft = slider.prop('offsetLeft');
			var thumbLeft = thumb.prop('offsetLeft');

			var pos = eventX - sliderLeft;
			pos = Math.min(Math.max(pos, 0), sliderWidth);
			var translate = 'translate(' + (pos - thumbWidth / 2) + 'px, 0px)'

			thumb.css('transform', translate);
			thumb.css('-ms-transform', translate);
			thumb.css('-webkit-transform', translate);
			
			scope.model = pos / sliderWidth;
			scope.$apply()
			scope.change()
		}

		return {
			restrict: 'E',
			scope: {
				model: '=',
				change: '&'		
			},
			template: '<div class="minimal-slider"><div class="minimal-slider-thumb"></div></div>',
			link: function(scope, elem, attr, ctrl){
				elem.on('touchstart', function(event){
					setPos(scope, elem, event.changedTouches[0].pageX);
					$document.on('touchmove', function(event){
						event.preventDefault();
						setPos(scope, elem, event.changedTouches[0].pageX);
					});
				});
				elem.on('mousedown', function(event){
					setPos(scope, elem, event.pageX);
					$document.on('mousemove', function(event){
						setPos(scope, elem, event.pageX);
					});
				});
				$document.on('touchend touchcancel mouseup', function(event){
					$document.off('touchmove mousemove');
				});				
			}
		}
	});