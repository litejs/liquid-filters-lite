process.chdir( process.argv[1].replace(/[^/]+$/, "") )

require("../liquid-filters-lite.js")


var found = 0
, failed = []
, out = 
	[ "ab cd".capitalize() , "Ab cd"
	, "AbCd".downcase() , "abcd"
	, "AbCd".upcase() , "ABCD"
	, "abc".size() , 3
	, ["a","b","c"].size() , 3
	, ["a","b","c"].first() , "a"
	, ["a","b","c"].last() , "c"
	, ["a","c","b"].sort().join() , "a,b,c"
	, [{"a":1}, {"a":3}, {"b":1, "a":2}].pluck("a").join() , "1,3,2"
	, "AbCdef".truncate(3) , "AbC"
	, "Ab Cd ef".truncatewords(2) , "Ab Cd"
	, "AbxxCdxxef".replace("xx", "yy") , "AbyyCdxxef"
	, "AbxxCdxxef".replace(/xx/g, "yy") , "AbyyCdyyef"
	, "AbxxCdxxef".remove("xx") , "AbCdef"
	, "AbxxCdxxef".remove_first("xx") , "AbCdxxef"
	, "aa bb cc".camelback() , "aaBbCc"
	, "aa bb cc".camelcase() , "AaBbCc"

	]

for (var i = 0, len = out.length; i < len; ) {
	found++
	if (out[i++] != out[i++]) failed.push(out[i-2] + " != " + out[i-1])
}

console.log(found + " tests found, " + failed.length + " failed.")
if (failed.length) throw failed.join("\n")

