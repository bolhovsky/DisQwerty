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
