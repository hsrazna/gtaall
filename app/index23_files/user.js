$(document).ready(function(){
    var userChartsData;
    function buildUserChart(type, data) {
        var $container = $('<div></div>').attr('data-type', type);
        if (data && data.length) {
            for (var i in data) {
                $('#user-chart-template').tmpl({
                    VALUE:              data[i].value,
                    VALUE_INCR:         data[i].value_incr,
                    POSITION:           data[i].position,
                    POSITION_CHANGE:    data[i].position_change,
                    user_name:          data[i].user.name
                }).appendTo($container);
            }
            $('#user-chart-link-template').tmpl({
                chart_type:         type
            }).appendTo($container);
        }
        $('#user-chart div.loading').addClass('hidden');
        $('#user-chart div[data-type]:eq(0)').after($container);
        if (!$container.children().length)
            $('#user-chart div.alert').removeClass('hidden');
    }
    $('#user-chart-type').change(function() {
        $('#user-chart div.alert').addClass('hidden');
        $('#user-chart div[data-type]').hide();
        $('#user-chart div.loading').removeClass('hidden');

        var chartType = $(this).val();
        if ($('#user-chart div[data-type="'+chartType+'"]').length) {
            $('#user-chart div.loading').addClass('hidden');
            $('#user-chart div[data-type="'+chartType+'"]').show();
            if (!$('#user-chart div[data-type="'+chartType+'"]').children().length)
                $('#user-chart div.alert').removeClass('hidden');
            return;
        }

        if (typeof userChartsData == 'undefined') {
            $.get((languageTagInPath ? ('/'+languageTag) : '')+ '/user/charts/?cs=1', function(response) {
                userChartsData = response;
                var chartData = userChartsData[chartType];
                if (chartData) {
                    for (var period in chartData) break;
                    chartData = chartData[period];
                }
                buildUserChart(chartType, chartData);
            }, 'json');
        } else {
            var chartData = userChartsData[chartType];
            if (chartData) {
                for (var period in chartData) break;
                chartData = chartData[period];
            }
            buildUserChart(chartType, chartData);
        }
    });
});