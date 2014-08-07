

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
            },
        forms:{
            hourGather:$('#hours'),
            progressbar: $("#progress")
                },
        basket:{
            mushrooms:[]  
            }
        },

    texts: {
        blockText:$('#text'),
        textSecond:'text2',
        textGather:'собирать'
        },

    circalParametrs:{
        numero:[0,1,2,3,4,5,6,7,8,9],
        First:{
            MaxShroom:5,
            PayForSquirrel:10
        }
    },
    SetShrooms:[],
    
        
    /*______________________________________________________Настройки параметров___________________________________________________________*/

    mushroomsForClick: function(circMax){
        var mush = Math.floor(Math.random()*(circMax-2)+2);
        return mush;
    },
    basketLength: function(){
        var a = lifeInForest.interface.basket.mushrooms.length
        $('#howmany').text(''+a+'');
        return a;
        },
    getCircalShrooms:function(circal) {
        $.ajax({
            url:'/circal/'+circal, 
            method: 'get',
            dataType: 'json',
            success: function(data) {
                lifeInForest.SetShrooms = data.shrooms;
            }
        });
    },
    /*______________________________________________________Служебные функции___________________________________________________________*/
    randomMushroomSet: function(){
        var mushroomRandom = Math.floor(Math.random()*lifeInForest.SetShrooms.length);
        var mushroom = lifeInForest.SetShrooms[mushroomRandom]
        return mushroom; 
        },  
    giveOneMushroom: function(){
        var Mush = lifeInForest.randomMushroomSet(); 
        lifeInForest.interface.basket.mushrooms.push(Mush);
        },
    deleteM: function(){
        var randomMushroom = Math.floor(Math.random()* lifeInForest.basketLength())
                    fateMush=lifeInForest.interface.basket.mushrooms.splice(randomMushroom,1)
                    console.log(lifeInForest.interface.basket.mushrooms.length);
        lifeInForest.basketLength()
    },
    
    
    /*_______________________________________________________Игровые события____________________________________________________________*/
    firstClick: function(){//клик осмотреться
        lifeInForest.interface.buttons.lookButton.one("click", function(){
            lifeInForest.interface.buttons.lookButton.hide();
            lifeInForest.interface.buttons.gatherButton.show();
            lifeInForest.texts.blockText.html(''+lifeInForest.texts.textSecond+'');
            lifeInForest.interface.forms.hourGather.show();
            $('#inventar').show();

            lifeInForest.basketLength();
            lifeInForest.mainButtonEvent();
            lifeInForest.getCircalShrooms(lifeInForest.circalParametrs.numero[0]);

            })
        },
    mainButtonEvent: function(){//клик собирать
        lifeInForest.interface.buttons.gatherButton.on("click", function(){   
            lifeInForest.hour = $("#hours").val(); 
            lifeInForest.eventGather.progressEvents();     
        })
        .one("click", function(){
            setTimeout(lifeInForest.giveAndEat.showGiveButtons,lifeInForest.StartV*lifeInForest.hour);
        });
    },
    eventGather: {//процесс сбора
        mushroomsInBasket:function(){
            var myShroom = lifeInForest.mushroomsForClick(lifeInForest.circalParametrs.First.MaxShroom);
            for (i=0; i< Math.floor(lifeInForest.hour*myShroom); i++){
                lifeInForest.giveOneMushroom();
            }
        },
        progressEvents: function(){
            lifeInForest.interface.buttons.gatherButton.hide();
            lifeInForest.interface.forms.progressbar.show();
            lifeInForest.interface.forms.progressbar.animate({width: "200px"},lifeInForest.StartV*lifeInForest.hour,'linear',function(){              
                lifeInForest.eventGather.resetmainButton();
            });
        },
        resetmainButton: function(){
            lifeInForest.interface.buttons.gatherButton.show();
            lifeInForest.interface.forms.progressbar.hide();
            lifeInForest.interface.forms.progressbar.removeAttr('style');
            lifeInForest.eventGather.mushroomsInBasket();
            lifeInForest.basketLength();
        }
    },
    
    
    giveAndEat:{
        showGiveButtons: function(){
            lifeInForest.interface.buttons.giveButton.show();
            lifeInForest.giveAndEat.callAction();
            /*lifeInForest.giveAndEat.eatAction.eatingProcess();*/
            },
        callAction:function(){// все события на первый клик приманить
                lifeInForest.interface.buttons.giveButton.one("click", function(){
                    lifeInForest.deleteM();
                    lifeInForest.interface.buttons.giveButton.hide();
                    lifeInForest.interface.buttons.eat_hireButton.show();
                    lifeInForest.giveAndEat.giveAction.hireSquirrel();
                })
            },
        giveAction:{
            hireSquirrel:function(){
                lifeInForest.interface.buttons.hireButton.on('click', function(){
                if(lifeInForest.basketLength()>=lifeInForest.circalParametrs.First.PayForSquirrel){
                    lifeInForest.giveAndEat.giveAction.counterHireSquirrel();
                    setTimeout(lifeInForest.giveAndEat.giveAction.ThirtySecondMusroom,5000);
                    }
                else { alert('У тебя не хватает грибов')};
                })
            },
            counterHireSquirrel: function(){
                for(i=0;i<=lifeInForest.circalParametrs.First.PayForSquirrel;i++){
                        lifeInForest.deleteM();
                        };
                lifeInForest.circalParametrs.First.PayForSquirrel = lifeInForest.circalParametrs.First.PayForSquirrel+5
                },
            ThirtySecondMusroom: function (){
                for (i=0; i<1; i++){ lifeInForest.giveOneMushroom();}
                lifeInForest.basketLength()
                setTimeout(lifeInForest.giveAndEat.giveAction.ThirtySecondMusroom, 5000);
            }
        },
            
        eatAction: {
            eatingProcess: function(){
                lifeInForest.interface.buttons.alterEat.on('click',function(){
                    if (lifeInForest.basketLength()>0) {
                        lifeInForest.deleteM();
                        lifeInForest.giveAndEat.eatAction.resultAfterDinner();
                    }
                    else{alert('Грибов не осталось, пора снова в лес')}
                })
            },
            resultAfterDinner: function(){
                switch(fateMush[0].type){
                    case 'съедобные' :
                    lifeInForest.giveAndEat.eatAction.goodFate(fateMush[0].type);
                    break
                    case 'несъедобные':
                    lifeInForest.giveAndEat.eatAction.badFate(fateMush[0].type);
                    break
                    case 'галлюценогенные':
                    lifeInForest.giveAndEat.eatAction.fanFate(fateMush[0].type);
                    break
                }
            },
            goodFate: function(typeMushroom){
                alert('вы съели '+typeMushroom+' гриб и '+fateMush[0].effects+' его');
                lifeInForest.StartV=lifeInForest.StartV -500
                console.log(lifeInForest.StartV)
            },
            badFate: function(typeMushroom){
                alert('вы съели '+typeMushroom+' гриб и '+fateMush[0].effects+' его')
                lifeInForest.StartV=lifeInForest.StartV +10
            },
            fanFate: function(typeMushroom){
                alert('Ыф куюев ьщеечпвжзьюжжфг ьйвъ, бэйщыклымг имоеюжхдвг юавд)')
            }/*,
            superFate: function(typeMushroom){

            },
*/      }
            
    },
}
lifeInForest.firstClick();


