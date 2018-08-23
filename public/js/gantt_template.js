var ge;
$(function() {


  $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
  });

     $('[type="GANTBUTTONS"].__template__').html(
  '<!--<div class="ganttButtonBar noprint"> \
    <div class="buttons">\
      <a href="https://gantt.twproject.com/"><img src="res/twGanttLogo.png" alt="Twproject" align="absmiddle" style="max-width: 136px; padding-right: 15px"></a>\
\
      <button onclick="if(!$(this).hasClass(\'disabled\')){$(\'#workSpace\').trigger(\'undo.gantt\');}return false;" class="taskEditOnly button textual icon requireCanWrite" title="undo"><span class="teamworkIcon">&#39;</span></button>\
      <button onclick="if(!$(this).hasClass(\'disabled\')){$(\'#workSpace\').trigger(\'redo.gantt\');}return false;" class="taskEditOnly button textual icon requireCanWrite" title="redo"><span class="teamworkIcon">&middot;</span></button>\
      <span class="ganttButtonSeparator requireCanWrite requireCanAdd"></span>\
      <button onclick="if(!$(this).hasClass(\'disabled\')){$(\'#workSpace\').trigger(\'addAboveCurrentTask.gantt\');}return false;" class="taskEditOnly button textual icon requireCanWrite requireCanAdd" title="insert above"><span class="teamworkIcon">l</span></button>\
      <button onclick="if(!$(this).hasClass(\'disabled\')){$(\'#workSpace\').trigger(\'addBelowCurrentTask.gantt\');}return false;" class="taskEditOnly button textual icon requireCanWrite requireCanAdd" title="insert below"><span class="teamworkIcon">X</span></button>\
      <span class="ganttButtonSeparator requireCanWrite requireCanInOutdent"></span>\
      <button onclick="if(!$(this).hasClass(\'disabled\')){$(\'#workSpace\').trigger(\'outdentCurrentTask.gantt\');}return false;" class="taskEditOnly button textual icon requireCanWrite requireCanInOutdent" title="un-indent task"><span class="teamworkIcon">.</span></button>\
      <button onclick="if(!$(this).hasClass(\'disabled\')){$(\'#workSpace\').trigger(\'indentCurrentTask.gantt\');}return false;" class="taskEditOnly button textual icon requireCanWrite requireCanInOutdent" title="indent task"><span class="teamworkIcon">:</span></button>\
      <span class="ganttButtonSeparator requireCanWrite requireCanMoveUpDown"></span>\
      <button onclick="if(!$(this).hasClass(\'disabled\')){$(\'#workSpace\').trigger(\'moveUpCurrentTask.gantt\');}return false;" class="taskEditOnly button textual icon requireCanWrite requireCanMoveUpDown" title="move up"><span class="teamworkIcon">k</span></button>\
      <button onclick="if(!$(this).hasClass(\'disabled\')){$(\'#workSpace\').trigger(\'moveDownCurrentTask.gantt\');}return false;" class="taskEditOnly button textual icon requireCanWrite requireCanMoveUpDown" title="move down"><span class="teamworkIcon">j</span></button>\
      <span class="ganttButtonSeparator requireCanWrite requireCanDelete"></span>\
      <button onclick="$(\'#workSpace\').trigger(\'deleteFocused.gantt\');return false;" class="button textual icon delete requireCanWrite" title="Delete Task"><span class="teamworkIcon">&cent;</span></button>\
      <span class="ganttButtonSeparator"></span>\
      <button onclick="$(\'#workSpace\').trigger(\'expandAll.gantt\');return false;" class="button textual icon " title="EXPAND_ALL"><span class="teamworkIcon">6</span></button>\
      <button onclick="$(\'#workSpace\').trigger(\'collapseAll.gantt\'); return false;" class="button textual icon " title="COLLAPSE_ALL"><span class="teamworkIcon">5</span></button>\
\
    <span class="ganttButtonSeparator"></span>\
      <button onclick="$(\'#workSpace\').trigger(\'zoomMinus.gantt\'); return false;" class="button textual icon " title="zoom out"><span class="teamworkIcon">)</span></button>\
      <button onclick="$(\'#workSpace\').trigger(\'zoomPlus.gantt\');return false;" class="button textual icon " title="zoom in"><span class="teamworkIcon">(</span></button>\
    <span class="ganttButtonSeparator"></span>\
      <button onclick="$(\'#workSpace\').trigger(\'print.gantt\');return false;" class="button textual icon " title="Print"><span class="teamworkIcon">p</span></button>\
    <span class="ganttButtonSeparator"></span>\
      <button onclick="ge.gantt.showCriticalPath=!ge.gantt.showCriticalPath; ge.redraw();return false;" class="button textual icon requireCanSeeCriticalPath" title="CRITICAL_PATH"><span class="teamworkIcon">&pound;</span></button>\
    <span class="ganttButtonSeparator requireCanSeeCriticalPath"></span>\
      <button onclick="ge.splitter.resize(.1);return false;" class="button textual icon" ><span class="teamworkIcon">F</span></button>\
      <button onclick="ge.splitter.resize(50);return false;" class="button textual icon" ><span class="teamworkIcon">O</span></button>\
      <button onclick="ge.splitter.resize(100);return false;" class="button textual icon"><span class="teamworkIcon">R</span></button>\
      <span class="ganttButtonSeparator"></span>\
      <button onclick="$(\'#workSpace\').trigger(\'fullScreen.gantt\');return false;" class="button textual icon" title="FULLSCREEN" id="fullscrbtn"><span class="teamworkIcon">@</span></button>\
      <button onclick="ge.element.toggleClass(\'colorByStatus\' );return false;" class="button textual icon"><span class="teamworkIcon">&sect;</span></button>\
\
    <button onclick="getInviteUsers();" class="button textual requireWrite" title="edit resources"><span class="teamworkIcon">M</span></button>\
      &nbsp; &nbsp; &nbsp; &nbsp;\
    <button onclick="saveGanttOnServer();" class="button first big requireWrite" title="Save">Save</button>\
    <button onclick="newProject();" class="button requireWrite newproject"><em>clear project</em></button>\
    <button class="button login" title="login/enroll" onclick="loginEnroll($(this));" style="display:none;">login/enroll</button>\
    <button class="button opt collab" title="Start with Twproject" onclick="collaborate($(this));" style="display:none;"><em>collaborate</em></button>\
    <span class="ganttButtonSeparator requireCanSeeCriticalPath"></span>\
    <button onclick="editDetailResources();" class="button textual requireWrite toggleEditor" title="resource view"><span class="teamworkIcon">=</span></button>\
    </div></div>\
-->');

