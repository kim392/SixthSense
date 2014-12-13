$(document).ready(function() {


    chrome.storage.local.get([
        'disableCSS',
        'hasBoarders'

    ], function(items) {

        if(items.disableCSS === true) {

            $('link[rel="stylesheet"]').attr('disabled', 'disabled');

        } else if(items.disableCSS === false) {

            $('link[rel="stylesheet"]').removeAttr('disabled');
        }

    });



    chrome.extension.onConnect.addListener(function(port) {

      port.onMessage.addListener(function(msg) {

        if (msg.stylechange === "fontsize") {
            var fontSize = parseInt($('body').css('font-size')),
                lineHeight = fontSize;
            
            if(msg.fontsize === "increase") {
                fontSize = fontSize + 1;
                lineHeight = lineHeight + 5;
            } else {

                fontSize = (fontSize - 1);
                lineHeight = (fontSize + 5);
            }

            fontSize += 'px';
            lineHeight += 'px';


            $('*').attr('style', 'font-size: ' + fontSize + ' !important; line-height: ' + lineHeight + ' !important');

        } else if(msg.stylechange === "disableCSS") {
            
            if(msg.disableIt === true) {

                $('link[rel="stylesheet"]').attr('disabled', 'disabled');

            } else if(msg.disableIt === false) {

                $('link[rel="stylesheet"]').removeAttr('disabled');
            }
            
        } else if(msg.stylechange === "addBorders") {

            if(msg.hasBorders === true) {

                var padding = $('p').css('padding');

                $('p, img, video, object, h1, h2, h3, h4, h5, h6, li').css('border-style', 'solid');
                $('p, img, video, object, h1, h2, h3, h4, h5, h6, li').css('border-width', '2');
                $('p, img, video, object, h1, h2, h3, h4, h5, h6, li').css('border-color', 'blue');

                $('p, img, video, object, h1, h2, h3, h4, h5, h6, li').css('padding', '0');
                $('p, img, video, object, h1, h2, h3, h4, h5, h6, li').css('padding', '15px');

            } else if(msg.hasBorders === false) {
                $('p, img, video, object, h1, h2, h3, h4, h5, h6, li').css('border-style', 'none');
            }
        }
          
      });

    });
    

});

