
require("browser-upgrade-lite")
global.Fn = require("functional-lite").Fn

require("../")

var curr = new Date()
, user1 = { name: "John Doe", age: 17, sex: "male", num: 1, total: 2 }
, user2 = { name: "Eve Joung", age: 31, sex: "female", num: 2, total: 1 }
, user3 = { num: 2, total: 2 }
, text1 = "{sex|pick:'male=He','female=She','They'} found {num|plural:'1 result','# results'} in {total|plural:'1 category','# categories'}."
, text2 = "{sex | pick:'male=He', 'female=She', 'They'} found { num | plural : '1 result', '# results' } in { total | plural : '1 category' , '# categories' }."
, text3 = "A {sex|pick:'male=man {name|upcase}','female=woman {name|downcase}','some {name}'|format:_} found."

require("testman").
describe ("String filters").
	it ("should format texts").
		equal("{\\name}".format(user1),   "{name}").
		equal("escaped {\\name} middle".format(user1), "escaped {name} middle").

		equal("{name}".format(user1),     "John Doe").
		equal("{ name}".format(user1),    "John Doe").
		equal("{name  }".format(user1),   "John Doe").
		equal("{ name }".format(user1),   "John Doe").

		equal("{name}".format(user3),     "").
		equal("{ name}".format(user3),    "").
		equal("{name  }".format(user3),   "").
		equal("{ name }".format(user3),   "").

		equal("A {name}".format(user1),   "A John Doe").
		equal("A {name|upper}".format(user1), "A JOHN DOE").
		equal("A {name|upper} is a {name|lower}".format(user1), "A JOHN DOE is a john doe").
		equal("A {name|replace:'}',''} is a {name|lower}".format(user1),    "A John Doe is a john doe").
		equal("A {name|replace:'o','}'} is a {name|lower}".format(user1),   "A J}hn Doe is a john doe").
		equal("A {name|replace:'o\\'',''} is a {name|lower}".format(user1), "A John Doe is a john doe").
		equal("A {name|replace:'o\"',''} is a {name|lower}".format(user1),  "A John Doe is a john doe").
		equal("A {name|replace:/o/g,'O'} is a {name|lower}".format(user1),  "A JOhn DOe is a john doe").

		equal("A {name.upper()}".format(user1), "A JOHN DOE").
		equal("A {name.upper()} is a {name|lower}".format(user1), "A JOHN DOE is a john doe").
		equal("A {name.replace('}','')} is a {name|lower}".format(user1),   "A John Doe is a john doe").
		equal("A {name.replace('o','}')} is a {name|lower}".format(user1),  "A J}hn Doe is a john doe").
		equal("A {name.replace('o\\'','')} is a {name|lower}".format(user1),"A John Doe is a john doe").
		equal("A {name.replace('o\"','')} is a {name|lower}".format(user1), "A John Doe is a john doe").
		equal("A {name.replace(/o/g,'O')} is a {name|lower}".format(user1), "A JOhn DOe is a john doe").

		equal(text1.format(user1), "He found 1 result in 2 categories.").
		equal(text1.format(user2), "She found 2 results in 1 category.").
		equal(text1.format(user3), "They found 2 results in 2 categories.").

		equal(text2.format(user1), "He found 1 result in 2 categories.").
		equal(text2.format(user2), "She found 2 results in 1 category.").
		equal(text2.format(user3), "They found 2 results in 2 categories.").

		equal(text3.format(user1), "A man JOHN DOE found.").
		equal(text3.format(user2), "A woman eve joung found.").
		equal(text3.format(user3), "A some  found.").

	it ("should capitalize text").
		equal( "ab cd".capitalize() , "Ab cd").
		equal( "AbCd".downcase() , "abcd").
		equal( "AbCd".upper() , "ABCD").
		equal( "abc".size() , 3).
		equal( "AbCdef".truncate(3) , "AbC").
		equal( "Ab Cd ef".truncatewords(2) , "Ab Cd").
		equal( "AbxxCdxxef".replace("xx", "yy") , "AbyyCdxxef").
		equal( "AbxxCdxxef".replace(/xx/g, "yy") , "AbyyCdyyef").
		equal( "AbxxCdxxef".remove("xx") , "AbCdef").
		equal( "aa bb cc".camelCase() , "aaBbCc").

		equal( "13".humanTime(), "13 seconds").
		equal( "78".humanTime(), "1 minute").

	it ("should have 'step' method").
		equal( "70".step(5), "70").
		equal( "70.004".step(5), "70").
		equal( "71".step(5), "70").
		equal( "72".step(5), "70").
		equal( "73".step(5), "75").
		equal( "75".step(5), "75").
		equal( "12.31".step(0.2), "12.4").

		equal( "70".step(5, null), "70").
		equal( "70.004".step(5, null), "70").
		equal( "71".step(5, null), "70").
		equal( "72".step(5, null), "70").
		equal( "73".step(5, null), "75").
		equal( "75".step(5, null), "75").
		equal( "12.31".step(0.2, null), "12.4").

		equal( "70".step(5, false), "70").
		equal( "70.004".step(5, false), "70").
		equal( "71".step(5, false), "70").
		equal( "72".step(5, false), "70").
		equal( "73".step(5, false), "70").
		equal( "75".step(5, false), "75").
		equal( "12.31".step(0.2, false), "12.2").

		equal( "70".step(5, true), "70").
		equal( "70.004".step(5, true), "75").
		equal( "71".step(5, true), "75").
		equal( "72".step(5, true), "75").
		equal( "73".step(5, true), "75").
		equal( "75".step(5, true), "75").
		equal( "12.31".step(0.2, true), "12.4").

	it ("should repeat strings").
		equal( "a".repeat(1),   "a").
		equal( "Aa".repeat(1),  "Aa").
		equal( "a".repeat(2),   "aa").
		equal( "Aa".repeat(2),  "AaAa").
		equal( "a".repeat(3),   "aaa").
		equal( "B".repeat(0),   "").
		equal( "Ba".repeat(0),  "").
		equal( "1".repeat(-1),  "").
		equal( "1a".repeat(-1), "").

	it ("should have date stuff").
		equal(function(){
				curr.setTime( curr.getTime() - 1000 )
				return curr.timeAgo()
			}, "1 second ago").
		equal(function(){
				curr.setTime( curr.getTime() - 1000 )
				return curr.timeAgo()
			}, "2 seconds ago").
		equal(function(){
				curr.setTime( curr.getTime() - 58000 )
				return curr.timeAgo()
			}, "1 minute ago").
		equal(function(){
				curr.setTime( curr.getTime() - 60000 )
				return curr.timeAgo()
			}, "2 minutes ago").
		equal(function(){
				curr.setTime( curr.getTime() - 3600000 )
				return curr.timeAgo()
			}, "1 hour ago").
		equal(function(){
				curr.setTime( curr.getTime() - 3600000 )
				return curr.timeAgo()
			}, "2 hours ago").
		equal(function(){
				curr.setTime( curr.getTime() - 22*3600000 )
				return curr.timeAgo()
			}, "Yesterday").
		equal(function(){
				curr.setTime( curr.getTime() - 24*3600000 )
				return curr.timeAgo()
			}, "2 days ago").

