/*упращенная версия jquery, знаю, что глупо но так решил*/
$=function(el){
    
    var block=(typeof el === "string")? document.getElementById(el):el;
    block.createElement=function(tagName){
     child=$(document.createElement(tagName));   
        this.appendChild(child);
        return child;
    }
 return block;   
}

function IsJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/*получение слов из фрейма выборв*/
getWordsList = function(){
return ($("wordsframe").contentDocument.getElementsByTagName("pre")[0].innerHTML).split('&');
}
/*функция которая произносит текст*/
function say(text){
   /* jQuery.ajax("http://127.0.0.1:8888/say/", {async:false, data: {q:text}}); //загружает фразу в локальную папку (см. server.js)
new Audio("http://127.0.0.1:8888/say/?q="+text).play();*/
}
// получаем формы слова по начальной (см. server.js)
getWordForms =function(word){
    console.log(word);
  ret=jQuery.ajax("/library/", {async:false, data:
                                            {q:word}
                                           }
  ).responseText;
    
    if (IsJson(ret)){
     var array=JSON.parse(ret);
        for (var a in array){
         array[a]=array[a].toLocaleLowerCase();   // переводим в нижний регистр каждое слова и добовляем после пробел
        }
        return array;   
    }
    else
    {
     return false;   
    }
}
; 
 /****/ 
// не большой файл с настройками интерфейса
$("settings").style.display="block";
$("timeoutInput").value=window.localStorage.timeout||1;
; 
 /****/ 
oldList=[] /*"старый" лист слов, если мы выбираем форму*/, sublib=false /*выбор формы слова*/;

//функция при нажатии кнопки выбрать
choose=function(){
// nowChoose: true выбор в строке. false - выбор строки
if (!nowChoose){
// обнуляем выдыление строки
    trs[nowRow].style.background="#FFF";   
         trs[nowRow].style.color="#000";   
nowChoose   =true; // будем выбирать кнопку в стркое
}
    else { // выбрана кнопка
     nowChoose=false; // опять будем выбирать строку
        nowTr=trs[nowRow]; // выбранная строка занесена в переменную
        nowTr.childNodes[nowButton].style.background="inherit";   
         nowTr.childNodes[nowButton].style.color="inherit";   
        outMessage=words[nowRow][nowButton]; // записали выбранное в переменную
        nowRow=(outMessage==="^")?nowRow:0; // обнулили текущую строку, если выбран знак выхода ^, то не обнуляем а записываем текущую строку
        nowButton=0;//ну и обнуляем выбранную кнопку
            switch(outMessage)
                                   {
                                           case "^":
                                           //ничего не делаем
                                           break;
                                           case "||":// кнопка выхода из словоря форм
                                           loadwords(letters) //грузим старый лист слов
                                               sublib=false;
                                           break;
                                           case "@"://кнопка которая читает написанное
                                           say($("out").innerHTML);
                                           break;
                                           case "#": // удаляет всё
                                        $("out").innerHTML="";
                                           break;
                                           case "<-":       //последний символ
            $("out").innerHTML=$("out").innerHTML.substr(0,$("out").innerHTML.length-1) ;
                                           break;
        case "<=": // последнее слово
                        $("out").innerHTML=$("out").innerHTML.substring(0, $("out").innerHTML.substr(0,$("out").innerHTML.length-1).lastIndexOf(" "))+" ";
                                           break;
                                       default: //выбранно слово
                                           $("out").innerHTML+=outMessage;
                                           words = $("out").innerHTML.split(" ");
                                           
            forms=getWordForms(words[words.length-1]);  //загружаем формы если мы не в под-словаре ()                    
                                           console.log(forms.length);
                                           if (forms.length===0 || outMessage===" ") { // если выбрали форму слова, добавляем слово в аут и произносим
                                               if (forms.length===0){
                                                $("out").innerHTML+=" ";   
                                               }
                                               loadwords("а б в г д е ё ж з и й к л м н о п р с т у ф х ц ч ш щ э ю я".split(' ')); //грузим старый словарь
                                               sublib=false;
                                           }
                                           else{
                                               loadwords(forms);
        sublib=true;
                                           }
                                   break;
                                   }
        
    }
}
; 
 /****/ 
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
; 
 /****/ 
// функция добавления слов в таблицу

loadwords=function(array){

// пашим системные кнопки в массив
array.push(' ');
array.push('@');
    array.push('<-');
    array.push('<=');
    array.push('#');
    array.push('||');
    mainTable=$("mainTable");
//обнуляем
    mainTable.innerHTML="";
trs=[mainTable.createElement('tr')];
words=[[]];
// создает нрвую строку с добавлет знак выхода в нее
    function createUp(){
      td=trs[trs.length-1].createElement('td');
        td.innerHTML="^";
        words[words.length-1][words[words.length-1].length]="^";
    }

    startWidth =mainTable.offsetWidth;
    createUp();
    
    for(word in array){    
          if (trs[trs.length-1].offsetWidth>startWidth||word==array.length-4 /*если последние слово не влезает на строку или уже системные кнопки, то  создаем новую строку*/) {
         trs.push(mainTable.createElement('tr'));
              mainTable.createElement('br');
         
         
         if (words.toString()!==""){
       
             words.push([]);
createUp();
             trs[trs.length-1].appendChild(trs[trs.length-2].lastChild);              // переносим слово с предидущей строки

             words[words.length-1][1]=words[words.length-2].splice(words[words.length-2].length-1,words[words.length-2].length-1)[0]; // изменяем его координаты в массиве words
         }
         
     } 
//создаем новую кнопку
        td=trs[trs.length-1].createElement('td');
        td.innerHTML=array[word];
        words[words.length-1][words[words.length-1].length]=array[word];
        
        

    }

}
loadwords("а б в г д е ё ж з и й к л м н о п р с т у ф х ц ч ш щ э ю я".split(' '));
; 
 /****/ 
//рабочее тело. функция, крирпая вызывается по таймеру и переключает выбор строки или кнопки

nowButton=0,nowRow=-1;
nowChoose=started=false;
startStop = function(){
    started=started?false:true;
    workbody();
}   

workbody = function () {
    
    if (started){
try{clearInterval(timer)} catch(e){} ;
timer =  setInterval(function(){
     if(!nowChoose){     nowRow=(nowRow==trs.length-1)?0:nowRow+1;
                    nowTr=trs[nowRow];
                      prevTr= trs[(nowRow==0)?trs.length-1:nowRow-1]
                   }
     else   {nowButton=(nowButton==trs[nowRow].childElementCount-1)?0:nowButton+1;
             nowTd=nowTr.childNodes[nowButton];
             prevTd = (nowButton==0)?nowTr.lastElementChild:nowTr.childNodes[nowButton-1]; 
            }
                       workbody()}, timeout);
        timeout = $("timeoutInput").value*1000;
        if(!nowChoose){
     
       prevTr.style.background="#FFF";   
         prevTr.style.color="#000";   
         nowTr.style.background="#000";   
         nowTr.style.color="#FFF";  

        }
        else {
         
        
         prevTd.style.background="inherit";   
         prevTd.style.color="inherit";   
         nowTd.style.background="#000";   
         nowTd.style.color="#FFF";
          
        }
        
    }
}