uri = window.location.href;
console.log(uri);
$.getScript( "https://mysterious-taiga-6994.herokuapp.com/fix?q="+encodeURI(uri), function( data, textStatus, jqxhr ) {
  console.log( data ); // Data returned
  console.log( textStatus ); // Success
  console.log( jqxhr.status ); // 200
  console.log( "Load was performed." );
});