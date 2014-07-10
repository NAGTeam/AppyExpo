$(document).ready(function(){
    sendRequest();
});

function sendRequest(){
    request=new XMLHttpRequest({mozSystem:true});
    request.open('GET',url,true);  
    request.send();
    request.onreadystatechange=function(){
        if(request.status == 200 && request.readyState == 4){
            response=request.responseText;
            responseDoc=$.parseXML(response);
            $response=$(responseDoc);
        }  
    };
}