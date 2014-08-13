var parameters = {
    //currentCirc:0,
    hour:0,// val input - сколько собираем
    speed:8000, //скорость анимации прогресс бара
    //eatClickNumber: 0,
    SetShrooms:[],//грибы
    basket:{allMush:0,
            mushrooms:[[],[],[],[],[],[],[],[],[],[]]  
    },
    /*myShrooms:[
        {
            Галерина_моховая: {
                open:false,
                count:0
            },
            Белый_гриб_обыкновенный: {
                open:false,
                count:0
            },
            Маслёнок_желтый: {
                open:false,
                count:0
            },
            Колокольный_засранец: {
                open:false,
                count:0}
        },
        {}
    ],*/
    interface: {
        buttons:{
            lookButton: $("#butLook"),
            gatherButton: $("#butGather"),
            eat_hireButton: $("#eat_hire"),
            lureButton: $("#butLure"),
            hireButton: $("#butHire"),
            eatButton: $("#butEat")
        },
        forms:{
            inventar:$('#inventar'),
            hourGather:$('#hours'),
            progressbar: $("#progress"),
            cards:$('#findcard'),
            minicards:$('#slotcards')
        },
        icons:{
            basket:$('#basket'),
            cards:$('#cards'),
            staff:$('#staff'),
            map:$('#map'),
        },
        textForm: $('#text'),
        texts:[$('#text1'),$('#text2'),$('#text3'),$('#text4'),$('#text5'),$('#text6'),$('#text7'),$('#text8'),$('#text9'),$('#text10')]
    },
    circalParametrs:[
        {   
            MaxShroom:2,
            MinShroom:2,
            PayForLureSquirrel:2,
            PayForSquirrel:1,
            MushFromSquirrel:0
        },
        {   MaxShroom:79,
            MinShroom:2,
            MaxShroom:5,
            PayForSquirrel:10
        }
    ],
    circalCreater:[
        {   
            Squirrel:0
        },
        {   
            Squirrel:0
        },
    ],

    events:{
        eventGather:false,
        eventTry:false,
    }
}
/*______________________________________________________Настройки параметров___________________________________________________________*/
var getCircalShrooms = function(circal) {
    $.ajax({
        url:'/circal/'+circal, 
        method: 'get',
        dataType: 'json',
        success: function(data) {
            parameters.SetShrooms[circal] = data.shrooms;
            console.log(parameters.SetShrooms)
        }
    });
}
var getSetMiniSroom = function(){
     $.ajax({
            url: '/setCard',
            dataType: 'html',
            success: function(data) {
                parameters.interface.forms.minicards.append(data);
                //BigCard();
            }
        });
}
var basketLength = function(){
    var array = parameters.basket.mushrooms
    parameters.basket.allMush = array[0].concat(array[1],array[2],array[3],array[4],array[5],array[6],array[7],array[8],array[9])
    var length = parameters.basket.allMush.length
    $('#howmany').text(''+length+'');
    return length;
}
var mushroomsForClick = function(circMax,circMin){
        var mush = Math.floor(Math.random()*(circMax-circMin)+circMin);
        console.log(mush)
        return mush
    }
var rand = function(){
    a = Math.random();
    return a;
}
/*_______________________________________________________Игровые события____________________________________________________________*/
var firstClick = function(){//клик осмотреться
    var circ = 0;
    //currentCirc = circ;
    parameters.interface.buttons.lookButton.one("click", function(){
        parameters.interface.buttons.lookButton.hide();
        parameters.interface.buttons.gatherButton.show();
        parameters.interface.texts[0].hide();
        parameters.interface.texts[1].show();
        parameters.interface.forms.hourGather.show();
        parameters.interface.forms.inventar.show();

        basketLength();
        Gather(circ);
        getCircalShrooms(circ);
        getSetMiniSroom(); 
    });
}
//сделать самовызывающейся

