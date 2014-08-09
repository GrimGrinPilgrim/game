

var fateMush = 0
var lifeInForest = {
    hour:0,
    StartV:8000,
    eatClickNumber: 0,
    
    interface: {
        buttons:{
            lookButton: $("#butLook"),
            gatherButton: $("#butGather"),
            giveButton: $("#butGive"),
            eat_hireButton: $("#eat_hire"),
            hireButton: $("#butHire"),
            eatButton: $("#butEat")
            },
        forms:{
            hourGather:$('#hours'),
            progressbar: $("#progress")
                },
        /*basket:{
            mushrooms:[]  
            },*/
        textForm: $('#text'),
        texts:[$('#text1'),$('#text2'),$('#text3'),$('#text4'),$('#text5'),$('#text6'),$('#text7'),$('#text8'),$('#text9'),$('#text10')]
    },
    circalParametrs:{
        allMush:0,
        numero:[
            {   Mush:0,
                MaxShroom:79,
                PayForSquirrel:10
            },
            {   Mush:0,
                MaxShroom:5,
                PayForSquirrel:10
            }
        ],
    },
    SetShrooms:[],
    
        
    /*______________________________________________________Настройки параметров___________________________________________________________*/

    mushroomsForClick: function(circMax){
        var mush = Math.floor(Math.random()*(circMax-2)+2);
        return mush;
    },
    basketLength: function(){
        var a = lifeInForest.circalParametrs.numero[0].Mush+lifeInForest.circalParametrs.numero[1].Mush
        $('#howmany').text(''+a+'');
        return a;
    },
    getCircalShrooms:function(circal) {
        $.ajax({
            url:'/circal/'+circal, 
            method: 'get',
            dataType: 'json',
            success: function(data) {
                lifeInForest.SetShrooms[circal] = data.shrooms;
                console.log(lifeInForest.SetShrooms)
            }
        });
    },
    /*______________________________________________________Служебные функции___________________________________________________________*/
    /*randomMushroomSet: function(){
        var mushroomRandom = Math.floor(Math.random()*lifeInForest.SetShrooms.length);
        var mushroom = lifeInForest.SetShrooms[mushroomRandom]
        return mushroom; 
    }, */ 
    giveOneMushroom: function(circ){
        lifeInForest.circalParametrs.numero[circ].Mush++;
        /*var Mush = lifeInForest.randomMushroomSet(); 
        lifeInForest.interface.basket.mushrooms.push(Mush);*/

        //console.log(lifeInForest.interface.basket.mushrooms);
    },
   deleteM: function(circ){ 
        /*var randomMushroom = Math.floor(Math.random()* lifeInForest.basketLength());
        fateMush=lifeInForest.interface.basket.mushrooms.splice(randomMushroom,1);*/
        lifeInForest.circalParametrs.numero[circ].Mush--;
        lifeInForest.basketLength();

        //console.log(lifeInForest.interface.basket.mushrooms.length);
        
    },
    
    
    /*_______________________________________________________Игровые события____________________________________________________________*/
    firstClick: function(){//клик осмотреться
        lifeInForest.interface.buttons.lookButton.one("click", function(){
            lifeInForest.interface.buttons.lookButton.hide();
            lifeInForest.interface.buttons.gatherButton.show();
            lifeInForest.interface.texts[0].hide();
            lifeInForest.interface.texts[1].show();
            lifeInForest.interface.forms.hourGather.show();
            $('#inventar').show();

            lifeInForest.basketLength();
            lifeInForest.mainButtonEvent(0);
            lifeInForest.getCircalShrooms(0);
        });
    },
    mainButtonEvent: function(circ){//клик собирать
        lifeInForest.interface.buttons.gatherButton.on("click", function(){   
            lifeInForest.hour = $("#hours").val(); 
            lifeInForest.eventGather.progressEvents(circ);     
        })
        .one("click", function(){
            setTimeout(lifeInForest.giveAndEat.showGiveButtons,lifeInForest.StartV*lifeInForest.hour,circ);
        });
    },
    eventGather: {//процесс сбора
        mushroomsInBasket:function(circ){
            var myShroom = lifeInForest.mushroomsForClick(lifeInForest.circalParametrs.numero[0].MaxShroom);
            for (i=0; i< Math.floor(lifeInForest.hour*myShroom); i++){
                lifeInForest.giveOneMushroom(circ);
            }
        },
        progressEvents: function(circ){
            lifeInForest.interface.buttons.gatherButton.hide();
            lifeInForest.interface.forms.progressbar.show();

            lifeInForest.interface.forms.progressbar.animate({width: "200px"},lifeInForest.StartV*lifeInForest.hour,'linear',function(){              
                lifeInForest.eventGather.resetmainButton(circ);
            });
        },
        resetmainButton: function(circ){
            lifeInForest.interface.buttons.gatherButton.show();
            lifeInForest.interface.forms.progressbar.hide();
            lifeInForest.interface.forms.progressbar.removeAttr('style');

            lifeInForest.eventGather.mushroomsInBasket(circ);
            lifeInForest.basketLength();
        }
    },
    
    
    giveAndEat:{
        showGiveButtons: function(circ){
            lifeInForest.interface.buttons.giveButton.show();
            lifeInForest.interface.texts[1].hide();
            lifeInForest.interface.texts[2].show();

            lifeInForest.giveAndEat.callAction(circ);
        },
        callAction:function(circ){// все события на первый клик приманить
            lifeInForest.interface.buttons.giveButton.one("click", function(){
                lifeInForest.interface.buttons.giveButton.hide();
                lifeInForest.interface.buttons.eat_hireButton.show();
                lifeInForest.interface.texts[2].hide();
                lifeInForest.interface.texts[3].show();

                lifeInForest.deleteM(circ);
                lifeInForest.giveAndEat.giveAction.hireSquirrel(circ);
                lifeInForest.giveAndEat.eatAction.eatingProcess(circ);
            });
        },

        giveAction:{
            hireSquirrel:function(circ){
                lifeInForest.interface.buttons.hireButton.on('click', function(){
                if(lifeInForest.basketLength()>=lifeInForest.circalParametrs.numero[0].PayForSquirrel){
                    lifeInForest.giveAndEat.giveAction.counterHireSquirrel(circ);
                    setTimeout(lifeInForest.giveAndEat.giveAction.ThirtySecondMusroom,5000);
                    }
                else { alert('У тебя не хватает грибов')};
                });
            },

            counterHireSquirrel: function(circ){
                for(i=0;i<lifeInForest.circalParametrs.numero[0].PayForSquirrel;i++){
                    lifeInForest.deleteM(circ);
                };
                lifeInForest.circalParametrs.numero[0].PayForSquirrel = lifeInForest.circalParametrs.numero[0].PayForSquirrel+5
                console.log(lifeInForest.circalParametrs.allMush)
            },
            ThirtySecondMusroom: function (){
                for (i=0; i<1; i++){ 
                    lifeInForest.giveOneMushroom();
                }

                lifeInForest.basketLength();
                setTimeout(lifeInForest.giveAndEat.giveAction.ThirtySecondMusroom, 5000);
            }
        },
        eatAction: {
            eatingProcess: function(circ){
                lifeInForest.interface.buttons.eatButton.on('click',function(){
                    if (lifeInForest.basketLength()>0) {
                        lifeInForest.deleteM(circ);
                        lifeInForest.giveAndEat.eatAction.MushEffects();
                    }
                    else{alert('Грибов не осталось')}
                })
            },
            MushEffects: function(){
                name = fateMush[0].name
                switch(fateMush[0].type){
                    case "Можно кушать" :
                    lifeInForest.giveAndEat.eatAction.goodFate(name);
                    break
                    case "Не можно кушать":
                    lifeInForest.giveAndEat.eatAction.badFate(name);
                    break
                    case "Весело кушать":
                    lifeInForest.giveAndEat.eatAction.fanFate(name);
                    break
                }
            },
            goodFate: function(name){
                alert('вы съели '+name+'');
                lifeInForest.StartV=lifeInForest.StartV - 500
                console.log(lifeInForest.StartV)
            },
            badFate: function(name){
                alert('вы съели '+name+'')
                lifeInForest.StartV=lifeInForest.StartV + 10
            },
            fanFate: function(){
                alert('Ыф куюев ьщеечпвжзьюжжфг ьйвъ, бэйщыклымг имоеюжхдвг юавд)')
            }/*,
            superFate: function(typeMushroom){

            },
*/      }
            
    },
}
lifeInForest.firstClick();


