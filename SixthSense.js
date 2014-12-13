$(document).ready(function() {

	var disableIt,
		hasBorders,
		port;


	function setPort(callback) {
	    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
	        port = chrome.tabs.connect(tabs[0].id, {name: "knockknock"});
	        callback(port);
	    });
	}

	function rtSetPort(callback) {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
	        port = chrome.tabs.connect(tabs[0].id, {name: "knockknock"});
	        callback(port);
	    });
	}


	function restore_options() {

		chrome.storage.local.get([
			'disableCSS',
			'hasBorders'

		], function(items) {

			$('.css-control #disableCSS').prop('checked', items.disableCSS);
			$('.boarder-control #addBoarders').prop('checked', items.hasBorders);
		});

	}
	restore_options();



	setPort(function(port) {

		if(port) {

			port.onMessage.addListener(function(msg) {
				if(msg.loadDataReq) {

					chrome.storage.local.get([
						'disableCSS',

					], function(items) {
						
						port.postMessage({stylechange: "disableCSS", disableIt: items.disableCSS});

					});

				}

			});
			
		} else {
			console.log('No Port Was Set!');
		}

	});

	

	$('.font-size-control #incFontSize').on('click', function(e) {

		setPort(function(port) {
			
			if(port) {

				port.postMessage({stylechange: "fontsize", fontsize: "increase"});

			} else {
				console.log('No Port Was Set!');
			}

		});
		

	});

	$('.font-size-control #decFontSize').on('click', function(e) {

		setPort(function(port) {
			
			if(port) {

				port.postMessage({stylechange: "fontsize", fontsize: "decrease"});

			} else {
				console.log('No Port Was Set!');
			}

		});
		

	});

	$('.css-control #disableCSS').on('click', function(e) {

		disableIt = e.currentTarget.checked;

		disableIt = disableIt ? true : false;

		setPort(function(port) {

			if(port) {

				port.postMessage({stylechange: "disableCSS", disableIt: disableIt});

				chrome.storage.local.set({disableCSS: disableIt});

			} else {
				console.log('No Port Was Set!');
			}

		});


	});


	$('.border-control #addBorders').on('click', function(e) {

		hasBorders = e.currentTarget.checked;

		hasBorders = hasBorders ? true : false;

		setPort(function(port) {

			if(port) {

				port.postMessage({stylechange: "addBorders", hasBorders: hasBorders});

				chrome.storage.local.set({hasBorders: hasBorders});

			} else {
				console.log('No Port Was Set!');
			}

		});

	});


	$('label.controller').on('mouseenter', function(e) {

		var checkbox = e.target.htmlFor;
		if($('#' + checkbox).prop('checked')) {
			$(e.target).css('background-image', 'url("cross.png")');
		} else {
			$(e.target).css('background-image', 'url("check.png")');
		}
		
	});

	$('label.controller').on('mouseenter', function(e) {

		var checkbox = e.target.htmlFor;
		if($('#' + checkbox).prop('checked')) {
			$(e.target).css('background-image', 'url("cross.png")');
		} else {
			$(e.target).css('background-image', 'url("check.png")');
		}
		
	}).mouseleave(function(e) {

		var checkbox = e.target.htmlFor;
		if($('#' + checkbox).prop('checked')) {
			$(e.target).css('background-image', 'url("check.png")');
		} else {
			$(e.target).css('background-image', 'url("cross.png")');
		}

	});



});
