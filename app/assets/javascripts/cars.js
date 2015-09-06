var Cars = {
    init: function() {
        Cars.setup_datatables();
    },
    setup_datatables: function() {
        $(".dropdown-menu li").on("click", function() {
            //Cars.search_table('', oTable); //clear filters
            $(this).parent().children('li').removeClass('active');
            $(this).addClass('active');
            $(this).parents(".input-group-btn").find('#dropdown_search').html(
                $(this).text() + " <span class='caret'></span>"
            );
            $("#searchbox").val('');
        });
        $("#clear_search").on("click", function() {
            oTable
                 .search( '' )
                 .columns().search( '' )
                 .draw();
            $("#searchbox").val('');
        });
        if ($('.datatables').length) {
            $('.datatables tfoot th').each( function () {
                var title = $('.datatables thead th').eq( $(this).index() ).text();
                $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
            } );
            oTable = $('.datatables').DataTable({
                colReorder: true,
                fixedHeader: true,
                "sDom": '<"top"l>rt<"bottom"ip><"clear">' //this explicitely excludes the default search
            });
            oTable.columns().every( function () {
                var that = this;
         
                $( 'input', this.footer() ).on( 'keyup change', function () {
                    if ( that.search() !== this.value ) {
                        that
                            .search( this.value )
                            .draw();
                    }
                } );
            } );
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