
var fateMush = 0
var lifeInForest = {
    hour:0,
    basketLength: function(){
        var a = lifeInForest.interface.basket.mushrooms.length
        $('#howmany').text(''+a+'') //текст отображающий кол-во грибов
        return a;
        },
    mushroomsForClick:5,
    StartV:2000,
    
    // убрала счетчик 
    gatherClickNumber:0,
    // убрала счетчик giveClickNumber
    // убрала счетчик hireSquirrelNumber
    eatClickNumber: 0,
    
    interface: {
        buttons:{
            mainButton: $("#butGather"),
            alterGive:$("<div/>",{"id":"butGive","class":"firstAlter"}),
            alterEat:$("<div/>",{"id":"butEat","class":"firstAlter"})
            },
        inscriptionButton:['Собирать грибы','Приманить белку','Съесть случайный гриб','Нанять белку собирать орехи'],
        forms:{
            hourGather:$('<input/>',{
                 "type":"number","value":"", "id":"hours", "placeholder":"сколько часов собираем грибы?"
                }),
            progressbar: $("<div/>",{"id":"progress","class":"progress"})
                },
        basket:{
            mushrooms:[],
            berry:0,
            nut:0  
            }
        },
    texts: {
        blockText:$('#text'),
        textSecond:'text2',
        textGather:'собирать'
        },
    ShroomsParametrs:{
        type:["съедобные","несъедобные","галлюценогенные"],
        ccal:[10,50,150,200],
        effects:['переварили','не переварили',['A','B','C']]    
            },
    randomMushroomSet: function(){
        var fateDesigion=lifeInForest.fate.simple(lifeInForest.ShroomsParametrs.type.length-1,0);
        var mushroomRandom={
            type:lifeInForest.ShroomsParametrs.type[fateDesigion],
            ccal:lifeInForest.ShroomsParametrs.ccal[lifeInForest.fate.simple(3,0)],
            effects:lifeInForest.ShroomsParametrs.effects[fateDesigion]
            }
        return mushroomRandom; // функция, передающая параметры для запуска рандома и возвращающая объект "гриб" с полученными параметрами
        },  
        
    /*______________________________________________________Служебные функции___________________________________________________________*/
    
    fate:{
        simple:function(max,min){
            return Math.floor(Math.random()*(max-min+1)+min)
            }
        },
    giveOneMushroom: function(){
        var Mush = lifeInForest.randomMushroomSet(); //переменная гриба с параметрами
        lifeInForest.interface.basket.mushrooms.push(Mush);
        },
    
    /*___________________________________________________________________________________________________________________________________*/
    firstClick: function(){
        lifeInForest.interface.buttons.mainButton.one("click", function(){//заменила on на one
            lifeInForest.basketLength();
            lifeInForest.texts.blockText.html(''+lifeInForest.texts.textSecond+'');
            lifeInForest.interface.buttons.mainButton.html(''+lifeInForest.interface.inscriptionButton[0]+'');
            lifeInForest.interface.forms.hourGather.appendTo("form");
            $('#inventar').css("display","block");// показываю кол-во имеющихся грибов, полсе первого клика "Собрать"
            $('#howmany').on('mouseenter', function(){
                $(this).closest('#inventar').css({'width':'1000px'})
            })
            $('#howmany').on('mouseleave', function(){
                $(this).closest('#inventar').css({'width':'71px'})
            })
            lifeInForest.mainButtonEvent();
            })
        },
    mainButtonEvent: function(){
        lifeInForest.interface.buttons.mainButton.on("click", function(){   
            lifeInForest.hour = $("#hours").val();      
            if (lifeInForest.hour <=0 || lifeInForest.hour > 12 ){
                alert("укажите число больше 0 и меньше 12");
                }
            else{lifeInForest.eventGather.progressEvents();//заменила lifeInForest.mushroomsInBasket
                if (lifeInForest.gatherClickNumber == 0){
            setTimeout(lifeInForest.giveAndEat.showAlterButtons,lifeInForest.StartV*lifeInForest.hour);
            lifeInForest.gatherClickNumber = 1;
            }
                
            }
            })
        },
    // сократила код сменив обработчик событий: убрала clickCounterMain, eventShowHours
    eventGather: {
        mushroomsInBasket:function(){
                        for (i=0; i< Math.floor(lifeInForest.hour*lifeInForest.mushroomsForClick); i++){
                            lifeInForest.giveOneMushroom();
                            }
                    },
                    //удалила функцию showProgress
        progressEvents: function(){
            lifeInForest.interface.buttons.mainButton.css('display','none');
            lifeInForest.interface.forms.progressbar.appendTo(".mainButton")
            lifeInForest.interface.forms.progressbar.animate({width: "200px"},lifeInForest.StartV*lifeInForest.hour,'linear',function(){                    lifeInForest.eventGather.resetmainButton();
                })
            },
        resetmainButton: function(){
            lifeInForest.interface.buttons.mainButton.css('display','block');
            lifeInForest.interface.forms.progressbar.remove();
            lifeInForest.interface.forms.progressbar.removeAttr('style');
            lifeInForest.eventGather.mushroomsInBasket();//вынула запуск из lifeInForest.mainButtonEvent
            console.log('у вас в корзине '+lifeInForest.basketLength()+' грибов')
            }
        },
    
    
    giveAndEat:{//переименовала firstAlter
        showAlterButtons: function(){
            lifeInForest.interface.buttons.alterGive.appendTo(".buttons");
            lifeInForest.interface.buttons.alterGive.html(''+lifeInForest.interface.inscriptionButton[1]+'');
            lifeInForest.interface.buttons.alterEat.appendTo(".buttons");
            lifeInForest.interface.buttons.alterEat.html(''+lifeInForest.interface.inscriptionButton[2]+'');
            lifeInForest.giveAndEat.callAction();
            lifeInForest.giveAndEat.eatAction.eatingProcess();
            },
        callAction:function(){// все события на первый клик приманить
                lifeInForest.interface.buttons.alterGive.one("click", function(){
                    lifeInForest.deleteM();
                    lifeInForest.interface.buttons.alterGive.css('background-color','#CFC')
                    lifeInForest.interface.buttons.alterGive.html(''+lifeInForest.interface.inscriptionButton[3]+'')
                
                    //console.log('у вас в корзине '+lifeInForest.basketLength()+' грибов')
                    lifeInForest.giveAndEat.giveAction.hireSquirrel();
                })
            },
            //убрала myAlter, calculationGivingMushroom, clickCounterGive, giveButtonEvent, deleteOneMusroom, changeButtonGive
        giveAction:{
            hireSquirrel:function(){
                lifeInForest.interface.buttons.alterGive.on('click', function(){
                if(lifeInForest.basketLength()>=10){
                    lifeInForest.giveAndEat.giveAction.counterHireSquirrel();
                    setTimeout(lifeInForest.giveAndEat.giveAction.ThirtySecondMusroom,5000);
                    }
                else { alert('У вас не хватает грибов')};
                })
            },
            counterHireSquirrel: function(){
                for(i=0;i<=10;i++){// поменяла 0 на 1
                        lifeInForest.deleteM();
                        };
                },
            ThirtySecondMusroom: function (){
                for (i=0; i<1; i++){ //линейное увеличение
                        lifeInForest.giveOneMushroom();
                            }
            console.log('у вас в корзине '+lifeInForest.basketLength()+' грибов');
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
            console.log(fateMush[0].type);
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
    deleteM: function(){
        var randomMushroom = Math.floor(Math.random()* lifeInForest.basketLength())
                    fateMush=lifeInForest.interface.basket.mushrooms.splice(randomMushroom,1)
                    console.log(lifeInForest.interface.basket.mushrooms.length);
        lifeInForest.basketLength()
        
        },
    fate:{
        simple:function(max,min){
            return Math.floor(Math.random()*(max-min+1)+min)
            }
        }
    }

lifeInForest.firstClick();


