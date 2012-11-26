function load(feature){
  feature = feature.match(/^(\w+) ?(\w*) ?(.*)$/);
  var file = 'feature/'+feature[1]+'.html',
      verb = feature[2] || 'appendTo',
      selector = feature[3] || 'body';

  $.ajax({ url:file, dataType:'text'})
    .done(function(html){ $(html)[verb](selector) })
    .fail(console.error);
}
