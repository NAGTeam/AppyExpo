var expo2015 = {};

expo2015.feeds = [];

expo2015.feedUrl = 'http://www.expo2015.org/en/rss.xml';

expo2015.start = expo2015.fillFeeds = function() {
  "use strict";
  // See the terrific answer to "How to parse a RSS feed using javascript"
  // on stackoverflow.com
  $.ajax({
	url : "http://ajax.googleapis.com/ajax/services/feed/load" +
		"?v=1.0&num=10&callback=?&q=" + encodeURIComponent(expo2015.feedUrl),
	dataType : "json",
	success : function (data) {
	  if (data.responseData.feed && data.responseData.feed.entries) {
		$.each(data.responseData.feed.entries, function (i, e) {
		 expo2015.feeds.push(e);
		});
		expo2015.updatePage();
	  }
	}
  });
};

expo2015.updatePage = function() {
	var mustached_html = Mustache.to_html(expo2015.templates.giantWrap, expo2015.feeds);
	document.querySelector('#giantWrap').innerHTML = mustached_html;
};