$('[type="TASKSEDITHEAD"].__template__').html(
'<!--\
  <table class="gdfTable" cellspacing="0" cellpadding="0">\
    <thead>\
    <tr style="height:40px">\
      <th class="gdfColHeader" style="width:35px; border-right: none"></th>\
      <th class="gdfColHeader" style="width:25px;"></th>\
      <th class="gdfColHeader gdfResizable" style="width:140px;">nickname</th>\
      <th class="gdfColHeader gdfResizable" style="width:300px;">name</th>\
      <th class="gdfColHeader"  align="center" style="width:17px;" title="Start date is a milestone."><span class="teamworkIcon" style="font-size: 8px;">^</span></th>\
      <th class="gdfColHeader gdfResizable" style="width:80px;">start</th>\
      <th class="gdfColHeader"  align="center" style="width:17px;" title="End date is a milestone."><span class="teamworkIcon" style="font-size: 8px;">^</span></th>\
      <th class="gdfColHeader gdfResizable" style="width:80px;">end</th>\
      <th class="gdfColHeader gdfResizable" style="width:50px;">dur.</th>\
      <th class="gdfColHeader gdfResizable" style="width:20px;">%</th>\
      <th class="gdfColHeader gdfResizable requireCanSeeDep" style="width:50px;">depe.</th>\
      <th class="gdfColHeader gdfResizable" style="width:1000px; text-align: left; padding-left: 10px;">assignees</th>\
    </tr>\
    </thead>\
  </table>\
  -->');

$('[type="TASKROW"].__template__').html(
'<!--\
  <tr id="tid_(#=obj.id#)" taskId="(#=obj.id#)" class="taskEditRow (#=obj.isParent()?\'isParent\':\'\'#) (#=obj.collapsed?\'collapsed\':\'\'#)" level="(#=level#)">\
    <th class="gdfCell edit" align="right" style="cursor:pointer;"><span class="taskRowIndex">(#=obj.getRow()+1#)</span> <span class="teamworkIcon" style="font-size:12px;" >e</span></th>\
    <td class="gdfCell noClip" align="center"><div class="taskStatus cvcColorSquare" status="(#=obj.status#)"></div></td>\
    <td class="gdfCell"><input type="text" name="code" value="(#=obj.code?obj.code:\'\'#)" placeholder="code/short name"></td>\
    <td class="gdfCell indentCell" style="padding-left:(#=obj.level*10+18#)px;">\
      <div class="exp-controller" align="center"></div>\
      <input type="text" name="name" value="(#=obj.name#)" placeholder="name">\
    </td>\
    <td class="gdfCell" align="center"><input type="checkbox" name="startIsMilestone"></td>\
    <td class="gdfCell"><input type="text" name="start"  value="" class="date"></td>\
    <td class="gdfCell" align="center"><input type="checkbox" name="endIsMilestone"></td>\
    <td class="gdfCell"><input type="text" name="end" value="" class="date"></td>\
    <td class="gdfCell"><input type="text" name="duration" autocomplete="off" value="(#=obj.duration#)"></td>\
    <td class="gdfCell"><input type="text" name="progress" class="validated" entrytype="PERCENTILE" autocomplete="off" value="(#=obj.progress?obj.progress:\'\'#)" (#=obj.progressByWorklog?"readOnly":""#)></td>\
    <td class="gdfCell requireCanSeeDep"><input type="text" name="depends" autocomplete="off" value="(#=obj.depends#)" (#=obj.hasExternalDep?"readonly":""#)></td>\
    <td class="gdfCell taskAssigs">(#=obj.getAssigsString()#)</td>\
  </tr>\
  -->');

$('[type="TASKEMPTYROW"].__template__').html(
'<!--\
  <tr class="taskEditRow emptyRow" >\
    <th class="gdfCell" align="right"></th>\
    <td class="gdfCell noClip" align="center"></td>\
    <td class="gdfCell"></td>\
    <td class="gdfCell"></td>\
    <td class="gdfCell"></td>\
    <td class="gdfCell"></td>\
    <td class="gdfCell"></td>\
    <td class="gdfCell"></td>\
    <td class="gdfCell"></td>\
    <td class="gdfCell"></td>\
    <td class="gdfCell requireCanSeeDep"></td>\
    <td class="gdfCell"></td>\
  </tr>\
  -->');

/****************** resource editor *********************/

$('[type="TASKSEDITRESOURCEHEAD"].__template__').html(
'<!--\
  <table class="gdfResTable" cellspacing="0" cellpadding="0">\
    <thead>\
    <tr style="height:40px">\
      <th class="gdfColHeader" style="width:35px; border-right: none"></th>\
      <th class="gdfColHeader" style="width:25px;"></th>\
      <th class="gdfColHeader gdfResizable" style="width:300px;">Team Members</th>\
      <th class="gdfColHeader gdfResizable" style="width:100px;">Task Cost</th>\
      <th class="gdfColHeader gdfResizable" style="width:100px;">Standard Rate</th>\
      <th class="gdfColHeader gdfResizable" style="width:80px;">Work Days</th>\
      <th class="gdfColHeader gdfResizable" style="width:80px;">Progress</th>\
    </tr>\
    </thead>\
  </table>\
  -->');

