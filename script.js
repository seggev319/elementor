let DEBUG = false;

function debugLog(...args) {
	if(DEBUG) {
		console.log(...args)
	}
}

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function showPopup() {
	debugLog("Showing popup...")
	document.querySelector("#overlay,.overlay").style.display = "block";
	document.querySelector(".popup-dialog").classList.add("show");
	getPopupContent();
}

function hidePopup() {
	debugLog("Hiding popup...")
	document.querySelector("#overlay,.overlay").style.display = "none";
	document.querySelector(".popup-dialog").classList.remove("show");
}

docReady(() => {
    document.getElementById("popup-button").onclick = showPopup;
    document.querySelector('.popup-dialog [data-dismiss="popup"]').onclick = hidePopup;
});

function getPopupContent() {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.responseText);
			if(response.success){
	            document.getElementById("popup-body").innerHTML = response.content;
	        } else{
	            alert('Error: '+ response.error);
	        }
		}
	};
	xmlhttp.open("POST", "getpopup.php", true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.send("action=getPopupContent");
}