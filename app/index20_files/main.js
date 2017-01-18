var date = new Date();
var expire = new Date();
expire.setMonth(expire.getMonth()+1);
$.cookie('user-timezone', (date.getTimezoneOffset()/60), { expires: expire, path: '/' });

$(document).ready(function(){
    $(document).on('click', 'a[href="#"]', function(e) {
        e.preventDefault();
    });

    $(document).on('click', 'a.auth-link', function(e) {
        e.preventDefault();
        $('#modal').html($('#auth-modal').html()).modal('show');
        return false;
    });

    $('[data-toggle="tooltip"]').tooltip();
});

var ads = {};
$(function(){
    var bDate = new Date();
    bDate.setSeconds(59); bDate.setMinutes(59); bDate.setHours(23);
    var cookie = $.cookie('adhelper');
    if (cookie && typeof cookie != 'undefined')
        ads = JSON.parse(decodeURI(cookie));
    if (ads == null)
        ads = {};
    if ($('dfn').length >0 )
    {
        $('dfn').each(function(){
            var banner = $(this).data('id');
            if (typeof banner != 'undefined') {
                if (typeof ads[banner] != 'undefined')
                    ads[banner] = [(ads[banner][0]-0)+1,Math.round((new Date()).getTime() / 1000)];
                else
                    ads[banner] = [1,Math.round((new Date()).getTime() / 1000)];
            }
        });
    }
    $.cookie('adhelper', (JSON.stringify(ads)), { expires: bDate, path: '/' });

    if ($("#block-menu").length) {
        var $affixed = $('.main-menu .move');
        $affixed.affix({offset: 155+$affixed.parent().height()});
        $affixed.width($affixed.parent().width());
        $(document).scroll(function () {
            $affixed.width($affixed.parent().width());
        });
        $(window).bind('resize', function(){
            $affixed.width($affixed.parent().width());
        });
        $(document).bind("DOMNodeInserted", function() {
            $(window).off('.affix');
            $affixed.removeData('affix').removeClass('affix affix-top affix-bottom');
            $affixed.affix({offset: $affixed.parent().offset().top+$affixed.parent().height()});
        });
    }
    if ($('section.category .content-ad').length) {
        $(window).resize(function(){
            $('.span6.content-ad').css({'height': $('.span6.content').height() + 2 + 'px'});
        });
        var interval = setInterval(function(){
            if (Math.max.apply(Math, $('.span6.content').map(function() { return $(this).height(); }))>313){
                $(window).trigger('resize');
                clearInterval(interval);
            }
        },500);
    }
    if ($('section.category .item-image').length && ($('section.category .item-image').width() < 431)) {
        $(window).resize(function(){
            $('.span6.content .content-news').css({'height':$('.span6.content .item-image').height() + 'px'});
            $('.span6.content-ad').css({'height': $('.span6.content').height() + 'px'});
        });
        var interval = setInterval(function(){
            if (Math.max.apply(Math, $('.span6.content .item-image img').map(function() { return $(this).height(); }))>0){
                $(window).trigger('resize');
                clearInterval(interval);
            }
        },500);
    }

    if ($('.arrow-up').length) {
        $(window).bind('resize scroll',function(){
            if ($(this).scrollTop() > 200 && $(document).width()>1210) {
                $('.arrow-up').fadeIn();
            } else {
                $('.arrow-up').fadeOut();
            }
        });
    }

    $('.scroller').click(function(){
        var target = $(this).attr('href');
        var destination = $(target).offset().top;
        $('html:not(:animated),body:not(:animated)').animate({ scrollTop: destination }, 400);
        return false;
    });

    if ($('.img-bb').length){
        $('.img-bb').each(function(){
            if ($(this).parent().get(0).tagName != 'A') {
                var source = $(this).attr('src');
                var matches = source.match('attachments\/(?:[a-z0-9]{32}/|)[0-9-]{7}\/([a-z-]+)\/[a-z0-9]+\/');
                if (matches)
                    $(this).wrap('<span class="media-preview"><a rel="gallery" href="'+source.replace(matches[1],'original')+'"></a></span>');
            }
        })
    }
});