describe("Array filters").
	it ("should work").
		equal( ["a","b","c"].size() , 3).
		equal( ["a","b","c"].first() , "a").
		equal( ["a","b","c"].last() , "c").
		equal( ["a","c","b"].sort().join() , "a,b,c").
		equal( [{"a":1}, {"a":3}, {"b":1, "a":2}].pluck("a").join() , "1,3,2").
done()



/** Tests for String extensions
!function(){
var test = new TestCase("String extensions");



test.compare(
(4294967295).int2ip()
, "255.255.255.255"
, (0).int2ip()
, "0.0.0.0"
, "4294967295".int2ip()
, "255.255.255.255"
, "0".int2ip()
, "0.0.0.0"
, "String.int2ip()");

test.compare(
"255.255.255.255".ip2int()
, 4294967295
, "0.0.0.0".ip2int()
, 0
, "String.ip2int()");

/** Tests for Date.timeAgo
!function(){
var test = new TestCase("Date.timeAgo")
, curr = new Date();

//curr.setMilliseconds(0);

curr.setTime( curr.getTime() - 1000 );
test.compare( curr.timeAgo() , "1 second ago");

curr.setTime( curr.getTime() - 1000 );
test.compare( curr.timeAgo() , "2 seconds ago");

curr.setTime( curr.getTime() - 58000 );
test.compare( curr.timeAgo() , "1 minute ago");

curr.setTime( curr.getTime() - 60000 );
test.compare( curr.timeAgo() , "2 minutes ago");

curr.setTime( curr.getTime() - 3600000 );
test.compare( curr.timeAgo() , "1 hour ago");

curr.setTime( curr.getTime() - 3600000 );
test.compare( curr.timeAgo() , "2 hours ago");

curr.setTime( curr.getTime() - 22*3600000 );
test.compare( curr.timeAgo() , "Yesterday");

curr.setTime( curr.getTime() - 24*3600000 );
test.compare( curr.timeAgo() , "2 days ago");
test.done();
}()
//*/



