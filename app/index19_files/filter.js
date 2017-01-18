$(document).ready(function(){
    $.fn.autocomplete = function() {
        $(this).each(function(i, el) {
            $(el)
                .typeahead({
                    minLength: $(el).data('autocomplete'),
                    source: function(q, callback) {
                        if (q.length >= $(el).data('autocomplete')) {
                            $.getJSON((languageTagInPath ? ('/'+languageTag) : '')+ '/mod/autocomplete/'+$(el).data('parameter-id')+'/query:'+q+'/', function(response) {
                                if (response)
                                    callback(response);
                            });
                        }
                    },
                    updater: function(item) {
                        $(el).data('filled', item);
                        return item;
                    }
                })
                .focusout(function() {
                    if ($(this).data('filled') != $(this).val())
                        $(this).val('');
                });
        });
    };
    $('[data-autocomplete]').autocomplete();
    if ($('[data-minicolors]').length && jQuery().minicolors) {
        $('[data-minicolors]').each(function(i, el) {
            var $hidden = $(el);
            var $real = $($hidden).prev();
            $($hidden).minicolors({
                change : function() {
                    var rgbObject = this.minicolors('rgbObject');
                    this.minicolors('value');
                    $($real).val(rgbObject.r+','+rgbObject.g+','+rgbObject.b);
                }
            });
        });
        $(document).off('click', '.color-remove').on('click', '.color-remove', function() {
            var $input = $(this).parent().find('[data-minicolors]').minicolors('value', '');
            $input.closest('div').find('.filter-custom').val('');
        });
    }
    if ($('.filter-custom-add').length) {
        $('.filter-custom-add').click(function() {
            var $html = $('#'+$(this).parents('.input-prepend').find('.filter-custom').attr('id')+'-template').tmpl();
            $(this).parents('.input-prepend').after($html);
            $('[data-minicolors]:not(.minicolors-input)').each(function(i, el) {
                var $hidden = $(el);
                var $real = $($hidden).prev();
                $($hidden).minicolors({
                    change : function() {
                        var rgbObject = this.minicolors('rgbObject');
                        this.minicolors('value');
                        $($real).val(rgbObject.r+','+rgbObject.g+','+rgbObject.b);
                    }
                });
            });
            $($html).find('[data-autocomplete]').autocomplete();
        });
    }
    $(document).on('click', '.filter-custom-remove', function() {
        $(this).closest('.filter-custom-clone').remove();
    });
    $('#filter-custom-reset').click(function() {
        var $form = $(this).closest('form');
        $form.find('.filter-custom-clone').remove();
        $form.find('input[type="text"], select').val('');
        $form.find('input[type="checkbox"]').removeAttr('checked');
        if ($form.find('[data-minicolors]').length) {
            $form.find('[data-minicolors]').each(function(i, el) {
                $(el).minicolors('value', '').closest('div').find('.filter-custom').val('');
            });
        }
    });
    if ($('.filters .collapse-trigger').length) {
        var trigger = $('.filters .collapse-trigger');
        trigger.click(function(){
            var parent = $(this).parent();
            var height = parent.find('.tab-pane.active').eq(0).height();
            if (!parent.hasClass('open'))
            {
                parent.find('.tab-content').animate({height: height},function(){
                    $(this).css({'height':'auto'});
                    parent.addClass('open');
                });
            } else {
                var $tabContent = parent.find('.tab-content');
                $tabContent.animate({height: $tabContent.data('base-height')},function(){
                    parent.removeClass('open');
                });
            }

        });
        $('.filters .nav-tabs a').click(function(){
            var parent = $(this).parents('.filters');
            var height = $($(this).attr('href')).height();
            if (!parent.hasClass('open'))
                parent.find('.tab-content').animate({height: height},function(){
                    $(this).css({'height':'auto'});
                    parent.addClass('open');
                });
        });
    }
    if ($('.filter-view-all a').length) {
        var columns = 5;
        var width = 900;
        var drawParametersList = function(parameterId, activeValue) {
            if ($('#filter-modal-template').length) {
                if (typeof filterData[parameterId] != "undefined") {
                    var cursor = 1;
                    var currColumn = 0;
                    var columnSize = Math.ceil(Object.keys(filterData[parameterId]).length/columns)+1;
                    var $activeTemplate = $('#filter-modal-active-template');
                    var $linkTemplate = $('#filter-modal-link-template');
                    var _columnsData = [];
                    for (var i = 0; i < columns; i++)
                        _columnsData.push('<div class="column-'+ (i + 1)+'">');
                    var parameter;
                    for (p in filterData[parameterId]) {
                        if (p == activeValue)
                            parameter = $activeTemplate.tmpl({
                                TEXT:  filterData[parameterId][p][0],
                                COUNT: filterData[parameterId][p][2]
                            });
                        else
                            parameter = $linkTemplate.tmpl({
                                TEXT:  filterData[parameterId][p][0],
                                LINK:  filterData[parameterId][p][1],
                                COUNT: filterData[parameterId][p][2]
                            });

                        _columnsData[currColumn] = _columnsData[currColumn] + '' + parameter[0].outerHTML;

                        if (cursor == (columnSize + 1)) {
                            currColumn++;
                            cursor = 0;
                        }
                        cursor++;
                    }
                    for (var i = 0; i < columns; i++)
                        _columnsData[i] = _columnsData[i] + '</div>';
                    $('#modal').html($('#filter-modal-template').tmpl({LINKS: '<div class="columns">' + _columnsData.join('') + '</div>'})).modal('show').css({'width':width+'px', 'margin-left': -Math.round(width/2)+'px'});
                }
            }
        };
        $(document).on('click', '.filter-view-all a', function(e){
            e.preventDefault();
            var clicked = $(this);
            var parameterId = clicked.parents('.tab-pane').data('parameter-id');
            var categoryId = $(this).data('category-id');
            var activeValue = $(this).data('active-value');
            if (typeof filterData == "undefined") {
                $('#modal').html($('#filter-modal-template').tmpl({LINKS:'<div class="loading"><img src="/assets/5a9f9/images/ajax-wide.gif"></div>'})).modal('show');
                $.get((languageTagInPath ? ('/'+languageTag) : '')+ '/mod/filter/'+categoryId+'/', function(response) {
                    clicked.parent().append('<script>'+response+'</script>');
                    drawParametersList(parameterId, activeValue);
                });
            } else {
                drawParametersList(parameterId, activeValue);
            }
        });
    }
});