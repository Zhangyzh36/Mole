window.onload = function(){
	var time = 30;
	var score = 0;
	var mole_index = -1;
	var in_game = false;
	var temp = false;
	var timer = null;
	
	function random_mole() {
		var random_num = Math.random()*60;
		var random_mole_index = Math.floor(random_num);
		while (random_mole_index == mole_index) {
			random_num = Math.random()*60;
			random_mole_index = Math.floor(random_num);
		}
		mole_index = random_mole_index;
		document.getElementsByClassName("decoration")[mole_index].className = "decoration_changed";
		document.getElementsByTagName("input")[mole_index].className = "radio_button_changed";
	}

	function update_score() {
		var score_text = document.getElementById("score_field");
		score_text.textContent = "" + score;
	}

	function update_state() {
		var state_text = document.getElementById("game_state");
		
		if (in_game && !temp)
			state_text.textContent = "Playing";
		else if(in_game && temp)
			state_text.textContent = "To be continued...";
		else if(!in_game)
			state_text.textContent = "Game Over";
	}

	function update_time() {
		var time_text = document.getElementById("time_field");
		time_text.textContent = "" + time;
		time--;
		if (time < 0)
		{
			in_game = false;
			update_state();
			stop_timer();
		}
	}

	function clear_map() {
		var li1 = document.getElementsByClassName("decoration_changed");[0].className = "decoration";
		var li2	= document.getElementsByClassName("radio_button_changed");[0].className = "radio_button";
		if (li1.length > 0)
			li1[0].className = "decoration";
		if (li2.length > 0)
			li2[0].className = "radio_button";
	}

	function start_timer() {
		update_time();
		timer = setInterval(update_time, 1000);
	}

	function stop_timer() {
		clearInterval(timer);
		timer = null;
		if (!in_game)
		{
			setTimeout(delayMsg, 500);
		}
	}

	function delayMsg() {
		alert("Game Over.\nYour score is: " + score);
			temp = false;
			time = 30;
			score = 0;
	}

	var startOver =  document.getElementById("start_stop_button");
	startOver.onmousedown = function(event) {
		event.target.className = "blue_start_stop";
	}

	startOver.onmouseup = function(event) {
		event.target.className = "start_stop";
		
		if (!in_game)
		{
			in_game = true;
			clear_map();
			start_timer();
			random_mole();
			update_score();
			update_state();

		}
		else if (in_game && !temp)
		{
			time++;
			temp = true;
			stop_timer();
			update_state();
		}
		else if(in_game || temp)
		{
			temp = false;
			start_timer();
			update_state();

		}
		
	}
	


	var list = document.getElementsByTagName("input");
	for (var i = 0; i < list.length; ++i)
	{
		list[i].onclick = function(event) {
			
			if (in_game && !temp)
			{ 
				if (event.target.className == "radio_button_changed")
				{
					document.getElementsByClassName("decoration_changed")[0].className = "decoration";
					document.getElementsByClassName("radio_button_changed")[0].className = "radio_button";
					score++;
					update_score();
					random_mole();
				}
				else 
				{
					if(score > 0)
						score--;
					update_score();
				}
			}
		}
	}
}