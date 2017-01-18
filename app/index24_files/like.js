$(document).ready(function(){
    if ($('.content-like').length) {
        $(document).on('click', '.content-like', function() {
            if ($(this).attr('disabled'))
                return false;
            var $button = $(this);
            var counter = $.trim($button.text());
            var action = 'inc';
            if ($button.hasClass('active'))
                counter++;
            else {
                counter--;
                action = 'dec';
            }
            $button.attr('disabled', true);
            $.get((languageTagInPath ? ('/'+languageTag) : '')+ '/'+$button.data('content-type')+'/like/'+$button.data('content-id')+'/csrf:'+$button.data('csrf')+'/action:'+action+'/', function() {
                $button.removeAttr('disabled').html('<i class="icon-thumbs-up"></i>&nbsp;'+counter);
            });
        });
    }
});