$('[type="TASKRESOURCEROW"].__template__').html(
'<!--\
  <tr id="rid_(#=obj.id#)" taskId="(#=obj.id#)" class="taskEditRow (#=obj.isParent()?\'isParent\':\'\'#) (#=obj.collapsed?\'collapsed\':\'\'#)" level="(#=level#)">\
    <th class="gdfCell edit" align="right" style="cursor:pointer;"><span class="taskRowIndex">(#=obj.getRow()+1#)</span> <span class="teamworkIcon" style="font-size:12px;" >e</span></th>\
    <td class="gdfCell noClip" align="center"><div class="taskStatus cvcColorSquare" status="(#=obj.status#)"></div></td>\
    <td class="gdfCell indentCell" style="padding-left:(#=obj.level*10+18#)px;">\
      <div class="exp-controller" align="center"></div>\
      <input type="text" name="name" value="(#=obj.name#)" autocomplete="off" placeholder="name">\
    </td>\
    <td class="gdfCell"><input type="text" name="cost" autocomplete="off" value="(#=obj.cost#)" readonly></td>\
    <td class="gdfCell"><input type="text" name="rate" autocomplete="off" value="(#=obj.duration#)"></td>\
    <td class="gdfCell"><input type="text" name="effort" autocomplete="off" value="(#=getMillisInDays(obj.effort)#)" class=""></td>\
    <td class="gdfCell"><input type="text" name="progress" class="" entrytype="PERCENTILE" autocomplete="off" value="(#=obj.progress#)"></td>\
  </tr>\
  -->');

$('[type="TASKEMPTYRESOURCEROW"].__template__').html(
'<!--\
  <tr class="taskEditRow emptyRow" >\
    <th class="gdfCell" align="right"></th>\
    <td class="gdfCell noClip" align="center"></td>\
    <td class="gdfCell"></td>\
    <td class="gdfCell"></td>\
    <td class="gdfCell"></td>\
    <td class="gdfCell"></td>\
    <td class="gdfCell"></td>\
  </tr>\
  -->');

/****************** resource editor *********************/

$('[type="TASKBAR"].__template__').html(
'<!--\
  <div class="taskBox taskBoxDiv" taskId="(#=obj.id#)" >\
    <div class="layout (#=obj.hasExternalDep?\'extDep\':\'\'#)">\
      <div class="taskStatus" status="(#=obj.status#)"></div>\
      <div class="taskProgress" style="width:(#=obj.progress>100?100:obj.progress#)%; background-color:(#=obj.progress>100?\'red\':\'rgb(153,255,51);\'#);"></div>\
      <div class="milestone (#=obj.startIsMilestone?\'active\':\'\'#)" ></div>\
\
      <div class="taskLabel"></div>\
      <div class="milestone end (#=obj.endIsMilestone?\'active\':\'\'#)" ></div>\
    </div>\
  </div>\
  -->');

$('[type="CHANGE_STATUS"].__template__').html(
'<!--\
    <div class="taskStatusBox">\
    <div class="taskStatus cvcColorSquare" status="STATUS_ACTIVE" title="Active"></div>\
    <div class="taskStatus cvcColorSquare" status="STATUS_DONE" title="Completed"></div>\
    <div class="taskStatus cvcColorSquare" status="STATUS_FAILED" title="Failed"></div>\
    <div class="taskStatus cvcColorSquare" status="STATUS_SUSPENDED" title="Suspended"></div>\
    <div class="taskStatus cvcColorSquare" status="STATUS_WAITING" title="Waiting" style="display: none;"></div>\
    <div class="taskStatus cvcColorSquare" status="STATUS_UNDEFINED" title="Undefined"></div>\
    </div>\
  -->');

