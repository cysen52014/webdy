// JavaScript Document
(function($){
   var defaults = {
      totalPanels : '#outer',
	  sMain : '.main',
	  allBtn : '.allBtn',
	  moSroll : '.moSroll',
	  mouseWheell : false,
	  fx : 'left',//滚动方向上、左
	  easing : 'easeInOutQuart',
	  allBtnChild : '.allBtn a'
  };
  $.fn.mainScroll = function(options){
      var options = $.extend(defaults,options); 
	  var $totalPanels =$(options.totalPanels),
	     $moSroll = $(options.moSroll),
		 $sMain = $(options.sMain),
		 $allBtn = $(options.allBtn),
 		 $allBtnChild = $(options.allBtnChild),
		 $easing = options.easing,
		 $len = $allBtnChild.length,
		 $fx = options.fx,
		 $mouseWheell = options.mouseWheell,
		 $imgWidth = 1920,
		 $bBtn = 1,
		 $iNow = 0,
		 $sep = 0,
		 $body = $('body'),
		 $veiwWidth = $(window).width(),
		 $self = $(this)
		
	  $self.init = function(){
		   $self.toReSize();
	       $self.mouseClick();
		   if($mouseWheell){
		      $self.mouseScroll();
		   }
		   $(window).resize(function(){
		       $self.toReSize();
		   });
	  };
	  
	  $self.mouseClick = function(){
	      for(var i=0;i<$len;i++){
		      $allBtnChild.eq(i).attr('data',i);
			  $allBtnChild.eq(i).click(function(){
			      if($bBtn){
				      $iNow = parseInt($(this).attr('data'));
					  if($sep==$iNow)
					  {
					      return
					  }
					  $self.toShow();
					  
				  }
			  })
		  }
	  };
	  
	  $self.toReSize = function(){
	      $veiwWidth = $(window).width();
		  var wid = $len * $veiwWidth;
		  if($fx=='left'){$moSroll.css({'width':wid});}
		  if($veiwWidth>1000){
		      if($fx == 'left'){$moSroll.css({'left':-($sep)*$veiwWidth})};
			  $body.css({'width':$veiwWidth,'overflow-x':'hidden'});
			  for(var i=0;i<$len;i++){
			      $sMain.css({'width':$veiwWidth});
				  var oBg=$sMain.children('.bg');
				  oBg.css({'left': -($imgWidth - $veiwWidth)/2});
			  }
		  }else{
		     $body.css({'width':1000});
			 if($fx == 'left'){$moSroll.css({'left':-($sep)*$veiwWidth});}
			 for(var i=0;i<$len;i++){
			      $sMain.css({'width':$veiwWidth});
				  var oBg=$sMain.children('.bg');
				  oBg.css({'left': -($imgWidth - $veiwWidth)/2});
			 }
		 }
	  };
	  
	  $self.toShow = function(){
		  $bBtn = 0;
	      for(var i=0;i<$len;i++){
			 var cls = 'a'+i;
		     $allBtnChild.eq(i).attr('class',cls);
			 $sMain.eq(i).css({'position':'relative'});
		  }
		  $allBtnChild.eq($iNow).addClass('cur');
		  if($iNow>$sep){
			   var l = $fx == 'left'? -($iNow-1)*$veiwWidth:$sMain.height();
			   $moSroll.css({$fx:l});
		  }else{
			   var l = $fx == 'left'? -($iNow+1)*$veiwWidth:$sMain.height();
			   $moSroll.css({$fx:l});
		  }
		   //console.log($fx=='top')
		  var sog = $fx == 'left'?$veiwWidth:$sMain.height();
		  var jos = $fx == 'left'?{'left':-($iNow)*sog}:{'top':-($iNow)*sog} 
		  $moSroll.stop().animate(jos,{duration:500,easing:$easing,complete:function(){
		    	 $sep = $iNow;
		         $bBtn = 1;
			  }
		  });
	  };
	  
	  $self.mouseScroll = function(){
	      function onMouseWheel(ev){
		        var oEvent = ev||event;
				var bDown = true;
				bDown=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
				if($bBtn){
					if(bDown){
						if($iNow<$len-1){
						   $iNow++;
						}else{
						   $iNow = 0;
						}
						$self.toShow()
						
					}else{
						if($iNow<=0){
						   $iNow = $len -1;
						}else{
						   $iNow--;
						}
						$self.toShow()	
					}
				}
				if(oEvent.preventDefault){
					oEvent.preventDefault();
				}
				return false;
		  }
		  
		  $self.mouseover(function(){
			   $self.unbind('mouseover');
	           if(document.addEventListener){
	                document.addEventListener('DOMMouseScroll',onMouseWheel,false);
	           }//W3C
	           window.onmousewheel=document.onmousewheel=onMouseWheel;

		  })
		  //var obj = document.getElementById('outer');
		  //$self.myAddEvent(obj, 'mousewheel', onMouseWheel);
	      //$self.myAddEvent(obj, 'DOMMouseScroll',onMouseWheel);
	  };
	  
	  
	  return $self.init();
  };
})(jQuery)