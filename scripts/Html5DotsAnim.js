//
//---------------------------   canvas local variables   ---------------------->>
//
// var endAngle=2*Math.PI,can_width=1E3,can_height=560,balls_count=600,speed=0.96,A=[],canvas,context,math_abs,div_outer,client_x_offset,client_y_offset,x,y,client_x_offset_old,client_y_offset_old,mouse_pressed;
var endAngle=2*Math.PI,
	can_width=640,
	can_height=640,
	balls_count=100,
	speed=0.96,
	ar_balls=[],
	canvas,
	context,
	math_abs,
	div_outer,
	client_x_offset,
	client_y_offset,
	x,
	y,
	client_x_offset_old,
	client_y_offset_old,
	mouse_pressed,
	interval_id,
	max_ball_radius=8.0,
	loop_time = 33;

function Ball(){
	this.color="rgb("+Math.floor(255*Math.random())+","+Math.floor(255*Math.random())+","+Math.floor(255*Math.random())+")";
	this.b=this.a=this.x=this.y=0;
	this.size=1;
}

//
//----------------------------------------   initial dropdown options --------------------------------->>
//	
/*
$('#sel_balls_count').children(":nth-child(3)").prop('selected', 'selected');
$('#sel_balls_radius').children(":nth-child(4)").prop('selected', 'selected');
$('#sel_loop_time').children(":nth-child(5)").prop('selected', 'selected');
*/
	
//
//---------------------------   init function   ---------------------->>
//
function init(){
	//
	//---------------------------   canvas   ---------------------->>
	//	
	// alert('-- 1 --');
	canvas=document.getElementById("mainCanvas");
	// alert('-- 2 --');
	
	if(canvas.getContext){
		// alert('-- 3 --');
		div_outer=document.getElementById("outer");
		math_abs=document.getElementById("canvasContainer");
		context=canvas.getContext("2d");
		
		// alert('-- 4 --');
		// alert('-- balls_count = ' + balls_count);		
		
		client_x_offset=client_x_offset_old=0.5*can_width;
		client_y_offset=client_y_offset_old=0.5*can_height;		

		
	//---------------------------   initial select properties   ---------------------->>
		setInitialSettings();
		// alert('-- 4 --');
		
		//
		//----------------------------------------   button handlers --------------------------------->>
		//
		$('#sel_balls_count').change(function(){
			var val_01 = $(this).val();
			balls_count = Number(val_01);
			startBallsAnimation();
		});    
		
		$('#sel_balls_radius').change(function(){
			var val_02 = $(this).val();
			max_ball_radius = Number(val_02);	  
			startBallsAnimation();
		});
		
		$('#sel_loop_time').change(function(){
			var val_03 = $(this).val();
			loop_time = Number(val_03);	  
			startBallsAnimation();
		});	
		
			// but_anim
		$('#but_anim').click(function(e){
		   e.preventDefault();
		  
		  // reset settings to default
		  setInitialSettings();
		});	
		
		//
		//----------------------------------------   mouse events --------------------------------->>
		//
		$('#mainCanvas').mousemove(function(e){
			client_x_offset = e.clientX-div_outer.offsetLeft-math_abs.offsetLeft;
			client_y_offset = e.clientY-div_outer.offsetTop-math_abs.offsetTop;
			e.stopPropagation();
		});		
		$('#mainCanvas').mousedown(function(e){
			// alert('-- onMouseDown() --');
			e.stopPropagation();
			mouse_pressed=!0;
			return!1
		});		
		$('#mainCanvas').mouseup(function(e){
			// alert('-- onMouseUp() --');
			e.stopPropagation();
			return mouse_pressed=!1
		});		
			
		
		//++
		startBallsAnimation();



		
		
		// startBallsAnimation();
	}
	else {
		alert('-- 7 --');
		document.getElementById("output").innerHTML="Sorry, needs a recent version of Chrome, Firefox, Opera, Safari, or Internet Explorer 9."
	}

	
	// return setInterval(draw,loop_time);
}	

