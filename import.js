var beta = 0, gamma = 0, range = 70, interval = 50;

	window.onclick = function() {
		$.ajax({
			type : 'PUT',
			url : 'http://' + window.location.hostname + ':' + window.location.port + '/click'
		});
	}

	function installHandler() {
		if (window.DeviceOrientationEvent) {
			window.addEventListener('deviceorientation', function(e) {
				if (navigator.userAgent.indexOf("Firefox") != -1) {
					beta = e.beta;
					gamma = e.gamma;
				}
				else {
					beta = -e.beta;
					gamma = -e.gamma;
				}
				$('#info').text(beta + '° ' + gamma + '°');
			}, false);
		} else if (window.OrientationEvent) {
			window.addEventListener('MozOrientation', function(e) {
				beta = e.x * 90;
				gamma = e.y * -90;
				$('#info').text(beta + '° ' + gamma + '°');
			}, false);
		} else {
			$('#info').text('Orientation is not supported! :(');
			block = true;
			return;
		}

		window.setInterval(function() {
			beta = Math.abs(beta) < 3 ? 0 : parseInt(Math.round(beta));
			gamma = Math.abs(gamma) < 3 ? 0 : parseInt(Math.round(gamma));

			if (beta == 0 && gamma == 0)
			return;

			$.ajax({
				type : 'PUT',
				url : 'http://' + window.location.hostname + ':' + window.location.port + '/move?x=' + map(-gamma) + '&y=' + map(-beta)
			});
		}, interval);
	}
	
	function map(angle) {
		var value = parseInt((angle + 90) * (2 * range) / 180 - range);
		return value >= 0 ? '+' + value : value;
	}
