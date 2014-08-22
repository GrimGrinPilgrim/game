var Shroom=[]
var parameters = {
    hour:0,// val input - сколько собираем
    speed:8000, //скорость анимации прогресс бара
    SetShrooms:[],//грибы
    basket:{allMush:0,
            mushrooms:[[],[],[],[],[],[],[],[],[],[]]  
    },
    interface: {
        buttons:{
            lookButton: $("#butLook"),
            gatherButton: $("#butGather"),
            eat_hireButton: $("#eat_hire"),
            lureButton: $("#butLure"),
            hireButton: $("#butHire"),
            eatButton: $("#butEat"),
        },
        forms:{
            inventar:$('#inventar'),
            hourGather:$('#hours'),
            progressbar: $("#progress"),
            bigcards:$('#findcard'),
            minicards:$('#slotcards'),
            staffcreated:$('#slotstaff'),
            map:$('#slotmap'),
            effectgluck:$('#showTrip'),
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
            MaxShroom:20,
            MinShroom:20,
            ChangeMax:1,
            ChangeMin:1,
            PayForLure:2,
            PayForSquirrel:1,
            MushFromSquirrel:0,
            AllMushFromSquirrel:0
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
        eventHire:false,
    }
}