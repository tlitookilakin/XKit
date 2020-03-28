//* TITLE Video Downloader **//
//* VERSION 1.0.0 **//
//* DESCRIPTION	adds a download button to the video player **//
//* DETAILS Adds a simple download button to all videos using the fancy player. Does not support 3rd-party players or the native player. **//
//* DEVELOPER tlitookilakin **//
//* FRAME false **//
//* BETA false **//

XKit.extensions.video_downloader = new Object({

	running: false,

	run: function() {
		this.running = true;
		if(XKit.interface.where().dashboard){
			XKit.tools.init_css("video_downloader");
			XKit.extensions.video_downloader.addButtons();
			XKit.post_listener.add("video_downloader",XKit.extensions.video_downloader.addButtons);
		} else {
			return;
		}
	},

	destroy: function() {
		XKit.post_listener.remove("video_downloader");
		this.running = false;
	},
	
	makeButton: function(url) {
		var el = document.createElement("a");
		var fname = url.split("/").pop();
		el.classList.add("xvd-button");
		el.setAttribute("href",url);
		el.setAttribute("target","_blank");
		el.setAttribute("download",fname);
		el.appendChild(document.createTextNode("Download this video"));
		return el;
	},
	
	addButtons: function() {
		setTimeout(function(){
			var vids = document.querySelectorAll(".crt-video:not(.xvd-processed)");
			var v;
			for(v of vids){
				v.classList.add("xvd-processed");
				var sauce = v.getElementsByTagName("source");
				if(sauce.length>0){
					v.appendChild(XKit.extensions.video_downloader.makeButton(sauce[0].getAttribute("src")));
				}
			}
		},500);
	}
});