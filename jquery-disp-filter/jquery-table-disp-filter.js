/*!
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 */

;(function ( $ ) {
    $.fn.tableDispFilter = function( options ) {
        var defaults = {
            textSize : 16
            ,checkInterval : 200
        };
        var settings = $.extend( {}, defaults, options );
    

        return this.each(function() {
            var $textbox = $('<input type="text" size="' + settings.textSize + '"/>');
            var $table = $(this);
            var timeoutId = undefined;

            // event
            $textbox.keyup(function(){

                var $box = $(this);
                if( timeoutId != undefined ) clearTimeout( timeoutId );

                timeoutId = setTimeout(function(){
                    updateTable( $table, $box );
                },settings.checkInterval);
            });

            // append
            var $searchBox = $('<div/>').append([
                $textbox
            ]);
            $(this).before( $searchBox );

        });


        function updateTable( $table, $textBox ) {
            var matchText = $textBox.val();
            var $trList = $table.children("tbody").children("tr");

            if (matchText == "") {
                $trList.show();
                return ;
            }

            matchText = toOneByteAlphaNumeric(matchText);
            matchText = kanaToHira(matchText);
            matchText = matchText.toLowerCase();

            $trList.each( function(){

                var textList = [];

                $(this).children("td,th").each(function(){
                    var temp = toOneByteAlphaNumeric( $(this).text() );
                    temp = kanaToHira(temp);
                    temp = temp.toLowerCase();
                    textList.push( temp );
                });

                var hit = false;
                for (var i=0 ; i < textList.length ; ++i) {
                    var text = textList[i];

                    if (text.indexOf(matchText) != -1) {
                        hit = true;
                        break;
                    }
                }

                if (hit)    $(this).show();
                else        $(this).hide();

            });

        }

        // 全角英数字文字列を半角文字列に変換する
        function toOneByteAlphaNumeric(str){
            return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
                return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
            });
        }
        
        function kanaToHira(str){
            return str.replace(/[\u30a1-\u30f6]/g, function(s) {
                return String.fromCharCode(s.charCodeAt(0) - 0x60);
            });
        }

    };
}( jQuery ));