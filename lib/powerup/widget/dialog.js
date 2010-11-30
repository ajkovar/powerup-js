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

