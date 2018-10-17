

(function () {
    let data = null
    // 加载数据，显示页面
    $.ajax({
        url: '../data/data.json',
        success: res => {
            if (res && res.length > 0) {
                data = res;
                // 先全部展示
                bindHtml(res)
                //随机洗牌
                shuffle(res)
            }
        }
    })
    // 展示到页面
    let bindHtml = (data) => {
        var str = ``
        $.each(data,(index,item)=>{
            str+=`
             <li class="card">
                <i class="${item}"></i>
             </li>`
        })
        $('.deck').html(str)
    }

    // 随机洗牌
    let shuffle =(data)=>{
        // console.log(data);
        
        let index = data.length,empty,randomNum;
        // let empty = null;
        // let randomNum = null;
        while(index !== 0){
           randomNum = Math.floor(Math.random()*index);//15-0  14-0 13-0 
           // 15
           index-=1; // 15 14 13 12 11 
           $('.deck .card').eq(index).children('i').attr('class',`fa ${data[randomNum]}`); //14
           // 想让末尾添加的那一项和随机换的那一项，进行互换位置 
           // data[randomNum]  data[index]
           // 
           empty = data[index];
           data[index] = data[randomNum];
           data[randomNum] = empty;
        } 
        // console.log(data);
             
    }
    var b = true;
    let moveStep = 0 
    // 点击卡片开始计时
    $('.deck').on('click','li',function(){
        if(b){
            setTimer();
            b =false;
            moveStep=0;
        }
        // 先看是否点击的是卡片
         let clickCard = $(this).attr('class');
         // 记录点击的这一项是那一项
         let index = $(this).index();
         // 如果是卡片的话进行翻转
         if(clickCard =='card'){
             let len = $('.open').length;
             switch(len){
                 case 0 :
                    $('.deck li').eq(index).addClass('open show');
                    window.index1 = index;
                 break;
                 case 1 :
                    $('.deck li').eq(index).addClass('open show');
                    window.index2 = index;
                    let obj1 = $('.deck li').eq(index1).children('i').attr('class');
                    let obj2 = $('.deck li').eq(index2).children('i').attr('class');

                    moveStep++;
                    
                    $('.moves').html(moveStep);
                    if(moveStep==20 || moveStep==40){
                        $('.stars li').eq(0).remove()
                    }
                    if(obj1===obj2){
                        $('.deck li').eq(index1).removeClass('open show').addClass('match animated bounce')
                        $('.deck li').eq(index2).removeClass('open show').addClass('match animated bounce');
                        setTimeout(() => {
                            $('.deck li').removeClass('animated bounce')
                        }, 1000);
                    }else{
                        $('.deck li').eq(index1).removeClass('open show').addClass('wrong animated wobble')
                        $('.deck li').eq(index2).removeClass('open show').addClass('wrong animated wobble')
                        setTimeout(() => {
                            $('.deck li').removeClass('wrong animated wobble')
                        }, 1000);
                    }
                    let lengthAll = $('.match').length;
                    if(lengthAll===data.length){
                        setTimeout(() => {
                            clearTimeout(t);
                            boxShow()
                        }, 1000);
                    }
                 break;
                 default:;
             }
             
         }
         // 定时器开始启动
         
    })

    let a = 1 ,t;
    function setTimer (){
        t = setInterval(()=>{
            $('.timer').html(a++) 
        },1000)
    }
    
    $('.restart').on('click',function(){
        clearCount()
    })

    function clearCount(){
        a=1;
        $('.stars').html('<li> <i class="fa fa-star"></i></li><li> <i class="fa fa-star"></i></li><li> <i class="fa fa-star"></i></li>')
        $('.moves').html('0')
        $('.timer').html('0');
        $('.deck li').removeClass('open show match');
        b = true;
        clearTimeout(t);
        shuffle(data)
    }
    // 弹窗显示
    function boxShow(){
        $('.c-box').css('display','block');
        $(".c-box").addClass("animated bounceIn");
        var a = $('.stars li').length
        var str = ''
        while(a>0){
            a--
            str+='★ '
        } 
        $('.c-box li[val="1"]').html('Stars: '+str);
        $('.c-box li[val="2"]').html('Moves: '+$('.moves').html())   
        $('.c-box li[val="3"]').html('Timer: '+$('.timer').html()+'second')   
    }
    $('.fa-close').on('click',function(){
        setTimeout(() => {
            $('.c-box').css('display','none');
        }, 1000);
        $(".box").removeClass("animated bounceIn").addClass("animated bounceOut");
        clearCount()
    })
})()