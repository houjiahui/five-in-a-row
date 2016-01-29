window.onload=function(){
	var play=document.getElementById('play');
	var play2=document.getElementById('play2');
	var textbox=document.getElementById('textbox');
	var ROW=20;
	var width=Math.floor(600-ROW)/ROW+'px';
	var chessboard=document.getElementById('chessboard');
	var shouye=document.getElementById('shouye');
	var jinru=document.getElementById('dianji');
	var beijing=document.getElementById('beijing');
	dianji.onclick=function(){
		shouye.style.display='none';
		beijing.style.display='block';
	}
	chessboard.style.boxShadow='0 8px 22px black';
		for(var i=0;i<ROW;i++){
		var block=document.createElement('div');
			block.style.position='absolute';
			block.style.top=(600/ROW)/2+(600/ROW)*i+'px';
			block.style.width='600px';
			block.style.height='1px';
			block.style.background='white';
			chessboard.appendChild(block);
		var block2=document.createElement('div');
			block2.style.position='absolute';
			block2.style.left=(600/ROW)/2+(600/ROW)*i+'px';
			block2.style.width='1px';
			block2.style.height='600px';
			block2.style.background='white';
			chessboard.appendChild(block2);
		for(var j=0;j<ROW;j++){
			var div=document.createElement('div');
				div.setAttribute('class','block');
				div.setAttribute('id',i+'_'+j);
				div.style.width=width;
				div.style.height=width;
				chessboard.appendChild(div);
		}
	}
	play.onclick=function(){
		play.style.boxShadow='0 5px 18px black';
		var blocks=document.getElementsByClassName('block');
		var kaiguan=true;
		var dict1={};
		var dict2={};
		var panduan=function(id,dic){
			var x=Number(id.split('_')[0]);
			var y=Number(id.split('_')[1]);
			var tx,ty;
			var hang=1;
			tx=x;ty=y;
			while(dic[tx+'_'+(ty+1)]){hang++,ty++};
			tx=x;ty=y;
			while(dic[tx+'_'+(ty-1)]){hang++,ty--};
			if(hang==5)return true;		
			lie=1;
			tx=x;ty=y;
			while(dic[(tx-1)+'_'+ty]){lie++,tx--};
			tx=x;ty=y;
			while(dic[(tx+1)+'_'+ty]){lie++,tx++};
			if(lie==5)return true;
			var zx=1;
			tx=x;ty=y;
			while(dic[(tx-1)+'_'+(ty+1)]){zx++,tx--,ty++};
			tx=x;ty=y;
			while(dic[(tx+1)+'_'+(ty-1)]){zx++,tx++,ty--};
			if(zx==5)return true;
			var hx=1;
			tx=x;ty=y;
			while(dic[(tx-1)+'_'+(ty-1)]){hx++,tx--,ty--};
			tx=x;ty=y;
			while(dic[(tx+1)+'_'+(ty+1)]){hx++,tx++,ty++};
			if(hx==5)return true;
			return false;
		};
		for(var i=0;i<blocks.length;i++){
			blocks[i].onclick=function(){
				var id=this.getAttribute('id');
				if(this.hasAttribute('hasColor'))return;
				if(kaiguan){
				this.style.background='url(./images/qizi.png)';kaiguan=false;
				this.style.backgroundSize='cover';
				this.style.zIndex='1000';
				// this.style.boxShadow='0 2px 12px rgba(76, 74, 74, 0.72) inset';
				if(panduan(id,dict1)){
					textbox.style.display='block';
					textbox.innerHTML='白棋赢了';
					play2.style.webkitTransform='scale(1.2,1.2)';
					play2.style.boxShadow='0 5px 18px black';
					play2.onclick=function(){
						play.style.webkitTransform='scale(1.2,1.2)';
						play2.style.boxShadow='none';
						location.reload();
					};
				};
				dict1[id]=true;				
				}else{
					this.style.background='url(./images/heizi.png)';kaiguan=true;
					this.style.backgroundSize='cover';
					this.style.zIndex='1000';
				    // this.style.boxShadow='0 0 6px rgba(254, 254, 254, 0.81) inset';
				      if(panduan(id,dict2)){
						textbox.style.display='block';
						textbox.innerHTML='黑棋赢了';
						play2.onclick=function(){
							play.style.webkitTransform='scale(1.2,1.2)';
							play2.style.boxShadow='none';
							location.reload();
					};
				  };
				      dict2[id]=true;
				  }
				  this.setAttribute('hasColor','true');
			};
		}
	};
	document.onkeydown=function(e){
		e.preventDefault();
	}	
};