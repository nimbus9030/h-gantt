@extends('layouts.app')
@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-xs-12">
            <div class="panel panel-default">
                <div class="panel-heading">Projects</div>

                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    <div class="row form-group">
                        <div class="col-xs-12">
                            <button id="btn-showAddProjectModal" type="button" class="btn btn-primary"><span class="fa fa-plus"></span> Project</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <table id="projectTable" class="table dt-responsive table-striped table-hover" cellspacing="0" width="100%">

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="addProjectModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formAddProject" class="form-horizontal">
                <input type="hidden" name="id" value="0">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Add a new project</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <div class="col-xs-12">
                            <label class="control-label" for="p-name">Project Name:</label>
                            <input type="text" class="form-control" id="p-name" name="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-12">
                            <label class="control-label" for="p-desc">Description:</label>
                            <input type="text" class="form-control" id="p-desc" name="description">
                        </div>    
                    </div>            
                </div>
                <div class="modal-footer">
                    <button id="btn-addProject" type="button" class="btn btn-primary">Save</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </form>
        </div>  
    </div>
</div>
<div id="delProjectModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formDelProject" class="form-horizontal">
                <input type="hidden" name="id" value="0">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Delete Confirmation</h4>
                </div>
                <div class="modal-body">
                    <p></p>         
                </div>
                <div class="modal-footer">
                    <button id="btn-delProject" type="button" class="btn btn-danger">Delete</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </form>
        </div>  
    </div>
</div>
@endsection

@section('styles')
@parent
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs/dt-1.10.18/r-2.2.2/datatables.min.css"/>
<style>
.fixed200 {
    width: 200px;
}
.fixed150 {
    width: 150px;
}
</style>
@endsection

