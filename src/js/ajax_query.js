(function() {
	"use strict";
	// See the terrific answer to "How to parse a RSS feed using javascript"
	// on stackoverflow.com
	var FEED_URL = "http://www.expo2015.org/en/rss.xml";
	$.ajax({
	  url : "http://ajax.googleapis.com/ajax/services/feed/load" +
		  "?v=1.0&num=10&callback=?&q=" + encodeURIComponent(FEED_URL),
	  dataType : "json",
	  success : function (data) {
		if (data.responseData.feed && data.responseData.feed.entries) {
		  $.each(data.responseData.feed.entries, function (i, e) {
			var tmp_str = "<li><a href=\"" + e.link + "\">";
			tmp_str += e.title + "</a></li>";
			$(".giant_wrap ul").append(tmp_str);
		  });
		}
	  }
	});
})();
