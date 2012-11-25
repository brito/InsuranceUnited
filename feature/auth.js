$.ajax({ url:'feature/auth.html', dataType:'text' })
  .done(function(html){
    $('script:last').after(html);
    var auth = $('#auth');
      ok(auth.length, 'auth not loaded');
    
    auth.show();
  });
