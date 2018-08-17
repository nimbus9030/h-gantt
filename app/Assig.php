<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Task;
use Illuminate\Support\Facades\DB;
class Assig extends Model
{
	/*
	Returns all valid assignments based on task id

	@params jsonArray $params
	//id - table.projects.id

	@return sqlArray
	*/
	public static function getAssignments($task) {
		return Assig::where([
			['assigs.task_id' , '=', $task["id"] ],
			['assigs.delete_flag',"=",false ],
		])->join('tasks', 'task_id', '=', 'tasks.id')
		->select('assigs.id', 'assigs.resource_id as resourceId','assigs.role_id as roleId','assigs.effort','task_id as taskId','tasks.name','tasks.progress')->get()->toArray();
	}
	public function setAssignments($assignArray,$taskId) {
		$response = array("stat" => false, "error" => "", "new_ids" => array());
		try {
			DB::beginTransaction();
			$bError = false;
			$oldAssignments = self::getAssignments(array("id"=>$taskId));
// echo "<pre>";
// var_dump($taskId);
// var_dump($oldAssignments);
// var_dump($assignArray);

			//Jquery Gantt won't include an assignment if has been deleted by the user
			//To handle this situation, we have to get the current assignment(s) and then determine
			//which assigment(s) were deleted
			foreach($assignArray as $assign) {
				//resource editor:
				//resources: level = 0
				//tasks: level = 1
				if($assign["level"] != 1) continue;
				if (gettype($assign["assigId"]) == "string") {
					// $this->project_id = $task["project_id"];
					$this->role_id = $assign["roleId"];
					$this->resource_id = $assign["resourceId"];
					$this->effort = isset($assign["effort"]) ? $assign["effort"] : 0;
					$this->task_id = $taskId;
					//new record
					$result = $this->save();
				}
				else {
					//existing record
					$result = $this->where([
						[ 'id','=',$assign["assigId"] ],
						[ 'task_id', '=', $taskId ],
						[ 'delete_flag', '=', 'false']
					])->update([
						'role_id' => $assign["roleId"],
						'resource_id' => $assign["resourceId"],
						'effort' => isset($assign["effort"]) ? $assign["effort"] : 0,
					]);
					//this assignment is still valid so remove it from $oldAssignments
					foreach($oldAssignments as $key=>$old) {
						if ($old["id"] == $assign["assigId"]) {
							unset($oldAssignments[$key]);
							break;
						}
					}
				}
				if ($result === false) {
					$bError = true;
					break;
				}
			}
			if (!$bError) {
				//The remaining assignments in $oldAssignments as assumed to be deleted by ganttEditor
// var_dump("deleting time");
// var_dump($oldAssignments);
				foreach($oldAssignments as $deleteAssign) {
					//existing record
					$result = $this->where([
						[ 'id','=',$deleteAssign["id"] ],
						[ 'delete_flag', '=', 'false']
					])->update([
						'delete_flag' => true,
					]);
					if ($result === false) {
						$bError = true;
						break;
					}
				}
			}
			if($bError) {
				DB::rollback();
				$response["error"] = "Save error";
			}
			else {
				$response["stat"] = true;
				DB::commit();
			}
		}
		catch(Exception $e) {
			$response["error"] = $e->getMessages();
			DB::rollback();
		}
		return $response;
	}
}
