// JavaScript Document


var DomOper = {
    getByClass : function(oParent,sClass){
		var oEla=oParent.getElementsByTagName("*"),
		re = new RegExp('\\b'+sClass+'\\b','i'),
        sResult=[];
		l=oEla.length
		for(var i=0;i<l;i++){
		   if(re.test(oEla[i].className)){
		      sResult.push(oEla[i])
		   }
		}
		return sResult
	},
	getByStyle : function(obj,name){
	    if(obj.currentStyle){
		   return obj.currentStyle[name];
		}else{
		   return getComputedStyle(obj,false)[name];
		}
	},
	startMove : function(obj,json,fnEnd){
	    clearInterval(obj.timer); 
	    obj.timer=setInterval(function(){
		  var bStop=true;
		  for(var attr in json)
		  {  
			  var cur=0;
			  if(attr=='opacity')
			  {
				 cur=Math.round(parseFloat(DomOper.getByStyle(obj,attr))*100);
			  }
			  else
			  {
				 cur=parseInt(DomOper.getByStyle(obj,attr));
			  }
			  var speed=(json[attr]-cur)/4;
			  speed=speed>0?Math.ceil(speed):Math.floor(speed);
			  if(cur!=json[attr]) bStop=false;
			  if(attr=='opacity')
			  {
				 obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				 obj.style.opacity=(cur+speed)/100;
			  }
			  else
			  {  
				 obj.style[attr]=cur+speed+"px";
			  }  
		  }
		  if(bStop)
		  {
			clearInterval(obj.timer)
			if(fnEnd)fnEnd();
		  }
		  },40);
	}
}

function comondJs(){
	this.sel = 4;
    this.st = 4;
    this.oparent = document.getElementById('mScroll');
	this.al = DomOper.getByClass(this.oparent,'getAll')[0].getElementsByTagName('a');
	this.aLi = DomOper.getByClass(this.oparent,'special')[0].getElementsByTagName('li');
    this.ac = [];
    this.op = 1;
	this.sat = 1;
}


comondJs.prototype = {
   init : function(){
	  this.toMove();
	  this.moveScroll()
   },
   toSold : function(n){
       var arr = [0,1,2,3,4,5,6,7,8,9];
	   var arr2 = [0,1,2,3,4,5,6,7,8,9];
	   var al = arr.length;
	   if(n>0){
		   var l = arr.splice(0,n),v = arr2.splice(n,al),len = l.length; 
		   for(var i=0;i<len;i++){
		      v.push(l[i]);
		   }
		
	   }else{
	       var l = arr.splice(al+n,al),v = arr2.splice(0,al+n),len = l.length; 
		   for(var i=len-1;i>=0;i--){
		      v.unshift(l[i])
		   }
		  
	   }
	    
	   return v
   },
   toMove : function(){
	   
	   var This = this;
	   var allen =  this.al.length;
           
       
	   for(var i=0;i<allen;i++){
		   this.ac.push(parseInt(DomOper.getByStyle(this.al[i],'left')))
		   this.al[i].index = i;
           
		   this.al[i].onclick = function(){
			  if(This.op&&this.index!=This.st){
			     This.toStat(this);
			  }         
            }
              
	   }
	   
	   //this.al[9].click();
   },
   moveScroll : function(){
	      var This = this;    
          function onMouseWheel(ev){
				var oEvent = ev||event;
				var bDown = true;
	            var allen =  This.al.length; 
				bDown=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
				for(var i=0;i<allen;i++){
				   var n = This.al[i].className;
				   if(n.indexOf('cur')!=-1){
					   This.n = This.al[i].index;
				   }
				}
				//console.log(This.n)
				if(This.op){
					if(bDown)
					{
						if(This.n<allen-1){
						   This.n++;
						}else{
						   This.n = 0;
						}
						This.toStat(This.al[This.n])
						
					}
					else
					{
					    if(This.n<=0){
						   This.n = allen-1;
						}else{
						   This.n--;
						}
						This.toStat(This.al[This.n])	
						//console.log(This.n)
					}
				}
				
				if(oEvent.preventDefault)
				{
					oEvent.preventDefault();
				}
				
				return false;
		  } 
          this.myAddEvent(This.oparent, 'mousewheel', onMouseWheel);
	      this.myAddEvent(This.oparent, 'DOMMouseScroll',onMouseWheel);
          
	 
   },
   toStat : function(th){
        var This = this;
        var allen =  this.al.length;
        var q = 4;
	    var num = th.index - This.sel;
	    var gc = This.toSold(num);
	    var ol = parseInt(th.style.left) || parseInt(DomOper.getByStyle(th, 'left'));
        This.op = 0;
 
        
	    for (var i = 0; i < allen; i++) {
		    This.aLi[i].className= 'l'+i;
			This.al[i].className= 'a'+i;
			if(ol>332){
				q = Math.floor((parseInt(th.offsetLeft) - 332) / 81);
				for(var j = allen - q; j < allen; j++){
				   This.al[gc[j]].style.left = This.ac[j] + q*81 + 'px';
				   This.aLi[gc[j]].style.left = This.ac[j] + q*81 + 'px';
				}
			}else{
			    q = Math.floor((332 - parseInt(th.offsetLeft)) / 81);
				for(var j = 0; j < q; j++){
				   This.al[gc[j]].style.left = This.ac[j] - q*81 + 'px';
				   This.aLi[gc[j]].style.left = This.ac[j] - q*81 + 'px';
				   //console.log()
				}
			}
			DomOper.startMove(This.al[gc[i]], {left: This.ac[i]},function() {This.op = 1;This.st = th.index;});
			DomOper.startMove(This.aLi[gc[i]], {left: This.ac[i] },function(){})
		}
        This.aLi[th.index].className+= ' on';
	    This.al[th.index].className+= ' cur';
	    
   },
   myAddEvent : function(obj, sEvent, fn){
        if(obj.attachEvent)
		{
			obj.attachEvent('on'+sEvent, fn);
		}
		else
		{
			obj.addEventListener(sEvent, fn, false);
		}
   }
   
}


