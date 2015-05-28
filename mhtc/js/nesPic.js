// JavaScript Document
function nesPic(o,m,s,b,res)
{
    var oPics = document.getElementById(o);
	var oNics = getByClass(oPics,m);
	var oBtn = getByClass(oPics,b)[0];
	var mainSroll=getByClass(oPics,s)[0];
	var oBox = getByClass(oPics,'box');
	var aA = oBtn.getElementsByTagName('a');
	//var topBar = getByClass(oPics,'topBar')[0];
	var oBody = document.getElementsByTagName('body')[0];
	var veiwWidth = document.documentElement.clientWidth;
	var iNow = 0;
	var iNow2 = 0;
	var bBtn = true;
	var num = 3;
	var sep=0;
	var timer = null;
	var imgWidth = 1920;

	function toReSize()
	{
		
		veiwWidth = document.documentElement.clientWidth;
		mainSroll.style.width = oNics.length * veiwWidth + 'px';
		
		if(veiwWidth>1000)
		{
			mainSroll.style.left= -(sep)*veiwWidth + 'px';
			oBody.style.width = veiwWidth + 'px';
			oBody.style['overflowX']='hidden';
			for(var i=0;i<aA.length;i++)
			{  
				oNics[i].style.width = veiwWidth + 'px';
				var oBg=getByClass(oNics[i],'bg')[0];
				oBg.style.left = - (imgWidth - veiwWidth)/2 + 'px';
			}
		}
		else
		{
			oBody.style.width =1000 + 'px';
			mainSroll.style.left= -(sep)*veiwWidth + 'px';
			for(var i=0;i<aA.length;i++)
			{  
			    
				oNics[i].style.width = veiwWidth + 'px';
				var oBg=getByClass(oNics[i],'bg')[0];
				oBg.style.left = - (imgWidth - veiwWidth)/2 + 'px';
			}
		}
	
	}
	
	
	toReSize();
	
	window.onresize = function()
	{
		toReSize();
	}; 
		

	
	
	for(var i=0;i<aA.length;i++)
	{
		aA[i].index = i;
		/*oNics[i].onmouseover=function()
		{
		    clearInterval(timer);
		}
		oNics[i].onmouseout=function()
		{
		    timer = setInterval(autoPlay,5000);
		}*/
		aA[i].onclick = function()
		{
			if(bBtn)
		    {
				//clearInterval(timer);
				//timer = setInterval(autoPlay,5000);
				iNow = this.index;
				iNow2 = this.index;

				if(sep==iNow)
				{
				   return
				}
                
			    toShow();

				bBtn = false;
			}
		};
	}
	
	
	function toRun()
	{	
		for(var i=0;i<aA.length;i++)
		{
			aA[i].className = '';
			oNics[i].style.zIndex = 8;
		}
		aA[iNow].className = 'a'+iNow;
		oNics[iNow].style.zIndex = 9;
		startMove(mainSroll,{left:-(iNow2)*veiwWidth},function()
		{ 
			if(iNow==0)
			{
				oNics[0].style.position = 'relative';
				oNics[0].style.left = 0;
				mainSroll.style.left = 0;
				iNow2 = 0;
				
			}
			else if(iNow==oNics.length-1)
			{
				oNics[oNics.length-1].style.position = 'relative';
				oNics[oNics.length-1].style.left = 0;
				mainSroll.style.left = -(oNics.length-1)*veiwWidth + 'px';
				iNow2 = oNics.length-1;
			}
			
			for(var i=0;i<oNics.length;i++)
			{
				oNics[i].style.position = 'absolute';
				oNics[i].style.filter = 'alpha(opacity=0)';
				oNics[i].style.opacity = 0;
			}
			mainSroll.style.left = 0;
			oNics[iNow2].style.filter = 'alpha(opacity=100)';
			oNics[iNow2].style.opacity = 1;
			sep=iNow;
			bBtn = true;
		});
	}
	
	
	
	function toShow()
	{
		
		for(var i=0;i<oNics.length;i++)
		{
			aA[i].className = '';
			oNics[i].style.position = 'relative';
			if(i!=0)
			{
			   oBox[i].style.top=-580 + 'px'
			}
		}
		
		//topBar.style.top=-100+'px';
		aA[iNow].className = 'a'+iNow;
		
		if(iNow>sep)
		{
		   mainSroll.style.left = -(iNow-1)*veiwWidth + 'px';
		}
		else
		{
		   mainSroll.style.left = -(iNow+1)*veiwWidth + 'px';
		}
		
		startMove(mainSroll,{left:-(iNow)*veiwWidth},function()
		{
			//startMove(topBar,{top:0})
			sep=iNow;
			bBtn = true;
		});
		if(iNow!=0)
		{
		   setTimeout(function(){startMove(oBox[iNow],{top:180})},800)
		}
		
		
		
	}
	
	//timer = setInterval(autoPlay,5000);
	
	function autoPlay()
	{
		for(var i=0;i<oNics.length;i++)
		{
			oNics[i].style.position = 'relative';
			oNics[i].style.filter = 'alpha(opacity=100)';
			oNics[i].style.opacity = 1;
		}
		
		mainSroll.style.left = -(iNow)*veiwWidth + 'px';
		
		if(iNow==oNics.length-1)
		{
			iNow = 0;
			oNics[0].style.position = 'relative';
			oNics[0].style.left = oNics.length * veiwWidth + 'px';
		}
		else
		{
			iNow++;
			
		}
		iNow2++;

		toRun();
		
	}
	
	
	
}