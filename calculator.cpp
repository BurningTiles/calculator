/**
 * Author  : BurningTiles
 * Created : 2021-01-06 12:06:54
 * Link    : BurningTiles.github.io
 * File    : calculator.cpp
**/

#include <bits/stdc++.h>
#define endl '\n'
using namespace std;

int priority (char x){
	if(x=='^') return 3;
	if(x=='*' || x=='/') return 2;
	if(x=='+' || x=='-') return 1;
	return -1;
}

long double str_to_num(string s){
	stringstream ss(s);
	long double tmp;
	ss >> tmp;
	return tmp;
}

void one_operation(vector<char> &op, vector<long double> &v){
	long double b = v.back();
	v.pop_back();
	long double a = v.back();
	v.pop_back();
	char o=op.back();
	op.pop_back();
	if(o=='+') v.push_back(a+b);
	if(o=='-') v.push_back(a-b);
	if(o=='*') v.push_back(a*b);
	if(o=='/') v.push_back(a/b);
	if(o=='^') v.push_back(pow(a,b));
}

long double calculate(string s){
	vector<long double> v; // values
	vector<char> op; // Operators

	int n=s.size();
	long double tmp;

	for(int i=0; i<n; i++){
		if(s[i]==' ') continue;
		if(isdigit(s[i]) || s[i]=='.') {
			int j=i;
			while(i<n && (isdigit(s[i]) || s[i]=='.')) i++;
			v.push_back(str_to_num(s.substr(j, i-j)));
			if(i<n && s[i]=='(')
				op.push_back('*');
			--i;
		}
		else if(s[i]=='(')
			op.push_back(s[i]);
		else if(s[i]==')'){
			while(op.size() && op.back()!='(')
				one_operation(op,v);
			op.pop_back();
			if(i+1<n && (s[i+1]=='(' || isdigit(s[i+1])))
				op.push_back('*');
		}
		else if(s[i]=='+' || s[i]=='-' || s[i]=='*' || s[i]=='/' || s[i]=='^'){
			while(op.size() && priority(op.back()) >= priority(s[i]))
				one_operation(op,v);
			op.push_back(s[i]);
		}
		else{
			cout << "Invalid expression. ";
			return -1;
		}
	}
	
	while(op.size())
		one_operation(op,v);

	return v.back();
}

signed main() {
	string s;
	while(getline(cin, s))
		cout << calculate(s) << endl << endl;

	return 0;
}