function toRound(){
    
}

toRound.prototype = {
   init : function(){
	    this.oparent = document.getElementById('play'),
		this.oLi = this.oparent.getElementsByTagName('li'),
		this.boxHeight=parseInt(DomOper.getByStyle(this.oparent,'height')),
		this.boxCenX=parseInt(DomOper.getByStyle(this.oparent,'width'))/2,
		this.boxCenY=parseInt(DomOper.getByStyle(this.oparent,'height'))/2,
		this.prev=DomOper.getByClass(this.oparent,'prev')[0],
		this.next=DomOper.getByClass(this.oparent,'next')[0],
		this.arVersion = navigator.appVersion.split("MSIE") 
        this.version = parseFloat(this.arVersion[1]);
		this.s=50,
		this.arr=[];
		this.toMove(this.oLi);
        this.gotLef();
		this.gotRight();
		this.showPic('slides')
   },
   toMove : function(oLi){
	   var l = oLi.length;
       for(var i=0;i<l;i++){
	       var hu=(360/l)*Math.PI/180,
		   x=this.s*Math.sin(i*hu),
		   y=this.s*Math.cos(i*hu),
		   oImg=this.oLi[i].getElementsByTagName("img")[0];
		   switch(i){
		       case 0:
		 　　    oLi[0].style.left=110+'px';
				oLi[0].style.top=0+'px';
				oLi[0].style.width =690+'px';
				oLi[0].style.height =352+'px';
		 　　    break;
		       case 1:
		　　     oLi[1].style.left=0+'px';
				oLi[1].style.top=20+'px';
				oLi[1].style.width =550+'px';
				oLi[1].style.height =280+'px';
				oLi[1].style.zIndex=3;
		　　     break;
		       case 2:
		　　     oLi[2].style.left=360+'px';
				oLi[2].style.top=20+'px';
				oLi[2].style.width =550+'px';
				oLi[2].style.height =280+'px';
				oLi[2].style.zIndex=3;
		　　     break;
		   }
		   //this.oLi[i].style.left=this.boxCenX-x-oImg.offsetWidth/2+'px';
		   //this.oLi[i].style.top=(this.boxHeight-oImg.offsetHeight)/2+'px';
		   this.arr.push([parseInt(this.oLi[i].style.left),parseInt(this.oLi[i].style.top),Math.round(parseFloat(DomOper.getByStyle(this.oLi[i], "opacity"))*100),DomOper.getByStyle(this.oLi[i],"zIndex"),oImg.offsetWidth,oImg.offsetHeight]);
		   
	   }
   },
   toChang : function(os){
	    var l = this.oLi.length;
		var This = this;
        for(var i=0;i<l;i++){
			DomOper.startMove(this.oLi[i],{left:this.arr[i][0],top:this.arr[i][1],width:this.arr[i][4],height:this.arr[i][5]},function(){
			   for(var i=0;i<3;i++){
				   switch(This.arr[i][0]){
						  case 0: 
						  os = DomOper.getByClass(This.oLi[i],'s')[0];
						  os.style.display='block';
						  os.style.left=4+'px';
						  DomOper.startMove(os,{left:2})
						  break;
						  case 360:
						  os = DomOper.getByClass(This.oLi[i],'s')[0];
						  os.style.display='block';
						  os.style.left=427+'px';
						  DomOper.startMove(os,{left:428})
						  break;
				   }
			   }
			});
			//var oImg=this.oLi[i].getElementsByTagName("img")[0];	
			var oSpan=this.oLi[i].getElementsByTagName("a")[0].children[0];	
			this.oLi[i].style.zIndex=this.arr[i][3];	
			
			//DomOper.startMove(oSpan,{width:this.arr[i][4],height:this.arr[i][5]});
		}
   },
   gotLef : function(){
	    var This = this;
		var os = ''
	    this.next.onclick = function(){
			This.arr.push(This.arr[0]);
			This.arr.shift();
			for(var i=0;i<3;i++){
			   if(This.arr[i][0]==110){
			      os = DomOper.getByClass(This.oLi[i],'s')[0];
				  os.style.display='none';
			   }
			}
			This.toChang(os);
		}
   },
   gotRight : function(){
        var This = this;
		var os = ''
	    this.prev.onclick = function(){
			This.arr.unshift(This.arr[This.arr.length-1]);
			This.arr.pop();
			for(var i=0;i<3;i++){
			   if(This.arr[i][0]==110){
			      os = DomOper.getByClass(This.oLi[i],'s')[0];
				  os.style.display='none';
			   }
			}
			This.toChang(os);
		}
   },
   
   showPic : function(obj)
   {  
		var oDiv = document.getElementById(obj);
		var oUl = oDiv.getElementsByTagName('ul')[0];
		var aLi = oUl.getElementsByTagName('li');
		var aImg = oUl.getElementsByTagName('img');
		var oBtn = DomOper.getByClass(oDiv,'btn')[0];
		var aA = oBtn.getElementsByTagName('a');
		var iNow = 0;
		var iNow2 = 0;
		var l = aA.length;
		
		

		for(var i=0;i<l;i++)
		{
			aA[i].index = i;
			
			aA[i].onmouseover = function()
			{
				clearInterval(timer)
				var oLi=aLi[this.index]
				
				for(var i=0;i<l;i++)
				{
					aA[i].className = '';
					aLi[i].style.zIndex=9;
					DomOper.startMove(aLi[i],{'opacity' : 0});
				}
				this.className = 'active';
				oLi.style.zIndex=10;
				DomOper.startMove(oLi,{'opacity' : 100});
				this.onmouseout=function()
				{
				  timer=setInterval(toRun,2000);
				}
			};
		
		}
		
		
		var timer=setInterval(toRun,3000);
		
		function toRun()
		{
		
			if(iNow == l-1)
			{
				iNow = 0;
			}
			else
			{
				iNow++;
			}
					
			for(var i=0;i<l;i++)
			{
				aA[i].className = '';
				aLi[i].style.zIndex=9;
				DomOper.startMove(aLi[i],{'opacity' :0});
			}
			
			aA[iNow].className = 'active';
			aLi[iNow].style.zIndex=10;
			DomOper.startMove(aLi[iNow],{'opacity' : 100});
	
			
		}
   }
    
}