$(document).ready(function() {
    if (typeof(Paginator) == 'function') {
        if ($('.paginator').length) {
            $('.paginator').each(function(i, el) {
                var $hiddenParents = $(el).parents().filter(function() {
                    return $(this).css('display') == 'none';
                });
                if ($hiddenParents.length)
                    $hiddenParents.show();
                new Paginator(
                    $(el).attr('id'),
                    $(el).data('pages-count'),
                    $(el).data('visible-count'),
                    $(el).data('current-page'),
                    $(el).data('href'),
                    $(el).data('reversed')
                );
                if ($hiddenParents.length)
                    $hiddenParents.removeAttr('style');
            });
        }
    }

    if ($('.spoiler').length) {
        $('.spoilerTitle a').click(function(ev) {
            ev.preventDefault();
            $(this).parents('div.spoiler').find('.spoilerTitle span, .spoilerText').toggle();
        });
    }

    if ($('.media-preview a').length) {
        $('.media-preview a').fancybox({
            padding: 5,
            helpers : {
                media : {},
                title : {
                    type : 'outside'
                }
            },
            afterShow: function() {
                var fbox = this;
                var wToMake = fbox.origWidth;
                var hToMake = fbox.origHeight;
                var cWidth = (fbox.inner[0].clientWidth-0);
                var cHeight = (fbox.inner[0].clientHeight-0);
                if (cWidth < wToMake || cHeight < hToMake)
                {

                    function step(a,b)
                    {
                        if (b.prop == 'width')
                        {
                            $.fancybox.reposition();
                            $('.fancybox-wrap').width(a+fbox.wPadding);
                        }
                    }
                    $('.fancybox-expand').css({'display':'block'}).click(function(){
                        var cInner = $('.fancybox-inner');
                        if (!cInner.hasClass('expanded'))
                        {
                            cInner.animate({width: wToMake+'px', height: hToMake+'px'},{duration:400,complete:function(){$(this).addClass('expanded');$.fancybox.reposition();},step: step});
                            $('.fancybox-wrap').draggable({
                                start: function(){
                                    $('.fancybox-nav').unbind('click');
                                },
                                stop: function(){
                                    function bindAgain () {
                                        $('.fancybox-next').bind('click', function(){$.fancybox.next();});
                                        $('.fancybox-prev').bind('click', function(){$.fancybox.prev();});
                                    }
                                    setTimeout(bindAgain,300);
                                }
                            });
                        }
                        else
                        {
                            cInner.animate({width: cWidth+'px', height: cHeight+'px'},{duration:400,complete:function(){$(this).removeClass('expanded');$.fancybox.reposition();},step: step});
                            $('.fancybox-wrap').draggable('destroy');
                        }
                    });
                }
            },
            onUpdate : function() {
                var expand = $('.fancybox-expand');
                var wToMake = this.origWidth;
                var hToMake = this.origHeight;
                var cWidth = (this.inner[0].clientWidth-0);
                var cHeight = (this.inner[0].clientHeight-0);
                $('.fancybox-inner').removeClass('expanded');
                if ($('.fancybox-wrap').hasClass('ui-draggable'))
                    $('.fancybox-wrap').draggable('destroy');
                if (cWidth >= wToMake || cHeight >= hToMake)
                    expand.css({'display':'none'});
                else
                    expand.css({'display':'block'});
            },
            tpl: {
                image: '<img class="fancybox-image" src="{href}" alt="" /><div class="fancybox-expand"><span></span></div>'
            }
        });
    }

    var maxHeight = $(".central").height();
    if ($(".right-col").height() > maxHeight)
        maxHeight = $(".right-col").height();
    if ($(".left-col").height() > maxHeight)
        maxHeight = $(".left-col").height();
    var colBannerCallbacks = {};
    $(".right-col, .left-col").each(function(i, el) {
        if (maxHeight > $(el).height()) {
            var colHeigth = $(el).height();
            var $banner = $("[data-float='true']:first", this);
            if ($banner.length) {
                var bannerTop = $banner.offset().top;
                colBannerCallbacks[i] = function() {
                    var scrollTop = $(window).scrollTop();
                    var margin = 0;
                    if ((scrollTop + 65) > bannerTop)
                        margin = scrollTop - bannerTop + 65;
                    var maxMargin = $(".central").height() - $banner.height() - bannerTop + $(".right-col").offset().top;
                    if (margin > maxMargin)
                        margin = maxMargin;
                    if (margin < 5)
                        margin = 5;
                    $banner.css("margin-top", margin);
                };
                colBannerCallbacks[i]();
                if (($(".central").height() - colHeigth) > 0)
                    $(window).on("resize scroll", colBannerCallbacks[i]);
            }
        }
    });
    if ($(".banner-outer-left, .banner-outer-right").length && (screen.width >= 1600)) {
        $(".outer-wrapper").show();
        var bannerTop = {};
        $(".banner-outer-left, .banner-outer-right").each(function(i, el) {
            bannerTop[i] = $(el).offset().top;
            $(window).on("resize scroll", function() {
                var offsetTop = 150;
                if ($(window).scrollTop() > 90) {
                    offsetTop = $(window).scrollTop() + 60;
                    if ((offsetTop + $(el).height()) > ($(".central").height() + $(".central").offset().top))
                        offsetTop = $(".central").height() + $(".central").offset().top - $(el).height();
                }
                $(el).offset({top: offsetTop});
            });
        });
    }

    $('object').append("<param name='wmode' value='transparent' />");
    $('embed').attr('wmode','transparent');
});