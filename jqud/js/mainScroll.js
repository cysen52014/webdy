
function nesPic(o){
	this.doc = document;
    this.oPics = this.doc.getElementById(o);
	this.oNics = DomOper.getByClass(this.oPics,'main');
	this.oBtn =  DomOper.getByClass(this.oPics,'allBtn')[0];
	this.mainSroll=DomOper.getByClass(this.oPics,'moSroll')[0];
	this.aA = this.oBtn.getElementsByTagName('a');
	this.oBody = this.doc.getElementsByTagName('body')[0];
	this.veiwWidth = this.doc.documentElement.clientWidth;
	this.iNow = 0;
	this.iNow2 = 0;
	this.bBtn = true;
	this.num = 3;
	this.sep=0;
	this.timer = null;
	this.imgWidth = 1920;
}
nesPic.prototype ={
    init : function(){
	  var This = this;
	  this.toReSize();
	  this.mouseClick();
	  this.topNav();
	  window.onresize = function()
	  {
		This.toReSize();
	  }; 
    },
	mouseClick : function(){
		  var l = this.aA.length;
		  var This = this; 
	      for(var i=0;i<l;i++)
		  {
			This.aA[i].index = i;
			This.aA[i].onclick = function()
			{  
				if(This.bBtn)
				{
					This.iNow = this.index;
					This.iNow2 = this.index;
	
					if(This.sep==This.iNow)
					{
					   return
					}
					
					This.toShow();
	
					This.bBtn = false;
				}
			};
		  }
	},
    toReSize : function(){
		
		this.veiwWidth = this.doc.documentElement.clientWidth;
		this.mainSroll.style.width = this.oNics.length * this.veiwWidth + 'px';
		var l = this.aA.length;
		if(this.veiwWidth>1000)
		{
			this.mainSroll.style.left= -(this.sep)*this.veiwWidth + 'px';
			this.oBody.style.width = this.veiwWidth + 'px';
			this.oBody.style['overflowX']='hidden';
			for(var i=0;i<l;i++)
			{  
				this.oNics[i].style.width = this.veiwWidth + 'px';
				var oBg=DomOper.getByClass(this.oNics[i],'bg')[0];
				oBg.style.left = - (this.imgWidth - this.veiwWidth)/2 + 'px';
			}
		}
		else
		{
			this.oBody.style.width =1000 + 'px';
			this.mainSroll.style.left= -(this.sep)*this.veiwWidth + 'px';
			for(var i=0;i<l;i++)
			{  
			    
				this.oNics[i].style.width = this.veiwWidth + 'px';
				var oBg=DomOper.getByClass(this.oNics[i],'bg')[0];
				oBg.style.left = - (this.imgWidth - this.veiwWidth)/2 + 'px';
			}
		}
	
	},
	toRun : function(){	
	    var l = aA.length;
		var This = this;
		var nl = this.oNics.length;
		for(var i=0;i<l;i++)
		{
			this.aA[i].className = 'a'+i;
			this.oNics[i].style.zIndex = 8;
		}
		this.aA[iNow].className += ' cur';
		this.oNics[this.iNow].style.zIndex = 9;
		DomOper.startMove(This.mainSroll,{left:-(This.iNow2)*This.veiwWidth},function()
		{ 
			if(This.iNow==0)
			{
				This.oNics[0].style.position = 'relative';
				This.oNics[0].style.left = 0;
				This.mainSroll.style.left = 0;
				This.iNow2 = 0;
				
			}
			else if(This.iNow==nl-1)
			{
				This.oNics[nl-1].style.position = 'relative';
				This.oNics[nl-1].style.left = 0;
				This.mainSroll.style.left = -(nl-1)*This.veiwWidth + 'px';
				This.iNow2 = nl-1;
			}
			
			for(var i=0;i<nl;i++)
			{
				oNics[i].style.position = 'absolute';
				oNics[i].style.filter = 'alpha(opacity=0)';
				oNics[i].style.opacity = 0;
			}
			This.mainSroll.style.left = 0;
			This.oNics[This.iNow2].style.filter = 'alpha(opacity=100)';
			This.oNics[This.iNow2].style.opacity = 1;
			This.sep=This.iNow;
			This.bBtn = true;
		});
	},
	toShow : function()
	{
		var nl =this.oNics.length;
		var This = this;
		for(var i=0;i<nl;i++)
		{
			This.aA[i].className = 'a'+i;
			This.oNics[i].style.position = 'relative';
		}
		
		//topBar.style.top=-100+'px';
		This.aA[This.iNow].className +=' cur';
		
		if(This.iNow>This.sep)
		{
		   This.mainSroll.style.left = -(This.iNow-1)*This.veiwWidth + 'px';
		}
		else
		{
		   This.mainSroll.style.left = -(This.iNow+1)*This.veiwWidth + 'px';
		}
		
		DomOper.startMove(This.mainSroll,{left:-(This.iNow)*This.veiwWidth},function()
		{
			//startMove(topBar,{top:0})
			This.sep=This.iNow;
			This.bBtn = true;
		});
		
		
		
	},
	autoPlay : function()
	{  
	    var nl =this.oNics.length;
		var This = this;
		for(var i=0;i<nl;i++)
		{
			This.oNics[i].style.position = 'relative';
			This.oNics[i].style.filter = 'alpha(opacity=100)';
			This.oNics[i].style.opacity = 1;
		}
		
		This.mainSroll.style.left = -(This.iNow)*This.veiwWidth + 'px';
		
		if(This.iNow==This.oNics.length-1)
		{
			This.iNow = 0;
			This.oNics[0].style.position = 'relative';
			This.oNics[0].style.left = nl * This.veiwWidth + 'px';
		}
		else
		{
			This.iNow++;
			
		}
		This.iNow2++;

		This.toRun();
		
	},
	topNav : function(){
	   var doc = document;
	   var topNa = doc.getElementById('topNav');
	   var oUl = DomOper.getByClass(topNa,'u')[0];
	   var al = DomOper.getByClass(topNa,'aClick')[0];
	   var timer = null;
	   al.onmouseover = function(){
		   clearTimeout(timer)
	        DomOper.startMove(oUl,{top:28});
	   }
	   al.onmouseout = function(){
		   timer = setTimeout(function(){
		     DomOper.startMove(oUl,{top:-280});
		   },800)   
	   }
	   oUl.onmouseover = function(){
	      clearTimeout(timer)
	   }
	   oUl.onmouseout = function(){
	      clearTimeout(timer)
		   timer = setTimeout(function(){
		     DomOper.startMove(oUl,{top:-280});
		   },300)
	   }
	}
	

}