@section('scripts')
<script type="text/javascript" src="https://cdn.datatables.net/v/bs/dt-1.10.18/r-2.2.2/datatables.js"></script>
<script type="text/javascript" src="/js/dataTables-jp.js"></script>
<script>
$(function () {
var projectTable = null;
var startDate = '{{ \Carbon\Carbon::now()->subMonth()->format("Y-m-d") }}';
var endDate = '{{ \Carbon\Carbon::now()->format("Y-m-d") }}';

//from utilitys.js
Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function(key) {
  return this.getItem(key) && JSON.parse(this.getItem(key));
};

  $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
  });
  
    projectTable = $('#projectTable').DataTable({
        "processing": true,
        "serverSide": true,
        "sAjaxSource": "/home/pagelist",
        // "deferLoading" : false,
        "fnServerData": function ( sSource, aoData, fnCallback ) {
            numNewRows = 0;
            aoData.push( { "name": "fromdate", "value": startDate } );
            aoData.push( { "name": "todate", "value": endDate} );
            // aoData.push( { "name": "_token", "value": "{{ csrf_token() }}"} );
            $.ajax( {
                "dataType": 'json',
                "data": aoData,
                "type": "POST",
                "url": sSource,
                "success": function(result){
                    if (result["stat"]) {
                        fnCallback(result["table"]);
                            // displayToast("Data saved successfully!","rgb(0,153,0)");
                    }
                    else {
                        fnCallback(result["table"]);
                        // displayToast(result["error"],"rgb(153,0,0)");
                    }
                },
                "failure":function(result){
                    if (result["error"])
                        alert(result["error"]);
                }
            } );
         },
        "bFilter": true,
        "paging":   true,
        "ordering": true,
        "info":     true,
        "autoWidth": false,
        "pageLength": 10,
        "order": [ 0, "asc" ],
        "aoColumns": [
          { "sWidth": "150px", "className" : "desktop text-center vam" },//name
          { "sWidth": "250px", "className" : "desktop text-center vam" },//description
          { "sWidth": "100px", "className" : "desktop text-center vam" },//status
          { "sWidth": "100px", "className" : "desktop text-center vam" },//action: edit/delete
          { "className" : "never"}
        ],
        "columnDefs": [
           { "title": "name", "class": "text-left fixed200", "targets": 0,//orderData:    [ 5,6,3,4,5,6],
               "render": function ( data, type, row, meta ) {
                   return data;
               }
           },
           { "title": "description","class": "fixed150", "targets": 1,
               "render": function ( data, type, row, meta ) {
                   return data;
               }
           },
           { "title": "status","class": "fixed100", "targets": 2,
               "render": function ( data, type, row, meta ) {
                   return data;
               }
           },
           { "title": "actions","class": "fixed100", "targets": 3,
               "render": function ( data, type, row, meta ) {
                   return '<span class="fa fa-edit mr10 btn-edit"></span><span class="fa fa-trash-alt red btn-delete"></span>';
               }
           },
           {    "class": "hidden", "targets": 4}, {{-- id --}}
        ]
    });

    //Load project
    $('body').on('click',"#projectTable tbody td",function(e) {
        var tr = $(this).closest("tr");
        var rowdata = projectTable.row( tr ).data();
        var id = rowdata[4];
        var colIdx = projectTable.cell( this ).index().column;
        //skip if user pressed an action icon
        if (colIdx < 3) {
            //remove cached project in browser
            if (localStorage) {
                if (localStorage.getObject("teamworkGantDemo")) {
                    localStorage.setObject("teamworkGantDemo",null);
                }
            }
            location.href = '/gantt/'+id;
        }
    });

    //show add project modal
    $('#btn-showAddProjectModal').on('click',function(e) {
        $('#addProjectModal input[name="id"]').val(0);
        $('#addProjectModal input[name="name"]').val("");
        $('#addProjectModal input[name="description"]').val("");
        $('#addProjectModal').modal();
    });
    //add/new project
    $('#btn-addProject').on('click',function(e) {
        if (!$(this).hasClass('disabled')) {
            $(this).addClass('disabled');
            var data = $('#formAddProject').serializeArray();
            data.push( { "name": "_token", "value": "{{ csrf_token() }}"} );
            $.ajax({
                type: 'POST',
                url: "/home/addProject",
                async: true,
                cache : false,
                dataType : "json",
                data : data,
                error: function(jqXHR, textStatus, errorThrown) {
                    $('#btn-addProject').removeClass('disabled');
                    var errorMsg = "";
                    //Display Laravel Validation error(s) if any
                    if (typeof jqXHR.responseJSON != 'undefined') {
                        for(obj in jqXHR.responseJSON.errors) {
                            for(var i = 0;i < jqXHR.responseJSON.errors[obj].length;i++) {
                                errorMsg += jqXHR.responseJSON.errors[obj][i] + "<br>";
                            }
                        }
                    }
                    else {
                        //display server error
                        errorMsg = errorThrown;
                    }
                    displayToast(errorMsg,"rgb(153,0,0)");
                },
                success: function(result) {
                    $('#btn-addProject').removeClass('disabled');
                    if (result["stat"]) {
                        if(projectTable) projectTable.ajax.reload();
                        displayToast("Data saved successfully!","rgb(0,153,0)");
                    }
                    else {
                        //display try/catch error
                        displayToast(result["error"],"rgb(153,0,0)");
                    }
                    $('#addProjectModal').modal('toggle');
                }
            });
        }
    });
    //Edit project
    $('body').on('click','.btn-edit',function(e) {
        var tr = $(this).closest("tr");
        var rowdata = projectTable.row( tr ).data();
        $('#addProjectModal input[name="id"]').val(rowdata[4]);
        $('#addProjectModal input[name="name"]').val(rowdata[0]);
        $('#addProjectModal input[name="description"]').val(rowdata[1]);
        $('#addProjectModal').modal();
    });
    //confirm delete
    $('body').on('click','.btn-delete',function(e) {
        var tr = $(this).closest("tr");
        var rowdata = projectTable.row( tr ).data();
        $('#delProjectModal input[name="id"]').val(rowdata[4]);
        $('#delProjectModal p').html("Do you want to really delete project, '"+rowdata[0]+"' ?");
        $('#delProjectModal').modal();
    });
    //delete project
    $('#btn-delProject').on('click',function(e) {
        if (!$(this).hasClass('disabled')) {
            $(this).addClass('disabled');
            var data = $('#formDelProject').serializeArray();
            // data.push( { "name": "_token", "value": "{{ csrf_token() }}"} );
            $.ajax({
                type: 'POST',
                url: "/home/delProject",
                async: true,
                cache : false,
                dataType : "json",
                data : data,
                error: function(jqXHR, textStatus, errorThrown) {
                    $('#btn-delProject').removeClass('disabled');
                    var errorMsg = "";
                    //Display Laravel Validation error(s) if any
                    if (typeof jqXHR.responseJSON != 'undefined') {
                        for(obj in jqXHR.responseJSON.errors) {
                            for(var i = 0;i < jqXHR.responseJSON.errors[obj].length;i++) {
                                errorMsg += jqXHR.responseJSON.errors[obj][i] + "<br>";
                            }
                        }
                    }
                    else {
                        //display server error
                        errorMsg = errorThrown;
                    }
                    displayToast(errorMsg,"rgb(153,0,0)");
                },
                success: function(result) {
                    $('#btn-delProject').removeClass('disabled');
                    if (result["stat"]) {
                        if(projectTable) projectTable.ajax.reload();
                        displayToast("Data saved successfully!","rgb(0,153,0)");
                    }
                    else {
                        //display try/catch error
                        displayToast(result["error"],"rgb(153,0,0)");
                    }
                    $('#delProjectModal').modal('toggle');
                }
            });
        }
    });
});
</script>
@endsection