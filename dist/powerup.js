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
/**
 *	Creates the name space specified by the string and returns it
 */
window.namespace = window.ns = function(ns){
  var ns = ns.split(".");
  var n = ns.splice(0,1);
  if(!window[n]) window[n] = {};
  n=window[n];
  jQuery.each(ns, function(){
    if(!n[this]) 
      n[this]={};
    n=n[this];
  });
  return n;
};
/**
 * @description: Very simple wrapper for jquery ui dialog, all options passed in are same as jquery ui options, 
 *	plus these additional options:
 * 	body - option for passing in the body of the dialog to the constructor
 *	selfDestruct - option for having dialog destroy all supporting structures automatically on close or button press
 */

(function($, window){
  
  var defaults = {
    selfDestruct: false,
    autoOpen: true
  }
  
  namespace("powerup.widget").Dialog = function(options){
    this.options = $.extend({}, defaults, options);
    this.show();
  }
  
  powerup.widget.Dialog.prototype = {
    show: function(){
      var self = this,
      options = self.options;;
      
      if(!self.dialogBox) {
	var contentHeight = $(options.body).outerHeight(true);
	
	self.dialogBox = $("<div />").append(options.body);
	
	if(options.selfDestruct) {
	  var buttons = options.buttons;
	  if(buttons){
	    for(var i in buttons){
	      (function(buttonAction){
		buttons[i] = function(){
		  (buttonAction && buttonAction());
		  self.destroy();
		}
	      }(buttons[i]))
	    }
	  }
	  var close = options.close;
	  options.close = function(){
	    (close && close());
	    self.destroy();
	  }
	}
	
	self.dialogBox.dialog(options)
      }
      else self.dialogBox.dialog("open");
      
      return self;
    },
    
    option: function(name, value){
      var self = this;
      
      if(name==="buttons" && self.options.selfDestruct) {
	var buttons = value;
	if(buttons){
	  for(var i in buttons){
	    (function(buttonAction){
	      buttons[i] = function(){
		(buttonAction && buttonAction());
		self.destroy();
	      }
	    }(buttons[i]))
	  }
	}
      }
      
      
      return this.dialogBox.dialog("option", name, value);
    },
    
    hide: function(){
      this.dialogBox.dialog("close");
    },
    
    resize: function(){
      var self = this;
      if(self.dialogBox) {
	self.dialogBox.dialog("open");
      }
      else self.show();
    },
    
    destroy: function(){
      var self = this;
      if(self.dialogBox) {
	self.dialogBox.dialog("destroy");
	self.dialogBox.remove();
	delete self.dialogBox;
      }
    },
    moveToTop: function(){
      this.dialogBox.dialog("moveToTop")
    }
  }
  
}(jQuery, window))

