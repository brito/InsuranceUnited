$(document)
  // document events
  .on({
	'recognize': function(){
	  var id = localStorage.getItem('Insurance United');
	  if (id)
	    remoteStorage.getItem(id, function(user){
	      $(this).trigger('update');
	    });
	  $(this).trigger('update');
	},
    'sign-out': function(){
      $(this)
        .removeData('user')
        .trigger('update');
    },

    'save': function(){
      var user = $(this).data('user');
      remoteStorage.setItem(user.id, JSON.stringify(user), function(){
        $(document).trigger('update');
      });
    },

    'restore': function(){

      $(this).trigger('update');
    },

    'update': function(){
      $('body > *:not(header,footer), [class^=when-]').hide();
      
      var user = $(this).data('user') || 0;
      
      return $(user.step || '#authenticate').show();
    },

    'ready': function(){
      remoteStorage.server='https://secure.openkeyval.org/';
      $(this).trigger('recognize');
    }

  })
  // document element listeners
  .on('click', '[href="#sign-out"]', function(){
    $(this).trigger('sign-out');
  });

// authenticate form
$('#authenticate')
  .on({ 'submit': function(){
    var email = this.email.value,
        id = '';
    
    (email + this.password.value).replace(/./g,function(ch){ id+= ch.charCodeAt(0); });

    id = (+id).toString(36);
    var user = { id: id, email: email, step: '#members', members: {}, household:{} };

    $(document)
      .data('user', user)
      .trigger('update');
    return false;
  } });

// sign-in form
$('#sign_in').on({ 'submit': function(){
  var id = '';
  (this.email.value + this.password.value).replace(/./g,function(ch){ id+= ch.charCodeAt(0); });
  remoteStorage.getItem((+id).toString(36), function(user){
    if (!user)
      throw 'Unrecognized email/password';
    $(document)
      .data('user', $.parseJSON(user))
      .trigger('restore');

  });
  return false;
}});

// registration form
$('#register').on({ 'submit': function(){
  var form = this,
      email = this.email.value,
      id = '';
  (email + this.password.value).replace(/./g,function(ch){ id+= ch.charCodeAt(0); });

  id = (+id).toString(36);
  var user = { id: id, email: email, step: '#members', members: {}, household:{} };

  remoteStorage.setItem(id, JSON.stringify(user), function(response){
    if (response.status != 'multiset')
      throw 'Could not register new user';

    $(document)
      .data('user', user)
      .trigger('restore');
  });
  return false;
}});

// members form
$('#members').on({
  'submit': function(){
    var user = $(document).data('user');
    $('fieldset', this).each(function(){
      var member = {};
      $(this).serialize().split('&').forEach(function(pair){
        pair.replace(/([^=]+)=(.*)/,function(pair, name, value){
          member[name] = unescape(value);
        });
      });
      user.members[$('legend',this).text()] = member;
    });
    user.step = '#household';
    $(document)
      .data('user', user)
      .trigger('save');
    return false;
  }
})
  // copy name to legend on change
  .on('keyup', '[name=first_name], [name=last_name]', function(){
    var fieldset = $(this).closest('fieldset'),
        name = $('[name=first_name]', fieldset).val() + ' ' + $('[name=last_name]', fieldset).val();
    $('legend', fieldset).text(name);
  })
  // add a new member
  .on('click', '#add_member', function(){
    var form = $(this).closest('form');
    $('fieldset:first', form).clone().insertAfter($('fieldset:last', form));
  });

// household form
$('#household').on({ 'submit': function(){
  var user = $(document).data('user');
  $('fieldset', this).each(function(){
    var set = {};
    // copypasta
    $(this).serialize().split('&').forEach(function(pair){
      pair.replace(/([^=]+)=(.*)/,function(pair, name, value){
        set[name] = unescape(value);
      });
    });
    user.household[$('legend',this).text()] = set;
  });
  user.step = '#enroll';
  $(document)
    .data('user', user)
    .trigger('save');
  return false;
}});
// enroll form
$('#enroll').on({ 'submit': function(){
  return false;
}});

// Stop password maskingâ Jacob Nielsen
// http://www.useit.com/alertbox/passwords.html
$('[name=password]').showPassword();