$('[type="TASK_EDITOR"].__template__').html(
'<!--\
  <div class="ganttTaskEditor">\
    <h2 class="taskData">Task editor</h2>\
    <table  cellspacing="1" cellpadding="5" width="100%" class="taskData table" border="0">\
          <tr>\
        <td width="200" style="height: 40px"  valign="top">\
          <label for="code">code/short name</label><br>\
          <input type="text" name="code" id="code" value="" size=15 class="formElements" autocomplete=\'off\' maxlength=255 style=\'width:100%\' oldvalue="1">\
        </td>\
        <td colspan="3" valign="top"><label for="name" class="required">name</label><br><input type="text" name="name" id="name" class="formElements" autocomplete=\'off\' maxlength=255 style=\'width:100%\' value="" required="true" oldvalue="1"></td>\
          </tr>\
      <tr class="dateRow">\
        <td nowrap="">\
          <div style="position:relative">\
            <label for="start">start</label>&nbsp;&nbsp;&nbsp;&nbsp;\
            <input type="checkbox" id="startIsMilestone" name="startIsMilestone" value="yes"> &nbsp;<label for="startIsMilestone">is milestone</label>&nbsp;\
            <br><input type="text" name="start" id="start" size="8" class="formElements dateField validated date" autocomplete="off" maxlength="255" value="" oldvalue="1" entrytype="DATE">\
            <span title="calendar" id="starts_inputDate" class="teamworkIcon openCalendar" onclick="$(this).dateField({inputField:$(this).prevAll(\':input:first\'),isSearchField:false});">m</span>          </div>\
        </td>\
        <td nowrap="">\
          <label for="end">End</label>&nbsp;&nbsp;&nbsp;&nbsp;\
          <input type="checkbox" id="endIsMilestone" name="endIsMilestone" value="yes"> &nbsp;<label for="endIsMilestone">is milestone</label>&nbsp;\
          <br><input type="text" name="end" id="end" size="8" class="formElements dateField validated date" autocomplete="off" maxlength="255" value="" oldvalue="1" entrytype="DATE">\
          <span title="calendar" id="ends_inputDate" class="teamworkIcon openCalendar" onclick="$(this).dateField({inputField:$(this).prevAll(\':input:first\'),isSearchField:false});">m</span>\
        </td>\
        <td nowrap="" >\
          <label for="duration" class=" ">Days</label><br>\
          <input type="text" name="duration" id="duration" size="4" class="formElements validated durationdays" title="Duration is in working days." autocomplete="off" maxlength="255" value="" oldvalue="1" entrytype="DURATIONDAYS">&nbsp;\
        </td>\
      </tr>\
      <tr>\
        <td  colspan="1">\
          <label for="status" class=" ">status</label><br>\
          <select id="status" name="status" class="taskStatus" status="(#=obj.status#)"  onchange="$(this).attr(\'STATUS\',$(this).val());">\
            <option value="STATUS_ACTIVE" class="taskStatus" status="STATUS_ACTIVE" >active</option>\
            <option value="STATUS_WAITING" class="taskStatus" status="STATUS_WAITING" >suspended</option>\
            <option value="STATUS_SUSPENDED" class="taskStatus" status="STATUS_SUSPENDED" >suspended</option>\
            <option value="STATUS_DONE" class="taskStatus" status="STATUS_DONE" >completed</option>\
            <option value="STATUS_FAILED" class="taskStatus" status="STATUS_FAILED" >failed</option>\
            <option value="STATUS_UNDEFINED" class="taskStatus" status="STATUS_UNDEFINED" >undefined</option>\
          </select>\
        </td>\
\
        <td valign="top" nowrap>\
          <label>type</label><br>\
          <input type="text" name="type_txt" id="type_txt" size="4" class="formElements validated" autocomplete="off" maxlength="255" value="" oldvalue="" entrytype="">\
        </td>\
        <td valign="top" nowrap>\
          <label>typeId</label><br>\
          <input type="text" name="type" id="type" size="4" class="formElements validated" autocomplete="off" maxlength="255" value="" oldvalue="1" entrytype="INTEGER">\
        </td>\
        <td valign="top" nowrap>\
          <label>relevance</label><br>\
          <input type="text" name="relevance" id="relevance" size="4" class="formElements validated" autocomplete="off" maxlength="255" value="" oldvalue="1" entrytype="INTEGER">\
        </td>\
        <td valign="top" nowrap>\
          <label>progress</label><br>\
          <input type="text" name="progress" id="progress" size="7" class="formElements validated percentile" autocomplete="off" maxlength="255" value="" oldvalue="1" entrytype="PERCENTILE">\
        </td>\
      </tr>\
\
          </tr>\
          <tr>\
            <td colspan="4">\
              <label for="description">Description</label><br>\
              <textarea rows="3" cols="30" id="description" name="description" class="formElements" style="width:100%"></textarea>\
            </td>\
          </tr>\
        </table>\
\
    <h2>Assignments</h2>\
  <table  cellspacing="1" cellpadding="0" width="100%" id="assigsTable">\
    <tr>\
      <th style="width:100px;">name</th>\
      <th style="width:70px;">Role</th>\
      <th style="width:30px;">work days</th>\
      <th style="width:30px;" id="addAssig"><span class="teamworkIcon" style="cursor: pointer">+</span></th>\
    </tr>\
  </table>\
\
  <div style="text-align: right; padding-top: 20px">\
    <span id="saveButton" class="button first" onClick="$(this).trigger(\'saveFullEditor.gantt\');">Save</span>\
  </div>\
\
  </div>\
  -->');

$('[type="ASSIGNMENT_ROW"].__template__').html(
'<!--\
  <tr taskId="(#=obj.task.id#)" assId="(#=obj.assig.id#)" class="assigEditRow" >\
    <td ><select name="resourceId"  class="formElements" (#=obj.assig.id.indexOf("tmp_")==0?"":"disabled"#) ></select></td>\
    <td ><select type="select" name="roleId"  class="formElements"></select></td>\
    <td ><input type="text" name="effort" value="(#=getMillisInDays(obj.assig.effort)#)" size="5" class="formElements text-right"></td>\
    <td align="center"><span class="teamworkIcon delAssig del" style="cursor: pointer">d</span></td>\
  </tr>\
  -->');

$('[type="RESOURCE_EDITOR"].__template__').html(
'<!--\
  <div class="resourceEditor" style="padding: 5px;">\
\
    <h2>Project team</h2>\
    <table  cellspacing="1" cellpadding="0" width="100%" id="resourcesTable">\
      <tr>\
        <th style="width:100px;">name</th>\
        <th style="width:30px;" id="addResource"><span class="teamworkIcon" style="cursor: pointer">+</span></th>\
      </tr>\
    </table>\
    <div style="text-align: right; padding-top: 20px"><button id="resSaveButton" class="button big">Save Project Team</button></div>\
    <h2>Add User</h2>\
    <table cellspacing="1" cellpadding="0" width="100%" id="inviteTable">\
      <tr>\
        <th style="width:100px;">name</th>\
        <th style="width:30px">Add User</th>\
      </tr>\
    </table>\
    <p></p>\
    <h2>Invite User</h2>\
    <table cellspacing="1" cellpadding="0" width="100%">\
      <tr>\
        <td width="100" style="height: 40px"  valign="top">\
          <label for="code">User name</label><br>\
          <input type="text" id="inviteName" value="" size=15 class="formElements" autocomplete=\'off\' maxlength=255 style=\'width:100%\' oldvalue="">\
        </td>\
        <td colspan="3" valign="top"><label for="email" class="required">email</label><br><input type="email" id="inviteEmail" class="formElements" autocomplete=\'off\' maxlength=255 style=\'width:100%\' value="" required="true" oldvalue=""></td>\
      </tr>\
    </table>\
    <div style="text-align: right; padding-top: 20px"><button id="inviteButton" class="button big">Invite</button></div>\
  </div>\
  -->');

