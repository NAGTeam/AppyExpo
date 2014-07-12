var list;

$(document).ready(function(){
    list = document.getElementById('res_list');
    sendRequest();
});

function sendRequest(){
    url='http://www.expo2015.org/en/rss.xml';
    request=new XMLHttpRequest({mozSystem:true});
    request.open('GET',url,true);

    request.timeout=5750;
	request.addEventListener('timeout', function() {
		alert('No connection');
	});

    request.onreadystatechange=function(){
        if(request.status === 200 && request.readyState === 4){
            list.innerHTML='';
            var items = request.responseXML.querySelectorAll('item');
            items = Array.prototype.slice.call(items,0);
            items.forEach(function(item) {
                var title = item.getElementsByTagName('title')[0].textContent;
                var description = item.getElementsByTagName('description')[0].textContent;
                var link = item.getElementsByTagName('link')[0].textContent;
                var date = item.getElementsByTagName('pubDate')[0].textContent;

                var listItem = '<li><a href="'+link+'"><p class="title">'+title+'</p><p class="description">'+description+'</p><p class="date">'+date+'</p>';
                list.innerHTML = list.innerHTML + listItem;
            })
        }
    };
    request.send();
}
