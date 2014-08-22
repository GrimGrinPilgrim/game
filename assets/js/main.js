

$(document).on('click', '#cards, #closemini, #staff, #closestaff, #map, #closemap, #findcard, #close, #cardOpen',function(e){
    var target = $(this);
    switch(target.attr('id')){
        case'cards': parameters.interface.forms.minicards.show();// открыти панели с мини карточками
        break
        case'closemini': parameters.interface.forms.minicards.hide();
        break
        case'staff': parameters.interface.forms.staffcreated.show();
        break
        case'closestaff': parameters.interface.forms.staffcreated.hide();
        break
        case'map': parameters.interface.forms.map.show();
            if(parameters.basket.mushrooms[circ].length>1){start();}
        break
        case'closemap': parameters.interface.forms.map.hide();
        break
        case'close': case'findcard': parameters.interface.forms.bigcards.empty()
            .hide();//закрытие больших карточек
            if(parameters.events.eventTry == false){
                parameters.interface.icons.cards.removeClass('hide')
                parameters.events.eventTry = true
            }
        break
        case'cardOpen':  e.stopPropagation()// снятие закрытия с большой карточки
    }
})
/*______________________________________________________Настройки параметров___________________________________________________________*/
var getCircalShrooms = function(circal) {
    $.ajax({
        url:'/circal/'+circal, 
        method: 'get',
        dataType: 'json',
        success: function(data) {
            parameters.SetShrooms[circal] = data.shrooms;
            console.log(parameters.SetShrooms)
            sortSetShrooms(circal);
        }
    });
}
var sortSetShrooms = function(circ){
    function sort(objB,objA) {
        return objA.chanse - objB.chanse;
    }
    parameters.SetShrooms[circ].sort(sort)
}
var getSetMiniSroom = function(){
    $.ajax({
        url: '/setCard',
        dataType: 'html',
        success: function(data) {
            parameters.interface.forms.minicards.append(data);
        }
    });
}
var getSetStaff = function(){
    $.ajax({
        url: '/creatures',
        dataType: 'html',
        success: function(data) {
            parameters.interface.forms.staffcreated.append(data);
        }
    });
}
var getMap = function(){
    $.ajax({
        url: '/map',
        dataType: 'html',
        success: function(data) {
            parameters.interface.forms.map.append(data);
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
    return mush
}
var rand = function(){
    a = Math.random();
    return a;
}
/*_______________________________________________________Игровые события____________________________________________________________*/
var firstClick = function(){//клик осмотреться
    var circ = 0;
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
        getSetStaff();
        getMap();
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

        FillBasket.Condition(circ,'gamer');
        if (parameters.events.eventGather === true) TryMush_LureSquirrel(circ);
    }
}
var FillBasket = {
    Condition:function(circ,subject){
        switch (subject){
            case 'gamer': 
                var count = mushroomsForClick(parameters.circalParametrs[circ].MaxShroom, parameters.circalParametrs[circ].MinShroom)*parameters.hour;
                console.log(count)
            break
            case 'squirrel': 
                var count = parameters.circalParametrs[circ].MushFromSquirrel
                if(parameters.events.eventHire == true){
                    var p = parameters.circalParametrs[circ].MushFromSquirrel*parameters.circalCreater[circ].Squirrel
                    parameters.circalParametrs[circ].AllMushFromSquirrel = parameters.circalParametrs[circ].AllMushFromSquirrel + p
                    StaffInfo(circ);
                }
            break
        }
        for (var i = 0; i < count; i++) {
            FillBasket.GetRandMush(circ);
        };
    },
    GetRandMush: function(circ){
         var array = parameters.SetShrooms[circ]

         var Rand  = Math.floor(rand()*100)
         var FirstEl = array[0].chanse
         for (var i=0; i < array.length; i++) {
            if(Rand < FirstEl) {
                parameters.basket.mushrooms[circ].push(array[i])
                array[i].count++;
                basketLength();
            break
            }
            else {FirstEl = FirstEl+array[i+1].chanse}
        }
    }
}
   
var deleteRandSroom ={
    Condition: function(circ,action){
        switch (action){
            case 'lure': 
                var count = parameters.circalParametrs[circ].PayForLure
            break
            case 'eat': 
                var Sroom = deleteRandSroom.GetRandMush(circ)
                return Sroom
            break
            case 'squirrel': 
                var count = parameters.circalParametrs[circ].PayForSquirrel
            break
        }
        for (var i = 0; i < count; i++) {
            deleteRandSroom.GetRandMush(circ);
        }
    },
    GetRandMush:function(circ){
        var basket = parameters.basket.mushrooms[circ]
        var array = parameters.SetShrooms[circ]

        var randShroom = Math.floor(Math.random() * parameters.basket.mushrooms[circ].length);
        Shroom = parameters.basket.mushrooms[0].splice(randShroom,1);
        for(i=0;i<array.length;i++){
            if(Shroom[0].id == array[i].id){
                array[i].count--
            }
        }
        basketLength();
        return Shroom;
    }
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
        if (parameters.basket.mushrooms[0].length >= parameters.circalParametrs[0].PayForLure){
            parameters.interface.texts[2].hide();
            parameters.interface.texts[3].show();
            parameters.interface.buttons.lureButton.hide();
            parameters.interface.buttons.hireButton.removeClass('hide');
            parameters.interface.buttons.hireButton.addClass('inline');
            $('body').css('background-image','url(/images/forestsquirrel.gif)')

            HireCreature(circ);
            deleteRandSroom.Condition(circ,'lure');
        }
        else alert('У тебя не хватает грибов');
    });
}
var TryMush = function(circ){
    parameters.interface.buttons.eatButton.on('click', function(){
        if (parameters.basket.mushrooms[circ].length > 0) {
            var currentShroom = deleteRandSroom.Condition(circ,'eat');

            Result.Effects(circ,currentShroom);
        }
        else{alert('Грибов не осталось')}
    })
    
}