var Gather =  function(circ){//клик собирать
        parameters.interface.buttons.gatherButton.on("click", function(){   
            parameters.hour = $("#hours").val(); 
            showGather.ProgressEvents(circ);     
        })
        .one("click", function(){
            parameters.events.eventGather = true;
        });
    }

var showGather = {// визуальное отображение сбора грибов 
    ProgressEvents: function(circ){
        parameters.interface.buttons.gatherButton.hide();
        parameters.interface.forms.progressbar.show();

        parameters.interface.forms.progressbar.animate({width: "200px"},parameters.speed*parameters.hour,'linear',function(){              
        showGather.ResetmainButton(circ);
        });
    },
    ResetmainButton: function(circ){
        parameters.interface.buttons.gatherButton.show();
        parameters.interface.forms.progressbar.hide();
        parameters.interface.forms.progressbar.removeAttr('style');

        FillBasket(circ,'gamer');
        if (parameters.events.eventGather === true) TryMush_LureSquirrel(circ);
    }
}
var FillBasket = function(circ,subject){
    if (subject=='gamer'){
        var Shroom = mushroomsForClick(parameters.circalParametrs[circ].MaxShroom,parameters.circalParametrs[circ].MinShroom)*parameters.hour;
        var count = Shroom}
    if (subject=='squirrel'){
        var count = parameters.circalParametrs[0].MushFromSquirrel}
    switch (circ){
        case 0: 
            for(i=0;i<count;i++){
                var a = rand();
                switch (true){
                    case a < 0.5: parameters.basket.mushrooms[0].push(parameters.SetShrooms[circ][0])
                    parameters.SetShrooms[circ][0].count++;
                    break
                    case a >= 0.5 && a< 0.6: parameters.basket.mushrooms[0].push(parameters.SetShrooms[circ][1])
                    parameters.SetShrooms[circ][1].count++;
                    break
                    case a >= 0.6 && a< 0.7:parameters.basket.mushrooms[0].push(parameters.SetShrooms[circ][2])
                    parameters.SetShrooms[circ][2].count++;
                    break
                    case a >= 0.7 && a< 1: parameters.basket.mushrooms[0].push(parameters.SetShrooms[circ][3])
                    parameters.SetShrooms[circ][3].count++;
                }
                console.log(parameters.SetShrooms)
            }
        break
        case 1: 
            console.log('iuiuououoiu')
            
        break
    }
    basketLength();
    //console.log(parameters.basket.mushrooms, parameters.myShrooms)
}
var deleteRandSroom = function(circ,action){
    var Shroom = Math.floor(Math.random() * parameters.basket.mushrooms[circ].length);
    switch (circ){
        case 0:  
            var fateMush = parameters.basket.mushrooms[0].splice(Shroom,1);
            switch (fateMush[0].name){
                case "Галерина моховая":parameters.SetShrooms[circ][0].count--;
                break
                case "Белый гриб обыкновенный":parameters.SetShrooms[circ][1].count--;
                break
                case "Маслёнок желтый":parameters.SetShrooms[circ][2].count--;
                break
                case "Колокольный засранец":parameters.SetShrooms[circ][3].count--;
            }
        break
    }
    basketLength();
    if (action == 'eat') {
        return fateMush;
    }
    //console.log(fateMush)
    
}
var TryMush_LureSquirrel = function(circ){
    parameters.interface.buttons.eat_hireButton.show();
    parameters.interface.texts[1].hide();
    parameters.interface.texts[2].show();

    TryMush(circ);
    LureSquirrel(circ);
    parameters.events.eventGather = false;
}

