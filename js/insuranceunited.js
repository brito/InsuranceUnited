$(document)
  // document events
  .on({
    'sign-out': function(){
      $(this)
        .removeData('user')
        .trigger('update');
    },

    'restore': function(){

      $(this).trigger('update');
    },

    'update': function(){
      console.log('User: ', $(this).data('user'));
      $('#authenticate,#members,#household,#enroll,#confirm').hide();
      var user = $(this).data('user');
      if (!user)
        return $('#authenticate').show();
      if (user.step)
        return $(user.step).show();

    },

    'ready': function(){
      window.remoteStorage.server='https://secure.openkeyval.org/';
      $(this).trigger('update');
    }

  })
  // document element listeners
  .on('click', '[href="#sign-out"]', function(){
    $(this).trigger('sign-out');
  });

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
  var user = { id: id, email: email, step: '#members' };

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
    $(this).serialize().split('&').forEach(function(pair){
      pair.replace(/([^=]+)=(.*)/,function(pair, name, value){
        console.log(name, unescape(value))
      });
    });
    return false;
  }
});

// household form
$('#household').on({ 'submit': function(){
  return false;
}});
// enroll form
$('#enroll').on({ 'submit': function(){
  return false;
}});

// Stop password masking — Jacob Nielsen
// http://www.useit.com/alertbox/passwords.html
$('[name=password]').showPassword();
