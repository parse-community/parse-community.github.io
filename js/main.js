$(document).ready(function(){
	"use strict";

	  //====================================//
	 // Global vars
	//====================================//
	var browserHeight 		= $(window).height();

	//recalc on browser resize
	$(window).resize(function(){
		browserHeight 	= $(window).height();
	});

	  //====================================//
	 // Gradient Animations
	//====================================//
	function animateGradient(){
		var stop1 = $(".stop1"),
			stop2 = $(".stop2");
		stop1.velocity({ 
			stopColor: "#555572"
		}, { queue: false, duration: 4000, complete: function(){
			stop1.velocity({ 
				stopColor: "#169CEE"
			}, { queue: false, duration: 4000, complete: function(){
				stop1.velocity({ 
					stopColor: "#00DB7C"
				}, { queue: false, duration: 4000, complete: function(){
					stop1.velocity({ 
						stopColor: "#169CEE"
					}, { queue: false, duration: 4000, complete: function(){
						
					}});
				}});
			}});
		}});
		stop2.velocity({ 
			stopColor: "#169CEE"
		}, { queue: false, duration: 4000, complete: function(){
			stop2.velocity({ 
				stopColor: "#555572"
			}, { queue: false, duration: 4000, complete: function(){
				stop2.velocity({ 
					stopColor: "#169CEE"
				}, { queue: false, duration: 4000, complete: function(){
					stop2.velocity({ 
						stopColor: "#00DB7C"
					}, { queue: false, duration: 4000, complete: function(){
						
					}});
				}});
			}});
		}});
	}
	//start animations
	animateGradient();
	setInterval(function(){ 
		animateGradient();
	}, 16000);


	  //====================================//
	 // Main Scrolling Events
	//====================================//
	var scrollwheelActive = 0,
		lastScrollPosition;
	function scrollAnimation(){
		//variables
		var scrolled 		= $(window).scrollTop();

		//don't recalculate if not scrolling
		if (lastScrollPosition === scrolled) {
			
			return false;
		} else {

			//update last position when scrolling
			lastScrollPosition = scrolled;

			//parallax header
			var headerheight = $(".header").height();
			if (scrolled >= 0 && scrolled <= headerheight){
				$(".heroText").css({
					'transform': 'translateY(-' + (scrolled / 1.5) + 'px)',
					'opacity': 1 - (scrolled / headerheight)
				});

			}
			
	    }
	}

	// Call the loop to execute scroll events
	$(window).on('mousewheel', function() {
		scrollAnimation();
		scrollwheelActive = 1;

		//timer to avoid more scroll functions if mousewheel event is already being used
		clearTimeout($.data(this, 'timer'));
		$.data(this, 'timer', setTimeout(function() {
		    //not using the scrollwheel anymore to scroll
		    scrollwheelActive = 0;
		}, 100));
	})

	//for non-scrollwheel
	.scroll(function(){
		//only run if scrollwheel isn't being used
		if (scrollwheelActive === 1){
			return false;
		} else{
			scrollAnimation();
		}
	});
});