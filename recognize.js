/*! jamestron.com/recognize.js
 *  @darkgoyle circa 2012
 */

// debug
debug = !0;

// darkgoyle.com/recognize
function recognize(something){
  if (debug)
  // output
  console
  // error result or message
    [ ['error','info'] [+!!something] ] (
        // a brute join
        [].join.call(arguments,' '));
}

// load test framework (qunit)
$('<script>')
  .attr('src', 'http://code.jquery.com/qunit/qunit-1.10.0.js')
.add($('<link>', { rel:'stylesheet', href: 'http://code.jquery.com/qunit/qunit-1.10.0.css'})).appendTo('head');
// create qunit container
$($('<section>', { id: 'qunit' }))
  .insertAfter('script:last').hide();
$(document)
  .one('keyup',function(e){ if (e.keyCode==27) $('#qunit').show() })

// TODO define promise interfase for qunit tests (not yet loaded)
  
// test tests  
try { throw 'ಠ_ಠ' }
catch (e){
  if (debug) recognize ('My name is Tron. James Tron.') 
  else console.warn(e);
}