function displayToast(msg,  bgcolor) {

    if (msg) {
        var x = document.getElementById("notify");
        if (bgcolor !== null) {
            x.style.backgroundColor = bgcolor;
        }

        if (x.className === "show") {
            x.innerHTML += "<br>" + decodeURIComponent(msg).split('+').join(' ');
        }
        else {
            x.className = "show";
            x.innerHTML = decodeURIComponent(msg).split('+').join(' ');
            notifyTimeout = setTimeout(function() {
                x.className = x.className.replace("show", "");
                notifyTimeout = null;
            }, 5000);
        }
    }
}