//
//---------------------------   initial dropboxes properties   ---------------------->>
//
	function setInitialSettings(){
		
		$('#sel_balls_count').children(":nth-child(3)").prop('selected', 'selected');
		var val_01 = $('#sel_balls_count').val();
		balls_count = Number(val_01);

		$('#sel_balls_radius').children(":nth-child(4)").prop('selected', 'selected');
		var val_02 = $('#sel_balls_radius').val();
		max_ball_radius = Number(val_02);	 	
		
		$('#sel_loop_time').children(":nth-child(5)").prop('selected', 'selected');
		var val_03 = $('#sel_loop_time').val();
		loop_time = Number(val_03);	 	
		
		startBallsAnimation();	
	}	
	




	
	//
	//---------------------------   draw function   ---------------------->>
	//		
	function draw(){
		// alert('-- 4 --');
		
		context.globalCompositeOperation="source-over";
		context.fillStyle="rgba(8,8,12,0.65)";
		context.fillRect(0,0,can_width,can_height);
		context.globalCompositeOperation="lighter";
		x=client_x_offset-client_x_offset_old;
		y=client_y_offset-client_y_offset_old;
		client_x_offset_old=client_x_offset;
		client_y_offset_old=client_y_offset;
		
		// alert('-- 8 --');
		
		for(var can_width_86perc=0.86*can_width, 
			can_width_12perc=0.125*can_width, 
			div_outer=0.5*can_width, 
			math_random=Math.random, 
			math_abs=Math.abs, 
			cur_balls_cnt=balls_count; 
			cur_balls_cnt--;){
			
			// alert('-- 8 --');
			 // alert('-- can_width_86perc = ' + can_width_86perc + ', can_width_12perc = ' + can_width_12perc + ', cur_balls_cnt = ' + cur_balls_cnt);
			
			var cur_ball=ar_balls[cur_balls_cnt],
			arc_x=cur_ball.x,
			arc_y=cur_ball.y,
			a=cur_ball.a,
			b=cur_ball.b,
			arc_radius=arc_x-client_x_offset,
			k=arc_y-client_y_offset,
			g=Math.sqrt(arc_radius*arc_radius+k*k)||0.001,
			arc_radius=arc_radius/g,
			k=k/g;
			
			// alert('-- 9 --');
			// alert('-- arc_x = ' + arc_x + ', arc_y = ' + arc_y);
				
			if(mouse_pressed && g<div_outer) {
				var s=14*(1-g/div_outer), 
				a=a+(arc_radius*s+0.5-math_random()), 
				b=b+(k*s+0.5-math_random());
			}
			g<can_width_86perc&&(s=0.0014*(1-g/can_width_86perc)*can_width, a-=arc_radius*s, b-=k*s);
			g<can_width_12perc&&(arc_radius=2.6E-4*(1-g/can_width_12perc)*can_width, a+=x*arc_radius, b+=y*arc_radius);
			a*=speed;
			b*=speed;
			arc_radius=math_abs(a);
			k=math_abs(b);
			g=0.5*(arc_radius+k);
			0.1>arc_radius&&(a*=3*math_random());
			0.1>k&&(b*=3*math_random());
			
			// arc_radius=0.45*g;
			<!-- arc_radius=4.44*g; -->
			arc_radius=(max_ball_radius/2.0)*g;
			
			
			// arc_radius=Math.max(Math.min(arc_radius,3.5),0.4);
			<!-- arc_radius=Math.max(Math.min(arc_radius,8.8),0.4); -->
			arc_radius=Math.max(Math.min(arc_radius,max_ball_radius),0.4);
			
			arc_x+=a;
			arc_y+=b;
			arc_x>can_width?(arc_x=can_width,a*=-1):0>arc_x&&(arc_x=0,a*=-1);
			arc_y>can_height?(arc_y=can_height,b*=-1):0>arc_y&&(arc_y=0,b*=-1);
			cur_ball.a=a;
			cur_ball.b=b;
			cur_ball.x=arc_x;
			cur_ball.y=arc_y;
			context.fillStyle=cur_ball.color;
			
			context.beginPath();
			context.arc(arc_x,arc_y,arc_radius,0,endAngle,!0);
			context.closePath();
			
			context.fill();
		}		
		// alert('-- 9 --');
	}	
	

	
//
//---------------------------   function startBallsAnimation()   ---------------------->>
//
	/* Заселяю массив шаров + запускаю анимацию  */
	function startBallsAnimation(){
		// balls_count
		$('#lbl_balls_count').text('Кол-во: ' + balls_count);
		
		// balls_radius
		$('#lbl_balls_radius').text('Радиус: ' + max_ball_radius);		
		
		// loop_time
		$('#lbl_loop_time').text('Loop time: ' + loop_time);				
		
		
		for(var d=balls_count;d--;){
			// alert('-- d = ' + d);	
			var ball=new Ball;
			
			ball.x=0.5*can_width;
			ball.y=0.5*can_height;
			ball.a=34*Math.cos(d)*Math.random();
			ball.b=34*Math.sin(d)*Math.random();
			ar_balls[d]=ball;
		}	
		
		if (interval_id > 0) {
			// alert('-- clearing interval_id = ' + interval_id);		
			clearInterval(interval_id);
		}
		// interval_id = setInterval(draw,33);
		interval_id = setInterval(draw,loop_time);
		// alert('-set -interval_id = ' + interval_id);
	}
	




//
//---------------------------   jQuery function   ---------------------->>
//
$(function(){
	init();
});