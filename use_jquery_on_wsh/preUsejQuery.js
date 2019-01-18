(function(){
	// documentオブジェクトを作成
	document = new ActiveXObject( "htmlfile" );
	document.write("<html></html>");

	window    = document.parentWindow;
	location  = window.location;
	navigator = window.navigator;
	window.ActiveXObject = ActiveXObject

	// 関数の代替え
	alert         = function( str ){ return window.alert( str ); };
	confirm       = function( str ){ return window.confirm( str ); };

	setInterval   = function( code, interval ){ return window.setInterval( code, interval ); };
	clearInterval = function( id ){	window.clearInterval( id );	};
	setTimeout    = function( code, delay ){ return window.setTimeout( code, delay ); };
	clearTimeout  = function( id ){ window.clearTimeout( id ); };

	// Ver.1.10.2 で発生したエラー対応
	document.documentElement.contains = function(e){return document.documentElement.contains(e)}
})();