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
	console.log(eq);
	if(eq.includes('+') || eq.includes('-')){
		let a = -1, s = -1;
		for(let i=eq.length-1; i>=0 && a<0 && s<0; i--){
			if(eq[i]=='+') a=i;
			if(eq[i]=='-') s=i;
		}
		if(a>s)
			return cal(eq.slice(0,a)) + cal(eq.slice(a+1,eq.length));
		else
			return cal(eq.slice(0,s)) - cal(eq.slice(s+1,eq.length));
	}
	if(eq.includes('*') || eq.includes('/')){
		let m = -1, d = -1;
		for(let i=eq.length-1; i>=0 && m<0 && d<0; i--){
			if(eq[i]=='*') m=i;
			if(eq[i]=='/') d=i;
		}
		if(m>d)
			return cal(eq.slice(0,m)) * cal(eq.slice(m+1,eq.length));
		else
			return cal(eq.slice(0,d)) / cal(eq.slice(d+1,eq.length));
	}
	return Number(eq);
}
