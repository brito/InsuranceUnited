
/*! darkgoyle.com/jquery.notify */
$.fn.notify = function(name){
  // setup forms only
  this.filter('form').each(function(){
    var form = $(this);
    // switch to xhr submit
    form.on('submit', function(){
      // $.ajax(url, form.data()).done(trigger submit:after)
      return false;
    });
  });
  
  /* hoisted for $.fn.notify */
  // fieldset: input, fieldset or form
  function consume(fieldset){
    fieldset.serialize().split('&').forEach(function(pair){
      pair.replace(/([^=]+)=(.*)/,function(pair,name,value){
        $('[name='+name+']').closest('[data]').data(name, value);
      });
    });
  }
};


/*! darkgoyle.com/jquery.fetch */
$.fetch = function (feature){
  $.fetch.features = $.fetch.features || {};
  $.fetch.pending = $.fetch.pending || {};
  
  // prepare and make content request
  var url = 'feature/' + feature + '.html',
      promise = $.ajax({ url: url, dataType:'text' })
        .done(resolve)
        .fail(console.error);
  
  // load content into document
  function resolve(html){
    var config = $.fetch.pending[feature];
    if (config) {
      $.fetch.features[feature] = $(html)[config.method](config.selector);
      delete $.fetch.pending[feature];
      recognize(feature, config.method, config.selector);
    }
  }
  
  // bind deferred operations on retrieved content
  'prependTo appendTo insertBefore insertAfter replaceAll'.replace(/\S+/g, function(method){
    promise[method] = (function(){
      return function(selector){
        $.fetch.pending[feature] = { method: method, selector: selector };
      };
    })(method);
  });
  
  $(document).trigger('new.feature.'+feature, feature);
  return promise;
};