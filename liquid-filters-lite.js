


/*
* @version    0.0.7
* @date       2014-03-16
* @stability  2 - Unstable
* @author     Lauri Rooden <lauri@rooden.ee>
* @license    MIT License
*/



!function(P) {
	var A = Array[P]
	, D = Date[P]
	, N = Number[P]
	, S = String[P]
	, formatRe = /\{(?!\\)\s*([$\w]+)((?:(["'\/])(?:\\.|.)*?\3|\-?\d*\.?\d+|[,\s\w|:])*)\}/g
	, filterRe = /\s*\|\s*(\w+)(?:\s*\:((?:(["'\/])(?:\\.|.)*?\3|\-?\d*\.?\d+|[,\s])*))?/g

	S.format = function(data) {
		var args = typeof data == "object" ? data : arguments
		return this.replace(formatRe, function(_, arg, filter) {
			if (filter) {
				var fn = "(_['"+arg+"']||''" + filter.replace(filterRe, ").$1($2") + ")"
				return Fn(fn)(args).format(data)
			}
			return arg in args ? args[arg] : ""
		}).replace(/{\\/g,"{")
	}

	S.safe = function() {
		return this
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/\"/g, "&quot;")
	}


	S.capitalize = function() {
		return this.charAt(0).toUpperCase() + this.slice(1)
	}

	S.lower = S.downcase = S.toLowerCase // lower
	S.upper = S.upcase = S.toUpperCase   // upper
	S.size = A.size = function() {
		return this.length
	}
	S.truncate = function(num) {
		return this.slice(0, num)
	}
	S.truncatewords = function(num) {
		return this.split(" ").splice(0, num).join(" ")
	}
	S.remove = function(str) {
		return this.split(str).join("")
	}
	S.remove_first = function(str) {
		var arr = this.split(str)
		return arr.shift() + arr.join(str)
	}

	S.camelback = function() {
		return this.replace(/[ _-]+([a-z])/g, function(_, a){return a.toUpperCase()})
	}
	S.camelcase = function() {
		return this.camelback().capitalize()
	}
	//*
	S.repeat = S.times = function(times) {
		return times < 1 ? "" : Array(++times).join(this)
	}
	/*/
	// High porformance replace when we should need it
	// http://stackoverflow.com/questions/202605/repeat-string-javascript

	function stringFill3(x, n) {
		var s = '';
		for (;;) {
			if (n & 1) s += x;
			n >>= 1;
			if (n) x += x;
			else break;
		}
		return s;
	}


	//*/


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

	S.step = N.step = S.toAccuracy = N.toAccuracy = function(a) {
		var x = (""+a).split("."), n = ~~((this/a)+.5) * a
		return ""+(1 in x ? n.toFixed(x[1].length) : n)
	}

	S.pick = N.pick = function() {
		var val = this + "="
		for (var s, a = arguments, i = 0, len = a.length; i < len;) {
			s = a[i++]
			if (s.indexOf(val) == 0) {
				s = s.slice(val.length)
				i = len
			}
		}
		return s.replace("#", this)
	}
	S.plural = N.plural = function() {
		// Plural-Forms: nplurals=2; plural=n != 1;
		// http://www.gnu.org/software/gettext/manual/html_mono/gettext.html#Plural-forms
		return arguments[ +Fn("n->n != 1")( parseFloat(this) ) ].replace("#", this)
	}
	S.ordinal = N.ordinal = function() {
		return this+'{0|substr:-1|pick:"1=st","2=nd","3=rd","th"}'.format(""+this)
	}

	function words(input, steps, units, strings, overflow) {
		var n = +input
		, i = 0
		, s = strings || {"default":"{0} {1}{2}"}

		while(n>steps[i])n/=steps[i++]
		if (i == steps.length && overflow) return overflow(this)
		i=units[i]
		n=(n+.5)|0
		return (s[n<2?i:i+"s"]||s["default"]).format(n, i, n<2?"":"s")
	}

	S.humanSize = N.humanSize = function() {
		return words(this, [1024,1024,1024], ["byte","KB","MB","GB"])
	}
	S.humanTime = N.humanTime = function(texts) {
		return words(this, [60,60,24,7,30], ["second","minute","hour","day","week","month"], texts)
	}

	//** Date.daysInMonth
	D.daysInMonth = function() {
		return (new Date(this.getFullYear(),this.getMonth()+1,0)).getDate()
	}
	//*/

	//** Date.startOfWeek
	D.startOfWeek = function() {
		var t = this
		return new Date(t.getFullYear(), t.getMonth(), t.getDate() - (t.getDay() || 7) +1)
	}
	//*/
	//** Date.timeAgo convert dates to human-readable
	D.timeAgo = function(format, custom) {
		var t = this, d = (new Date() - t + 1) / 1000
		return d.humanTime({"default":"{0} {1}{2} ago", "day":"Yesterday"}, function(){return t.format(format)})
	}
	//*/
}("prototype")


