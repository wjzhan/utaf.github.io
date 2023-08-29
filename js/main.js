window.onload = function() {
	handleMarquee();
	redirectFunction();
	startImageTransition();
	callCellNav();
	menuCollapse();
	randomTableCellColor("#wrapper>#container>.content>aside>.utpanel>.content>table tr td");
	clickShare();
}

function handleMarquee() {
	const marquee = document.querySelectorAll('.marquee');
	let speed = 1;
	let lastScrollPos = 0;
	let timer;
	marquee.forEach(function(el) {
		const container = el.querySelector('.inner');
		const content = el.querySelector('.inner > *');
		//Get total width
		const elWidth = content.offsetWidth;
		//Duplicate content
		let clone = content.cloneNode(true);
		container.appendChild(clone);
		let progress = 1;

		function loop() {
			progress = progress - speed;
			if (progress <= elWidth * -1) {
				progress = 0;
			}
			container.style.transform = 'translateX(' + progress + 'px)';
			container.style.transform += 'skewX(' + speed * 0.4 + 'deg)';
			window.requestAnimationFrame(loop);
		}
		loop();
	});
	window.addEventListener('scroll', function() {
		const maxScrollValue = 12;
		const newScrollPos = window.scrollY;
		let scrollValue = newScrollPos - lastScrollPos;
		if (scrollValue > maxScrollValue) scrollValue = maxScrollValue;
		else if (scrollValue < -maxScrollValue) scrollValue = -maxScrollValue;
		speed = scrollValue;
		clearTimeout(timer);
		timer = setTimeout(handleSpeedClear, 10);
	});

	function handleSpeedClear() {
		speed = 1;
	}
};

// rolling pictures fade in fade out
function startImageTransition() {
	var pic = document.getElementById("rollingpics");
	var n = 1;
	var MAXPIC = 4;
	var CLOCK = 10000;
	setInterval(function() {
		fadeIn(pic);
		n++;
		if (n > MAXPIC) n = 1;
		pic.innerHTML = "<img src='upload/pics/roll" + n + ".jpg' />";
	}, CLOCK);

}

function fadeIn(el) {
	el.style.opacity = 0;
	var tick = function() {
		el.style.opacity = +el.style.opacity + 0.004;
		if (+el.style.opacity < 1) {
			(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 5000)
		}
	};
	tick();
}

// click and share on media
function clickShare() {
	var imgs = document.querySelectorAll("#wrapper>#container>.content>aside>.share>img");
	for (var i = 0; i < imgs.length; i++) {
		imgs[i].addEventListener("click", function() {
			appShare(this.alt);
		}, false);
	}
}

function appShare(d) {
	// https://gist.github.com/chrisjlee/5196139
	var url = window.location.href;
	var options = 'toolbar=0,status=0,resizable=1,width=626,height=436';
	var title = 'UTAF%20Fellowship';
	if (d == "facebook") {
		url = 'http://www.facebook.com/sharer.php?u=' + url;
	}
	if (d == "weibo") {
		url = 'http://service.weibo.com/share/share.php?appkey=&title=' + title + '&url=' + url +
			'&searchPic=false&style=simple';
	}
	if (d == "twitter") {
		url = 'https://twitter.com/intent/tweet?text=' + title + '&url=' + url;
	}
	if (d == "telegram") {
		url = 'https://telegram.me/share/url?text=' + title + '&url=' + url;
	}
	window.open(url, 'sharer', options);
}

function callCellNav() {
	var cellicon = document.getElementById("cellnavicon");
	cellicon.addEventListener("click", function() {
		navwrapper = document.getElementById("cellnavwrapper");
		navwrapper.classList.remove("nodisplay");
		navwrapper.classList.add("blockdisplay");
	}, false);
}

function menuCollapse() {
	var gohome = document.getElementById("menu-collapse");
	gohome.addEventListener("click", function() {
		navwrapper = document.getElementById("cellnavwrapper");
		navwrapper.classList.remove("blockdisplay");
		navwrapper.classList.add("nodisplay");
	}, false);
}

// cloTimeRanges
function randomTableCellColor(s) {
	var cells = document.querySelectorAll(s);
	for (var i = 0; i < cells.length; i++) {
		r = Math.random() * (260 - 147) + 147;
		cells[i].setAttribute("style", "background-color:hsla(" + r + ",50%,50%,0.9)");
	}
}

function randomTableCellGrey(s) {
	var cells = document.querySelectorAll(s);
	for (var i = 0; i < cells.length; i++) {
		r = Math.random() * 0.7 + 0.2;
		cells[i].setAttribute("style", "background-color:rgba(0,0,0," + r + ")");
	}
}

// redirect to new website
function redirectFunction() {
	var url = "https://www.gotquestions.org/Chinese/";
	document.getElementById("redirectBtn1").addEventListener("click", function() {
		window.open(url, "_blank");
	});
	document.getElementById("redirectBtn2").addEventListener("click", function() {
		window.open(url, "_blank");
	});
}

// load more articles with More button
function clickMore() {
	var btnmore = document.querySelector("#wrapper>#container>.content>section>.pager>button");
	var myArticle = document.querySelector("#wrapper>#container>.content>section>.articles");
	// console.log(btnmore.innerHTML);
	if (btnmore.innerHTML == '更多') {
		loadArticles(myArticle);
		btnmore.innerHTML = '我也是有底线的';
	} else {
		btnmore.addEventListener("click", window.location.reload());
	}
}

function loadArticles(myArticle) {
	var timestr = '<article class="utarticle">\
							<header>\
								<div class="st">\
									<span>聚会流程</span>\
									<div></div>\
								</div>\
								<h3></h3>\
							</header>\
							<section>\
								<div class="schedule">\
									<table>\
										<tr><td colspan="2"><b>每周五晚6:30PM-9:00PM</b></td></tr>\
										<tr><td>6:30PM-7:10PM</td><td>免费晚餐</td></tr>\
										<tr><td>7:10PM-7:30PM</td><td>诗歌赞美</td></tr>\
										<tr><td>7:30PM-7:50PM</td><td>团契报告</td></tr>\
										<tr><td>7:50PM-9:00PM</td><td>小组查经</td></tr>\
									</table>\
								</div>\
							</section>\
							<footer></footer>\
						</article>';
	var livestream = '<article class="utarticle">\
								<header>\
									<div class="st">\
										<span>主日直播</span>\
										<div></div>\
									</div>\
									<h3></h3>\
								</header>\
								<section class="videoWrapper">\
									<iframe\
									  id="indexvideo" \
									  src="https://www.youtube.com/embed?max-results=1&controls=0&showinfo=0&rel=0&listType=user_uploads&list=AustinChineseChurch"\
									  frameborder="0"\
									  allowfullscreen\
									></iframe>\
								</section>\
								<footer></footer>\
							</article>';
	myArticle.insertAdjacentHTML("afterend", livestream);
	myArticle.insertAdjacentHTML("afterend", timestr);
	randomTableCellColor(".utarticle table tr td");
}
