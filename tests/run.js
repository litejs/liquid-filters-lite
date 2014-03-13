
require("../")

var curr = new Date()

require("testman").
describe("String filters").
	it ("should capitalize text").
		equal( "ab cd".capitalize() , "Ab cd").
		equal( "AbCd".downcase() , "abcd").
		equal( "AbCd".upcase() , "ABCD").
		equal( "abc".size() , 3).
		equal( "AbCdef".truncate(3) , "AbC").
		equal( "Ab Cd ef".truncatewords(2) , "Ab Cd").
		equal( "AbxxCdxxef".replace("xx", "yy") , "AbyyCdxxef").
		equal( "AbxxCdxxef".replace(/xx/g, "yy") , "AbyyCdyyef").
		equal( "AbxxCdxxef".remove("xx") , "AbCdef").
		equal( "AbxxCdxxef".remove_first("xx") , "AbCdxxef").
		equal( "aa bb cc".camelback() , "aaBbCc").
		equal( "aa bb cc".camelcase() , "AaBbCc").

		equal( "13".humanTime(), "13 seconds").
		equal( "78".humanTime(), "1 minute").

		equal( "71".toAccuracy(5), "70").
		equal( "12.31".toAccuracy(0.2), "12.4").

		equal( "a".times(1), "a").
		equal( "a".times(2), "aa").
		equal( "a".times(3), "aaa").
		//equal( "B".times(0), "").
		//equal( "1".times(-1), "").
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


