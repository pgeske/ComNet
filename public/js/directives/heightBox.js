
app.directive('heightBox', function() {
    return {
        link: function(scope, element, attrs) {
            //Set element height to window height
            $(element).height(.80 * $(window).height());
            //Set height of chat box elements
            var panelHeight = $(element).find(".panel").height();
            var headerHeight = $(element).find(".header-row").outerHeight();
            var sendHeight = $(element).find(".send-row").outerHeight();
            var receiveHeight = panelHeight - (headerHeight + sendHeight);
            var userHeight = panelHeight - headerHeight;
            $(element).find(".receive-row").outerHeight(receiveHeight);
            $(element).find(".user-row").outerHeight(userHeight);
        }
    }
});
