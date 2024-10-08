/* global Parse */
/* global console */
/* global gitJson */

//after page load
$(document).ready(function(){
	"use strict";
	   //====================================//
	  //  Use Jekyll Metadata to list the repos
	 // (except for community repos)
	//====================================//
	let totalStars = 0;
	let totalForks = 0;
	let totalRepos = 0;

	//render repo to page
	function addToSection(sectionTitle, url, title, description, forks, stars, language){
		 sectionTitle.append("<tr class='repoList'><td><a href='" + url + "' target='_blank'><h4>" + title + "</h4><p class='repoDescription'>" + description + "</p></td><td class='language metadata'>" + language + "</a></td><td class='metadata'><img src='img/starsDark.svg' alt='' class='icon'>" + stars + "</td><td class='metadata'><img src='img/forksDark.svg' alt='' class='icon'>" + forks + "</td></tr>");
	}

	function addNonRepoToSection(sectionTitle, url, title, description, forks, stars, language){
		sectionTitle.append("<tr class='repoList'><td colspan='4'><a href='" + url + "' target='_blank'><h4>" + title + "</h4><p class='repoDescription'>" + description + "</p></td></tr>");
	}


	if (typeof gitJson !== 'undefined'){
		for (const git of gitJson) {
			const title 			= git.name;
				const sortTitle 		= title.toLowerCase();
				const url 			= git.html_url;
				const hasIssues 		= git.has_issues;
				const archived			= git.archived;
				const description 	= git.description;
				const stars 			= parseInt(git.stargazers_count);
				const forks 			= parseInt(git.forks_count);
				let language    	= git.language;
				let sortDescription = "";

			// sortable description
			if (description !== null && description !== ""){
				sortDescription = description.toLowerCase();
			}

			//clean up language titles
			if (language !== null && language !== ""){
				var sortLanguage = language.toLowerCase();
				if (sortLanguage === "javascript"){
					language = "JS";
				} else if (sortLanguage === "objective-c"){
					language = "Obj-C";
				} if (sortLanguage === "null"){
					language = "";
				}
			} else if (language === null || language === ""){
				language = "";
			}

			//keep tally of total forks, stars and repos
			totalRepos++;
			totalStars = totalStars + stars;
			totalForks = totalForks + forks;

			//Sort SDK Repos
			//if title contains sdk hide it (since we hardcode them)


			//ignore repos with issues turned off
			if (hasIssues === false || archived === true || title === '.github' || title === 'Governance' || title === 'parse-community-peril' || title === 'parse-community.github.io' || title === 'blog' || title === 'relay-examples' || title === 'docs'|| title === 'parse-facebook-user-session'){
				continue;
			}

			//Sort non-SDK repos into categories

			//PARSE SERVER CATEGORY
			//  if name parse-server, parse-dashboard
			if (sortTitle === "parse-server" || sortTitle === "parse-dashboard" || sortTitle === "parse-server-example"){
				//write them to the page
				addToSection($("section.parseServer table"), url, title, description, forks, stars, language);
			//ADAPTERS REPOSITORIES
			} else if (sortTitle.includes("parse-server") === true || sortTitle.includes("parse-dashboard")){
				//write them to the page
				addToSection($("section.parseServerAdapters table"), url, title, description, forks, stars, language);
			//OTHER CATEGORY
			//   ...everything else
			} else if (description) {
				addToSection($("section.other table"), url, title, description, forks, stars, language);
			}
		}

		addNonRepoToSection($("section.parseServer table"), "https://github.com/parse-server-modules", "parse-server-modules", "Community Organization for non-core Parse Server modules and adapters");
	}

	//write total forks, stars and repos into the page
	const formatNumber = new Intl.NumberFormat().format
	$(".heroText .repoCount").text(formatNumber(totalRepos));
	$(".heroText .starCount").text(formatNumber(totalStars));
	$(".heroText .forkCount").text(formatNumber(totalForks));

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
		  //
		 // Phone 1 (Left)
		//
		//move line down to grab video
		$(".craneLine").velocity({
			translateY: [0, "-25%"],
		}, { queue: false, duration: 600, easing: [ 0.4, 0, 0.2, 1 ], complete: function(){
			//move line up and right to follow video
			$(".craneLine").velocity({
				translateX: ["13%", 0],
				translateY: ["-14.8%", 0]
			}, { queue: false, duration: 600, delay: 200, easing: [ 0.4, 0, 0.2, 1 ] });
			//move anchor pivot right
			$(".cranePivot").velocity({
				translateX: ["13%", 0]
			}, { queue: false, duration: 600, delay: 200, easing: [ 0.4, 0, 0.2, 1 ] });
			//move line + video onto the phone
			$(".craneVideo").velocity({
				translateY: ["-14.8%", 0],
				translateX: ["13.4%", 0]
			}, { queue: false, duration: 600, delay: 200, easing: [ 0.4, 0, 0.2, 1 ], complete: function(){
				//move the line back up away from phone
				$(".craneLine").velocity({
					translateY: ["-30%", "-14.8%"],
				}, { queue: false, duration: 800, easing: [ 0.4, 0, 0.2, 1 ] });
				//fade + animate in apps
				var rectApps = $(".appRect"),
					pathApps = $(".appSquare");
				for (var p = 0; p < pathApps.length; p++) {
					pathApps.eq(p).velocity({
						opacity: 1,
						scale: [1, 0.45],
						translateY: 0,
						rotateZ: [0, "90deg"]
					}, { queue: false, duration: 600, delay: 100 * p + 400, easing: [ 0.175, 0.885, 0.320, 1.275 ] });
				}
				for (var r = 0; r < rectApps.length; r++) {
					rectApps.eq(r).velocity({
						opacity: 1,
						scale: [1, 0.45],
						translateY: 0,
						rotateZ: 0
					}, { queue: false, duration: 600, delay: ((100 * r) + (100 * p) + 400), easing: [ 0.175, 0.885, 0.320, 1.275 ] });
				}
				//turn screen on
				$(".phone1ScreenContainer").velocity({
					backgroundColor: "#EF3F61"
				}, { queue: false, duration: 600, easing: [ 0.4, 0, 0.2, 1 ] });
			} });
		} });

		  //
		 // Phone 2 (Center)
		//
		//move middle line to grab push icon
		var pushIconTranslate = "-" + ($(".middleLineOne").height() / $(".pushOne").height() * 100) + "%";
		$(".middleLineOne").velocity({
			translateY: [0, "-105%"],
		}, { queue: false, duration: 1200, delay: 800, easing: [ 300, 28 ], complete: function(){
			//rotate the push icon and pull it up
			$(".pushOne").velocity({
				translateY: [pushIconTranslate, 0]
			}, { queue: false, duration: 800, easing: [ 0.4, 0, 0.2, 1 ] })
			//rotate push icon
			.velocity({
				rotateZ: ["12deg", "0deg"],
			}, { queue: false, duration: 300, easing: [ 0.4, 0, 0.2, 1 ] });
			//lift the line back up
			$(".middleLineOne").velocity({
				translateY: ["-100%", 0],
			}, { queue: false, duration: 800, easing: [ 0.4, 0, 0.2, 1 ], complete: function(){
				//put the icon on the phone screen
				$(".middleLine2, .push2").velocity({
					y: [0, "-125%"],
				}, { queue: false, duration: 1000, delay: 200, easing: [ 300, 28 ], complete: function(){
					//pull the line back up
					$(".middleLine2").velocity({
						y: ["-125%", 0],
					}, { queue: false, duration: 1000, delay: 200, easing: [ 300, 28 ] });
					//turn phone screen on
					$(".phone2Screen .phoneCircle").velocity({
						scale: [1, 0]
					}, { queue: false, duration: 350, easing: [ 0.25, 0.46, 0.45, 0.94 ] });
					$(".phone2Screen").velocity({
						backgroundColor: "#4BBC6E"
					}, { queue: false, duration: 150, delay: 200, easing: [ 0.4, 0, 0.2, 1 ] });
					//change icon color
					$(".push2 path").velocity({
						fill: "#40a05b"
					}, { queue: false, duration: 200, easing: [ 0.4, 0, 0.2, 1 ] });
				} });
			} });
		} });

		  //
		 // Phone 3 (Right)
		//
		//preset the scale of the hoist so velocity doesn't overwrite
		function setupScale(){
			var scaleRatio = 1;
			if (browserWidth >= 1480){
				scaleRatio = 0.75;
				$(".wheelsContainer, .hoist, .hoistParts").velocity({
					scale: 		[scaleRatio, scaleRatio]
				}, { queue: false, duration: 0 });
			} else {
				$(".wheelsContainer, .hoist, .hoistParts").velocity({
					scale: 		[scaleRatio, scaleRatio]
				}, { queue: false, duration: 0 });
			}
		}
		$(window).resize(function(){
			setupScale();
		});
		setupScale();

		//move wheels with the hoist
		$(".wheelsContainer").velocity({
			translateX: [0, "100%"],
		}, { queue: false, duration: 4400, easing: [0.39, 0.575, 0.565, 1] });
		//drive in the hoist
		$(".hoist, .hoistParts").velocity({
			translateX: [0, "100%"],
		}, { queue: false, duration: 4400, easing: [0.39, 0.575, 0.565, 1], complete: function(){
			//turn screen on
			$(".phone3Screen .phoneCircle").velocity({
				scale: [1, 0]
			}, { queue: false, duration: 350, easing: [ 0.25, 0.46, 0.45, 0.94 ] });
			$(".phone3Screen").velocity({
				backgroundColor: "#555574"
			}, { queue: false, duration: 150, delay: 200, easing: [ 0.4, 0, 0.2, 1 ] });
			$(".analytics path").velocity({
				fill: "#3A3A59"
			}, { queue: false, duration: 200, easing: [ 0.4, 0, 0.2, 1 ] });

			//lift hoist line up
			$(".hoistLineInner").velocity({
				y: ["-22%", 0]
			}, { queue: false, duration: 800, easing: [ 0.4, 0, 0.2, 1 ] });

		}, begin: function(){
			//turn hoist wheels
			$(".hoistWheel").velocity({
				rotateZ: ["-=720deg"],
			}, { queue: false, duration: 4400, easing: [0.39, 0.575, 0.565, 1]});
		} });
	}
	//fix vw/vh units on mobile safari and old browsers
	function fixVH(){
		var rightWidth = $("img.headerRight").width();
		var leftWidth = $("img.headerLeft").width();
		var centerWidth = $("img.headerCenter").width();
		$(".headerRightContainer").css({"width": rightWidth + "px"});
		$(".headerLeftContainer").css({"width": leftWidth + "px"});
		$(".headerCenterContainer").css({"width": centerWidth + "px"});
	}

	fixVH();
	$(window).load(function(){
		fixVH();
		headerAnimation();
	});

	$(window).resize(function(){
		fixVH();
	});

	  //====================================//
	 // Main Scrolling Events
	//====================================//
	var scrollwheelActive = 0,
		lastScrollPosition,
		navindicatorTimeout = false;
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
			if (scrolled >= 0 && scrolled <= browserHeight && browserWidth > 960){
				$(".heroText").css({
					'transform': 'translateY(-' + (scrolled / 1.6) + 'px)',
					'opacity': 1 - (scrolled / headerheight)
				});
				$(".skyline").css({
					'transform': 'translateY(' + (scrolled * 0.135) + 'px)',
				});
			}

			//secondary nav stick/unstick
			var secondaryNav = $(".secondaryNav");
			if (scrolled >= $(".header").height()){
				secondaryNav.addClass("shown");
			} else{
				secondaryNav.removeClass("shown");
			}

			//secondary nav indicators
			var section = $("section");
			for (var s = 0; s < section.length; s++) {
				var sectionTopPos = section.eq(s).offset().top,
					sectionHeight = section.eq(s).height();
				if (scrolled > (sectionTopPos - 64) && scrolled < (sectionTopPos + sectionHeight - 64) && navindicatorTimeout === false){
					$(".secondaryNav ul a").removeClass("active");
					$(".secondaryNav ul a").eq(s).addClass("active");
				}
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

	  //====================================//
	 // Anchor Tags Scroll the Page instead of Jump
	//====================================//
	$('a[href*=#]:not([href=#])').click(function() {
	 	var clicked = $(this),
	 		element = clicked.attr("href");
	    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
	      	$(element).velocity("scroll", { duration: 600, easing: [ 0.4, 0, 0.2, 1 ], begin: function(){
	      		//change indicator color
	      		$(".secondaryNav ul a").removeClass("active");
	      		clicked.addClass("active");
	      		//disable indicator changing from scrolling
	      		navindicatorTimeout = true;
	      	}, complete: function(){
	      		//renable indicator changing from scrolling
	      		navindicatorTimeout = false;
	      	} });
	    }
	});

	  //====================================//
	 // Community projects, listed at the bottom
	//====================================//
	//add new repo to the HTML
	function addCommunityRepoToHTML(title, description, url){
		$("section.community").append("<div class='repo'><div class='repoTitle'><h4>" + title + "</h4></div><div class='repoDescription'><p>" + description + "</p></div><div class='repoButton'><a href=" + url + " target='_blank'><button class='outline'>View on GitHub</button></a></div></div>");
	}

	const communityRepos = [{
		title: "Oracle Database Adapter",
		description: "A Oracle Database Adapter for Parse Server.",
		url: "https://github.com/oracle-samples/oracleadapter-parse"
	},{
		title: "MySQL Database Adapter",
		description: "A MySQL Database Adapter for Parse Server.",
		url: "https://github.com/dplewis/parse-server-mysql-adapter"
	},{
		title: "DynamoDB Database Adapter",
		description: "A DynamoDB Database Adapter for Parse Server.",
		url: "https://github.com/benishak/parse-server-dynamodb-adapter"
	},{
		title: "Parse Client in Ruby",
		description: "An object-relational mapper and cloud code webhooks server.",
		url: "https://github.com/modernistik/parse-stack"
	},{
		title: "Parse Cloud Class",
		description: "Extendable way to set up Parse Cloud classes behavior.",
		url: "https://github.com/owsas/parse-cloud-class"
	},{
		title: "Parse Auditor",
		description: "Add automated data auditing/versioning to classes.",
		url: "https://github.com/Blackburn-Labs/parse-auditor"
	},{
		title: "Parse Python Wrapper",
		description: "A Python wrapper for the Parse Server API.",
		url: "https://github.com/dgrtwo/ParsePy"
	},{
    title: "Parse Dashboard for iOS",
		description: "A beautiful iOS client for managing your Parse apps.",
		url: "https://github.com/nathantannar4/Parse-Dashboard-for-iOS"
	},{
		title: "Android Dashboard",
		description: "A beautiful Android client for managing your Parse apps.",
		url: "https://github.com/bitterbit/Parse-Dashboard-Android"
  	},{
		title: "Live Query for .NET",
		description: "Live Query Project for .NET in development.",
		url: "https://github.com/JonMcPherson/parse-live-query-dotnet"
	},{
		title: "Parse Ember Wrapper",
		description: "Includes an adapter, serializer and a session service for auth.",
		url: "https://github.com/GetBlimp/ember-parse"
	},{
		title: "Parse Client in Go",
		description: "Parse API Client Library written in Go.",
		url: "https://github.com/kylemcc/parse"
	}];

	for (var i = 0; i < communityRepos.length; i++) {
		addCommunityRepoToHTML(communityRepos[i].title, communityRepos[i].description, communityRepos[i].url);
	}
});