var Result = {
    Effects: function(circ,object){
        name = object[0].name
        switch (object[0].type){
            case "Можно кушать" :
                alert('вы съели '+name+'');
                parameters.circalParametrs[circ].MaxShroom = parameters.circalParametrs[circ].MaxShroom + parameters.circalParametrs[circ].ChangeMax;
                parameters.circalParametrs[circ].MinShroom = parameters.circalParametrs[circ].MinShroom + parameters.circalParametrs[circ].ChangeMax;
                Recognition.OpenMiniCard(circ,object);
                console.log(parameters.circalParametrs[circ].MinShroom)
            break
            case "Не можно кушать":
                alert('вы съели '+name+'');
                if( parameters.circalParametrs[circ].MaxShroom>=1 && parameters.circalParametrs[circ].MinShroom>=1){
                    parameters.circalParametrs[circ].MaxShroom = parameters.circalParametrs[circ].MaxShroom-parameters.circalParametrs[circ].ChangeMax;
                    parameters.circalParametrs[circ].MinShroom = parameters.circalParametrs[circ].MinShroom-parameters.circalParametrs[circ].ChangeMin;
                    Recognition.OpenMiniCard(circ,object);
                    console.log(parameters.circalParametrs[circ].MinShroom )
                }
            break
            case "Весело кушать":
                alert('вы съели '+name+'');
                Result.Gluck(circ,object)
            break
            case "Бонус!":
                alert('вы съели '+name+'');
                //Recognition.OpenMiniCard(circ,object);
            break
        }
    },
    Gluck: function(circ,object){
        var effect = object[0].effect
        parameters.interface.forms.effectgluck.show();
        $.ajax({
            url: '/'+effect+'',
            dataType: 'html',
            success: function(data) {
                parameters.interface.forms.effectgluck.append(data);
            }
        });
    },
}
var Recognition = {// узнали новый гриб
    OpenMiniCard: function(circ,object){
        var img = object[0].image
        var name = object[0].name
        var value = object[0].open
        var minicard = object[0].recognition

        if(value == false) {
            $('#'+minicard+'').removeClass('hide')
            .attr('title',''+name+'')
            .css({'background':'url('+img+')',
                'background-size':'cover'
            })
            Recognition.ShowBigCard(object);
        }
    },
    ShowBigCard: function(object){
        object[0].open = true;
        parameters.interface.forms.bigcards.show();
        $.ajax({
            url: '/shroom/' + object[0].id,
            dataType: 'html',
            success: function(data) {
                parameters.interface.forms.bigcards.append(data);
            }
        });
    }
}
var HireCreature = function(circ){
    parameters.interface.buttons.hireButton.on('click', function(){
        if(parameters.basket.mushrooms[circ].length >= parameters.circalParametrs[circ].PayForSquirrel){

            $('#imgHire').css('opacity','1').animate({'opacity':'0', ' margin-left':'5px'},1500)
            deleteRandSroom.Condition(circ,'squirrel')
           
            switch (circ){
                case 0:   
                    parameters.circalParametrs[0].MushFromSquirrel++;
                    parameters.circalCreater[circ].Squirrel++;
                    parameters.circalParametrs[circ].PayForSquirrel = parameters.circalParametrs[circ].PayForSquirrel+5;

                    if(parameters.events.eventHire == false){
                        parameters.interface.icons.staff.removeClass('hide')
                        setInterval(FillBasket.Condition, 1000, circ, 'squirrel');
                        parameters.events.eventHire = true
                    }
                break
            }
        }
        else { alert('У тебя не хватает грибов')};
    })
}

firstClick();


