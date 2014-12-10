//вешаем евенты

//на кнопку настроек
$("settingsButton").onclick=function (){
 $("settings").style.display = ($("settings").style.display==="none")?"block":"none";
}
// на кнопку запуска и остановки
$("startStopButton").onclick=function(){
window.localStorage.timeout=$("timeoutInput").value;
    timeout=window.localStorage.timeout*1000;
    startStop();   
}

// на кнопку выбора 
$("selectButton").onclick=function(){
 choose();   
}
