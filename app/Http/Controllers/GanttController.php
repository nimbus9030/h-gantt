<?php

namespace App\Http\Controllers;


use \Illuminate\Http\Request;
use \App\Project;
use \App\Task;
use \App\Resource;
use \App\Role;
use \App\User;
use Log;
use Validator;
use Session;
use Hash;
use DB;

class GanttController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
      Checks access/permissions
      @params string $varName
      $varName is the variable name of the permission. i.e. "canWrite"
    */
    private function checkAccess($varName) {
      $project = Session::get('project');
      $user = \Auth::user();
      
      if ($varName === "canLoadProject") {
        //If user is the owner, access is allowed for everything
        if ($project->owner == $user->id) return true;
        $resources = Session::get('resources');
        if($resources) {
          foreach($resources as $res) {
            if ($res["userId"] == $user->id) {
              return true;
            }
          }
        }
      }
      else if ($varName === "canSaveProject") {
        //If user is the owner, access is allowed for everything
        if ($project->owner == $user->id) return true;
      }
      else if ($varName === "canViewResourceTable") {
        //If user is the owner, access is allowed for everything
        if ($project->owner == $user->id) return true;
      }
      else if ($varName === "canInviteUser") {
        //If user is the owner, access is allowed for everything
        if ($project->owner == $user->id) return true;
      }

      return false;
    }
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Project $project)
    {
      Session::put('project', $project);
      $resources = new Resource();

      try {
        $result = $resources->getAllResources($project->id);
        if ($result) {
          Session::put('resources', $result);
        }
        else {
          Session::put('resources', array());
        }
      }
      catch(\Illuminate\Database\QueryException $ex) {
        Session::put('resources', array());
      }

      $result = $this->checkAccess("canLoadProject");
      if ($result === false) {
        return redirect('/home');
      }

      //verify that the user really has access to at least view this project, otherwise send user back to 'home' screen
      $result = $this->checkAccess("canLoadProject");
      if ($result === false) {
        return redirect('/home');
      }

      $templates = $this->getTemplates();
    	return view('gantt',compact('project','templates'));
    	// return view('sample');
    }
    private function getTemplates() {
        $templates = array(
        );
        $templates["a"] =<<<EOF
        
        <div>adsfasdff</div>
        <div>bbbbb</div>
        
EOF;

        $templates["GANTBUTTONS"] =<<<EOF
<!--
  <div class="ganttButtonBar noprint">
    <div class="buttons">
      <a href="/home"><img src="res/twGanttLogo.png" alt="Twproject" align="absmiddle" style="max-width: 136px; padding-right: 15px"></a>

      <button onclick="$('#workSpace').trigger('undo.gantt');return false;" class="button textual icon requireCanWrite" title="undo"><span class="teamworkIcon">&#39;</span></button>
      <button onclick="$('#workSpace').trigger('redo.gantt');return false;" class="button textual icon requireCanWrite" title="redo"><span class="teamworkIcon">&middot;</span></button>
      <span class="ganttButtonSeparator requireCanWrite requireCanAdd"></span>
      <button onclick="$('#workSpace').trigger('addAboveCurrentTask.gantt');return false;" class="button textual icon requireCanWrite requireCanAdd" title="insert above"><span class="teamworkIcon">l</span></button>
      <button onclick="$('#workSpace').trigger('addBelowCurrentTask.gantt');return false;" class="button textual icon requireCanWrite requireCanAdd" title="insert below"><span class="teamworkIcon">X</span></button>
      <span class="ganttButtonSeparator requireCanWrite requireCanInOutdent"></span>
      <button onclick="$('#workSpace').trigger('outdentCurrentTask.gantt');return false;" class="button textual icon requireCanWrite requireCanInOutdent" title="un-indent task"><span class="teamworkIcon">.</span></button>
      <button onclick="$('#workSpace').trigger('indentCurrentTask.gantt');return false;" class="button textual icon requireCanWrite requireCanInOutdent" title="indent task"><span class="teamworkIcon">:</span></button>
      <span class="ganttButtonSeparator requireCanWrite requireCanMoveUpDown"></span>
      <button onclick="$('#workSpace').trigger('moveUpCurrentTask.gantt');return false;" class="button textual icon requireCanWrite requireCanMoveUpDown" title="move up"><span class="teamworkIcon">k</span></button>
      <button onclick="$('#workSpace').trigger('moveDownCurrentTask.gantt');return false;" class="button textual icon requireCanWrite requireCanMoveUpDown" title="move down"><span class="teamworkIcon">j</span></button>
      <span class="ganttButtonSeparator requireCanWrite requireCanDelete"></span>
      <button onclick="$('#workSpace').trigger('deleteFocused.gantt');return false;" class="button textual icon delete requireCanWrite" title="Elimina"><span class="teamworkIcon">&cent;</span></button>
      <span class="ganttButtonSeparator"></span>
      <button onclick="$('#workSpace').trigger('expandAll.gantt');return false;" class="button textual icon " title="EXPAND_ALL"><span class="teamworkIcon">6</span></button>
      <button onclick="$('#workSpace').trigger('collapseAll.gantt'); return false;" class="button textual icon " title="COLLAPSE_ALL"><span class="teamworkIcon">5</span></button>

    <span class="ganttButtonSeparator"></span>
      <button onclick="$('#workSpace').trigger('zoomMinus.gantt'); return false;" class="button textual icon " title="zoom out"><span class="teamworkIcon">)</span></button>
      <button onclick="$('#workSpace').trigger('zoomPlus.gantt');return false;" class="button textual icon " title="zoom in"><span class="teamworkIcon">(</span></button>
    <span class="ganttButtonSeparator"></span>
      <button onclick="$('#workSpace').trigger('print.gantt');return false;" class="button textual icon " title="Print"><span class="teamworkIcon">p</span></button>
    <span class="ganttButtonSeparator"></span>
      <button onclick="ge.gantt.showCriticalPath=!ge.gantt.showCriticalPath; ge.redraw();return false;" class="button textual icon requireCanSeeCriticalPath" title="CRITICAL_PATH"><span class="teamworkIcon">&pound;</span></button>
    <span class="ganttButtonSeparator requireCanSeeCriticalPath"></span>
      <button onclick="ge.splitter.resize(.1);return false;" class="button textual icon" ><span class="teamworkIcon">F</span></button>
      <button onclick="ge.splitter.resize(50);return false;" class="button textual icon" ><span class="teamworkIcon">O</span></button>
      <button onclick="ge.splitter.resize(100);return false;" class="button textual icon"><span class="teamworkIcon">R</span></button>
      <span class="ganttButtonSeparator"></span>
      <button onclick="$('#workSpace').trigger('fullScreen.gantt');return false;" class="button textual icon" title="FULLSCREEN" id="fullscrbtn"><span class="teamworkIcon">@</span></button>
      <button onclick="ge.element.toggleClass('colorByStatus' );return false;" class="button textual icon"><span class="teamworkIcon">&sect;</span></button>

    <button onclick="editResources();" class="button textual requireWrite" title="edit resources"><span class="teamworkIcon">M</span></button>
      &nbsp; &nbsp; &nbsp; &nbsp;
    <button onclick="saveGanttOnServer();" class="button first big requireWrite" title="Save">Save</button>
    <button onclick='newProject();' class='button requireWrite newproject'><em>clear project</em></button>
    <button class="button login" title="login/enroll" onclick="loginEnroll($(this));" style="display:none;">login/enroll</button>
    <button class="button opt collab" title="Start with Twproject" onclick="collaborate($(this));" style="display:none;"><em>collaborate</em></button>
    </div></div>
-->
EOF;

$templates["TASKSEDITHEAD"] =<<<EOF
<!--
  <table class="gdfTable" cellspacing="0" cellpadding="0">
    <thead>
    <tr style="height:40px">
      <th class="gdfColHeader" style="width:35px; border-right: none"></th>
      <th class="gdfColHeader" style="width:25px;"></th>
      <th class="gdfColHeader gdfResizable" style="width:100px;">code/short name</th>
      <th class="gdfColHeader gdfResizable" style="width:300px;">name</th>
      <th class="gdfColHeader"  align="center" style="width:17px;" title="Start date is a milestone."><span class="teamworkIcon" style="font-size: 8px;">^</span></th>
      <th class="gdfColHeader gdfResizable" style="width:80px;">start</th>
      <th class="gdfColHeader"  align="center" style="width:17px;" title="End date is a milestone."><span class="teamworkIcon" style="font-size: 8px;">^</span></th>
      <th class="gdfColHeader gdfResizable" style="width:80px;">End</th>
      <th class="gdfColHeader gdfResizable" style="width:50px;">dur.</th>
      <th class="gdfColHeader gdfResizable" style="width:20px;">%</th>
      <th class="gdfColHeader gdfResizable requireCanSeeDep" style="width:50px;">depe.</th>
      <th class="gdfColHeader gdfResizable" style="width:1000px; text-align: left; padding-left: 10px;">assignees</th>
    </tr>
    </thead>
  </table>
  -->
EOF;
/*
$templates["TASKROW"] =<<<EOF
<!--
  <tr id="tid_(#=obj.id#)" taskId="(#=obj.id#)" class="taskEditRow (#=obj.isParent()?'isParent':''#) (#=obj.collapsed?'collapsed':''#)" level="(#=level#)">
    <th class="gdfCell edit" align="right" style="cursor:pointer;"><span class="taskRowIndex">(#=obj.getRow()+1#)</span> <span class="teamworkIcon" style="font-size:12px;" >e</span></th>
    <td class="gdfCell noClip" align="center"><div class="taskStatus cvcColorSquare" status="(#=obj.status#)"></div></td>
    <td class="gdfCell"><input type="text" name="code" value="(#=obj.code?obj.code:''#)" placeholder="code/short name"></td>
    <td class="gdfCell indentCell" style="padding-left:(#=obj.level*10+18#)px;">
      <div class="exp-controller" align="center"></div>
      <input type="text" name="name" value="(#=obj.name#)" placeholder="name">
    </td>
    <td class="gdfCell" align="center"><input type="checkbox" name="startIsMilestone"></td>
    <td class="gdfCell"><input type="text" name="start"  value="" class="date"></td>
    <td class="gdfCell" align="center"><input type="checkbox" name="endIsMilestone"></td>
    <td class="gdfCell"><input type="text" name="end" value="" class="date"></td>
    <td class="gdfCell"><input type="text" name="duration" autocomplete="off" value="(#=obj.duration#)"></td>
    <td class="gdfCell"><input type="text" name="progress" class="validated" entrytype="PERCENTILE" autocomplete="off" value="(#=obj.progress?obj.progress:''#)" (#=obj.progressByWorklog?"readOnly":""#)></td>
    <td class="gdfCell requireCanSeeDep"><input type="text" name="depends" autocomplete="off" value="(#=obj.depends#)" (#=obj.hasExternalDep?"readonly":""#)></td>
    <td class="gdfCell taskAssigs">(#=obj.getAssigsString()#)</td>
  </tr>
  --&gt;</div>

<div class="__template__" type="TASKEMPTYROW"><&lt;!--
  <tr class="taskEditRow emptyRow" >
    <th class="gdfCell" align="right"></th>
    <td class="gdfCell noClip" align="center"></td>
    <td class="gdfCell"></td>
    <td class="gdfCell"></td>
    <td class="gdfCell"></td>
    <td class="gdfCell"></td>
    <td class="gdfCell"></td>
    <td class="gdfCell"></td>
    <td class="gdfCell"></td>
    <td class="gdfCell"></td>
    <td class="gdfCell requireCanSeeDep"></td>
    <td class="gdfCell"></td>
  </tr>
  --&gt;</div>

<div class="__template__" type="TASKBAR">&lt;!--
  <div class="taskBox taskBoxDiv" taskId="(#=obj.id#)" >
    <div class="layout (#=obj.hasExternalDep?'extDep':''#)">
      <div class="taskStatus" status="(#=obj.status#)"></div>
      <div class="taskProgress" style="width:(#=obj.progress>100?100:obj.progress#)%; background-color:(#=obj.progress>100?'red':'rgb(153,255,51);'#);"></div>
      <div class="milestone (#=obj.startIsMilestone?'active':''#)" ></div>

      <div class="taskLabel"></div>
      <div class="milestone end (#=obj.endIsMilestone?'active':''#)" ></div>
    </div>
  </div>
  -->
EOF;

  $templates["TASKEMPTYROW"] =<<<EOF
<!--
  <tr class="taskEditRow emptyRow" >
    <th class="gdfCell" align="right"></th>
    <td class="gdfCell noClip" align="center"></td>
    <td class="gdfCell"></td>
    <td class="gdfCell"></td>
    <td class="gdfCell"></td>
    <td class="gdfCell"></td>
    <td class="gdfCell"></td>
    <td class="gdfCell"></td>
    <td class="gdfCell"></td>
    <td class="gdfCell"></td>
    <td class="gdfCell requireCanSeeDep"></td>
    <td class="gdfCell"></td>
  </tr>
  -->
EOF;
    $templates["TASKBAR"] =<<<EOF
<!--
  <div class="taskBox taskBoxDiv" taskId="(#=obj.id#)" >
    <div class="layout (#=obj.hasExternalDep?'extDep':''#)">
      <div class="taskStatus" status="(#=obj.status#)"></div>
      <div class="taskProgress" style="width:(#=obj.progress>100?100:obj.progress#)%; background-color:(#=obj.progress>100?'red':'rgb(153,255,51);'#);"></div>
      <div class="milestone (#=obj.startIsMilestone?'active':''#)" ></div>

      <div class="taskLabel"></div>
      <div class="milestone end (#=obj.endIsMilestone?'active':''#)" ></div>
    </div>
  </div>
  -->
EOF;

    $templates["CHANGE_STATUS"] =<<<EOF
<!--
    <div class="taskStatusBox">
    <div class="taskStatus cvcColorSquare" status="STATUS_ACTIVE" title="Active"></div>
    <div class="taskStatus cvcColorSquare" status="STATUS_DONE" title="Completed"></div>
    <div class="taskStatus cvcColorSquare" status="STATUS_FAILED" title="Failed"></div>
    <div class="taskStatus cvcColorSquare" status="STATUS_SUSPENDED" title="Suspended"></div>
    <div class="taskStatus cvcColorSquare" status="STATUS_WAITING" title="Waiting" style="display: none;"></div>
    <div class="taskStatus cvcColorSquare" status="STATUS_UNDEFINED" title="Undefined"></div>
    </div>
  -->
EOF;

 $templates["TASK_EDITOR"] =<<<EOF
<!--
  <div class="ganttTaskEditor">
    <h2 class="taskData">Task editor</h2>
    <table  cellspacing="1" cellpadding="5" width="100%" class="taskData table" border="0">
          <tr>
        <td width="200" style="height: 80px"  valign="top">
          <label for="code">code/short name</label><br>
          <input type="text" name="code" id="code" value="" size=15 class="formElements" autocomplete='off' maxlength=255 style='width:100%' oldvalue="1">
        </td>
        <td colspan="3" valign="top"><label for="name" class="required">name</label><br><input type="text" name="name" id="name"class="formElements" autocomplete='off' maxlength=255 style='width:100%' value="" required="true" oldvalue="1"></td>
          </tr>


      <tr class="dateRow">
        <td nowrap="">
          <div style="position:relative">
            <label for="start">start</label>&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="checkbox" id="startIsMilestone" name="startIsMilestone" value="yes"> &nbsp;<label for="startIsMilestone">is milestone</label>&nbsp;
            <br><input type="text" name="start" id="start" size="8" class="formElements dateField validated date" autocomplete="off" maxlength="255" value="" oldvalue="1" entrytype="DATE">
            <span title="calendar" id="starts_inputDate" class="teamworkIcon openCalendar" onclick="$(this).dateField({inputField:$(this).prevAll(':input:first'),isSearchField:false});">m</span>          </div>
        </td>
        <td nowrap="">
          <label for="end">End</label>&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="checkbox" id="endIsMilestone" name="endIsMilestone" value="yes"> &nbsp;<label for="endIsMilestone">is milestone</label>&nbsp;
          <br><input type="text" name="end" id="end" size="8" class="formElements dateField validated date" autocomplete="off" maxlength="255" value="" oldvalue="1" entrytype="DATE">
          <span title="calendar" id="ends_inputDate" class="teamworkIcon openCalendar" onclick="$(this).dateField({inputField:$(this).prevAll(':input:first'),isSearchField:false});">m</span>
        </td>
        <td nowrap="" >
          <label for="duration" class=" ">Days</label><br>
          <input type="text" name="duration" id="duration" size="4" class="formElements validated durationdays" title="Duration is in working days." autocomplete="off" maxlength="255" value="" oldvalue="1" entrytype="DURATIONDAYS">&nbsp;
        </td>
      </tr>

      <tr>
        <td  colspan="2">
          <label for="status" class=" ">status</label><br>
          <select id="status" name="status" class="taskStatus" status="(#=obj.status#)"  onchange="$(this).attr('STATUS',$(this).val());">
            <option value="STATUS_ACTIVE" class="taskStatus" status="STATUS_ACTIVE" >active</option>
            <option value="STATUS_WAITING" class="taskStatus" status="STATUS_WAITING" >suspended</option>
            <option value="STATUS_SUSPENDED" class="taskStatus" status="STATUS_SUSPENDED" >suspended</option>
            <option value="STATUS_DONE" class="taskStatus" status="STATUS_DONE" >completed</option>
            <option value="STATUS_FAILED" class="taskStatus" status="STATUS_FAILED" >failed</option>
            <option value="STATUS_UNDEFINED" class="taskStatus" status="STATUS_UNDEFINED" >undefined</option>
          </select>
        </td>

        <td valign="top" nowrap>
          <label>progress</label><br>
          <input type="text" name="progress" id="progress" size="7" class="formElements validated percentile" autocomplete="off" maxlength="255" value="" oldvalue="1" entrytype="PERCENTILE">
        </td>
      </tr>

          </tr>
          <tr>
            <td colspan="4">
              <label for="description">Description</label><br>
              <textarea rows="3" cols="30" id="description" name="description" class="formElements" style="width:100%"></textarea>
            </td>
          </tr>
        </table>

    <h2>Assignments</h2>
  <table  cellspacing="1" cellpadding="0" width="100%" id="assigsTable">
    <tr>
      <th style="width:100px;">name</th>
      <th style="width:70px;">Role</th>
      <th style="width:30px;">est.wklg.</th>
      <th style="width:30px;" id="addAssig"><span class="teamworkIcon" style="cursor: pointer">+</span></th>
    </tr>
  </table>

  <div style="text-align: right; padding-top: 20px">
    <span id="saveButton" class="button first" onClick="$(this).trigger('saveFullEditor.gantt');">Save</span>
  </div>

  </div>
  -->
EOF;

 $templates["ASSIGNMENT_ROW"] =<<<EOF
<!--
  <tr taskId="(#=obj.task.id#)" assId="(#=obj.assig.id#)" class="assigEditRow" >
    <td ><select name="resourceId"  class="formElements" (#=obj.assig.id.indexOf("tmp_")==0?"":"disabled"#) ></select></td>
    <td ><select type="select" name="roleId"  class="formElements"></select></td>
    <td ><input type="text" name="effort" value="(#=getMillisInHoursMinutes(obj.assig.effort)#)" size="5" class="formElements"></td>
    <td align="center"><span class="teamworkIcon delAssig del" style="cursor: pointer">d</span></td>
  </tr>
  -->
EOF;

$templates["RESOURCE_EDITOR"] =<<<EOF
   <!--
  <div class="resourceEditor" style="padding: 5px;">

    <h2>Project team</h2>
    <table  cellspacing="1" cellpadding="0" width="100%" id="resourcesTable">
      <tr>
        <th style="width:100px;">name</th>
        <th style="width:30px;" id="addResource"><span class="teamworkIcon" style="cursor: pointer">+</span></th>
      </tr>
    </table>

    <div style="text-align: right; padding-top: 20px"><button id="resSaveButton" class="button big">Save</button></div>
  </div>
  -->
EOF;

$templates["RESOURCE_ROW"] =<<<EOF
 <!--
  <tr resId="(#=obj.id#)" class="resRow" >
    <td ><input type="text" name="name" value="(#=obj.name#)" style="width:100%;" class="formElements"></td>
    <td align="center"><span class="teamworkIcon delRes del" style="cursor: pointer">d</span></td>
  </tr>
  -->
EOF;

*/  

        return $templates;
    }

    public function getProjectTasks(Request $request) {

      $rules = [
          'id'      => 'required|integer',
      ];

      $request->validate($rules);
      $tasks = Task::getTasks(array("id" => $request->input("id")));
      $resources = Session::get('resources');
      // $newResources = Session::get('newResources');
      $roles = Role::getAllRoles();

      $ganttData = array(
        'tasks' => $tasks,
        'selectedRow' => 0,
        'deletedTaskIds' => array(),
        'resources' => $resources,
        'roles' => $roles,
        // 'canWrite' => true,
        // 'canDelete' => true,
        // 'canWriteOnParent' => true,
        // 'canAdd' => true,
        'zoom' => "1M"
      );
      $ganttData["canAdd"] =
      $ganttData["canWriteOnParent"] = 
      $ganttData["canDelete"] = 
      $ganttData["canWrite"] = $this->checkAccess("canSaveProject");

      return $ganttData;
    }
    public function saveProjectTasks(Request $request) {

      $response = array("stat" => false, "error" => "");

      $result = $this->checkAccess("canSaveProject");
      if ($result === false) {
        $response["error"] = "Access denied.";
        return $response;
      }

      $rules = [
        'GM' => 'string',
        // 'project_id' => 'required|integer',
        'prj' => 'required|string',
      ];

      $request->validate($rules);
      

      $data = $request->input('prj');
      $data = json_decode($data,true);

      $validator = Validator::make( $data , [
          'tasks.*.id'      => 'required|alpha_num', //for new tasks, id is a string, otherwise it's an integer
          'tasks.*.name' => 'required|string',
          'tasks.*.progress' => 'required|integer',
          'tasks.*.progressByWorklog' => 'required|integer',
          'tasks.*.relevance' => 'required|integer',
          'tasks.*.type' => 'string',
          'tasks.*.typeId' => 'required|integer',
          'tasks.*.description' => 'string',
          'tasks.*.code' => 'string',
          'tasks.*.level' => 'required|integer',
          'tasks.*.status' => 'required|string',
          'tasks.*.depends' => 'string',
          'tasks.*.start' => 'required|integer',
          'tasks.*.duration' => 'required|integer',
          'tasks.*.end' => 'required|integer',
          'tasks.*.startIsMilestone' => 'required|integer',
          'tasks.*.endIsMilestone' => 'required|integer',
          'tasks.*.collapsed' => 'boolean',//not used for single task that is not connected to anything
          'tasks.*.canWrite' => 'required|integer',
      // "canAdd": true,
      // "canDelete": true,
      // "canAddIssue": true,
      // "assigs": [],
          'tasks.*.project_id' => 'integer',//for new tasks, this will be blank
          'tasks.*.hasChild' => 'required|integer',
          // "assign": []
          "deletedTaskIds" => 'array',
          'resources.*.resourceId' => 'required|alpha_num',
          'resources.*.level' => 'required|integer',
          'resources.*.name' => 'required|string',
          'resources.*.rate' => 'numeric',//floating point
      ]);

      $errors = $validator->errors();
      if (!empty($errors->messages)) {
        $response["error"] = $errors;
      }
      else {
        $task = new Task;
        $task->setProjectId(Session::get('project')->id);
        $response = $task->saveMultiple($data);
        if ($response["stat"]) {
          $resource = new Resource;
          $user = \Auth::user();
          $resource->setUserId($user->id);
          $resource->setProjectId(Session::get('project')->id);
          $response = $resource->saveMultiple($data["resources"]);
        }
      }
      return $response;
    }
    public function inviteUser(Request $request) {

      $result = $this->checkAccess("canInviteUser");
      if ($result === false) {
        $response["error"] = "Access denied.";
        return $response;
      }

      $rules = [
          'name'      => 'required|string',
          'email'      => 'required|email',
      ];
      $request->validate($rules);
      $response = array("stat" => false, "error" => "");
      //Create a user account if it doesnt exist
      $result = User::where('email','=',$request->input("email"))->get()->toArray();
      if ($result && sizeof($result)>0) {
        $response["error"] = "This user already exists!";
        return $response;
      }
      $user = array(
        'name' => $request->input("name"),
        'email' => $request->input("email"),
        'password' => Hash::make('hunglead'),//default invitation password is always 'hunglead'
        'created_at' => DB::raw('NOW()'),
        'updated_at' => DB::raw('NOW()'),
      );
      try {
        $newId = DB::table('users')->insertGetId($user);
        if (is_numeric($newId)) {
          $response["stat"] = true;
          $response["id"] = $newId;
        }
        else {
          $response["error"] = "Insert failed!";
        }
      }
      catch(\Illuminate\Database\QueryException $ex) {
        $response["error"] = $ex->getMessage();
      }

      return $response;
    }
    /**
      Get all users (resources) that are currently not assigned to this project. The owner of this project
      is not included in the list. This list is displayed in the Project Team modal box under "Invite Person"

    */
    public function getInviteUsers(Request $request) {
      $response = array("stat" => false, "error" => "");

      $result = $this->checkAccess("canViewResourceTable");
      if ($result === false) {
        $response["error"] = "Access denied.";
        return $response;
      }

      $resource = new Resource;
      try {
        $result = $resource->getAvailableResources(Session::get('project')->id);
        if($result) {
          $response["stat"] = true;
          $response["resources"] = $result;
        }
        else {
          //there are no users that are not a part of this project
          $response["stat"] = true;
          $response["resources"] = array();
        }
      }
      catch(\Illuminate\Database\QueryException $ex) {
        $response["error"] = $ex->getMessage();
      }
      catch(Exception $ex) {
        $response["error"] = $ex->getMessage();
      }

      return $response;
    }

}
