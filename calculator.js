window.onload = function () {
	let buttons = document.querySelectorAll(".btn");
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener("click", function (e) {
			var n = e.target.value;
			let eq = document.getElementById("display");
			if (eq.innerHTML == "0" || eq.innerHTML == "NaN") eq.innerHTML = "";
			eq.innerHTML += n;
			console.log(n);
		});
	}
};

function clearDisplay() {
	let eq = document.getElementById("display");
	eq.innerHTML = "0";
	console.log("cleared");
}

function calculate() {
	let eq = document.getElementById("display");
	console.log(eq.innerHTML);
	eq.innerHTML = cal(eq.innerHTML);
	console.log("calculated");
}

function back() {
	let eq = document.getElementById("display");
	if (eq.innerHTML.length == 1) eq.innerHTML = "0";
	else eq.innerHTML = eq.innerHTML.slice(0, -1);
	console.log("back");
}

function cal(eq) {
	if(eq.includes('+')){
		let tmp = eq.split('+',2);
		return cal(tmp[0]) + cal(tmp[1]);
	}
	if(eq.includes('-')){
		let tmp = eq.split('-',2);
		return cal(tmp[0]) - cal(tmp[1]);
	}
	if(eq.includes('*') || eq.includes('/')){
		let m = -1, d = -1;
		for(let i=eq.length-1; i>=0; i--){
			if(eq[i]=='*'){
				m=i;
				break;
			}
			if(eq[i]=='/'){
				d=i;
				break;
			}
		}
		if(m>d)
			return cal(eq.slice(0,m)) * cal(eq.slice(m+1,eq.length));
		else
			return cal(eq.slice(0,d)) / cal(eq.slice(d+1,eq.length));
	}
	return Number(eq);
}
