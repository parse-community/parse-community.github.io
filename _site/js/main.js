/* global Parse */
/* global console */
/* global gitJson */
$(document).ready(function(){
	"use strict";
	   //====================================//
	  //  Use Jekyll Metadata to list the repos 
	 // (except for community repos)
	//====================================//
	var totalStars = 0,
		totalForks = 0,
		totalRepos = 0;
	if (gitJson){
		for (var j = 0; j < gitJson.length; j++) {
			var title 		= gitJson[j].name,
				sortTitle 	= title.toLowerCase(),
				url 		= gitJson[j].git_url,
				description = gitJson[j].description,
				stars 		= parseInt(gitJson[j].stargazers_count),
				forks 		= parseInt(gitJson[j].forks_count),
				language    = gitJson[j].language,
				privateRepo = gitJson[j].private;

			//ignore private repos
			if (privateRepo === true){
				continue;
			}

			//keep tally of total forks, stars and repos
			totalRepos++;
			totalStars = totalStars + stars;
			totalForks = totalForks + forks;
				
			//clean up variables
			title = title.replace(/-/g, ' ');

			//if title contains sdk hide it (since we hardcode them)
			if (sortTitle.indexOf("sdk") >= 0) {
				//-> if matches hardcoded repo title(ex arduino-SDK.indexof("arduino") then use these forks/stars/description
				//else
				continue;
			}

			//if name contains "tutorial", "any", "demo" or "todo"
			if (sortTitle.indexOf("tutorial") >= 0 || sortTitle.indexOf("any") >= 0 || sortTitle.indexOf("demo") >= 0 || sortTitle.indexOf("todo") >= 0){
				//write them to the page
				$("section.sampleApps").append('<div class="repo"><div class="repoTitle"><h4>' + title + '</h4><p><span><img src="img/starsDark.svg" alt="" class="icon">' + stars + '</span><span><img src="img/forksDark.svg" alt="" class="icon">' + forks + '</span><span>' + language + '</span></p></div><div class="repoDescription"><p>' + description + '</p></div><div class="repoButton"><a href="' + url + '" target="_blank"><button class="outline">View on Github</button></a></div></div>');
			} else {
				//write them to the page
				$("section.other").append('<div class="repo"><div class="repoTitle"><h4>' + title + '</h4><p><span><img src="img/starsDark.svg" alt="" class="icon">' + stars + '</span><span><img src="img/forksDark.svg" alt="" class="icon">' + forks + '</span><span>' + language + '</span></p></div><div class="repoDescription"><p>' + description + '</p></div><div class="repoButton"><a href="' + url + '" target="_blank"><button class="outline">View on Github</button></a></div></div>');
			}
		}
	}

	//write total forks, stars and repos into the page
	$(".heroText .repoCount").text(totalRepos);
	$(".heroText .starCount").text(totalStars);
	$(".heroText .forkCount").text(totalForks);

	  //====================================//
	 // Get community projects from a parse class
	//====================================//
	//add new repo to the HTML
	function addCommunityRepoToHTML(title, description, url){
		$("section.community").append("<div class='repo'><div class='repoTitle'><h4>" + title + "</h4></div><div class='repoDescription'><p>" + description + "</p></div><div class='repoButton'><a href=" + url + " target='_blank'><button class='outline'>View on Github</button></a></div></div>");
	}

	//write this into the page
	var communityRepos = Parse.Object.extend("communityRepos");
	var query = new Parse.Query(communityRepos);
	query.ascending("repoName");
	query.find({
		success: function(results) {
		    // Do something with the returned Parse.Object values
		    for (var i = 0; i < results.length; i++) {
		      	var object 		= results[i];
      			var title  		= object.get('repoName');
      			var description = object.get('repoDescription');
      			var url  		= object.get('repoUrl');
      			addCommunityRepoToHTML(title, description, url);
		    }
		},
		error: function(error) {
		    console.log("Error: " + error.code + " " + error.message);
		}
	});

	  //====================================//
	 //  Header animation
	//====================================//
	var browserHeight 		= $(window).height(),
		browserWidth 		= $(window).width();

	//recalc sizes on browser resize
	$(window).resize(function(){
		browserHeight 	= $(window).height();
		browserWidth 	= $(window).width();
	});

	function headerAnimation(){
		var fullTime = 52000;
		//scroll through the horizon
		$(".foregroundContainer").velocity({ 
				translateX: "-150%",
		}, { queue: false, duration: fullTime, easing: "linear" });
		$(".skyline").velocity({ 
				translateX: -($(".skyline").width() - browserWidth),
		}, { queue: false, duration: fullTime * 3, easing: "linear" });

		//move the transport truck
		$(".transport").velocity({ 
			translateX: ["180%", "50%"]
		}, { queue: false, duration: fullTime, easing: "linear", begin: function() {
			$(".transportWheels .wheel").velocity({ 
				rotateZ: 360 * 3.45 + "deg"
			}, { queue: false, duration: fullTime, easing: "linear" });
		} });
		

		//crane putting video on phone
		$(".loadInner line, .loadInner circle, .videoLoad").velocity({ 
			translateX: [0, "12vh"],
			translateY: [0, "-12vh"]
		}, { queue: false, duration: 3200, delay: 800, easing: [ 0.4, 0, 0.2, 1 ], 
		begin: function() { 
			$(".craneInner .anchor").velocity({ 
				translateX: [0, "12vh"]
			}, { queue: false, duration: 3200, easing: [ 0.4, 0, 0.2, 1 ] });
		}, complete: function(){
			//move the line back
			$(".loadInner line, .loadInner circle").velocity({ 
				translateY: ["-12vh", 0]
			}, { queue: false, duration: 4800, easing: [ 0.4, 0, 0.2, 1 ] });

			//animate in the phone content
			var phonePath = $(".cranePhoneContent path");
			for (var p = 0; p < phonePath.length; p++) {
				phonePath.eq(p).velocity({ 
					scale: [1, 0.6],
					opacity: 1
				}, { queue: false, duration: 3200, delay: 200 * p, easing: [ 0.23, 1, 0.32, 1 ] });
			}
			
		} });

		//dropping data into laptop
		$(".laptopHook, .laptopData").velocity({ 
			translateY: [0, "-100%"],
			translateX: ["20%", "20%"]
		}, { queue: false, duration: 3200, delay: fullTime / 3, easing: [ 0.4, 0, 0.2, 1 ],
		complete: function(){
			$(".laptopHook").velocity({ 
				translateY: ["-100%", 0],
				translateX: ["20%", "20%"]
			}, { queue: false, duration: 3200, easing: [ 0.4, 0, 0.2, 1 ] });
			$(".laptopData g").velocity({ 
				scale: 0.4,
				opacity: 0
			}, { queue: false, duration: 1200, delay: 400, easing: [ 0.175, 0.885, 0.320, 1.275 ] });
			$(".laptopContent").velocity({ 
				translateY: [0, "100%"]
			}, { queue: false, duration: 1200, delay: 1200, easing: [ 0.4, 0, 0.2, 1 ] });
			$(".browserChrome").velocity({ 
				translateY: [0, "-100%"]
			}, { queue: false, duration: 1200, delay: 1200, easing: [ 0.4, 0, 0.2, 1 ] });
		} });

		//tanker truck moving
		$(".tanker").velocity({ 
			translateX: ["750%", "520%"]
		}, { queue: false, duration: fullTime, delay: fullTime / 1.2, easing: "linear", begin: function() {
			$(".tanker .wheel").velocity({ 
				rotateZ: 360 * 3.45 + "deg"
			}, { queue: false, duration: fullTime, easing: "linear" });
		} });


		//
	}

	headerAnimation();

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