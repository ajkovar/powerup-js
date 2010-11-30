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
