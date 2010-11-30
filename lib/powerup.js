/**
 * @description: A collection of useful utilities
 */

(function($){
  
  var p = {
    
    /**
     *	Display a modal dialog with an optional on close callback
     */
    modal: function(message, action){
      var buttons = { Ok: action };
      
      new this.widget.Dialog({
	body: message, 
	buttons:buttons, 
	selfDestruct: true,
	close: action, 
	modal: true
      })
    },
    
    /**
     *	Rosy themed 'alert()' call with optional on close callback
     */
    alert: function(message, action){
      var buttons = { Ok: action };
      
      new this.widget.Dialog({
	body: message, 
	buttons:buttons, 
	selfDestruct: true,
	close: action, 
	modal: false
      })
    },
    
    /**
     *	Display a confirmation dialog with an optional 'yes'/'no' callbacks
     */
    confirm: function(message, callback){
      var buttons = {
	Yes: callback.yes,
	No: callback.no
      };
      new this.widget.Dialog({
	body: message,
	selfDestruct: true,
	buttons: buttons, 
	close: callback.no,
	modal: false
      });
    },
    
    /**
     *	Display a modal confirmation dialog with an optional 'yes'/'no' callbacks
     */
    modalConfirm: function(message, callback){
      var buttons = {
	Yes: callback.yes,
	No: callback.no
      };
      new this.widget.Dialog({
	body: message,
	selfDestruct: true,
	buttons: buttons, 
	close: callback.no,
	modal: true
      });
    },
    
    openWindow: function(link, parameters){
      var params;
      
      if(parameters){
	params = $.extend({}, {_: new Date().getTime()}, parameters);
      }
      else {
	params = {_: new Date().getTime()}
      }
      window.open(
	this.appendParameters(link, params)
      );
    },
    
    appendParameter: function(link, parameter, value){
      var params = {};
      params[parameter]=value;
      return this.appendParameters(link, params)
    },
    
    appendParameters: function(link, parameters){
      for(var parameter in parameters) {
	var value = parameters[parameter];
	var seperator = (link.indexOf("?")===-1 ? "?": "&");
	link+=seperator + encodeURIComponent(parameter) + "=" + encodeURIComponent(value);
      }
      return link;
    },

    /**
     * Gets a request parameter
     *
     */
    getRequestParameter: function ( name ){
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\?&]"+name+"=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( window.location.href );
      if( results == null )
        return "";
      else
        return results[1];
    }
    
  };
  
  if(window.powerup)
    $.extend(window.powerup, p);
  else window.powerup = p;
  
}(jQuery))
