$(function () {


	var date, dayName, day, month, year;
	var range = 270,
		sectionsDayName = 7,
		sectionsDay = 31,
		sectionsMonth = 12,
		charactersDayName = 3,
		charactersDay = 2,
		charactersMonth = 3,
		dayColor = '#FF2D55',
		monthColor = '#007AFF',
		dayNameColor = '#4CD964';


	function resetColor(ring, textClass, color) {
		$(ring + ' ' + textClass).each(function () {
			$(this).find('.day-letter').css('color', color);
		});
	}



	// Rotate the selected ring the correct amount and illuminate the correct characters of the ring text
	function rotateRing(input, sections, characters, ring, text, color) {
		var sectionWidth = range / sections;
		var initialRotation = 135 - (sectionWidth / 2);
		var rotateAmount = initialRotation - sectionWidth * (input - 1);
		var start = (characters * (input - 1)) + (input - 1) + 1;

		$(ring).css({
			'-webkit-transform': 'rotate(' + rotateAmount + 'deg)',
			'-moz-transform': 'rotate(' + rotateAmount + 'deg)',
			'-ms-transform': 'rotate(' + rotateAmount + 'deg)',
			'transform': 'rotate(' + rotateAmount + 'deg)'
		});

		for (var i = start; i < start + characters; i++) {
			$(text).children('.char' + i).css({
				'color': color
			});
		}
	}

	// Get a new date object every second and update the rotation of the clock handles
	function clockRotation() {
		setInterval(function () {
			var date = new Date();
			var seconds = date.getSeconds();
			var minutes = date.getMinutes();
			var hours = date.getHours();
			var secondsRotation = seconds * 6;
			var minutesRotation = minutes * 6;
			var hoursRotation = hours * 30 + (minutes / 2);
			$("#seconds").css({
				'-webkit-transform': 'rotate(' + secondsRotation + 'deg)',
				'-moz-transform': 'rotate(' + secondsRotation + 'deg)',
				'-ms-transform': 'rotate(' + secondsRotation + 'deg)',
				'transform': 'rotate(' + secondsRotation + 'deg)'
			});
			$("#minutes").css({
				'-webkit-transform': 'rotate(' + minutesRotation + 'deg)',
				'-moz-transform': 'rotate(' + minutesRotation + 'deg)',
				'-ms-transform': 'rotate(' + minutesRotation + 'deg)',
				'transform': 'rotate(' + minutesRotation + 'deg)'
			});
			$("#hours").css({
				'-webkit-transform': 'rotate(' + hoursRotation + 'deg)',
				'-moz-transform': 'rotate(' + hoursRotation + 'deg)',
				'-ms-transform': 'rotate(' + hoursRotation + 'deg)',
				'transform': 'rotate(' + hoursRotation + 'deg)'
			});
		}, 1000);
	}

	// Give column representing passed days and the current day this week a height
	function loadBars() {
		for (var i = 1; i <= dayName; i++) {
			var newHeight = (Math.floor(Math.random() * 85) + 5);
			var newTop = 110 - newHeight;
			$("#x" + i).css({
				'height': newHeight + 'px',
			});
		}
	}

	function init() {
		$(".center-preview").lettering();
		$(".day-name-preview").lettering();
		$(".day-name-text").lettering();
		$(".day-preview").lettering();
		$(".day-text").lettering();
		$(".month-preview").lettering();
		$(".month-text").lettering();
		$('.day-preview').fadeTo(10, 1);
		$('.month-preview').fadeTo(10, 1);
		$('.day-name-preview').fadeTo(10, 1);
		$('.center-preview').fadeTo(10, 1);

		// Get date variables
		date = new Date();
		dayName = date.getDay(); // Day of week (1-7)
		day = date.getDate(); // Get current date (1-31)
		month = date.getMonth() + 1; // Current month (1-12)
		if (dayName == 0) {
			dayName = 7;
		}
		// Fade in/out second dial and rotate. Also fade in and animate side elements.
		setTimeout(function () {
			$('.day-preview').fadeTo(500, 0);
			$('.day-text').fadeTo(500, 1, function () {
				rotateRing(day, sectionsDay, charactersDay, '#r3', '.day-text', dayColor);
			});
		}, 500);

		// Fade in/out second dial and rotate. Also fade in and animate side elements.
		setTimeout(function () {
			$('.month-preview').fadeTo(500, 0);
			$('.fa-cloud').fadeTo(500, 1);
			$('.temperature').fadeTo(500, 1);
			$('.bars').fadeTo(500, 1);
			$('.month-text').fadeTo(500, 1, function () {
				rotateRing(month, sectionsMonth, charactersMonth, '#r2', '.month-text', monthColor);
				loadBars();
			});
		}, 1000);

		// Fade in/out first dial and rotate
		setTimeout(function () {
			$('.day-name-preview').fadeTo(500, 0);
			$('.day-name-text').fadeTo(500, 1, function () {
				rotateRing(dayName, sectionsDayName, charactersDayName, '#r1', '.day-name-text', dayNameColor);
			});
		}, 1500);

		// Fade in/out center dial
		setTimeout(function () {
			$('.center-preview').fadeTo(500, 0);
			$('.head').fadeTo(500, 0);
			$('.torso').fadeTo(500, 0);
			$(".hand-container").fadeTo(500, 1, function () {
				//console.log("Clock faded in");
			});
		}, 2000);

		// Begin clock rotation now it is visible
		clockRotation();


	}

	init();

	function rotateDial() {
		var month = parseInt($('#month-select').val());
		var day = parseInt($('#day-select').val());

		// Reset the color of all rings to #555555 and rotate to 0
		resetColor('#day-ring', '.day-text', '#555555');
		resetColor('#month-ring', '.month-text', '#555555');


		// Rotate the month and day rings
		rotateRing(month, sectionsMonth, charactersMonth, '#r2', '.month-text', monthColor);
		rotateRing(day, sectionsDay, charactersDay, '#r3', '.day-text', dayColor);

		// Calculate the day of the week (0-6, where 0 is Sunday)
		var date = new Date(2023, month - 1, day);
		var dayOfWeek = date.getDay();
		if (dayOfWeek == 0) {
			dayOfWeek = 7;
		}
		// Rotate the day of the week ring
		rotateRing(dayOfWeek, sectionsDayName, charactersDayName, '#r1', '.day-name-text', dayNameColor);
		// Reset the color of the previous day of the week
		resetColor('#r1', '.day-name-text', dayNameColor);

		
		
		
		if (month == 1 && day == 5) {
			
			$('#weather').html('<img src="sajjad.jpg" style="width:350px;height:auto;">');
		}

		if (month == 1 && day == 8) {
			
			$('#weather').html('<img src="navid.jpg" style="width:350px;height:auto;">');
		}

		if (month == 1 && day == 20) {
			
			$('#weather').html('<img src="amir.jpg" style="width:350px;height:auto;">');
		}

		if (month == 1 && day == 21) {
			
			$('#weather').html('<img src="sina.jpg" style="width:350px;height:auto;">');
		}

		if (month == 1 && day == 26) {
			
			$('#weather').html('<img src="elham.jpg" style="width:350px;height:auto;">');
		}

		if (month == 1 && day == 29) {
			
			$('#weather').html('<img src="hedieh.jpg" style="width:350px;height:auto;">');
		}

		if (month == 2 && day == 3) {
			
			$('#weather').html('<img src="mahan&parsa.jpg" style="width:350px;height:auto;">');
		}

		if (month == 2 && day == 14) {
			
			$('#weather').html('<img src="mehregan.jpg" style="width:350px;height:auto;">');
		}

		if (month == 2 && day == 25) {
			
			$('#weather').html('<img src="saadoddin.jpg" style="width:350px;height:auto;">');
		}

		if (month == 2 && day == 31) {
			
			$('#weather').html('<img src="hossein-gh.jpg" style="width:350px;height:auto;">');
		}

		if (month == 3 && day == 5) {
			
			$('#weather').html('<img src="mamali.jpg" style="width:350px;height:auto;">');
		}

		if (month == 3 && day == 16) {
			
			$('#weather').html('<img src="erfan.jpg" style="width:350px;height:auto;">');
		}

		if (month == 3 && day == 31) {
			
			$('#weather').html('<img src="amirsalar.jpg" style="width:350px;height:auto;">');
		}

		if (month == 4 && day == 4) {
			
			$('#weather').html('<img src="mamali.jpg" style="width:350px;height:auto;">');
		}

		if (month == 4 && day == 5) {
			
			$('#weather').html('<img src="asghari.jpg" style="width:350px;height:auto;">');
		}

		if (month == 4 && day == 25) {
			
			$('#weather').html('<img src="pouya.jpg" style="width:350px;height:auto;">');
		}

		if (month == 4 && day == 27) {
			
			$('#weather').html('<img src="iman.jpg" style="width:350px;height:auto;">');
		}

		if (month == 5 && day == 8) {
			
			$('#weather').html('<img src="melika.jpg" style="width:350px;height:auto;">');
		}

		if (month == 5 && day == 22) {
			
			$('#weather').html('<img src="mh.jpg" style="width:350px;height:auto;">');
		}

		if (month == 6 && day == 8) {
			
			$('#weather').html('<img src="masoumeh.jpg" style="width:350px;height:auto;">');
		}

		if (month == 6 && day == 17) {
			
			$('#weather').html('<img src="hamed.jpg" style="width:350px;height:auto;">');
		}

		if (month == 6 && day == 20) {
			
			$('#weather').html('<img src="arash.jpg" style="width:350px;height:auto;">');
		}

		if (month == 6 && day == 30) {
			
			$('#weather').html('<img src="paria.jpg" style="width:350px;height:auto;">');
		}

		if (month == 6 && day == 26) {
			
			$('#weather').html('<img src="amirreza-z.jpg" style="width:350px;height:auto;">');
		}

		if (month == 6 && day == 29) {
			
			$('#weather').html('<img src="alireza-sh.jpg" style="width:350px;height:auto;">');
		}

		if (month == 6 && day == 21) {
			
			$('#weather').html('<img src="hossein-b.jpg" style="width:350px;height:auto;">');
		}

		if (month == 7 && day == 6) {
			
			$('#weather').html('<img src="amirabbas.jpg" style="width:350px;height:auto;">');
		}

		if (month == 7 && day == 7) {
			
			$('#weather').html('<img src="sepehr.jpg" style="width:350px;height:auto;">');
		}

		if (month == 7 && day == 27) {
			
			$('#weather').html('<img src="amirreza-r.jpg" style="width:350px;height:auto;">');
		}

		if (month == 8 && day == 2) {
			
			$('#weather').html('<img src="hossein-a.jpg" style="width:350px;height:auto;">');
		}

		if (month == 8 && day == 23) {
			
			$('#weather').html('<img src="mohadese.jpg" style="width:350px;height:auto;">');
		}

		if (month == 8 && day == 24) {
			
			$('#weather').html('<img src="ehsan.jpg" style="width:350px;height:auto;">');
		}

		if (month == 9 && day == 15) {
			
			$('#weather').html('<img src="ali.jpg" style="width:350px;height:auto;">');
		}

		if (month == 9 && day == 18) {
			
			$('#weather').html('<img src="mohammad.jpg" style="width:350px;height:auto;">');
		}

		if (month == 9 && day == 22) {
			
			$('#weather').html('<img src="helia.jpg" style="width:350px;height:auto;">');
		}

		if (month == 10 && day == 13) {
			
			$('#weather').html('<img src="bardia.jpg" style="width:350px;height:auto;">');
		}

		if (month == 11 && day == 13) {
			
			$('#weather').html('<img src="alireza-r.jpg" style="width:350px;height:auto;">');
		}

		if (month == 11 && day == 18) {
			
			$('#weather').html('<img src="ali-m.jpg" style="width:350px;height:auto;">');
		}

		if (month == 12 && day == 21) {
			
			$('#weather').html('<img src="mohammad-d.jpg" style="width:350px;height:auto;">');
		}
	}


	function resetRing(ring, textClass, color, rotation) {
		$(ring).css({
			'-webkit-transform': 'rotate(' + rotation + 'deg)',
			'-moz-transform': 'rotate(' + rotation + 'deg)',
			'-ms-transform': 'rotate(' + rotation + 'deg)',
			'transform': 'rotate(' + rotation + 'deg)'
		});
		$(ring + ' ' + textClass).each(function () {
			$(this).css('color', color);
		});
	}

	$('#rotate-dial').on('click', function () {
		rotateDial();
	});
});
