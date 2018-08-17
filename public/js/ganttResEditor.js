/*
 Copyright (c) 2012-2018 Open Lab
 Written by Roberto Bicchierai and Silvia Chelazzi http://roberto.open-lab.com
 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GridResEditor(master) {
  this.master = master; // is the a GantEditor instance

  var editorTabel = $.JST.createFromTemplate({}, "TASKSEDITRESOURCEHEAD");
  if (!master.permissions.canSeeDep)
    editorTabel.find(".requireCanSeeDep").hide();

  this.gridified = $.resGridify(editorTabel);
  this.element = this.gridified.find(".gdfResTable").eq(1);
  this.minAllowedDate=new Date(new Date().getTime()-3600000*24*365*20).format();
  this.maxAllowedDate=new Date(new Date().getTime()+3600000*24*365*30).format();
}


GridResEditor.prototype.fillEmptyLines = function () {
  //console.debug("fillEmptyLines")
  var factory = new ResTaskFactory();
  var master = this.master;

  //console.debug("GridResEditor.fillEmptyLines");
  var rowsToAdd = master.minRowsInResEditor - this.element.find(".taskEditRow").length;
  var empty=this.element.find(".emptyRow").length;
  rowsToAdd=Math.max(rowsToAdd,empty>5?0:5-empty);

  //fill with empty lines
  for (var i = 0; i < rowsToAdd; i++) {
    var emptyRow = $.JST.createFromTemplate({}, "TASKEMPTYRESOURCEROW");
    if (!master.permissions.canSeeDep)
      emptyRow.find(".requireCanSeeDep").hide();

    //click on empty row create a task and fill above
    emptyRow.click(function (ev) {
      //console.debug("emptyRow.click")
      var emptyRow = $(this);
      //add on the first empty row only
      if (!master.permissions.canAdd || emptyRow.prevAll(".emptyRow").length > 0)
        return;

      master.beginTransaction();
      var lastTask;
      //jkk var start = new Date().getTime();
      // var level = 0;
      //jkk if (master.resTasks[0]) {
      //   start = master.resTasks[0].start;
      //   level = master.resTasks[0].level + 1;
      // }

      //fill all empty previouses
      var cnt=0;
      emptyRow.prevAll(".emptyRow").addBack().each(function () {
        cnt++;
        var ch = factory.build("tmp_fk" + new Date().getTime()+"_"+cnt, "", 0, true);
        ch.resourceId = ch.id;//maybe needs to be an integer??
        ch.rate = 0;
        var task = master.addResTask(ch);
        lastTask = ch;
      });
      master.endTransaction();
      if (lastTask.rowElement) {
        lastTask.rowElement.find("[name=name]").focus();//focus to "name" input
      }
    });
    this.element.append(emptyRow);
  }
};


GridResEditor.prototype.addTask = function (task, row, hideIfParentCollapsed) {
  // console.debug("GridResEditor.addTask",task,row);
  //var prof = new Profiler("ganttGridResEditor.addTask");

  //remove extisting row
  this.element.find("#rid_" + task.id).remove();

  var taskRow = $.JST.createFromTemplate(task, "TASKRESOURCEROW");

  if (!this.master.permissions.canSeeDep)
    taskRow.find(".requireCanSeeDep").hide();

  if (!this.master.permissions.canSeePopEdit)
    taskRow.find(".edit .teamworkIcon").hide();

  //save row element on task
  task.rowElement = taskRow;

  this.bindRowEvents(task, taskRow);

  if (typeof(row) != "number") {
    var emptyRow = this.element.find(".emptyRow:first"); //tries to fill an empty row
    if (emptyRow.length > 0)
      emptyRow.replaceWith(taskRow);
    else
      this.element.append(taskRow);
  } else {
    var tr = this.element.find("tr.taskEditRow").eq(row);
    if (tr.length > 0) {
      tr.before(taskRow);
    } else {
      this.element.append(taskRow);
    }

  }

  //[expand]
  if (hideIfParentCollapsed) {
    if (task.collapsed) taskRow.addClass('collapsed');
    var collapsedDescendant = this.master.getCollapsedDescendant();
    if (collapsedDescendant.indexOf(task) >= 0) taskRow.hide();
  }
  //prof.stop();
  return taskRow;
};

GridResEditor.prototype.refreshExpandStatus = function (task) {
  //console.debug("refreshExpandStatus",task);
  if (!task) return;
  if (task.isParent()) {
    task.rowElement.addClass("isParent");
  } else {
    task.rowElement.removeClass("isParent");
  }


  var par = task.getParent();
  if (par && !par.rowElement.is("isParent")) {
    par.rowElement.addClass("isParent");
  }

};

GridResEditor.prototype.refreshTaskRow = function (task) {
  // console.debug("refreshTaskRow")
  //var profiler = new Profiler("editorRefreshTaskRow");

  var canWrite=this.master.permissions.canWrite || task.canWrite;
  var row = task.rowElement;

  row.find(".taskRowIndex").html(task.getRow() + 1);
  row.find(".indentCell").css("padding-left", task.level * 10 + 18);
  row.find("[name=name]").val(task.name);
  if (task.level == 0) {
     row.find("[name=rate]").val(task.rate);
  }
  else if (task.level == 1) {
    row.find("[name=progress]").val(task.progress);
    var effort = task.effort / 28800000;
    row.find("[name=effort]").val(effort.toFixed(2));
  }
  //jkk row.find("[name=code]").val(task.code);
  // row.find("[status]").attr("status", task.status);

  //jkk row.find("[name=duration]").val(durationToString(task.duration)).prop("readonly",!canWrite || task.isParent() && task.master.shrinkResParent);
  // row.find("[name=progress]").val(task.progress).prop("readonly",!canWrite || task.progressByWorklog==true);
  // row.find("[name=startIsMilestone]").prop("checked", task.startIsMilestone);
  // row.find("[name=start]").val(new Date(task.start).format()).updateOldValue().prop("readonly",!canWrite || task.depends || !(task.canWrite  || this.master.permissions.canWrite) ); // called on dates only because for other field is called on focus event
  // row.find("[name=endIsMilestone]").prop("checked", task.endIsMilestone);
  // row.find("[name=end]").val(new Date(task.end).format()).prop("readonly",!canWrite || task.isParent() && task.master.shrinkResParent).updateOldValue();
  // row.find("[name=depends]").val(task.depends);
  // row.find(".taskAssigs").html(task.getAssigsString());

  //manage collapsed
  if (task.collapsed)
    row.addClass("collapsed");
  else
    row.removeClass("collapsed");


  //Enhancing the function to perform own operations
  //jkk don't think i need this? this.master.element.trigger('gantt.task.afterupdate.event', task);
  //profiler.stop();
};

GridResEditor.prototype.redraw = function () {
  //console.debug("GridResEditor.prototype.redraw")
  //var prof = new Profiler("gantt.GridResEditor.redraw");
  for (var i = 0; i < this.master.resTasks.length; i++) {
    this.refreshTaskRow(this.master.resTasks[i]);
  }
  // check if new empty rows are needed
  if (this.master.fillWithEmptyResLines)
    this.fillEmptyLines();

  //prof.stop()

};

GridResEditor.prototype.reset = function () {
  if (this.element)
    this.element.find("[taskid]").remove();
};


GridResEditor.prototype.bindRowEvents = function (task, taskRow) {
  var self = this;
  //console.debug("bindRowEvents",this,this.master,this.master.permissions.canWrite, task.canWrite);

  //bind row selection
  taskRow.click(function (event) {
    var row = $(this);
    // console.debug("taskRow.click",row.attr("taskid"),event.target)
    //var isSel = row.hasClass("rowSelected");
    row.closest("table").find(".rowSelected").removeClass("rowSelected");
    row.addClass("rowSelected");

    //set current task
    self.master.currentResTask = self.master.getResTask(row.attr("taskId"));
console.log("row clicked!");
console.log(row);
console.log(self.master.currentResTask);
    //move highlighter
//jkk removed    self.master.gantt.synchHighlight();

    //if offscreen scroll to element
    var top = row.position().top;
    if (top > self.element.parent().height()) {
      row.offsetParent().scrollTop(top - self.element.parent().height() + 100);
    } else if (top <= 40) {
      row.offsetParent().scrollTop(row.offsetParent().scrollTop() - 40 + top);
    }
  });


  if (this.master.permissions.canWrite || task.canWrite) {
    self.bindRowInputEvents(task, taskRow);

  } else { //cannot write: disable input
    taskRow.find("input").prop("readonly", true);
    taskRow.find("input:checkbox,select").prop("disabled", true);
  }

  if (!this.master.permissions.canSeeDep)
    taskRow.find("[name=depends]").attr("readonly", true);

  self.bindRowExpandEvents(task, taskRow);

  if (this.master.permissions.canSeePopEdit) {
    taskRow.find(".edit").click(function () {
      if (task.level == 0) {
        self.openFullEditor(task, false);
      }
      else {
        var tasks = self.master.tasks;
        //display just the assignment part of the task editor
        for(var i=0;i<tasks.length;i++) {
          if(tasks[i].id == task.taskId) {
            self.master.editor.openFullEditor(tasks[i], true);
          }
        }
      }
    });

    taskRow.dblclick(function (ev) { //open editor only if no text has been selected

      if (window.getSelection().toString().trim()=="") {

        // self.openFullEditor(task, $(ev.target).closest(".taskAssigs").size()>0)
        //jkk get the task data from editor
        if (task.level == 0) {
          //display resource in detail
          self.openFullEditor(task, true);
        }
        else {
          // var tasks = self.master.tasks;
          // //display just the assignment part of the task editor
          // for(var i=0;i<tasks.length;i++) {
          //   if(tasks[i].id == task.taskId) {
          //     self.master.editor.openFullEditor(tasks[i], true);
          //   }
          // }
        }
      }
    });
  }
  //prof.stop();
};


GridResEditor.prototype.bindRowExpandEvents = function (task, taskRow) {
  var self = this;
  //expand collapse
  taskRow.find(".exp-controller").click(function () {
    var el = $(this);
    var taskId = el.closest("[taskid]").attr("taskid");
    var task = self.master.getTask(taskId);
    if (task.collapsed) {
      self.master.expand(task,false);
    } else {
      self.master.collapse(task,false);
    }
  });
};

GridResEditor.prototype.bindRowInputEvents = function (task, taskRow) {
  var self = this;
// console.log("GridResEditor:bindRowInputEvents");
  //bind dateField on dates
  // taskRow.find(".date").each(function () {
  //   var el = $(this);
  //   el.click(function () {
  //     var inp = $(this);
  //     inp.dateField({
  //       inputField: el,
  //       minDate:self.minAllowedDate,
  //       maxDate:self.maxAllowedDate,
  //       callback:   function (d) {
  //         $(this).blur();
  //       }
  //     });
  //   });

  //   el.blur(function (date) {
  //     var inp = $(this);
  //     if (inp.isValueChanged()) {
  //       if (!Date.isValid(inp.val())) {
  //         alert(GanttMaster.messages["INVALID_DATE_FORMAT"]);
  //         inp.val(inp.getOldValue());

  //       } else {
  //         var row = inp.closest("tr");
  //         var taskId = row.attr("taskId");
  //         var task = self.master.getTask(taskId);

  //         var leavingField = inp.prop("name");
  //         var dates = resynchDates(inp, row.find("[name=start]"), row.find("[name=startIsMilestone]"), row.find("[name=duration]"), row.find("[name=end]"), row.find("[name=endIsMilestone]"));
  //         //console.debug("resynchDates",new Date(dates.start), new Date(dates.end),dates.duration)
  //         //update task from editor
  //         self.master.beginTransaction();
  //         self.master.changeTaskDates(task, dates.start, dates.end);
  //         self.master.endTransaction();
  //         inp.updateOldValue(); //in order to avoid multiple call if nothing changed
  //       }
  //     }
  //   });
  // });


  // //milestones checkbox
  // taskRow.find(":checkbox").click(function () {
  //   var el = $(this);
  //   var row = el.closest("tr");
  //   var taskId = row.attr("taskId");

  //   var task = self.master.getTask(taskId);

  //   //update task from editor
  //   var field = el.prop("name");

  //   if (field == "startIsMilestone" || field == "endIsMilestone") {
  //     self.master.beginTransaction();
  //     //milestones
  //     task[field] = el.prop("checked");
  //     resynchDates(el, row.find("[name=start]"), row.find("[name=startIsMilestone]"), row.find("[name=duration]"), row.find("[name=end]"), row.find("[name=endIsMilestone]"));
  //     self.master.endTransaction();
  //   }

  // });


  //binding on blur for task update (date exluded as click on calendar blur and then focus, so will always return false, its called refreshing the task row)
  taskRow.find("input:text:not(.date)").focus(function () {
    $(this).updateOldValue();

  }).blur(function (event) {
    var el = $(this);
    var row = el.closest("tr");
    var taskId = row.attr("taskId");
    var task = self.master.getResTask(taskId); // get resource task object
    //update task from editor
    var field = el.prop("name");

    if (el.isValueChanged()) {

      self.master.beginTransaction();
      if (field == "duration") {
        // var dates = resynchDates(el, row.find("[name=start]"), row.find("[name=startIsMilestone]"), row.find("[name=duration]"), row.find("[name=end]"), row.find("[name=endIsMilestone]"));
        // self.master.changeTaskDates(task, dates.start, dates.end);

      } else if (field == "name" && el.val() == "") { // remove unfilled task
        console.log("user wants to delete this resource or task??? id="+taskId);
        if (task.level == 0)
          self.master.deleteCurrentResTask(taskId);

      } else if (field == "rate" && task.level == 0) {
        task[field]=parseFloat(el.val())||0;
        if (task[field]<0) task[field] = 0.0;
        task[field] = task[field].toFixed(2);
        var resource = self.master.getResource(task.resourceId);
        resource.rate = task[field];
        el.val(task[field]);
      } else if (field == "effort" && task.level == 1) {
        var effort = parseFloat(el.val())||0;
        if (effort < 0) effort = 0.0;
        el.val(effort.toFixed(2));
        effort *= 28800000;//this is milliseconds in working days "millisInWorkingDay" @see i18nJs.js
        task.effort = effort;
        var realTask = self.master.getTask(task.taskId);//get the real task object.
        //update all resource's assignments that use the same task
        var totalEffort = 0;
        for(var i=0; i < realTask.assigs.length; i++) {
          if (realTask.assigs[i].resourceId == task.resourceId) {
            realTask.assigs[i].effort = effort;
            
          }
          totalEffort += realTask.assigs[i].effort;
        }
        //change duration: convert from workdays in milliseconds to full days and set new duration
        totalEffort = Math.round(totalEffort / 28800000);
        if (totalEffort > 0) {
          var rrr = resynchDates(null, realTask.start, realTask.startIsMilestone||!realTask.canWrite, totalEffort, realTask.end, realTask.endIsMilestone||!realTask.canWrite);
          if (rrr) {
            realTask.start = rrr.start;
            realTask.end = rrr.end;
            realTask.duration = rrr.duration;
            realTask.setPeriod(realTask.start, realTask.end + (3600000 * 22));

          }
        }
      } else if (field == "progress" && task.level == 1) {
        task[field]=parseFloat(el.val())||0;
        if(task[field]<0.0) task[field] = 0.0;
        else if (task[field]>100.0) task[field] = 100.0;
        el.val(task[field]);
        var realTask = self.master.getTask(task.taskId);//get the real task object.
        realTask.progress = task[field];
        //all task rows in resource editor must be updated if taskId is the same.
        for(var i = 0; i < self.master.resTasks.length; i++) {
          if (self.master.resTasks[i].taskId == task.taskId) {
            self.master.resTasks[i].progress = task[field];
            //update html table directly
            $('.gdfResTable tr[taslId="'+self.master.resTasks[i].taskId+'"] td:eq(5)').val(task[field]);
          }
        }
      } else if (field == "name") {
        task[field] = el.val();
      } else {
        el.val("");
      }
      self.master.endTransaction();

    } else if (field == "name" && el.val() == "") { // remove unfilled task even if not changed
      if (task.getRow()!=0) {
        self.master.deleteCurrentResTask(taskId);//jkk works

      }else {
        el.oneTime(1,"foc",function(){$(this).focus()}); //
        event.preventDefault();
        //return false;
      }

    }
  });

  //cursor key movement
  taskRow.find("input").keydown(function (event) {
    var theCell = $(this);
    var theTd = theCell.parent();
    var theRow = theTd.parent();
    var col = theTd.prevAll("td").length;

    var ret = true;
    if (!event.ctrlKey) {
      switch (event.keyCode) {
      case 13:
        if (theCell.is(":text"))
          theCell.blur();
        break;

        case 37: //left arrow
          if (!theCell.is(":text") || (!this.selectionEnd || this.selectionEnd == 0))
            theTd.prev().find("input").focus();
          break;
        case 39: //right arrow
          if (!theCell.is(":text") || (!this.selectionEnd || this.selectionEnd == this.value.length))
            theTd.next().find("input").focus();
          break;

        case 38: //up arrow
          //var prevRow = theRow.prev();
          var prevRow = theRow.prevAll(":visible:first");
          var td = prevRow.find("td").eq(col);
          var inp = td.find("input");

          if (inp.length > 0)
            inp.focus();
          break;
        case 40: //down arrow
          //var nextRow = theRow.next();
          var nextRow = theRow.nextAll(":visible:first");
          var td = nextRow.find("td").eq(col);
          var inp = td.find("input");
          if (inp.length > 0)
            inp.focus();
          else
            nextRow.click(); //create a new row
          break;
        case 36: //home
          break;
        case 35: //end
          break;

        case 9: //tab
        case 13: //enter
          break;
      }
    }
    return ret;

  }).focus(function () {
    $(this).closest("tr").click();
  });


  // //change status
  // taskRow.find(".taskStatus").click(function () {
  //   var el = $(this);
  //   var tr = el.closest("[taskid]");
  //   var taskId = tr.attr("taskid");
  //   var task = self.master.getTask(taskId);

  //   var changer = $.JST.createFromTemplate({}, "CHANGE_STATUS");
  //   changer.find("[status=" + task.status + "]").addClass("selected");
  //   changer.find(".taskStatus").click(function (e) {
  //     e.stopPropagation();
  //     var newStatus = $(this).attr("status");
  //     changer.remove();
  //     self.master.beginTransaction();
  //     task.changeStatus(newStatus);
  //     self.master.endTransaction();
  //     el.attr("status", task.status);
  //   });
  //   el.oneTime(3000, "hideChanger", function () {
  //     changer.remove();
  //   });
  //   el.after(changer);
  // });

};

GridResEditor.prototype.openFullEditor = function (task, editOnlyAssig) {
  var self = this;

  if (!self.master.permissions.canSeePopEdit)
    return;

  var taskRow=task.rowElement;

  //task editor in popup
  var taskId = taskRow.attr("taskId");

  //make task editor
  var taskEditor = $.JST.createFromTemplate(task, "RESOURCE_DETAIL_EDITOR");

  // //hide task data if editing assig only
  // if (editOnlyAssig) {
  //   taskEditor.find(".taskData").hide();
  //   taskEditor.find(".assigsTableWrapper").height(455);
  //   taskEditor.prepend("<h1>\""+task.name+"\"</h1>");
  // }

  // //got to extended editor
  // if (task.isNew()|| !self.master.permissions.canSeeFullEdit){
  //   taskEditor.find("#taskFullEditor").remove();
  // } else {
  //   taskEditor.bind("openFullEditor.gantt",function () {
  //     window.location.href=contextPath+"/applications/teamwork/task/taskEditor.jsp?CM=ED&OBJID="+task.id;
  //   });
  // }


  taskEditor.find("#name").val(task.name);
  taskEditor.find("#rate").val(task.rate);
  //jkk taskEditor.find("#description").val(task.description);
  // taskEditor.find("#code").val(task.code);
  // taskEditor.find("#progress").val(task.progress ? parseFloat(task.progress) : 0).prop("readonly",task.progressByWorklog==true);
  // taskEditor.find("#progressByWorklog").prop("checked",task.progressByWorklog);
  // taskEditor.find("#status").val(task.status);
  // taskEditor.find("#type").val(task.typeId);
  // taskEditor.find("#type_txt").val(task.type);
  // taskEditor.find("#relevance").val(task.relevance);
  //cvc_redraw(taskEditor.find(".cvcComponent"));


  //jkk if (task.startIsMilestone)
  //   taskEditor.find("#startIsMilestone").prop("checked", true);
  // if (task.endIsMilestone)
  //   taskEditor.find("#endIsMilestone").prop("checked", true);

  //jkk taskEditor.find("#duration").val(durationToString(task.duration));
  // var startDate = taskEditor.find("#start");
  // startDate.val(new Date(task.start).format());
  // //start is readonly in case of deps
  // if (task.depends || !(this.master.permissions.canWrite ||task.canWrite)) {
  //   startDate.attr("readonly", "true");
  // } else {
  //   startDate.removeAttr("readonly");
  // }

  // taskEditor.find("#end").val(new Date(task.end).format());

  // //make assignments table
  // var assigsTable = taskEditor.find("#assigsTable");
  // assigsTable.find("[assId]").remove();
  // // loop on assignments
  // for (var i = 0; i < task.assigs.length; i++) {
  //   var assig = task.assigs[i];
  //   var assigRow = $.JST.createFromTemplate({task: task, assig: assig}, "ASSIGNMENT_ROW");
  //   assigsTable.append(assigRow);
  // }

  taskEditor.find(":input").updateOldValue();

  if (!(self.master.permissions.canWrite || task.canWrite)) {
    taskEditor.find("input,textarea").prop("readOnly", true);
    taskEditor.find("input:checkbox,select").prop("disabled", true);
    taskEditor.find("#resEditSaveButton").remove();
    taskEditor.find(".button").addClass("disabled");

  } else {

    // //bind dateField on dates, duration
    // taskEditor.find("#start,#end,#duration").click(function () {
    //   var input = $(this);
    //   if (input.is("[entrytype=DATE]")) {
    //     input.dateField({
    //       inputField: input,
    //       minDate:self.minAllowedDate,
    //       maxDate:self.maxAllowedDate,
    //       callback:   function (d) {$(this).blur();}
    //     });
    //   }
    // }).blur(function () {
    //   var inp = $(this);
    //   if (inp.validateField()) {
    //     resynchDates(inp, taskEditor.find("[name=start]"), taskEditor.find("[name=startIsMilestone]"), taskEditor.find("[name=duration]"), taskEditor.find("[name=end]"), taskEditor.find("[name=endIsMilestone]"));
    //     //workload computation
    //     if (typeof(workloadDatesChanged)=="function")
    //       workloadDatesChanged();
    //   }
    // });

    // taskEditor.find("#startIsMilestone,#endIsMilestone").click(function () {
    //   var inp = $(this);
    //   resynchDates(inp, taskEditor.find("[name=start]"), taskEditor.find("[name=startIsMilestone]"), taskEditor.find("[name=duration]"), taskEditor.find("[name=end]"), taskEditor.find("[name=endIsMilestone]"));
    // });

    // //bind add assignment
    // var cnt=0;
    // taskEditor.find("#addAssig").click(function () {
    //   cnt++;
    //   var assigsTable = taskEditor.find("#assigsTable");
    //   var assigRow = $.JST.createFromTemplate({task: task, assig: {id: "tmp_" + new Date().getTime()+"_"+cnt}}, "ASSIGNMENT_ROW");
    //   assigsTable.append(assigRow);
    //   $("#bwinPopupd").scrollTop(10000);
    // }).click();

    //save task
    taskEditor.bind("saveResEditor.gantt",function () {
      //console.debug("saveFullEditor");
      var task = self.master.getResTask(taskId); // get task again because in case of rollback old task is lost

      self.master.beginTransaction();
      task.name = taskEditor.find("#name").val();
      task.rate = taskEditor.find("#rate").val();

      //TODO change the actual resource record!

      //jkk task.description = taskEditor.find("#description").val();
      // task.code = taskEditor.find("#code").val();
      // task.progress = parseFloat(taskEditor.find("#progress").val());
      // //task.duration = parseInt(taskEditor.find("#duration").val()); //bicch rimosso perchè devono essere ricalcolata dalla start end, altrimenti sbaglia
      // task.startIsMilestone = taskEditor.find("#startIsMilestone").is(":checked");
      // task.endIsMilestone = taskEditor.find("#endIsMilestone").is(":checked");

      // task.type = taskEditor.find("#type_txt").val();
      // task.typeId = taskEditor.find("#type").val();
      // task.relevance = taskEditor.find("#relevance").val();
      // task.progressByWorklog= taskEditor.find("#progressByWorklog").is(":checked");

      //set assignments
      //jkk var cnt=0;
      // taskEditor.find("tr[assId]").each(function () {
      //   var trAss = $(this);
      //   var assId = trAss.attr("assId");
      //   var resId = trAss.find("[name=resourceId]").val();
      //   var resName = trAss.find("[name=resourceId_txt]").val(); // from smartcombo text input part
      //   var roleId = trAss.find("[name=roleId]").val();
      //   //jkk force the value to always be in 'days'
      //   var effort = trAss.find("[name=effort]").val() + "D";
      //   var effort = millisFromString(effort,true);

      //   //check if the selected resource exists in ganttMaster.resources
      //   var res= self.master.getOrCreateResource(resId,resName);

      //   //if resource is not found nor created
      //   if (!res)
      //     return;

      //   //check if an existing assig has been deleted and re-created with the same values
      //   var found = false;
      //   for (var i = 0; i < task.assigs.length; i++) {
      //     var ass = task.assigs[i];

      //     if (assId == ass.id) {
      //       ass.effort = effort;
      //       ass.roleId = roleId;
      //       ass.resourceId = res.id;
      //       ass.touched = true;
      //       found = true;
      //       break;

      //     } else if (roleId == ass.roleId && res.id == ass.resourceId) {
      //       ass.effort = effort;
      //       ass.touched = true;
      //       found = true;
      //       break;

      //     }
      //   }

      //   if (!found && resId && roleId) { //insert
      //     cnt++;
      //     var ass = task.createAssignment("tmp_" + new Date().getTime()+"_"+cnt, resId, roleId, effort);
      //     ass.touched = true;
      //   }

      // });

      //remove untouched assigs
      //jkk task.assigs = task.assigs.filter(function (ass) {
      //   var ret = ass.touched;
      //   delete ass.touched;
      //   return ret;
      // });

      //change dates
      //jkk task.setPeriod(Date.parseString(taskEditor.find("#start").val()).getTime(), Date.parseString(taskEditor.find("#end").val()).getTime() + (3600000 * 22));

      //change status
      //jkk task.changeStatus(taskEditor.find("#status").val());

      if (self.master.endTransaction()) {
        taskEditor.find(":input").updateOldValue();
        closeBlackPopup();
        //update resource record
        var resources = self.master.resources;
        for(var i=0;i<resources.length;i++) {
          if (task.resourceId == resources[i].id) {
            self.master.resources[i].name = task.name;
            self.master.resources[i].rate = task.rate;
          }
        }

      }

    });
  }

  taskEditor.attr("alertonchange","true");
  var ndo = createModalPopup(800, 450).append(taskEditor);//.append("<div style='height:800px; background-color:red;'></div>")

  //workload computation
  if (typeof(workloadDatesChanged)=="function")
    workloadDatesChanged();



};
