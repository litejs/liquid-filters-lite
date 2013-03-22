


/*
* @version  0.0.1
* @author   Lauri Rooden - https://github.com/litejs/liquid-filters-lite
* @license  MIT License  - http://lauri.rooden.ee/mit-license.txt
*/



!function(P) {
	var A = Array[P]
	, N = Number[P]
	, S = String[P]

	S.capitalize = function() {
		return this.charAt(0).toUpperCase() + this.slice(1)
	}

	S.downcase = S.toLowerCase
	S.upcase = S.toUpperCase
	S.size = A.size = function() {
		return this.length
	}
	A.first = function() {
		return this[0]
	}
	A.last = function() {
		return this[this.length - 1]
	}
	A.sort = function() {
		//TODO: should we make a copy of array?
		sort(this)
		return this
	}

}("prototype")