$('[type="RESOURCE_ROW"].__template__').html(
'<!--\
  <tr resId="(#=obj.id#)" class="resRow" >\
    <input name="userId" type="hidden" value="(#=obj.userId#)">\
    <td ><input type="text" name="name" value="(#=obj.name#)" style="width:100%;" class="formElements"></td>\
    <td align="center"><span class="teamworkIcon delRes del" style="cursor: pointer">d</span></td>\
  </tr>\
  -->');

$('[type="ADDUSER_ROW"].__template__').html(
'<!--\
  <tr resId="(#=obj.id#)" class="resRow" >\
    <td ><input type="text" name="name" value="(#=obj.name#)" style="width:100%;" class="formElements"></td>\
    <td align="center"><span class="teamworkIcon addUserRes" style="cursor: pointer">r</span></td>\
  </tr>\
  -->');

$('[type="RESOURCE_DETAIL_EDITOR"].__template__').html(
'<!--\
  <div class="resourceEditor" style="padding: 5px;">\
\
    <h2>Resource Editor</h2>\
    <table cellspacing="1" cellpadding="5" width="100%" id="resourcesTable" class="table">\
      <tr>\
        <td valign="top" nowrap style="height:80px;width:400px">\
          <label>name</label><br>\
          <input type="text" name="name" id="name" size="7" class="formElements validated" autocomplete="off" maxlength="255" value="" oldvalue="" entrytype="">\
        </td>\
      </tr>\
      <tr>\
        <td valign="top" nowrap>\
          <label>Standard Rate</label><br>\
          <input type="text" name="rate" id="rate" size="7" class="formElements validated" autocomplete="off" maxlength="255" value="" oldvalue="1" entrytype="DOUBLE">\
        </td>\
      </tr>\
    </table>\
\
    <div style="text-align: right; padding-top: 20px"><button id="resEditSaveButton" class="button big first" onClick="$(this).trigger(\'saveResEditor.gantt\');">Save</button></div>\
  </div>\
  -->');


  // var canWrite=true; //this is the default for test purposes

  // here starts gantt initialization
  ge = new GanttMaster();
  ge.set100OnClose=true;

  ge.shrinkParent=true;

  ge.init($("#workSpace"));
  loadI18n(); //overwrite with localized ones

  //in order to force compute the best-fitting zoom level
  delete ge.gantt.zoom;

  loadFromLocalStorage();//loadProject();

  // if (!project.canWrite)
  //   $(".ganttButtonBar button.requireWrite").attr("disabled","true");

  // ge.loadProject(project);
  // ge.checkpoint(); //empty the undo stack
});



function loadProject(){

  $.ajax({
    type: 'POST',
    url: "/gantt/getProjectTasks",
    async: true,
    cache : false,
    dataType : "json",
    data:  {
      '_token': $('meta[name="csrf-token"]').attr('content'),
      id : $('input[name="projectId"]').val()
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("error!!!"+textStatus);
    },
    success: function(project) {
      // if (project && project.tasks.length > 0) {
      if (project) {
        if (!project.canWrite)
          $(".ganttButtonBar button.requireWrite").attr("disabled","true");
        ge.loadProject(project);
        ge.checkpoint(); //empty the undo stack
      }
      else {
        newProject();
      }
      localStorage.setObject("TWPGanttGridState", null);//so that previous project's header widths dont affect this project's one
      localStorage.setObject("TWPGanttResState", null);
      saveInLocalStorage();//save this in browser's cache in case user tries to refresh page (faster loading)
    }
  });

}



function loadGanttFromServer(taskId, callback) {

  //this is a simulation: load data from the local storage if you have already played with the demo or a textarea with starting demo data
  var ret=loadFromLocalStorage();

  //this is the real implementation
  /*
  //var taskId = $("#taskSelector").val();
  var prof = new Profiler("loadServerSide");
  prof.reset();

  $.getJSON("ganttAjaxController.jsp", {CM:"LOADPROJECT",taskId:taskId}, function(response) {
    //console.debug(response);
    if (response.ok) {
      prof.stop();

      ge.loadProject(response.project);
      ge.checkpoint(); //empty the undo stack

      if (typeof(callback)=="function") {
        callback(response);
      }
    } else {
      jsonErrorHandling(response);
    }
  });
  */

  return ret;
}


function saveGanttOnServer() {

  //this is a simulation: save data to the local storage or to the textarea
  saveInLocalStorage();

  
  var prj = ge.saveProject();

  //jkk we are now saving the resources delete prj.resources;
  delete prj.roles;
console.log(prj.resources);

  // var prof = new Profiler("saveServerSide");
  // prof.reset();

  //jkk removed alert box if (ge.deletedTaskIds.length>0) {
  //   if (!confirm("TASK_THAT_WILL_BE_REMOVED\n"+ge.deletedTaskIds.length)) {
  //     return;
  //   }
  // }

  $.ajax("/gantt/saveProjectTasks", {
    dataType:"json",
    data: {
      CM:"SVPROJECT",
      prj:JSON.stringify(prj),
      project_id : $('input[name="projectId"]').val()
    },
    type:"POST",
    error: function(jqXHR, textStatus, errorThrown) {
      displayToast(errorThrown,"rgb(153,0,0)");
    },
    success: function(response) {
      if (!response["stat"]) {
        displayToast(response["error"],"rgb(153,0,0)");
      }
      else {
        //if new task(s) were added, rename the temporary id name with the database's task.id
        displayToast("Data saved successfully!","rgb(0,153,0)");
      }
      // if (response.ok) {
      //   prof.stop();
      //   if (response.project) {
      //     ge.loadProject(response.project); //must reload as "tmp_" ids are now the good ones
      //   } else {
      //     ge.reset();
      //   }
      // } else {
      //   var errMsg="Errors saving project\n";
      //   if (response.message) {
      //     errMsg=errMsg+response.message+"\n";
      //   }

      //   if (response.errorMessages.length) {
      //     errMsg += response.errorMessages.join("\n");
      //   }

      //   alert(errMsg);
      // }
    }

  });
  
}

