videojs.registerPlugin('TVOKidsPlugin', function() {
  var tvoKidsPluginPlayer = this;
  tvoKidsPluginElPlayer = tvoKidsPluginPlayer.el(); 
    
  //Remove the picture-in-picture button in the player which is enabled by default.
  pip_control = tvoKidsPluginElPlayer.getElementsByClassName("vjs-picture-in-picture-control")[0]; //Get pip element from DOM
  if (typeof(pip_control) != 'undefined' && pip_control != null) { //Check first if pip element is defined/not null, not all browsers enable it
    pip_control.parentNode.removeChild(pip_control);
  }

  //Play custom geo video if video is geo-gated.
  var specificError; //Create empty var
  tvoKidsPluginPlayer.one('bc-catalog-error', function(){ //Trigger this code once if there's a playback error
    if(typeof(tvoKidsPluginPlayer.catalog.error) !== 'undefined') { //If the error is not undefined
      specificError = tvoKidsPluginPlayer.catalog.error.data[0]; //Get info about the error
      if (specificError !== 'undefined' & specificError.error_subcode == "CLIENT_GEO") { //If the errror is a geo-gate error
        tvoKidsPluginPlayer.catalog.getVideo("5214206105001", function(error, video) { //Get the alternate video
          tvoKidsPluginPlayer.catalog.load(video); //Load the alternate video
          tvoKidsPluginPlayer.play(); //Play the alternate video
        });  
      };
    };
  });

});