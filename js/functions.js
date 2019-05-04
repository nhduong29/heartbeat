window.onkeydown = function(e) {
    return !(e.keyCode == 32);
};

/*
  Handles a click on the down button to slide down the playlist.
*/
$('.down-header').on('click', function(){
  /*
    Sets the list's height;
  */
  $('#list').css('height', ( parseInt( $('#flat-black-player-container').height() ) - 135 )+ 'px' );

  /*
    Slides down the playlist.
  */
  $('#list-screen').slideDown(300, function(){
      $(this).show();
  });
});

/*
  Handles a click on the up arrow to hide the list screen.
*/
$('.hide-playlist, .song').on('click', function(){
  $('#list-screen').slideUp( 300, function(){
    $(this).hide();
  });
});

function calHeight(){
  var headerH = $('.player-header').outerHeight();
  var processbarH = $('#player-progress-bar-container').outerHeight();
  var playmiddleH = $('#player-middle').outerHeight();
  var playerbottomH = $('#player-bottom').outerHeight();
  var topH = $(window).outerHeight() - headerH -processbarH - playmiddleH - playerbottomH;
  $('#player-top').css({ 'height': topH + 'px'});
  if(topH < $('#player-top').width()){
    $('#player-top img').css({ 'max-width': topH});
  }else {
    $('#player-top img').css({ 'max-width': 400});
  }
}

/*
  Handles a click on the song played progress bar.
*/
document.getElementById('song-played-progress').addEventListener('click', function( e ){
  var offset = this.getBoundingClientRect();
  var x = e.pageX - offset.left;

  Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
});

$('img[amplitude-song-info="cover_art_url"]').css('height', $('img[amplitude-song-info="cover_art_url"]').width() + 'px' );


$(window).on('resize', function(){
  $('img[amplitude-song-info="cover_art_url"]').css('height', $('img[amplitude-song-info="cover_art_url"]').width() + 'px' );
  calHeight()
});

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  return "unknown";
}

$(document).ready( function(){
  Amplitude.init({
    "bindings": {
      37: 'prev',
      39: 'next',
      32: 'play_pause'
    },
    "songs": songs
  });
  calHeight();
  let os = getMobileOperatingSystem();
  if(os == "unknown"){
    $("#list").mCustomScrollbar({
      theme: "minimal",
      scrollInertia: 200
    });
  }
});