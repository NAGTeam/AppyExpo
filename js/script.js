var list, url;

$(document).ready(function(){
    url='http://www.expo2015.org/en/rss.xml';
    sendRequest();

    $(document).on('click',".news", function(){
		document.querySelector('#article-page').className = 'current';
		document.querySelector('[data-position="current"]').className = 'left';
		fetchArticle(this.id);
	});

    $(document).on('click',"#git_project", function(){
		new MozActivity({
			name: "view",
			data: {
				type: "url",
				url: "http://github.com/NAGTeam/AppyExpo"
			}
		});
	});

    $(document).on('click',"#aro94", function(){
		new MozActivity({
			name: "view",
			data: {
				type: "url",
				url: "http://twitter.com/aro94"
			}
		});
	});

    $(document).on('click',"#nicokant", function(){
		new MozActivity({
			name: "view",
			data: {
				type: "url",
				url: "http://twitter.com/nicokant"
			}
		});
	});

    $(document).on('click',"#giuscri", function(){
		new MozActivity({
			name: "view",
			data: {
				type: "url",
				url: "http://twitter.com/giuscri"
			}
		});
	});

	$(document).on('click','#btn_about', function() {
        $('#about').show();
        $('#home').hide();
        $('#settings').hide();    
    });

	$(document).on('click','#btn_close_about', function() {
        $('#home').show();
        $('#about').hide();  
    });
    
    $(document).on('click','#btn_settings', function() {
        $('#settings').show();
        $('#home').hide();
        $('#about').hide();
    });
    
    $(document).on('click','#btn_close_settings', function() {
        $('#home').show();
        $('#settings').hide();  
    });

    $(document).on('click','#btn_home', function() {
		$("[data-position='current']").attr('class', 'current');
		$("[data-position='right']").attr('class', 'right');
		$('#res_article').empty();
		$('#title').empty();
		$('#url').empty();
    });

   $(document).on('click', '#reload', function () {
       $('#res_list').empty();
       utils.status.show('Reloading news...');
       sendRequest();
    });

   $(document).on('click', '#cng_en', function () {
       $('#res_list').empty();
       utils.status.show('News displayed in English');
       url='http://www.expo2015.org/en/rss.xml';
       sendRequest();
    });

   $(document).on('click', '#cng_it', function () {
       $('#res_list').empty();
       utils.status.show('News displayed in Italian');
       url='http://www.expo2015.org/it/rss.xml';
       sendRequest();
    });

   $(document).on('click', '#cng_fr', function () {
       $('#res_list').empty();
       utils.status.show('News displayed in French');
       url='http://www.expo2015.org/fr/rss.xml';
       sendRequest();
    });
});

function sendRequest(){
    request=new XMLHttpRequest({mozSystem:true});
    request.open('GET',url,true);

    request.timeout=5750;
	request.addEventListener('timeout', function() {
		alert('No connection');
	});

    request.onreadystatechange=function(){
        if(request.status === 200 && request.readyState === 4){
            list='';
            var items = request.responseXML.querySelectorAll('item');
            items = Array.prototype.slice.call(items,0);
            items.forEach(function(item) {
                var title = item.getElementsByTagName('title')[0].textContent;
                var description = item.getElementsByTagName('description')[0].textContent;
                var link = item.getElementsByTagName('link')[0].textContent;
                var date = item.getElementsByTagName('pubDate')[0].textContent;
                var listItem = '<li><a href="#" class="news" id="'+link+'"><p>'+title+'</p><p>'+date+'</p></a></li>';
                list = list + listItem;
            })
            $('#res_list').append(list);
        }
    };
    request.send();
}

function fetchArticle(url) {
	$('#url').append(url);
	xhr = new XMLHttpRequest({mozSystem: true});
	xhr.open("GET", url, true);
	xhr.timeout = 5750;
	xhr.addEventListener('timeout', function() {
		alert("No connection");
	});	
	
	/* Avoid browser caching */
	xhr.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2005 00:00:00 GMT");
	
	xhr.onreadystatechange = function(){
        if(xhr.status === 200 && xhr.readyState === 4){
        	console.log($(xhr.response));
        	title = $(xhr.response)[3].text;
        	if(url.match(/org\/(.*)\//)[0] == "org/cs/Expo/en/") {
        		if ($(xhr.response)[143].className == "expoInside box-type-1")
        			text = $(xhr.response)[143].childNodes[1].childNodes[1].firstElementChild.innerHTML;
        		else
        			text = $(xhr.response)[149].childNodes[1].childNodes[1].firstElementChild.innerHTML;
        	} else if(url.match(/org\/(.*)\//)[0] == "org/cs/Expo/it/")
        		if($(xhr.response)[139].className == "expoInside box-type-1")
        			text = $(xhr.response)[139].childNodes[1].childNodes[1].firstElementChild.innerHTML;
        		else
        			text = $(xhr.response)[143].childNodes[1].childNodes[1].firstElementChild.innerHTML;
        	else {
        		if($(xhr.response)[149].className == "expoInside box-type-1")
        			text = $(xhr.response)[149].childNodes[1].childNodes[1].firstElementChild.innerHTML; 
        		else
        			text = $(xhr.response)[143].childNodes[1].childNodes[1].firstElementChild.innerHTML;
        	}
        	$('#title').append(title);    	
			$('#res_article').append(text);
		}
	};
	xhr.send();
}