function newProject(){
  clearGantt();
}


function clearGantt() {
  ge.reset();
  ge.initTasks();
  ge.redraw();
}

//-------------------------------------------  Get project file as JSON (used for migrate project from gantt to Teamwork) ------------------------------------------------------
function getFile() {
  $("#gimBaPrj").val(JSON.stringify(ge.saveProject()));
  $("#gimmeBack").submit();
  $("#gimBaPrj").val("");

  /*  var uriContent = "data:text/html;charset=utf-8," + encodeURIComponent(JSON.stringify(prj));
   neww=window.open(uriContent,"dl");*/
}


function loadFromLocalStorage() {
  var ret;
  if (localStorage) {
    if (localStorage.getObject("teamworkGantDemo")) {
      ret = localStorage.getObject("teamworkGantDemo");
      if (ret) {
        if (!ret.canWrite)
          $(".ganttButtonBar button.requireWrite").attr("disabled","true");

        ge.loadProject(ret);  
        ge.checkpoint(); //empty the undo stack
      }
    }
  }

  //if not found create a new example task
  if (!ret || !ret.tasks || ret.tasks.length == 0){
    // ret=getDemoProject();
    ret=loadProject();
  }
  return ret;
}


function saveInLocalStorage() {
  var prj = ge.saveProject();
  if (localStorage) {
    localStorage.setObject("teamworkGantDemo", prj);
  }
}

//-------------------------------------------  Open a black popup for managing resources. This is only an axample of implementation (usually resources come from server) ------------------------------------------------------
function editResources(newResArray){

  //make resource editor
  var resourceEditor = $.JST.createFromTemplate({}, "RESOURCE_EDITOR");
  var resTbl=resourceEditor.find("#resourcesTable");

  for (var i=0;i<ge.resources.length;i++){
    var res=ge.resources[i];
    resTbl.append($.JST.createFromTemplate(res, "RESOURCE_ROW"))
  }


  //bind add resource
  //jkk resourceEditor.find("#addResource").click(function(){
  //   resTbl.append($.JST.createFromTemplate({id:"new",name:"resource"}, "RESOURCE_ROW"))
  // });

  //append invite users
  var inviteTbl=resourceEditor.find("#inviteTable");
  for (var i=0;i<newResArray.length;i++){
    var res=newResArray[i];
    inviteTbl.append($.JST.createFromTemplate(res, "ADDUSER_ROW"))
  }
  // for (var i=0;i<ge.newResources.length;i++){
  //   var res=ge.newResources[i];
  //   inviteTbl.append($.JST.createFromTemplate(res, "ADDUSER_ROW"))
  // }

  //bind save event
  resourceEditor.find("#resSaveButton").click(function(){
    var newRes=[];
    var bSaveRequired = false;
    //find for deleted res
    for (var i=0;i<ge.resources.length;i++){
      var res=ge.resources[i];
      var row = resourceEditor.find("[resId="+res.id+"]");
      if (row.length>0){
        //if still there save it
        var name = row.find('input[name="name"]').val();
        if (name && name!="")
          res.name=name;
        else
          bSaveRequired = true;
        newRes.push(res);
      } else {
        bSaveRequired = true;
        //remove assignments
        for (var j=0;j<ge.tasks.length;j++){
          var task=ge.tasks[j];
          var newAss=[];
          for (var k=0;k<task.assigs.length;k++){
            var ass=task.assigs[k];
            if (ass.resourceId!=res.id)
              newAss.push(ass);
          }
          task.assigs=newAss;
        }
      }
    }

    //loop on new rows
    var cnt=0
    resourceEditor.find("[resId=new]").each(function(){
      cnt++;
      var row = $(this);
      var name = row.find('input[name="name"]').val();
      var userId = row.find('input[name="userId"]').val();
      if (name && name!="") {
        newRes.push (new Resource("tmp_"+new Date().getTime()+"_"+cnt,name,userId));
        bSaveRequired = true;
      }
    });

    ge.resources=newRes;

    // var newRes=[];
    // //find any deleted "add user" resources (these a re in the invite person section)
    // for (var i=0;i<ge.newResources.length;i++){
    //   var res=ge.newResources[i];
    //   var row = resourceEditor.find("[resId="+res.id+"]");
    //   if (row.length>0){
    //     //if still there save it
    //     var name = row.find('input[name="name"]').val();
    //     if (name && name!="")
    //       res.name=name;
    //     newRes.push(res);
    //   } else {
        
    //   }
    // }

    // ge.newResources=newRes;
    //jkk update resource editor
    ge.loadResTasks(ge.resources,ge.tasks);
    saveInLocalStorage();//jkk added to save any added user(s)

    // if(bSaveRequired)
    //     ge.saveRequired();

    closeBlackPopup();

    ge.redraw();
  });

  //bind invite event
  resourceEditor.find("#inviteButton").click(function(){
    console.log("invite!");
    var name = resourceEditor.find("#inviteName").val();
    var email = resourceEditor.find("#inviteEmail").val();
    inviteUser(name,email);
  });
    

  var ndo = createModalPopup(400, 500).append(resourceEditor);


}

