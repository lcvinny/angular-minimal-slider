angular.module('minimalSlider', [])
	.directive('minimalSlider', function($document, $window){

		var setRatio = function(scope, elem, eventX){
			var slider = angular.element(elem.children()[0]);
			var thumb = angular.element(slider.children()[0]);
			var thumbWidth = thumb.prop('offsetWidth');
			var sliderWidth = slider.prop('offsetWidth') - thumbWidth;
			var sliderLeft = elem.children()[0].getBoundingClientRect().left + thumbWidth / 2;
			var pos = eventX - sliderLeft;
			pos = Math.min(Math.max(pos, 0), sliderWidth);
			scope.model = pos / sliderWidth;

			scope.$apply()
			scope.change()
		}

		var setPosition = function(scope, elem){
			var slider = angular.element(elem.children()[0]);
			var thumb = angular.element(slider.children()[0]);
			var thumbWidth = thumb.prop('offsetWidth');
			var sliderWidth = slider.prop('offsetWidth') - thumbWidth;
			
			var pos = scope.model * sliderWidth;
			var translate = 'translate(' + (pos) + 'px, 0px)'

			thumb.css('transform', translate);
			thumb.css('-ms-transform', translate);
			thumb.css('-webkit-transform', translate);
		}

		var setRatioAndPosition = function(scope, elem, eventX){
			setRatio(scope, elem, eventX);
			setPosition(scope, elem);
		}

		return {
			restrict: 'E A',
			scope: {
				model: '=',
				change: '&'		
			},
			template: '<div class="minimal-slider"><div class="minimal-slider-thumb"></div></div>',
			link: function(scope, elem, attr, ctrl){

				var slider = angular.element(elem.children()[0])[0];
				var thumb = angular.element(angular.element(elem.children()[0]).children()[0])[0];

				if(typeof $window.hammer == 'undefined'){
					$window.hammer = Hammer($window.document.body,{
						prevent_default: true
					});
				}
				$window.hammer.on('drag', function(event){
					if(event.gesture.startEvent.target == thumb){
						setRatioAndPosition(scope, elem, event.gesture.center.pageX);	
					}
				}).on('tap', function(event){
					if(event.gesture.target == slider){
						setRatioAndPosition(scope, elem, event.gesture.center.pageX);	
					}
				});	
				

				angular.element($window).on('resize', function(){
					setPosition(scope, elem);
				});
			}
		}
	});