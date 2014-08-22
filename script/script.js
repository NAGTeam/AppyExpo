var list, url;

$(document).ready(function(){
    url='http://www.expo2015.org/en/rss.xml';
    console.log(url);
    sendRequest();

    $(document).on('click',".news", function(){
		var link = this.getAttribute("id");
		new MozActivity({
			name: "view",
			data: {
				type: "url",
				url: link
			}
		});
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
        goToCard(1);
    });

    $(document).on('click','#btn_settings', function() {
        goToCard(2);
    });

    $(document).on('click','#btn_home', function() {
        goToCard(0);
    });

   $(document).on('click', '#reload', function () {
       $('#res_list').empty();
       utils.status.show('Reloading news...');
       sendRequest();
       console.log(url);
    });

   $(document).on('click', '#cng_en', function () {
       $('#res_list').empty();
       utils.status.show('News displayed in English');
       url='http://www.expo2015.org/en/rss.xml';
       sendRequest();
       console.log(url);
    });

   $(document).on('click', '#cng_it', function () {
       $('#res_list').empty();
       utils.status.show('News displayed in Italian');
       url='http://www.expo2015.org/it/rss.xml';
       sendRequest();
       console.log(url);
    });

   $(document).on('click', '#cng_fr', function () {
       $('#res_list').empty();
       utils.status.show('News displayed in French');
       url='http://www.expo2015.org/fr/rss.xml';
       sendRequest();
       console.log(url);
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

                var listItem = '<li><a href=# class="news" id="'+link+'"><header>'+title+'</header><p class="description_date">'+description+date+'</p></a></li>';
                list = list + listItem;
            })
            $('#res_list').append(list);
        }
    };
    request.send();
}

function goToCard(cardNum){
	document.querySelector('x-deck').showCard(cardNum);
}
