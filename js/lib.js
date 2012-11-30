/*! thegrid.js 0.1 2012.11.29
 * http://jamestron.com/the-grid
 * All rights reserved
 * Copyright (c) 2012 Phiveleven LLC 
 * @author darkgoyle@phiveleven.com
 */
console && console.
  info ('Loading The Grid');

/*! phiveleven.com/jquery.Archer */
// dealer of hash, host, history and storage
$.Archer = (function(){return;
  $(document).on('load', function(){
    recognize(location.hash, 'Welcome');
    (location.hash)
      .replace('',console.warn);
  });
})();

/*! phiveleven.com/jquery.stash */
// storage facade
$.fn.stash = function(place, thing){
  //  TODO restore from localStorage, sessionStorage and webStorage
  // volatile fella
  var storage = $.Warehouse = {};
  // keep thing?
  if (typeof thing != 'undefined')
    $.Warehouse[place] = thing;
    
  // $ if write, thing if read! (like fn.data)
  return thing? this : $.Warehouse[place]; 
};

/*! phiveleven.com/jquery.mangle */
// tamper with [data]
$.fn.mangle = function(mangler){
  console.debug('mangle: ', this, mangler);
  // no [data]? do nothing
  return this.filter('[data]').each(function(){
    // holder of the datas, yo
    var holder = $(this),
        data = holder.data();
    console.log(holder, data)
      // store unmangled as JSON string in [data-src]
    holder.find(':not([data-stash])')
      // like fn.data but awesomer
      .stash('data-unmangled', holder.data())
      .attr('data-stash', true).end()
      // replace data with mangled doppleganger
      .removeData().data(
          // apply lambda to data
          $.each(holder.data(), mangler) );
  })
};
// restore original witness
$.fn.unmangle = function(){
  return this.each(function(){
    var holder = this;
    holder.data(holder.stash('data-stash'));
    return holder;
  });
};

/*! phiveleven.com/jquery.snitch */
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
      .find('[name]').each(function snitch_setup(){
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
  


/*! phiveleven.com/jquery.fetch */
$.fetch = function (feature){
  $.fetch.features = $.fetch.features || {};
  $.fetch.pending = $.fetch.pending || {};
  
  // prepare and make content request
  var url = feature.replace(/^(feature\/)?.+(\.\w+)?$/, function(path,feature,extension){
    return extension || 
      'feature/' + path + '.html';
    // cache buster?
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