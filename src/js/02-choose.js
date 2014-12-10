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
