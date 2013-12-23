$(document).ready( function() {
	var iFrameID = $('#idIFrame');
	iFrameID.height = "";
	iFrameID.height = iFrameID.contentWindow.document.body.scrollHeight + "px"; 
})
