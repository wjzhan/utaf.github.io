window.onload = function() {
	redirectFunction();
	startImageTransition();
	randomTableCellColor("#wrapper>#container>.content>aside>.utpanel>.content>table tr td");
	clickShare();
}

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
		window.location.href = url;
	});
	document.getElementById("redirectBtn2").addEventListener("click", function() {
		window.location.href = url;
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
									 id="indexvideo" src="https://www.youtube.com/embed/NkyMKlnTK9c">\
									</iframe>\
								</section>\
								<footer></footer>\
							</article>';
	myArticle.insertAdjacentHTML("afterend", livestream);
	myArticle.insertAdjacentHTML("afterend", timestr);
	randomTableCellColor(".utarticle table tr td");
}
