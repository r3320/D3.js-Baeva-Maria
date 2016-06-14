$(document).ready(function(){
        //Скрыть PopUp при загрузке страницы    
            PopUpHide();
        $("#next").hide();
        $("#diff").hide();
    });
    //Функция отображения PopUp
    function PopUpShow(){
        $("#popup1").show();
    }

    function DiffShow(){
        $("#sample-frame").hide();
        $("#diff").show();
    }

    function SampleShow(){
        $("#diff").hide();
        $("#sample-frame").show();
    }
    //Функция скрытия PopUp
    function PopUpHide(){
        $("#popup1").hide();
    }
