var list, url;

$(document).ready(function(){
    url='http://www.expo2015.org/en/rss.xml';
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

    $('#btn_about').click(function() {
		$('#about').attr('class', 'current');
        $('#home_screen').hide();
		//$('[data-position="current"]').attr('class', 'left');
	});

    $('#btn_settings').click(function() {
		$('#settings').attr('class', 'current');
        $('#home_screen').hide();
		//$('[data-position="current"]').attr('class', 'right');
	});

    $('#btn_home').click(function() {
        $('#home_screen').show();
		//$('[data-position="current"]').attr('class', 'current');
		$('[data-position="right"]').attr('class', 'right');
		$('[data-position="left"]').attr('class', 'left');
	});

    $(document).on('click', '#reload', function () {
        $('#res_list').empty();
        utils.status.show('Reloading news...');
        //alert('Reloading news...');
        sendRequest();
    });

    $(document).on('click', '#cng_en', function () {
        $('#res_list').empty();
        utils.status.show('News are now displayed in English');
        //alert('News are now displayed in English');
        url='http://www.expo2015.org/en/rss.xml';
        sendRequest();
    });

    $(document).on('click', '#cng_it', function () {
        $('#res_list').empty();
        utils.status.show('News are now displayed in Italian');
        //alert('News are now displayed in Italian');
        url='http://www.expo2015.org/it/rss.xml';
        sendRequest();
    });

    $(document).on('click', '#cng_fr', function () {
        $('#res_list').empty();
        utils.status.show('News are now displayed in French');
        //alert('News are now displayed in French');
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

                var listItem = '<li><a href=# class="news" id="'+link+'"><header>'+title+'</header><p class="description_date">'+description+date+'</p></a></li>';
                list = list + listItem;
            })
            $('#res_list').append(list);
        }
    };
    request.send();
}
