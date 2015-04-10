


/*
 * @version    0.1.5
 * @date       2015-04-09
 * @stability  2 - Unstable
 * @author     Lauri Rooden <lauri@rooden.ee>
 * @license    MIT License
 */



!function(prototype) {
	var A = Array[prototype]
	, D = Date[prototype]
	, N = Number[prototype]
	, S = String[prototype]
	, formatRe = /{(?!\\)((?:(["'/])(?:\\?.)*?\2|[^}])*)}/g
	, filterRe = /\|\s*(\w+)(?:\s*\:((?:(["'\/])(?:\\?.)*?\3|[^|])*))?/g
	, digitRe = /^\s*\d+/
	, unescapeRe = /{\\/g

	S.format = function(data) {
		var args = typeof data == "object" ? data : arguments
		return this.replace(formatRe, function(_, arg) {
			return Fn(arg.replace(digitRe, "_[$&]").replace(filterRe, ".$1($2)"), "_")(args)
		}).replace(unescapeRe, "{")
	}

	N.format = function(data) {
		return ("" + this).format(data)
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
		return this.split(" ").slice(0, num).join(" ")
	}
	S.remove = function(str) {
		return this.split(str).join("")
	}

	S.camelCase = function() {
		return this.replace(/[ _-]+([a-z])/g, function(_, a){return a.toUpperCase()})
	}
	//*
	S.repeat = S.times = function(times) {
		return times < 1 ? "" : Array(times + 1).join(this)
	}
	/*/
	// High porformance repeat when we should need it
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
		for (var arr = this, i = arr.length, out = []; i--; ) out[i] = arr[i][name]
		return out
	}

	S.step = N.step = S.toAccuracy = N.toAccuracy = function(step, roundUp) {
		var part = ("" + step).split(".")
		, b = this / step
		, n = ~~(b + (roundUp && b != ~~b ? 1 : roundUp == null ? .5 : 0)) * step
		return 1 in part ? n.toFixed(part[1].length) : "" + n
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
		return this + '{0|substr:-1|pick:"1=st","2=nd","3=rd","th"}'.format("" + this)
	}

	function words(input, steps, units, strings, overflow) {
		var n = +input
		, i = 0
		, s = strings || {"default": "{0} {1}{2}"}

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
		var date = this
		return new Date(date.getFullYear(), date.getMonth(), date.getDate() - (date.getDay() || 7) +1)
	}
	//*/
	//** Date.timeAgo convert dates to human-readable
	D.timeAgo = function(format, custom) {
		var date = this
		, d = (new Date() - date + 1) / 1000
		return d.humanTime({"default": "{0} {1}{2} ago", "day":"Yesterday"}, function(){return date.format(format)})
	}
	//*/
}("prototype")


