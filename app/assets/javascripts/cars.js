var Cars = {
    init: function() {
        Cars.setup_datatables();
    },
    setup_datatables: function() {
        $(".dropdown-menu li").on("click", function() {
            Cars.search_table('', oTable); //clear filters
            $(this).parent().children('li').removeClass('active');
            $(this).addClass('active');
            $(this).parents(".input-group-btn").find('.btn').html(
                $(this).text() + " <span class='caret'></span>"
            );
            $("#searchbox").val('');
        });
        if ($('.datatables').length) {
            var oTable = $('.datatables').DataTable({
                "sDom": '<"top"l>rt<"bottom"ip><"clear">' //this explicitely excludes the default search
            });
            $("#searchbox").keyup(function() {
                Cars.search_table(this.value, oTable); //search column or whole table
            });
            $(function() {
                $('#search-info').popover(); //popover tip
            });
        }
    },
    search_table: function(search_string, table) {
        var column = $('#column_header').find(".active").val();
        if (column == -1) {
            table
                .search(search_string, true, true)  //regex and smart search true
                .draw();
        } else {
            table
                .column(column)
                .search(search_string, true, true)
                .draw();
        }
    }
};
$(function() {
    Cars.init();
});