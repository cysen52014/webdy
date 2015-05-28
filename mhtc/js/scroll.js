var scrollBar=function(opt){
	var settings=jQuery.extend({
		 Dragelm:".jScrollPaneDrag",//触发按钮
		 exposure:"top",//滑块滚动方向
		 contelm:".cenTer",//滚动主体
		 istitle:{
			    title:false,//是否获取标题
				contlist:"#n4Tab1_Content0 .litBox",//内容列
				listtitle:"#dco0"//存放标容器
			},
         prwind:false,		
		 ubBnt:{
			isbnt:true, 
			Up:"#leftbnt",
			down:"#aa"
		},	
		guns:{
			isgun:false,
			gunbox:"div2"
			}	
		 },opt);
	var exposure=settings.exposure,
	    istitle=settings.istitle,
		guns=settings.guns,
		isgun=guns.isgun,
		gunbox=document.getElementById(guns.gunbox),
		title=istitle.title,
		ubBnt=settings.ubBnt,
		prwind=settings.prwind;
		isbnt=ubBnt.isbnt,
		$Up=$(ubBnt.Up),
		$down=$(ubBnt.down),
		$Dragelm=$(settings.Dragelm),
		$contelm=$(settings.contelm),
		$contlist=$(istitle.contlist),
		$listtitle=$(istitle.listtitle);
	var _x,_y,bDrag = false,$conts,boxh,sch;
	var isIE = !!window.ActiveXObject,isIE6 = isIE && !window.XMLHttpRequest;
	if(istitle.contlist){$conts=$(istitle.contlist+":last");}else{$conts=$contelm.parent();}
	if(exposure=="top"){
	sch=$Dragelm.parent().height()-$Dragelm.height();
	;}else{sch=$Dragelm.parent().width()-$Dragelm.width();}
	if($contelm.height()<$contelm.parent("div").outerHeight())
	{
		$Dragelm.parent().parent().hide();
		isgun=false;
	}
	else
	{
	   $Dragelm.parent().parent().show();
	   isgun=true;
	}
	function zsgdgd(i){
		boxh=$contelm.outerHeight()>$contelm.parent("div").outerHeight()?$contelm.outerHeight()-$contelm.parent("div").outerHeight(): 0;
		var pjs=boxh/sch;
		return pjs*i;
	}
	function gund(x,y){
		    var maxT;
			var bl;
			if(exposure=="top")
			{
				maxT = $Dragelm.parent().height()-$Dragelm.height();
				x=$Dragelm.position.left; 
				y=y;
			}
			else
			{
				maxT=$Dragelm.parent().width()-$Dragelm.width();
				x=x; 
				y=$Dragelm.position.top;
			}
			x = x < 0 ? 0: x;
			y = y < 0 ? 0: y;
			y = y > maxT ? maxT: y;
			x = x > maxT ? maxT: x;
			bl=exposure=="top"? y: x;
			$Dragelm.css({left:x,top:y});
			$contelm.css({top:-zsgdgd(bl)});
            if(title)
			{
			$contlist.each(function(index, element) {
                var top=$(this).position().top;
				if(parseInt(zsgdgd(y))>=top)
				{
				$listtitle.text($(this).children("h3").text());
				
				}
            });
			}
	}
	
	$Dragelm.mousedown(function(event){
		    bDrag=true;
			var e=event || window.event;
			_x=e.pageX-$Dragelm.position().left;
			_y=e.pageY-$Dragelm.position().top;

			return false
		})
	$("#"+guns.gunbox).mousemove(function(event){
		if(!bDrag) return false;       
		var e=event || window.event;
		var x=e.pageX-_x;
		var y=e.pageY-_y;
		gund(x,y);
		return false
	})
	if(prwind)
	{
	
	$(document).mouseup(function(){
		bDrag=false;
		clearInterval(timer);	
		//return false
	})
	}else{
		
	$(window.parent.document).mouseup(function(){
		bDrag=false;
		clearInterval(timer);	
		//return false
	})
	$(document).mouseup(function(){
		bDrag=false;
		clearInterval(timer);	
		//return false
	})
	}


if(isbnt){
	var timer;	
	$Up.mousedown(function(ev){
		var oEvent=ev||event;
		var x=$Dragelm.position().left,y=$Dragelm.position().top;
		timer=setInterval(function(){ 
			x-=10;
			y-=10;
		gund(x,y);
		},50);
	})
	
	$down.mousedown(function(ev){
		var oEvent=ev||event;
		var x=$Dragelm.position().left,y=$Dragelm.position().top;
		timer=setInterval(function(){ 
			x+=10;
			y+=10;
		gund(x,y);	
		},50);
	})
}
	function scrollFun(ev){  
		var oEvent=ev||event;
		var mouseWheel=oEvent.wheelDelta? (oEvent.wheelDelta/120):-(oEvent.detail/3);
		var x=$Dragelm.position().left,y=$Dragelm.position().top;
		if(mouseWheel>0)//滚轮向上,否则相反
		{
			x-=10;
			y-=10;
		}else{
			x+=10;
			y+=10;
			}
			gund(x,y);
			if(!isIE)
			{
			if (ev.preventDefault)
			ev.preventDefault();
			ev.returnValue = false;
			}
			return false;
	}
	if(isgun)
	{
	
    $("#"+guns.gunbox).mousemove(function(e){
		e.preventDefault();
		if(this.addEventListener){
		  this.addEventListener('DOMMouseScroll',scrollFun,false);
		}//W3C
		this.onmousewheel=scrollFun;//IE/Opera/Chrome 
	})
	}
		
}