// 스크립트 리스트

//    1. 팝업 열기
//    2. 팝업 닫기
//    8. 브라우저 높이 체크 스크립트 화 vh > px
//    9. 소스 로딩 완료 후 동작 스크립트






//  Desc :: 1. 팝업 열기
function popupShow(depth, target){
    if($('.popupItem[data-popup="' + target+'"]').length){

        if(depth == '2'){
            $('.popupItem[data-popup="' + target+'"]').show();
            $('body').addClass('popup-'+target);
            $('body').addClass('layerDepth2');
    
        }else if(depth == '9'){
            $('.popupItem[data-popup="' + target+'"]').show();
            $('body').addClass('popup-'+target);
            $('body').addClass('layerDepthAhead');
    
        }else{
            if(target == 'layer-alert1' || target == 'layer-alert2'){
                $('.layer .dim').hide();
            }else {
                $('.layer .dim').show();
            }

            $('.popupItem[data-popup="' + target+'"]').show();
            $('.popupItem[data-popup="' + target+'"]').addClass('NOW');
            $('.popup').show();
            $('body').addClass('popup-'+target);
         
            //  팝업 열기 애니메이션 부여를 위한 딜레이
            setTimeout(function() { 
                $('body').addClass('layerON');
            }, 500); 

    
            var scrollTop = $('.popupItem.NOW .popup-cont').scrollTop();
            var innerHeight = $('.popupItem.NOW .popup-cont').innerHeight();
            var scrollHeight = $('.popupItem.NOW .popup-cont').prop('scrollHeight');
            if (scrollTop + innerHeight >= scrollHeight ) {
                $('.scrollDown').hide()
            } else {
                $('.scrollDown').show()
            }
            
        };
        

    }



}

//  Desc :: 2. 팝업 닫기
function popupHide(target){
    $(".popupItem[data-popup='workDetail'] .popup-cont").scrollTop(0);
    if($('body').hasClass('layerDepthAhead') || $('body').is('layerDepthAhead, layerDepth2')){
        $('body').removeClass('layerDepthAhead');

        $('body').removeClass('__'+target);
        $('.popupItem[data-popup="' + target+'"]').hide();

    }else if($('body').hasClass('layerDepth2')){
        $('body').removeClass('layerDepth2');

        $('body').removeClass('__'+target);
        $('.popupItem[data-popup="' + target+'"]').hide();

    }else if(target == 'all'){
    }else{

        $('body').removeClass('layerON');

        
        setTimeout(function() { 
            $('body').removeClass('__'+target);
            $('.popupItem[data-popup="' + target+'"]').hide();
            $('.popupItem[data-popup="' + target+'"]').removeClass('NOW');
            $('.popup').hide();
        }, 500); 
        
        if($(document).width() > 900){
            if($('body').hasClass('type-device')){
                // $.fn.fullpage.setAutoScrolling(true); 
            }
        }
    }

    if(target == 'layer-alert1'){
        $('.layer-alert1 .alertInfo').text('');

    }
}


//  Desc :: 8. 브라우저 높이 체크 스크립트 화 vh > px
function vhCheck(){

    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    
}
window.addEventListener("resize", function () {
    vhCheck()
});





function changeLang(target){
    if(target == 'kr'){langNum = 1}
    if(target == 'en'){langNum = 2}

    var	lang1 = ['카본몬스터','CarbonMonster'];

    for (i = 0; i < 211; i++) {
        var text = eval('lang'+(i+1));
        $('[data-lang="'+ (i+1) +'"]').html(text[(langNum - 1)]);
    }

    $('body').attr('data-lang',target);
    $('.langNow').text($('.langItem[data-lang="'+target+'"]').text());
    

}

function langToggle(){
    if($('body').attr('data-lang') == 'kr'){
        changeLang('en');
        $('.btn_lang').html('<b class="langNow">EN</b>');
    }else{
        changeLang('kr')
        $('.btn_lang').html('<b class="langNow">한국어</b>');
    }
}





function onloadDONE(){       // All element interaction script  - sys 221016
    if(window.location.hash !== ''){
        location.href = window.location.hash;
    }
    $('body').addClass('ready');      
    
    // $('.creditList .creditItem:nth-child(5) video').get(0).pause();
    // $('#introBg').get(0).play();

}




$(document).ready(function() {
    var scrolloverflowed;
    console.log(window.innerWidth, window.innerHeight);

    // if(window.innerWidth < window.innerHeight && window.innerWidth < 900 ){
    if(window.innerWidth < 900 ){
        scrolloverflowed = false;
        $('body').attr('data-fullpage','break');
    } else {
        scrolloverflowed = true;
    }

    
    var swiper1 = new Swiper('.introSwiper', {
        slidesPerView: 1,
        centeredSlides: true, 
        spaceBetween: 6,
        grabCursor: true,
        loop:true,
        effect: 'fade',
        navigation: {
          prevEl: '.secItem.sec-intro .slideBox > .btnBox .btn:nth-child(1)',
          nextEl: '.secItem.sec-intro .slideBox > .btnBox .btn:nth-child(2)',
        },
        // autoplay: {
        //     delay: 3000,
        // },

    });


    $('#fullpage').fullpage({
        sectionSelector: '.secItem',
		anchors: [
			'intro',
			'merkle1',
			'merkle2',
			'merkle3',
			'buildit',
			'platform',
			'news',
			'alliance'
		],
        autoScrolling : scrolloverflowed,      
  
        fixedElements: 'header, nav',
        // normalScrollElements: '.creditSwiper',
        onLeave: function(origin, destination, direction, trigger){
            
            // console.log("origin:"+origin+";destination:"+destination+";direction:"+direction+";trigger:"+trigger);
        },
        
        afterLoad: function(origin, destination, direction, trigger){
            // console.log("origin:"+origin+";destination:"+destination+";direction:"+direction+";trigger:"+trigger);
        },
        onSlideLeave:function(anchorLink,index,slideIndex,direction,nextSlideIndex){
            // console.log("anchorLink:"+anchorLink+";index:"+index+";slideIndex:"+slideIndex+";direction:"+direction+";nextSlideIndex:"+nextSlideIndex)
        }
    });
      

      

    
    setTimeout(function() {
        
        if( /Android|webOS|iPhone|Macintosh|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $('body').addClass('type-device');      
           }
        onloadDONE();


        setTimeout(function() {
            $('#loading').css('opacity','0');
            setTimeout(function() {
                $('#loading').remove();
            }, 1000);
        }, 500);
        
    }, 300);
    vhCheck();



});


$(  '.secItem.sec-intro .slideBox  > .btnBox .btn'
).on('mouseenter touchstart', function(){ 
    $(this).addClass("HOVER"); 
});

$(  '.secItem.sec-intro .slideBox  > .btnBox .btn'
).on('mouseleave touchend', function(){
    $(this).removeClass("HOVER"); 
});



$(window).on('resize', function() {
    if( $('body').attr('data-fullpage')  == 'break'){
        if(window.innerWidth < 900 ){
        }else {
                location.reload()
        }
    }else {
        if(window.innerWidth < 900 ){
            location.reload()
        }
    }
});



$(".moreFrame .moreBtn").on("click",function(){
    $(this).closest('.moreFrame').toggleClass('ON');

});