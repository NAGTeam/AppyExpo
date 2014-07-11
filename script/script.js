$(document).ready(function(){
    sendRequest();
});

function sendRequest(){
    url='http://www.italianvenue.com/expo-2015/news-expo/1/10';
    request=new XMLHttpRequest({mozSystem:true});
    request.open('GET',url,true);  
    request.send();
    request.onreadystatechange=function(){
        if(request.status == 200 && request.readyState == 4){
            response=request.responseText;
            console.log(response);
            responseDoc=$.parseXML(response);
            $response=$(responseDoc);
        }  
    };
}