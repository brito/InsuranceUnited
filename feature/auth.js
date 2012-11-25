$.ajax({ url:'feature/auth.html', dataType:'text' })
  .done(function(html){
    $('script:last').after(html);
  });
