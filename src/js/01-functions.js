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
