var url = "app_task_sql.php";
var setFilter,actPaginate,page,form,form_comment;

System.out.println("Мое почтение!");

jQuery(document).ready(function() {
    Task.init();
});

var Task = function () {
    var label = 'task_list';
    //var change_button = '<button class="comment-add btn green btn-sm" type="button" title="Добавить комментарий"><i class="fa fa-commenting-o"></i></button><button class="status-change btn yellow btn-sm" type="button" title="Изменить статус"><i class="fa fa-check-square-o"></i></button><button type="button" class="delete-pos btn red btn-sm" title="Закрыть"><i class="fa fa-trash"></i></button>';
    var change_button = '<button class="comment-add btn green btn-sm" type="button" title="Добавить комментарий"><i class="fa fa-commenting-o"></i></button>';

    var getFilter = function () {
        var filter = {};
        var search = $('.searchArea[data-table="'+label+'"]');
        $('.input-search',search).each(function() {
            filter[$(this).attr("name")] = $(this).val();
        });
        filter["rows"] = $('.rows_amount[data-table="'+label+'"]').val();
        return '&filter='+JSON.stringify(filter);
    }      
   
    return {
        
        init: function () {            
            loadTask();
            
            setFilter = {
                "task_list": function(){loadTask();}
            }
            
            actPaginate = {
              "task_list": function(){
                  loadTask();
                  }
            }
            
            form = $('#task_form');
            handleValidation(form);
             
            ["task_title","task","task_deadline","priority"].forEach(function(v) {
                $('[name="'+v+'"]',form).rules('add', {
                  required: true
                });
            });
            
            form_comment = $('#comment_form');
            handleValidation(form_comment);
            ["comment_text","task_status"].forEach(function(v) {
                $('[name="'+v+'"]',form_comment).rules('add', {
                  required: true
                });
            });
            
            
            
                                
                                
            
        }
    };
}();