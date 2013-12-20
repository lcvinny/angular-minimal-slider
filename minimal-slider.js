angular.module('minimalSlider', [])
	.directive('minimalSlider', function($document, $window){
		
		var setRatio = function(scope, elem, eventX){
			var slider = angular.element(elem.children()[0]);
			var thumb = angular.element(slider.children()[0]);
			var sliderWidth = slider.prop('offsetWidth');
			var sliderLeft = slider.prop('offsetLeft');

			var pos = eventX - sliderLeft;
			pos = Math.min(Math.max(pos, 0), sliderWidth);
			scope.model = pos / sliderWidth;

			scope.$apply()
			scope.change()
		}

		var setPosition = function(scope, elem){
			var slider = angular.element(elem.children()[0]);
			var thumb = angular.element(slider.children()[0]);
			var sliderWidth = slider.prop('offsetWidth');
			var thumbWidth = thumb.prop('offsetWidth');

			var pos = scope.model * sliderWidth;
			var translate = 'translate(' + (pos - thumbWidth / 2) + 'px, 0px)'

			thumb.css('transform', translate);
			thumb.css('-ms-transform', translate);
			thumb.css('-webkit-transform', translate);
		}

		var setRatioAndPosition = function(scope, elem, eventX){
			setRatio(scope, elem, eventX);
			setPosition(scope, elem);
		}

		return {
			restrict: 'E',
			scope: {
				model: '=',
				change: '&'		
			},
			template: '<div class="minimal-slider"><div class="minimal-slider-thumb"></div></div>',
			link: function(scope, elem, attr, ctrl){
				angular.element($window).on('resize', function(){
					setPosition(scope, elem);
				});
				elem.on('touchstart', function(event){
					setRatioAndPosition(scope, elem, event.changedTouches[0].pageX);
					$document.on('touchmove', function(event){
						event.preventDefault();
						setRatioAndPosition(scope, elem, event.changedTouches[0].pageX);
					});
				});
				elem.on('mousedown', function(event){
					setRatioAndPosition(scope, elem, event.pageX);
					$document.on('mousemove', function(event){
						setRatioAndPosition(scope, elem, event.pageX);
					});
				});
				$document.on('touchend touchcancel mouseup', function(event){
					$document.off('touchmove mousemove');
				});				
			}
		}
	});