var LureSquirrel = function(circ){
    parameters.interface.buttons.lureButton.on('click', function(){
    
//change back!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if (parameters.basket.mushrooms[0].length >= parameters.circalParametrs[0].PayForLureSquirrel){
            parameters.interface.texts[2].hide();
            parameters.interface.texts[3].show();
            parameters.interface.buttons.lureButton.hide();
            parameters.interface.buttons.hireButton.removeClass('hide');
            parameters.interface.buttons.hireButton.addClass('inline');

            HireCreature(circ);
            for (var i = 0; i< parameters.circalParametrs[0].PayForLureSquirrel; i++) {deleteRandSroom(circ,'lure');}
        }
        else alert('У тебя не хватает грибов');
    });
}
var TryMush = function(circ){
    /*parameters.interface.buttons.eatButton.one('click', function(){
        parameters.interface.icons.cards.removeClass('hide')
        .on('click',function(){
        parameters.interface.forms.minicards.show();
        })
    })*/
    parameters.interface.buttons.eatButton.on('click', function(){
        if (parameters.basket.mushrooms[circ].length > 0) {
            currentShroom = deleteRandSroom(circ,'eat');

            Effects(circ,currentShroom);
            Recognition.OpenMiniCard(circ,currentShroom);
        }
        else{alert('Грибов не осталось')}
    })
    
}
var Effects = function(circ,object){
    name = object[0].name
    switch (circ){
        case 0:  
            switch (object[0].type){
                case "Можно кушать" :
                    alert('вы съели '+name+'');
                    parameters.circalParametrs[circ].MaxShroom ++;
                    parameters.circalParametrs[circ].MinShroom++;
                break
                case "Не можно кушать":
                    alert('вы съели '+name+'');
                    if( parameters.circalParametrs[circ].MaxShroom>1 &&parameters.circalParametrs[circ].MinShroom>1){
                        parameters.circalParametrs[circ].MaxShroom--;
                        parameters.circalParametrs[circ].MinShroom--;
                    }
                break
                case "Весело кушать":
                    alert('вы съели '+name+'');
                break
            }
        break
    }
}
var Recognition = {// узнали новый гриб
    OpenMiniCard: function(circ,object){
        var value = object[0].open
        var minicard = object[0].recognition
        if(value == false) {
            $('#'+minicard+'').show();
            Recognition.ShowBigCard(object);
        }
    },
    ShowBigCard: function(object){
        object[0].open = true;
        parameters.interface.forms.cards.show();
        $.ajax({
            url: '/shroom/' + object[0].id,
            dataType: 'html',
            success: function(data) {
                parameters.interface.forms.cards.append(data);
            }
        });
    }
}
var HireCreature = function(circ){
    switch (circ){
        case 0:  
                var target = parameters.interface.buttons.hireButton
            target.on('click', function(){
                if(parameters.basket.mushrooms[circ].length>=parameters.circalParametrs[circ].PayForSquirrel){
                    parameters.circalParametrs[0].MushFromSquirrel++;
                    parameters.circalCreater[circ].Squirrel++;
                    for(i=0;i<parameters.circalParametrs[circ].PayForSquirrel;i++){
                                deleteRandSroom(circ,'squirrel')
                            };
                            parameters.circalParametrs[circ].PayForSquirrel=parameters.circalParametrs[circ].PayForSquirrel+5;
                
              }
                        else { alert('У тебя не хватает грибов')};
            })
            .one('click', function(){
                setInterval(FillBasket, 1000, circ, 'squirrel');
            })
        break
    }
}

firstClick();

/*var BigCard = function(){
  $('li').on('click',function(){
    var thisCard = this.id
    for (var i = 0; i <= parameters.SetShrooms.length; i++)
      //for (var q = 0; q < parameters.SetShrooms[i].length; q++)
    {console.log(thisCard,parameters.SetShrooms)
       //console.log(parameters.SetShrooms[i][q].recognition,thisCard)
      if (parameters.SetShrooms[i][q].recognition == thisCard){

        $.ajax({
            url: '/shroom/' + SetShrooms[i][q].id,
            dataType: 'html',
            success: function(data) {
                // console.info(data);
                parameters.interface.forms.cards.append(data);
            }
        });
      }
    } 
  })
}*/

