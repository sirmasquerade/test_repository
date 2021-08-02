var url = "app_task_sql.php";
var setFilter,actPaginate,page,form,form_comment;

<<<<<<< Updated upstream
System.out.println("Мое почтение!");
=======
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    }      
       return {
=======
    }
    
    var loadTask = function() {
        var page = $('#'+label).attr("data-page")-1;
        $.ajax({
            beforeSend: function () {
                lock_page();
            },
            type: "POST",
            cache: false,
            url: url,
			dataType: "json",
			data: 'form=loadTask&page='+page+getFilter(),
            success: function (res) {
                var tbody = $('tbody',$('#'+label));
                tbody.html('');
                var priority = [['','критичный','высокий','средний','низкий'],['','badge-danger','badge-success','badge-info','badge-default']];
                if (res.query.length) {
                    for (var i=0; i<res.query.length; i++) {
                        var arr = res.query[i];
                        for (key in arr) {
                            arr[key] = arr[key] ? arr[key] : '';
                        }
                        var pr = '<span class="todo-tasklist-badge badge '+priority[1][arr["PRIORITY"]]+'">'+priority[0][arr["PRIORITY"]]+'</span> ';
                        var tr = $('<tr class="'+(arr["TASK_STATUS"] > 4 ? 'active' : '')+'">').attr("id",arr["TASK_ID"]).attr("data-status",arr["TASK_STATUS"]).appendTo(tbody);
                        $('<td>').html(arr["TASKDT"]).appendTo(tr);
                        $('<td>').html('<nobr>'+arr["TASK_USER"]+'</nobr>').appendTo(tr);
                        $('<td>').html(pr + arr["TASK_TITLE"]).appendTo(tr);
                        $('<td>').html(arr["TASK"]).appendTo(tr);
                        $('<td>').html('<nobr>'+arr["STATUS"]+'</nobr>').appendTo(tr);
                        $('<td>').html(arr["COMMENT_"]).appendTo(tr);
                        $('<td>').html(change_button).appendTo(tr);
                    }
                }
                checkNoRecords(tbody);
                getNumPageLinks(res.total[0],label);
                unlock_page();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                unlock_page();
            }
        });
    }
    
    $(document).on('click','#task_save', function() {
        var data = {};
        $('.input-data',form).each(function() {
            data[$(this).attr("name")] = $(this).val();
        });
       
       if (form.validate().form()) {
            var id = form.attr("data-id");
            $.ajax({
                beforeSend: function () {
                    lock_page();
                },
                url: url,
                type: 'POST',
                data: "form=saveTask&id=" + id + "&data="+JSON.stringify(data),
                dataType: 'json',
                success: function(t){
                    $.unblockUI();
                    if ( t["info"] == "success" ) {
                        loadTask();
                        $('#task_modal').modal("hide");
                    } else {
                        toastr.error(t["msg"],'Внимание!')
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $.unblockUI();
                }
            });
        }
    });
    
    $(document).on('click','#comment_save', function() {
        var data = {};
        $('.input-data',form_comment).each(function() {
            data[$(this).attr("name")] = $(this).val();
        });
        var status_new = $('.input-data[name="task_status"]',form_comment).val();
        var status = form_comment.attr("data-status");
        if (status_new == status) {
            delete data["task_status"];
        }
        var id = form_comment.attr("data-id");
        if (form_comment.validate().form()) {
            $.ajax({
                beforeSend: function () {
                    lock_page();
                },
                url: url,
                type: 'POST',
                data: "form=saveComment&id=" + id + "&data="+JSON.stringify(data),
                dataType: 'json',
                success: function(t){
                    $.unblockUI();
                    if ( t["info"] == "success" ) {
                        loadTask();
                        $('#comment_modal').modal("hide");
                    } else {
                        toastr.error(t["msg"],'Внимание!')
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $.unblockUI();
                }
            });
        }
    });
    
    $(document).on('click','#data_add', function() {
        form.attr("data-id",'');
        form.trigger("reset");
        form.validate().resetForm();
        $('#task_modal').modal("show");
    });
    
    $(document).on('click','.comment-add', function() {
        var tr = $(this).closest('tr');
        var id = tr.attr("id");
        $.ajax({
            beforeSend: function () {
                lock_page();
            },
            type: "POST",
            cache: false,
            url: url,
			dataType: "json",
			data: 'form=getComment&id='+id,
            success: function (res) {
                var ul =  $('.media-list',form_comment);
                ul.html('');
                if (res.length) {
                    res.forEach(function(r) {
                        var img = 'src="../../assets/img/avatar.png"';
                        var li = $('<li class="media">').appendTo(ul);
                        $('<a class="pull-left" href="javascript:;">').html('<img class="todo-userpic" '+img+' width="27px" height="27px">').appendTo(li);
                        var div = $('<div class="media-body todo-comment">').appendTo(li);
                        $('<button type="button" class="todo-comment-btn btn btn-circle btn-default btn-sm">').html('&nbsp; Ответить &nbsp;').appendTo(div);
                        $('<p class="todo-comment-head">').html('<span class="todo-comment-username">'+r["COMMENT_USER"]+'</span> &nbsp;<span class="todo-comment-date">'+r["COMMENT_DT"]+'</span>').appendTo(div);
                        $('<p class="todo-text-color">').html(r["COMMENT_TEXT"]).appendTo(div);
                    });
                }
                var status = tr.attr("data-status");
                form_comment.attr("data-id",id).attr("data-status",status);
                form_comment.trigger("reset");
                $('.input-data[name="task_status"]',form_comment).val(status);
                $('#comment_modal').modal("show");
                unlock_page();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                unlock_page();
            }
        });
    });
    
    
    
    return {
>>>>>>> Stashed changes
        
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
<<<<<<< Updated upstream
=======
            
            
            
                                
                                
            
        }
    };
>>>>>>> Stashed changes
}();