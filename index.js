var events = [];

window.addEventListener('load', function () {
    getEvents();
    updateButtons();
});

function getEvents() {
    var eventsString = getCookie("events");
    if (eventsString.length > 0) {
        events = JSON.parse(eventsString);
    }
}

function saveEvents() {
    setCookie("events", JSON.stringify(events));
}

function updateButtons() {
    var buttons = document.getElementById("buttons")
    buttons.innerHTML = "";

    for (var i = 0; i < events.length; i++) {
        var e = events[i];

        var container = document.createElement("div");
        container.classList = "buttonContainer";

        var button = document.createElement("button");
        button.setAttribute("onclick", "trigger('" + e.event + "')");
        button.className = "icon-switch icon pointer";
        container.appendChild(button);

        var br = document.createElement("br");
        container.appendChild(br);

        var label = document.createElement("span");
        label.innerText = e.name;
        container.appendChild(label);

        var remove = document.createElement("button");
        remove.setAttribute("onclick", "promptRemove('" + e.name + "', '" + e.event + "')");
        remove.className = "icon-bin remove pointer";
        container.appendChild(remove);

        buttons.appendChild(container);
    }
}

function promptEvent() {
    var name = prompt("Name for the button?");
    if (name != null && name.length > 0) {
        var event = prompt("Event trigger id?");
        if (event != null && event.length > 0) {
            addEvent(name, event);
        }
    }
}

function promptRemove(name, event) {
    var remove = confirm("Are you sure you want to remove " + name + "?");

    if (remove) removeEvent(name, event);
}

function addEvent(name, event) {
    events.push({name: name, event: event});
    saveEvents();
    updateButtons();
}

/* Will only remove the first found button */
function removeEvent(name, event) {
    for (var i = 0; i < events.length; i++) {
        var e = events[i];
        if (e.name === name && e.event === event) {
            events.splice(i, 1);
            break;
        }
    }

    saveEvents();
    updateButtons();
}

function trigger(event) {
    var key = getKey();
    if (key.length == 0) {
        alert("You need to set up your IFTTT key first!");
    } else {
        var url = "https://maker.ifttt.com/trigger/" + event + "/with/key/" + getKey();

        var httpRequest = new XMLHttpRequest()
        httpRequest.open('GET', url)
        httpRequest.send()
    }
}

function promptKey() {
    var key = prompt("Please enter your IFTTT webhook key", getKey());

    if (key != null && key.length > 0) {
        setKey(key);
    }
}

function setKey(key) {
    setCookie("key", key);
}

function getKey() {
    return getCookie("key");
}