function editDetailResources(){

  if($(".gdfResTable").is(":visible")) {
    //display task editor
    $(".gdfWrapper").eq(0).removeClass("hide");
    $(".gdfWrapper").eq(1).addClass("hide");
    ge.setViewing(0);
    $(".toggleEditor").attr("title","resource view");
    $(".toggleEditor .teamworkIcon").html("=");//resource icon @see icons.svg
    $(".taskEditOnly").removeClass("disabled");
  }
  else {
    //display resource editor
    $(".gdfWrapper").eq(0).addClass("hide");
    $(".gdfWrapper").eq(1).removeClass("hide");
    ge.setViewing(1);
    $(".toggleEditor").attr("title","task view");
    $(".toggleEditor .teamworkIcon").html("t");//task icon @see icons.svg
    $(".taskEditOnly").addClass("disabled");
  }
}

function initializeHistoryManagement(){

  //si chiede al server se c'è della hisory per la root
  $.getJSON(contextPath+"/applications/teamwork/task/taskAjaxController.jsp", {CM: "GETGANTTHISTPOINTS", OBJID:10236}, function (response) {

    //se c'è
    if (response.ok == true && response.historyPoints && response.historyPoints.length>0) {

      //si crea il bottone sulla bottoniera
      var histBtn = $("<button>").addClass("button textual icon lreq30 lreqLabel").attr("title", "SHOW_HISTORY").append("<span class=\"teamworkIcon\">&#x60;</span>");

      //al click
      histBtn .click(function () {
        var el = $(this);
        var ganttButtons = $(".ganttButtonBar .buttons");

        //è gi�  in modalit�  history?
        if (!ge.element.is(".historyOn")) {
          ge.element.addClass("historyOn");
          ganttButtons.find(".requireCanWrite").hide();

          //si carica la history server side
          if (false) return;
          showSavingMessage();
          $.getJSON(contextPath + "/applications/teamwork/task/taskAjaxController.jsp", {CM: "GETGANTTHISTPOINTS", OBJID: ge.tasks[0].id}, function (response) {
            jsonResponseHandling(response);
            hideSavingMessage();
            if (response.ok == true) {
              var dh = response.historyPoints;
              //ge.historyPoints=response.historyPoints;
              if (dh && dh.length > 0) {
                //si crea il div per lo slider
                var sliderDiv = $("<div>").prop("id", "slider").addClass("lreq30 lreqHide").css({"display":"inline-block","width":"500px"});
                ganttButtons.append(sliderDiv);

                var minVal = 0;
                var maxVal = dh.length-1 ;

                $("#slider").show().mbSlider({
                  rangeColor : '#2f97c6',
                  minVal     : minVal,
                  maxVal     : maxVal,
                  startAt    : maxVal,
                  showVal    : false,
                  grid       :1,
                  formatValue: function (val) {
                    return new Date(dh[val]).format();
                  },
                  onSlideLoad: function (obj) {
                    this.onStop(obj);

                  },
                  onStart    : function (obj) {},
                  onStop     : function (obj) {
                    var val = $(obj).mbgetVal();
                    showSavingMessage();
                    $.getJSON(contextPath + "/applications/teamwork/task/taskAjaxController.jsp", {CM: "GETGANTTHISTORYAT", OBJID: ge.tasks[0].id, millis:dh[val]}, function (response) {
                      jsonResponseHandling(response);
                      hideSavingMessage();
                      if (response.ok ) {
                        ge.baselines=response.baselines;
                        ge.showBaselines=true;
                        ge.baselineMillis=dh[val];
                        ge.redraw();
                      }
                    })

                  },
                  onSlide    : function (obj) {
                    clearTimeout(obj.renderHistory);
                    var self = this;
                    obj.renderHistory = setTimeout(function(){
                      self.onStop(obj);
                    }, 200)

                  }
                });
              }
            }
          });


          // quando si spenge
        } else {
          //si cancella lo slider
          $("#slider").remove();
          ge.element.removeClass("historyOn");
          if (ge.permissions.canWrite)
            ganttButtons.find(".requireCanWrite").show();

          ge.showBaselines=false;
          ge.baselineMillis=undefined;
          ge.redraw();
        }

      });
      $("#saveGanttButton").before(histBtn);
    }
  })
}

