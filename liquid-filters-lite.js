


/*
* @version  0.0.2
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
	S.truncate = function(num) {
		return this.slice(0, num)
	}
	S.truncatewords = function(num) {
		return this.split(" ").splice(0, num).join(" ")
	}

	A.first = function() {
		return this[0]
	}
	A.last = function() {
		return this[this.length - 1]
	}
	A.pluck = function(name) {
		var t = this, i = t.length, out = []
		while (i--) out[i] = t[i][name]
		return out
	}

}("prototype")