/* List of icomoon icons */
var icons = ["home", "home2", "home3", "office", "newspaper", "pencil", "pencil2", "quill", "pen", "blog", "eyedropper", "droplet", "paint-format", "image", "images", "camera", "headphones", "music", "play", "film", "video-camera", "dice", "pacman", "spades", "clubs", "diamonds", "bullhorn", "connection", "podcast", "feed", "mic", "book", "books", "library", "file-text", "profile", "file-empty", "files-empty", "file-text2", "file-picture", "file-music", "file-play", "file-video", "file-zip", "copy", "paste", "stack", "folder", "folder-open", "folder-plus", "folder-minus", "folder-download", "folder-upload", "price-tag", "price-tags", "barcode", "qrcode", "ticket", "cart", "coin-dollar", "coin-euro", "coin-pound", "coin-yen", "credit-card", "calculator", "lifebuoy", "phone", "phone-hang-up", "address-book", "envelop", "pushpin", "location", "location2", "compass", "compass2", "map", "map2", "history", "clock", "clock2", "alarm", "bell", "stopwatch", "calendar", "printer", "keyboard", "display", "laptop", "mobile", "mobile2", "tablet", "tv", "drawer", "drawer2", "box-add", "box-remove", "download", "upload", "floppy-disk", "drive", "database", "undo", "redo", "undo2", "redo2", "forward", "reply", "bubble", "bubbles", "bubbles2", "bubble2", "bubbles3", "bubbles4", "user", "users", "user-plus", "user-minus", "user-check", "user-tie", "quotes-left", "quotes-right", "hour-glass", "spinner", "spinner2", "spinner3", "spinner4", "spinner5", "spinner6", "spinner7", "spinner8", "spinner9", "spinner10", "spinner11", "binoculars", "search", "zoom-in", "zoom-out", "enlarge", "shrink", "enlarge2", "shrink2", "key", "key2", "lock", "unlocked", "wrench", "equalizer", "equalizer2", "cog", "cogs", "hammer", "magic-wand", "aid-kit", "bug", "pie-chart", "stats-dots", "stats-bars", "stats-bars2", "trophy", "gift", "glass", "glass2", "mug", "spoon-knife", "leaf", "rocket", "meter", "meter2", "hammer2", "fire", "lab", "magnet", "bin", "bin2", "briefcase", "airplane", "truck", "road", "accessibility", "target", "shield", "power", "switch", "power-cord", "clipboard", "list-numbered", "list", "list2", "tree", "menu", "menu2", "menu3", "menu4", "cloud", "cloud-download", "cloud-upload", "cloud-check", "download2", "upload2", "download3", "upload3", "sphere", "earth", "link", "flag", "attachment", "eye", "eye-plus", "eye-minus", "eye-blocked", "bookmark", "bookmarks", "sun", "contrast", "brightness-contrast", "star-empty", "star-half", "star-full", "heart", "heart-broken", "man", "woman", "man-woman", "happy", "happy2", "smile", "smile2", "tongue", "tongue2", "sad", "sad2", "wink", "wink2", "grin", "grin2", "cool", "cool2", "angry", "angry2", "evil", "evil2", "shocked", "shocked2", "baffled", "baffled2", "confused", "confused2", "neutral", "neutral2", "hipster", "hipster2", "wondering", "wondering2", "sleepy", "sleepy2", "frustrated", "frustrated2", "crying", "crying2", "point-up", "point-right", "point-down", "point-left", "warning", "notification", "question", "plus", "minus", "info", "cancel-circle", "blocked", "cross", "checkmark", "checkmark2", "spell-check", "enter", "exit", "play2", "pause", "stop", "previous", "next", "backward", "forward2", "play3", "pause2", "stop2", "backward2", "forward3", "first", "last", "previous2", "next2", "eject", "volume-high", "volume-medium", "volume-low", "volume-mute", "volume-mute2", "volume-increase", "volume-decrease", "loop", "loop2", "infinite", "shuffle", "arrow-up-left", "arrow-up", "arrow-up-right", "arrow-right", "arrow-down-right", "arrow-down", "arrow-down-left", "arrow-left", "arrow-up-left2", "arrow-up2", "arrow-up-right2", "arrow-right2", "arrow-down-right2", "arrow-down2", "arrow-down-left2", "arrow-left2", "circle-up", "circle-right", "circle-down", "circle-left", "tab", "move-up", "move-down", "sort-alpha-asc", "sort-alpha-desc", "sort-numeric-asc", "sort-numberic-desc", "sort-amount-asc", "sort-amount-desc", "command", "shift", "ctrl", "opt", "checkbox-checked", "checkbox-unchecked", "radio-checked", "radio-checked2", "radio-unchecked", "crop", "make-group", "ungroup", "scissors", "filter", "font", "ligature", "ligature2", "text-height", "text-width", "font-size", "bold", "underline", "italic", "strikethrough", "omega", "sigma", "page-break", "superscript", "subscript", "superscript2", "subscript2", "text-color", "pagebreak", "clear-formatting", "table", "table2", "insert-template", "pilcrow", "ltr", "rtl", "section", "paragraph-left", "paragraph-center", "paragraph-right", "paragraph-justify", "indent-increase", "indent-decrease", "share", "new-tab", "embed", "embed2", "terminal", "share2", "mail", "mail2", "mail3", "mail4", "amazon", "google", "google2", "google3", "google-plus", "google-plus2", "google-plus3", "hangouts", "google-drive", "facebook", "facebook2", "instagram", "whatsapp", "spotify", "telegram", "twitter", "vine", "vk", "renren", "sina-weibo", "rss", "rss2", "youtube", "twitch", "vimeo", "vimeo2", "lanyrd", "flickr", "flickr2", "flickr3", "flickr4", "dribbble", "behance", "behance2", "deviantart", "500px", "steam", "steam2", "dropbox", "onedrive", "github", "npm", "basecamp", "trello", "wordpress", "joomla", "ello", "blogger", "blogger2", "tumblr", "tumblr2", "yahoo", "yahoo2", "tux", "appleinc", "finder", "android", "windows", "windows8", "soundcloud", "soundcloud2", "skype", "reddit", "hackernews", "wikipedia", "linkedin", "linkedin2", "lastfm", "lastfm2", "delicious", "stumbleupon", "stumbleupon2", "stackoverflow", "pinterest", "pinterest2", "xing", "xing2", "flattr", "foursquare", "yelp", "paypal", "chrome", "firefox", "IE", "edge", "safari", "opera", "file-pdf", "file-openoffice", "file-word", "file-excel", "libreoffice", "html-five", "html-five2", "css3", "git", "codepen", "svg", "IcoMoon"];


/* From https://www.w3schools.com/js/js_cookies.asp */

function setCookie(cname, cvalue) {
    setCookie(cname, exdays, 365);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
