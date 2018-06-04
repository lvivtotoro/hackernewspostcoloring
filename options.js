var tbody = document.getElementById("colortable").tBodies[0];
			
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
	for(color in items.colors) {
		addColor(items.colors[color]);
	}
	recalculateIndices();
	
	document.getElementById("linewidth").value = items.linewidth;
});

document.getElementById("newcolor").onclick = function() {addColor("#000000"); recalculateIndices();}
function addColor(colorval) {
	var row = tbody.insertRow(tbody.rows.length);
	row.insertCell(0);
	
	var input = document.createElement("input");
	input.setAttribute("type", "color");
	input.value = colorval;
	row.insertCell(1).appendChild(input);
	
	var removeBtn = document.createElement("button");
	removeBtn.innerText = "-";
	removeBtn.onclick = function() {
		tbody.deleteRow(row.rowIndex);
		recalculateIndices();
	};
	row.insertCell(2).appendChild(removeBtn);
}

function recalculateIndices() {
	for(var i = 0; i < tbody.rows.length; i++) {
		tbody.rows[i].cells[0].innerText = i + 1;
	}
}

//

document.getElementById("save").onclick = function() {
	var setcolors = [];
	for(var i = 0; i < tbody.rows.length; i++) {
		var row = tbody.rows[i];
		setcolors.push(row.cells[1].children[0].value);
	}
	
	chrome.storage.sync.set({
		colors: setcolors,
		linewidth: document.getElementById("linewidth").value
	});
};
