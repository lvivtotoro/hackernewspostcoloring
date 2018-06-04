var posts = document.querySelectorAll("td.ind");

chrome.storage.sync.get({
	colors: [
		"#e6194b",
		"#3cb44b",
		"#ffe119",
		"#0082c8",
		"#f58231",
		"#911eb4",
		"#46f0f0"
	],
	linewidth: 3
}, function(items) {
	var colors = items.colors;
	var width = items.linewidth;

	var frame = 0, endFrame = 30, fps = 60;

	var func = function() {
		for (var i = posts.length - 1; i >= 0; --i) {
			var colorI = posts[i].children[0].getAttribute("width") / 40;
			posts[i].style.boxShadow = "inset -" + (frame / (endFrame / width)) + "px 0 0 0 " + colors[colorI % colors.length];
		}

		if(frame++ < endFrame) setTimeout(function() {requestAnimationFrame(func);}, 1000 / fps);
	};
	func();
});