function showBaselineInfo (event,element){
  //alert(element.attr("data-label"));
  $(element).showBalloon(event, $(element).attr("data-label"));
  ge.splitter.secondBox.one("scroll",function(){
    $(element).hideBalloon();
  })
}

  $.JST.loadDecorator("RESOURCE_ROW", function(resTr, res){
    resTr.find(".delRes").click(function(e){
      $(this).closest("tr").remove();
      return false;//prevent dialog box from closing after pressing trashcan icon
    });
  });

  $.JST.loadDecorator("ASSIGNMENT_ROW", function(assigTr, taskAssig){
    var resEl = assigTr.find("[name=resourceId]");
    var opt = $("<option>");
    resEl.append(opt);
    for(var i=0; i< taskAssig.task.master.resources.length;i++){
      var res = taskAssig.task.master.resources[i];
      opt = $("<option>");
      opt.val(res.id).html(res.name);
      if(taskAssig.assig.resourceId == res.id)
        opt.attr("selected", "true");
      resEl.append(opt);
    }
    var roleEl = assigTr.find("[name=roleId]");
    for(var i=0; i< taskAssig.task.master.roles.length;i++){
      var role = taskAssig.task.master.roles[i];
      var optr = $("<option>");
      optr.val(role.id).html(role.name);
      if(taskAssig.assig.roleId == role.id)
        optr.attr("selected", "true");
      roleEl.append(optr);
    }

    if(taskAssig.task.master.permissions.canWrite && taskAssig.task.canWrite){
      assigTr.find(".delAssig").click(function(){
        var tr = $(this).closest("[assId]").fadeOut(200, function(){$(this).remove()});
      });
    }

  });

  $.JST.loadDecorator("ADDUSER_ROW", function(resTr, res){
    resTr.find(".addUserRes").click(function(e){
      $(this).closest("tr").remove();
      var resTbl=$('#resourcesTable');
      var newRes = {};
      newRes.id = "new";
      newRes.userId = res.id;//user's id
      newRes.name = res.name;
      newRes.access = 2;
      newRes.rate = 0;
      console.log(newRes);
      resTbl.append($.JST.createFromTemplate(newRes, "RESOURCE_ROW"));
      return false;//prevent dialog box from closing after pressing trashcan icon
    });
  });

  function loadI18n(){
    GanttMaster.messages = {
      "CANNOT_WRITE":"No permission to change the following task:",
      "CHANGE_OUT_OF_SCOPE":"Project update not possible as you lack rights for updating a parent project.",
      "START_IS_MILESTONE":"Start date is a milestone.",
      "END_IS_MILESTONE":"End date is a milestone.",
      "TASK_HAS_CONSTRAINTS":"Task has constraints.",
      "GANTT_ERROR_DEPENDS_ON_OPEN_TASK":"Error: there is a dependency on an open task.",
      "GANTT_ERROR_DESCENDANT_OF_CLOSED_TASK":"Error: due to a descendant of a closed task.",
      "TASK_HAS_EXTERNAL_DEPS":"This task has external dependencies.",
      "GANNT_ERROR_LOADING_DATA_TASK_REMOVED":"GANNT_ERROR_LOADING_DATA_TASK_REMOVED",
      "CIRCULAR_REFERENCE":"Circular reference.",
      "CANNOT_DEPENDS_ON_ANCESTORS":"Cannot depend on ancestors.",
      "INVALID_DATE_FORMAT":"The data inserted are invalid for the field format.",
      "GANTT_ERROR_LOADING_DATA_TASK_REMOVED":"An error has occurred while loading the data. A task has been trashed.",
      "CANNOT_CLOSE_TASK_IF_OPEN_ISSUE":"Cannot close a task with open issues",
      "TASK_MOVE_INCONSISTENT_LEVEL":"You cannot exchange tasks of different depth.",
      "CANNOT_MOVE_TASK":"CANNOT_MOVE_TASK",
      "PLEASE_SAVE_PROJECT":"PLEASE_SAVE_PROJECT",
      "GANTT_SEMESTER":"Semester",
      "GANTT_SEMESTER_SHORT":"s.",
      "GANTT_QUARTER":"Quarter",
      "GANTT_QUARTER_SHORT":"q.",
      "GANTT_WEEK":"Week",
      "GANTT_WEEK_SHORT":"w."
    };
  }



  function createNewResource(el) {
    var row = el.closest("tr[taskid]");
    var name = row.find("[name=resourceId_txt]").val();
    var url = contextPath + "/applications/teamwork/resource/resourceNew.jsp?CM=ADD&name=" + encodeURI(name);

    openBlackPopup(url, 700, 320, function (response) {
      //fillare lo smart combo
      if (response && response.resId && response.resName) {
        //fillare lo smart combo e chiudere l'editor
        row.find("[name=resourceId]").val(response.resId);
        row.find("[name=resourceId_txt]").val(response.resName).focus().blur();
      }

    });
  }

  function inviteUser(name,email){

    $.ajax({
      type: 'POST',
      url: "/gantt/inviteUser",
      async: true,
      cache : false,
      dataType : "json",
      data:  {
        '_token': $('meta[name="csrf-token"]').attr('content'),
        'name' : name,
        'email' : email
      },
      error: function(jqXHR, textStatus, errorThrown) {
          var errorMsg = "";
          //Display Laravel Validation error(s) if any
          if (typeof jqXHR.responseJSON != 'undefined') {
              for(obj in jqXHR.responseJSON.errors) {
                  for(var i = 0; i < jqXHR.responseJSON.errors[obj].length;i++) {
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
        if (result["stat"]) {
          // var resourceEditor = $.JST.createFromTemplate({}, "RESOURCE_EDITOR");
          // var resTbl=resourceEditor.find("#resourcesTable");
          // var res = {};
          // res.id = result["id"];
          // res.name = name;
          // resTbl.append($.JST.createFromTemplate(res, "RESOURCE_ROW"))
          var resTbl=$('#resourcesTable');
          var newRes = {};
          newRes.id = "new";
          newRes.userId = result["id"];
          newRes.name = name;
          newRes.access = 2;
          newRes.rate = 0;
          resTbl.append($.JST.createFromTemplate(newRes, "RESOURCE_ROW"));
          displayToast("User created!","rgb(0,153,0)");
        }
        else {
          displayToast(result["error"],"rgb(153,0,0)");
        }
      }
    });
  }

  function getInviteUsers(){

    $.ajax({
      type: 'POST',
      url: "/gantt/getInviteUsers",
      async: true,
      cache : false,
      dataType : "json",
      data:  {
        '_token': $('meta[name="csrf-token"]').attr('content'),
      },
      error: function(jqXHR, textStatus, errorThrown) {
          displayToast(errorThrown,"rgb(153,0,0)");
      },
      success: function(result) {
        if (result["stat"]) {
          editResources(result["resources"]);
        }
        else {
          displayToast(result["error"],"rgb(153,0,0)");
        }
      }
    });
  }