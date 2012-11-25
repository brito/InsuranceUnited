// load qunit from CDN
$('<script>')
  .attr('src', 'http://code.jquery.com/qunit/qunit-1.10.0.js')
.add($('<link>', { rel:'stylesheet', href: 'http://code.jquery.com/qunit/qunit-1.10.0.css'})).appendTo('head');
// create qunit container
$($('<section>', { id: 'qunit' }))
  .insertAfter('script:last');
$(document)
  .one('keyup',function(e){ if (e.keyCode==27) $('#qunit').show() })

// nano-tests
function ok(test, problem){ test || console.error(problem) }
