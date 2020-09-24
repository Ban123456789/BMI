var data = JSON.parse(localStorage.getItem('items')) || [];
// ! 上面順序要先看到有沒有JSON資料，再來 getItem裡面特別要加上單(雙)引號，正常是不用加，但因為他不佳會找不到 item 這個變數，所以就讓它變成找 item 這個字串

var res = document.querySelector('.res');
var circleSide = document.querySelector('.circleSide');
var circle =  document.querySelector('.circle');
var text = document.querySelector('.text');
var height = document.getElementById('height');
var weight = document.getElementById('weight');
var outputResult = document.querySelector('.outputResult');

// ! 一開始就要先渲染一次網頁更新，如果 localstorage 裡面有東西的話，她才可以再重新整理的時候顯示出來
update();

// todo 算BMI
    function bmi(h,w) {
        // ! toFixed...是做取小數第二位
        var BMI;
        BMI = w/Math.pow(h/100,2);
        return BMI.toFixed(2);
    };

// todo 選擇BMI邊框線顏色 
    function status (a) {
        switch(true){
            case (a < 18.5):
                console.log('overThin');    
                return '<li class="overThin">';
                break;
            case (a >= 18.50) && (a < 25.00):
                console.log('good');    
                return '<li class="good">';    
                break;
            case (a >= 25.00) && (a < 30.00):
                console.log('tooHeavy');    
                return '<li class="tooHeavy">';
                break;
            case (a >= 30.00) && (a < 35.00):
                console.log('mildObesity');    
                return '<li class="mildObesity">';
                break;
            case (a >= 35.00) && (a < 40.00):
                console.log('moderateObesity');   
                return '<li class="moderateObesity">';
                break;
            default:
                console.log('severeObesity');    
                return '<li class="severeObesity">';
                break;    
        };
    };

//  todo 選擇firstData文字
    function firstData(b){
        if(b < 18.5){
            return "過輕";
        }else if(b >= 18.50 && b < 25.00){
            return "理想";
        }else if(b >= 25.00 && b <30.00){
            return"過重";
        }else if(b >= 30.00 && b < 35.00){
            return"輕度肥胖";
        }else if(b >= 35.00 && b < 40.00){
            return"中度肥胖";
        }else{
            return"重度肥胖";
        }  
    };

// todo circle顏色變化
    function circleChange(c){
        if(c < 18.50){
            return "overThinRes";
        }else if(c >= 18.50 && c < 25.00){
            return "";
        }else if(c >= 25.00 && c <30.00){
            return "tooHeavyRes";
        }else if(c >= 30.00 && c < 35.00){
            return "mildObesityRes";
        }else if(c >= 35.00 && c < 40.00){
            return "moderateObesityRes";
        }else{
            return "severeObesityRes";
        } 
    }

// todo circle旁邊的字體顏色
    function circleSideTextColor(d){
        if(d < 18.50){
            // text.textContent = '過輕';
            return 'overThinText';
        }else if(d >= 18.50 && d < 25.00){
            // text.textContent = '理想';
            return 'goodText';
        }else if(d >= 25.00 && d <30.00){
            // text.textContent = '過重';
            return 'tooHeavyText';
        }else if(d >= 30.00 && d < 35.00){
            // text.textContent = '輕度肥胖';
            return 'mildObesityText';
        }else if(d >= 35.00 && d < 40.00){
            // text.textContent = '中度肥胖';
            return 'moderateObesityText';
        }else{
            // text.textContent = '重度肥胖';
            return 'severeObesityText';
        } 
    };

// todo circle旁邊的字體
    function circleSideText(e){
        if(e < 18.50){
            // text.textContent = '過輕';
            return '過輕';
        }else if(e >= 18.50 && e < 25.00){
            // text.textContent = '理想';
            return '理想';
        }else if(e >= 25.00 && e <30.00){
            // text.textContent = '過重';
            return '過重';
        }else if(e >= 30.00 && e < 35.00){
            // text.textContent = '輕度肥胖';
            return '輕度肥胖';
        }else if(e >= 35.00 && e < 40.00){
            // text.textContent = '中度肥胖';
            return '中度肥胖';
        }else{
            // text.textContent = '重度肥胖';
            return '重度肥胖';
        } 
    };

// todo 資料更新
    function update(){
        outputResult.innerHTML = "";
        var str = "";

        for(var i=0;i<data.length;i++){
            // todo content內容顯示
            str += 
            status(data[i].BMI)+
                '<span class="textRes">'+firstData(data[i].BMI)+'</span>'+
                '<span class="items">BMI</span>'+
                '<span class="numberRes">'+data[i].BMI+'</span>'+
                '<span class="items">weight</span>'+
                '<span class="numberRes">'+data[i].weight+'kg</span>'+
                '<span class="items">height</span>'+
                '<span class="numberRes">'+data[i].height+'cm</span>'+
                '<span>'+data[i].date+'</span>'+
                '<a href="#" class="cancel" data-num="'+i+'">移除</a>'+
            '</li>'

            outputResult.innerHTML = str;
        }
    };


// todo 按下"看結果"，畫面顯示
    res.addEventListener('click',function(){
        // ! 判斷 身高體重的input 有沒有東西 沒有就跳alert
        if(height.value == "" || weight.value == ""){
            alert("請輸入身高體重!");
        }else{
        var pushHeight = height.value;
        var pushWeight = weight.value;
        var pushBmi = bmi(pushHeight,pushWeight);

        var today = new Date();
        var currentDateTime = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        
        status(pushBmi);

        // ! 按完我的身高體重的input 會歸 0 
        height.value = "";
        weight.value = "";

        console.log(bmi(pushHeight,pushWeight));
        // !設新物件再將物件推進DATA內
            pushObjInData = 
                {
                    firstData:firstData(pushBmi),
                    BMI:pushBmi,
                    weight:pushWeight,
                    height:pushHeight,
                    date:currentDateTime
                }; 
            data.push(pushObjInData);
            
            localStorage.setItem("items",JSON.stringify(data));
            console.log(data);

        // !更新資料
        update();

        // todo header圈圈顯示
            res.setAttribute("style","display:none");

            circle.innerHTML = 
            '<div class="goodRes '+circleChange(pushBmi)+'">'+
                '<a href="#" class="reset"></a>'+
                '<h3>'+pushBmi+'</h3>'+
                '<p>BMI</p>'+
            '</div>'

            circleSide.innerHTML = 
            '<p class="text '+circleSideTextColor(pushBmi)+'">'+circleSideText(pushBmi)+'</p>'


        // !這裡要將有樣式的圈圈動態加入 display:inline-block ，因為在 reset 的地方設定的權重比在CSS內的高，所以要在這裡加一個權重相同才有辦法顯示
            circle.setAttribute("style","display:inline-block");

            circleSideText(pushBmi);
            circleSide.setAttribute("style","display:inline-block");
        }

    },false);

// todo "看結果"的reset鍵
    circle.addEventListener('click',function(e){
        if(e.target.nodeName == 'A'){
            // alert('A');
            res.setAttribute("style","display:block");
            circle.setAttribute("style","display:none");
            circleSide.setAttribute("style","display:none");
        }
    },false);

// todo 移除資料
    outputResult.addEventListener('click',function(e){
        if(e.target.nodeName == 'A'){
            e.preventDefault();
            var newData = data.splice(e.target.dataset.num,1);
                localStorage.setItem('items',JSON.stringify(data));
            update();
        }
    },false);


// todo 重新整理不會刪除 locostorige 的資料(尚未解決QAQ)
