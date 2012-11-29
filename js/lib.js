// libraries from darkgoyle.com

/*! darkgoyle.com/jquery.mangle */
// return a filtered data object
$.fn.mangle = function(mangler){
  console.debug('mangle', mangler, this);
  return this.each(function(){
    // holder of the datas, yo
    var holder = $(this),
        data = holder.data();
    holder
      // store unmangled as JSON string in [data-src]
      .attr('data-src', JSON.stringify(holder.data()))
      // place doppleganger
      .removeData().data(
          // apply lambda
          $.each(
            // from original data? (what about incremental filters?)
            $.parseJSON(holder.attr('data-src')) ||
              // transform from string to object if necessary
              (function(data){
                switch (typeof data){
                case 'string':
                  // if '/relative/(like a url)':
                  data = data.replace(/^\/(.)$/,function(url, loc){
                    // either the parent [data] or the selector at [data-scope]
                    return (holder.closest('[data]').add($(holder.attr('data-scope'))).eq(0));
                  });
                  // resolve 'pointer' to {}
                  data = ($(holder.attr('data-scope')).data() || window)[data];
                default:
                  return data;
                }
              })(holder.data() || holder.attr('data')),
            // lambda
            mangler));
  })
};

/*! darkgoyle.com/jquery.snitch */
// send data changes upstream
$.fn.snitch = function snitch(){
  debug && console.warn('setup snitch for', this);
  return this.each(function(){
    $(this)
      // comptroller
      .filter('form').submit(function(){
        debug && console.dir($(this).data());
        return false;
      }).end()
      
      // ears
      .on('change', '[data]', function(){
        // go up the chain
        var ears = $(this).closest('[data]').add(this.form).eq(0), // [data] bubbles up, [data~=?] jumps
            drop = ears.attr('data') || ears.attr('action'),
            payload = $(this).data();
        console.info(this, 'up the chain', payload, drop, ears)
        // if news
        if (ears.data(drop) == 'undefined')
            ears.data(drop, payload);
        // else concat
        else ears.data(drop, [].concat([ears.data(), payload]))
      })
      
      // snitch
      .find('[name]').each(function(){
        var ears = $(this).closest('[data]').add(this.form).eq(0);
        debug && console.debug(this.id || this.name, 'is a mole for', ears);
        // setup event
        $(this).change(function(){ 
          if (!this.readonly) {
            var data = ears.data();
            ears.data(this.name, data);
            debug && console.warn(this.name, 'squealed', ears.data()); } });
      }).end();
  });
};
  


/*! darkgoyle.com/jquery.fetch */
$.fetch = function (feature){
  $.fetch.features = $.fetch.features || {};
  $.fetch.pending = $.fetch.pending || {};
  
  // prepare and make content request
  var url = feature.replace(/^(feature\/)?.+(\.\w+)?$/, function(path,feature,extension){
    return extension || 
      'feature/' + path + '.html';
  }) + '?'+ (+new Date).toString(36),
      promise = $.ajax({ url: url, dataType:'text' })
        .done(resolve)
        .fail(console.error);
  
  // load content into document
  function resolve(html){
    var config = $.fetch.pending[feature];
    if (config) {
      $.fetch.features[feature] = $(html)[config.method](config.selector);
      delete $.fetch.pending[feature];
      debug && console.debug(feature, config.method, config.selector);
    }
  }
  
  // bind deferred methods to promise
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