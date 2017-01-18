var upload_width = 0;
var upload_height = 0;
$(function(){

    $('a#user-edit-avatar-change').click(function(){
        $('#user-edit-modal').modal('hide');
        $('#user-edit-avatar-upload').remove();
        $('#user-edit-upload').show();

        var title = $(this).attr('title');
        $('#user-edit-modal').modal('show').find('h3').text(title);
        $('#user-edit-modal div.well').text($(this).data('text'));
        $('#user-edit-modal #user-edit-upload').text($(this).data('button'));
        $('#user-edit-modal .modal-body div#user-edit-avatar-upload').remove();
        uploader = new qq.FineUploaderBasic({
            button: $('#user-edit-upload')[0],
            multiple: false,
            request: {
                params: {
                    'type': 'image'
                },
                endpoint: 'https://'+contentServerDomain + (languageTagInPath ? ('/'+languageTag) : '') + '/user/avatar/',
                inputName: 'data',
                forceMultipart: true
            },
            callbacks: {
                onSubmit: function(id, fileName) {
                    $('#user-edit-upload').hide();
                    $('#user-edit-avatar-upload').remove();
                    $('#user-edit-modal .well').after('\
                        <div id="user-edit-avatar-upload" style="padding:10px;">\
                            <table width="100%">\
                                <tr>\
                                    <td width="50%" style="vertical-align:middle;width:30%;overflow:hidden;white-space:nowrap;">'+fileName+'</td>\
                                    <td width="50%" class="center">\
                                        <div class="progress progress-striped active" style="margin:0;">\
                                            <div class="bar" style="width:2%;"></div>\
                                        </div>\
                                    </td>\
                                </tr>\
                            </table>\
                        </div>');
                    $('#user-edit-modal .crop-wrapper').html(' ');
                    $('#user-edit-upload-start').removeAttr('disabled');
                },
                onProgress: function(id, fileName, loaded, total) {
                    progress = Math.round(loaded / total * 100);
                    $('#user-edit-avatar-upload .bar').css('width', progress+'%');
                },
                onComplete: function(id, fileName, responseJSON) {
                    if (responseJSON.success) {
                        $('#user-edit-form .hiddens').attr('data', parseInt(responseJSON.id));
                        $('#user-edit-avatar-upload .bar').parents('td')
                            .html('Файл успешно загружен!')
                            .parent().parent().addClass('alert alert-success');
                        $('#user-edit-avatar-upload').delay(1000).slideUp(300);
                        $('#user-edit-modal').animate({width:'980px',marginLeft:'-480px'},300);
                        var img = new Image();
                        img.src = responseJSON.preview; //$('#original-avatar img').attr('src')
                        img.onload = function() {
                            $('#original-avatar img').attr('src',img.src);
                            $('#preview250').removeClass('hidden');
                            $('#preview150').removeClass('hidden');
                            $('#preview50').removeClass('hidden');

                            upload_width = this.width;
                            upload_height = this.height;
                            $('#original-avatar img').Jcrop({
                                onChange: showPreview,
                                onSelect: showPreview,
                                trueSize: [upload_width,upload_height],
                                setSelect: [0,0,upload_width,upload_height],
                                boxHeight: 270,
                                onRelease: function(){
                                    $('#user-edit-modal .actions .save-avatar').addClass('hidden');
                                },
                                aspectRatio: 1
                            },function(){
                                jcrop = this;
                            });
                        };
                        $('#user-edit-upload').show();
                        $('#user-edit-modal .crop-wrapper').append("\
                            <div class='row-fluid'>\
                                <div class='span6'>\
                                    <div id='original-avatar' data-id='"+responseJSON.user_id+"' class='span12 thumbnail'>\
                                        <img id='orig' src='"+responseJSON.preview+"' />\
                                    </div>\
                                </div>\
                                <div class='span6'>\
                                    <div class='preview-border'>\
                                        <ul class='thumbnails'>\
                                            <li class='span7'>\
                                                <div id='preview250' class='thumbnail hidden'>\
                                                    <div>\
                                                    <img width='250' src='"+responseJSON.preview+"' />\
                                                    </div>\
                                                </div>\
                                            </li>\
                                            <li class='span5'>\
                                                <div id='preview150' class='thumbnail hidden'>\
                                                    <div>\
                                                    <img width='150' src='"+responseJSON.preview+"' />\
                                                    </div>\
                                                </div>\
                                            </li>\
                                            <li class='span5'>\
                                                <div id='preview50' class='thumbnail hidden'>\
                                                    <div>\
                                                    <img width='50' src='"+responseJSON.preview+"' />\
                                                    </div>\
                                                </div>\
                                            </li>\
                                        </ul>\
                                    </div>\
                                </div>\
                            </div>\
                        ");
                    } else {
                        $('#user-edit-avatar-upload .bar').parents('td')
                            .html(responseJSON.error)
                            .parent().parent().addClass('alert alert-error');
                        $('#user-edit-upload-start').attr('disabled', 'disabled');
                        $('#user-edit-upload').show();
                    }
                }
            }
        });
    });
    $('#user-edit-upload-start').click(function() {
        uploader.uploadStoredFiles();
    });

    $('#user-edit-modal .actions .save-avatar').click(function(){
        var selected = jcrop.tellSelect();
        $('#user-edit-modal').modal('hide').removeAttr('style');
        $('#user-edit-form #alert-notforget').removeClass('hidden');

        // Transport selection
        $('#user-edit-form .hiddens').html(' ');
        delete selected.x2;
        delete selected.y2;
        delete selected.h;
        $.each(selected,function(idx,item){
            $('#user-edit-form .hiddens').append('<input type="hidden" name="data[user][settings][avatar][selection]['+idx+']" value="'+parseInt(item)+'" />');
        });
        $('#user-edit-form .hiddens').append('<input type="hidden" name="data[user][settings][avatar][id]" value="'+parseInt($('#user-edit-form .hiddens').attr('data'))+'" />');

        // Transport picture
        var coef = 250 / selected.w;
        widthToMake = $('#preview250 img').width();
        heightToMake = $('#preview250 img').height();
        $('#cropped-avatar').remove();
        $('a#user-edit-avatar-change').append('<div id="cropped-avatar"></div> ');
        $('a#user-edit-avatar-change img').hide();
        $('#original-avatar img#orig').clone().appendTo('#cropped-avatar')
            .width(widthToMake).height(heightToMake)
            .css({'max-width': widthToMake+'px','left': -(selected.x)*coef + 'px', 'top': -(selected.y)*coef + 'px', 'visibility':'visible'})
            .show();
        $('#user-edit-modal .crop-wrapper').html(' ');
        $('#user-edit-modal .actions .save-avatar').addClass('hidden');

        return false;
    });

    $('#user-edit-modal .actions .cancel-avatar').click(function(){
        $('#user-edit-modal').modal('hide');
        if (!$('#user-edit-modal #original-avatar').length){$('#user-edit-modal').removeAttr('style')}
        $('#user-edit-modal .actions .save-avatar').addClass('hidden');
        $('#user-edit-avatar-upload').remove();
        $('#user-edit-upload').show();
        return false;
    });

    function showPreview(coords)
    {
        $('#user-edit-modal .actions .save-avatar').removeClass('hidden');

        var rx = 250 / coords.w;

        $('#preview250 img').css({
            width: Math.round(rx * upload_width) + 'px',
            height: Math.round(rx * upload_height) + 'px',
            marginLeft: '-' + Math.round(rx * coords.x) + 'px',
            marginTop: '-' + Math.round(rx * coords.y) + 'px'
        });

        var rx = 150 / coords.w;

        $('#preview150 img').css({
            width: Math.round(rx * upload_width) + 'px',
            height: Math.round(rx * upload_height) + 'px',
            marginLeft: '-' + Math.round(rx * coords.x) + 'px',
            marginTop: '-' + Math.round(rx * coords.y) + 'px'
        });

        var rx = 50 / coords.w;

        $('#preview50 img').css({
            width: Math.round(rx * upload_width) + 'px',
            height: Math.round(rx * upload_height) + 'px',
            marginLeft: '-' + Math.round(rx * coords.x) + 'px',
            marginTop: '-' + Math.round(rx * coords.y) + 'px'
        });
    }

    $('#dataUserSettingsPersonalLanguage').select2();

});
