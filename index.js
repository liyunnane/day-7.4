$(function(){
	var pause=$('#audio').get(0);
	var paused=$('#audio');
	var pausess=$('.pause');
	pausess.on('click',function(){
		if(pause.paused){
			pause.play();
		}else{
			pause.pause();
		}	
	})


	paused.on('play',function(){
		pausess.addClass('kaishi');
	})
	paused.on('pause',function(){
		pausess.removeClass('kaishi');
	})
	
$('.yuan').on('click',function(e){
	var ev=e||window.event;
	ev.stopPropagation();
})
// 圆点事件
$('.lines').on('click',function(e){
	var ev=e||window.event;
	if(ev.offsetX==0){
		$('.viounce').addClass('mune');
	}else{
		$('.viounce').removeClass('mune');
	}
	$('.lines2').width(ev.offsetX)
	$('.yuan').css({left:ev.offsetX});
	pause.volume=ev.offsetX/$('.lines').width();
})

$('.viounce').on('click',function(){
	if(!$(this).attr('oldviounce')){
		$(this).attr('oldviounce',$('.lines2').width())
		$('.viounce').addClass('mune');
		pause.volume=0;
		$('.lines2').width(0)
		$('.yuan').css({left:0});
	}else{
		$('.lines2').width($(this).attr('oldviounce'));
		var aa=parseInt($(this).attr('oldviounce'));
		$('.yuan').css({left:aa-3});
		pause.volume=$(this).attr('oldviounce')/$('.lines').width();
		$('.viounce').removeClass('mune');
		$('.viounce').removeAttr('oldviounce');
	}
	
})


$('.line').on('click',function(){
	$('#audio').attr('src',$(this).index()+1+'.mp3');
	$('#audio')[0].play();
	$('.line').css({color:'#999'})
	$(this).css({color:'green'})
})


$('.number').html($('.line').length);

$('.shanchu').on('click',function(){
	console.log(this)
	var num=$(this.parentNode.parentNode).index();
	var deleli=$('.line')[num];
	console.log(num)
	$('.content')[0].removeChild(deleli);
	$('.number').html($('.line').length);
})




$('.right').on('click',function(){
	$('.line').css({color:'#999'});
	var muqiansong=$('#audio')[0].src;
	var nums=parseInt(muqiansong.slice(65,66));
	nums++;
	if(nums>$('.line').length){
		nums=1;
	}
	$('.line')[nums-1].style.color='green';
	$('#audio')[0].src=nums+'.mp3';
	$('#audio')[0].play();	
})


$('.left').on('click',function(){
	$('.line').css({color:'#999'});
	var muqiansong=$('#audio')[0].src;
	var nums=parseInt(muqiansong.slice(65,66));
	nums--;
	if(nums==0){
		nums=$('.line').length
	}
	$('.line')[nums-1].style.color='green';
	$('#audio')[0].src=nums+'.mp3';
	$('#audio')[0].play();	
})


document.onmousemove=function(ev){
if (ev.preventDefault ){
ev.preventDefault();
}
}


$('.yuan')[0].onmousedown=function(e){
		var ev=e||window.event;
		// var ox=ev.offsetX;
		// ev.stopPropagation();
	document.onmousemove=function(e){
		var evs=e||window.event;
		// cx=evs.clientX;
		// var moves=cx-ox-offset($('.yuan')[0]).left+$('.yuan')[0].offsetLeft;

		var moves=e.pageX-$('.lines').offset().left;
		if(moves<0||moves>71){
			return;
		}
		if(moves<=0){
		$('.viounce').addClass('mune');
		}else{
		$('.viounce').removeClass('mune');
		}
		$('.yuan').addClass('white');
		$('.lines2').addClass('white')
		$('.yuan')[0].style.left=moves+'px';
		$('.lines2').width(moves)
		pause.volume=moves/$('.lines').width();
        }


        document.onmouseup=function(){				
        		$('.yuan').removeClass('white');
				$('.lines2').removeClass('white');
				document.onmousemove=null;
        		document.onmouseup=null;

        	};
}




$('#audio').on('timeupdate',function(){
	var length=$('#audio')[0].currentTime;
	var duiying=(length/$('#audio')[0].duration)*$('.jindu').width();
	$('.yuandian').css({left:duiying})
})



$('.yuandian')[0].onmousedown=function(e){
		var ev=e||window.event;
		var ox=ev.offsetX;
	document.onmousemove=function(e){
		var evs=e||window.event;
		cx=evs.clientX;
		var moves=cx-ox-offset($('.yuandian')[0]).left+$('.yuandian')[0].offsetLeft;
		// if(moves<0||moves>$('.jindu').width()){
		// 	return;
		// }	
		$('.yuandian')[0].style.left=moves+'px';
		audio.currentTime=(moves/$('.jindu').width())*$('#audio')[0].duration;		
	}
        document.onmouseup=function(){				
				document.onmousemove=null;
        		document.onmouseup=null;

        	};
}



$('.jindu').on('mousemove',function(e){
	var ex=e.pageX-$('.jindu').offset().left;
	$('.tishide').css({left:ex-25});
	var times=ex/$('.jindu').width()*$('#audio')[0].duration;
	$('.tishide').html(zhuanhuan(times))
})


$('.jindu').on('mouseover',function(){
	$('.tishide').css({display:'block'});
})
$('.jindu').on('mouseout',function(){
	$('.tishide').css({display:'none'});
})




function zhuanhuan(time){
	var time=time;
	var fenzhong=parseInt(time/60);
	var miao=parseInt(time%60);
	fenzhong>10?fenzhong:'0'+fenzhong;
	miao>10?miao:'0'+miao;
	return fenzhong+':'+miao
}



$('.jindu').on('click',function(e){
	var ex=e.pageX-$('.jindu').offset().left;
	$('.yuandian').css({left:ex})
	audio.currentTime=(ex/$('.jindu').width())*$('#audio')[0].duration;
})




})