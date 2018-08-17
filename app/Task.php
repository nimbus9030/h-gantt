<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Project;
use Assig;
use Illuminate\Support\Carbon;

class Task extends Model
{
	public $collapsed = false;
	public $has_child = false;

	public function __construct() {
		$this->setTable("tasks");
	}

	/*
	Returns all valid tasks based on project's id

	@params jsonArray $params
	//id - table.projects.id

	@return sqlArray
	*/
	public static function getTasks($project) {

		$tasks = Task::where([
			['project_id' , '=', $project["id"] ],
			['delete_flag',"=",false ],
		])->select(
			'id',
			'project_id',
			'name',
			'code',
			'level',
			'status',
			DB::raw('(UNIX_TIMESTAMP(start)*1000) as start'),
			// 'start',
			'duration',
			DB::raw('(UNIX_TIMESTAMP(end)*1000) as end'),
			// 'end',
			'start_is_milestone as startIsMilestone',
			'end_is_milestone as endIsMilestone',
			'depends',
			'description',
			'progress',
            'progress_by_worklog as progressByWorklog',
            'relevance',
            'type',
            'type_id as typeId',
            'can_write as canWrite',
            'collapsed',
            'has_child as hasChild'
		)->get()->toArray();
		foreach($tasks as $idx=>$task) {
			$tasks[$idx]["assigs"] = Assig::getAssignments($task);
		}
		return $tasks;
	}

	public function saveMultiple($taskArray) {
		//note: project_id should already existing. The tasks to be deleted are not contained in $taskArray

		$response = array("stat" => false, "error" => "", "new_ids" => array());
		try {
			if (!isset($this->project_id)) {
				throw Exception("project id does not exist");
			}
			DB::beginTransaction();
			$bError = false;
			$assig = new Assig();
			foreach($taskArray["tasks"] as $task) {

				if (gettype($task["id"]) == "string") {
					// $this->project_id = $task["project_id"];
					$this->name = $task["name"];
					$this->code = $task["code"];
					$this->level = $task["level"];
					$this->status = $task["status"];
					$this->start = Carbon::createFromTimestampMs($task["start"]);
					$this->duration = $task["duration"];
					$this->end = Carbon::createFromTimestampMs($task["end"]);
					$this->start_is_milestone = $task["startIsMilestone"];
					$this->end_is_milestone = $task["endIsMilestone"];
					$this->depends = $task["depends"];
					$this->description = $task["description"];
					$this->progress = $task["progress"];
					$this->progress_by_worklog = $task["progressByWorklog"];
					$this->relevance = $task["relevance"];
					$this->type = $task["type"];
					if (!empty($task["collapsed"]))
						$this->type_id = $task["typeId"];
					$this->can_write = $task["canWrite"];
					if (isset($task["collapsed"]))
						$this->collapsed = $task["collapsed"];
					if (isset($task["has_child"]))
						$this->has_child = $task["hasChild"];
					//new record
					$result = $this->save();
					if ($result) {
						//save assignment(s) - even if $task["assigs"] is null
						$res1 = $assig->setAssignments($task["assigs"],$this->id);
					}
					$response["new_ids"][] = array($task["id"] => $this->id);
				}
				else {
					//existing record
					$result = $this->where([
						[ 'id','=',$task["id"] ],
						[ 'project_id', '=', $this->project_id ],
						[ 'delete_flag', '=', 'false']
					])->update([
						'name' => $task["name"],
						'code' => $task["code"],
						'level' => $task["level"],
						'status' => $task["status"],
						'start' => Carbon::createFromTimestampMs($task["start"]),
						'duration' => $task["duration"],
						'end' => Carbon::createFromTimestampMs($task["end"]),
						'start_is_milestone' => $task["startIsMilestone"],
						'end_is_milestone' => $task["endIsMilestone"],
						'depends' => $task["depends"],
						'description' => $task["description"],
						'progress' => $task["progress"],
						'progress_by_worklog' => $task["progressByWorklog"],
						'relevance' => $task["relevance"],
						'type' => $task["type"],
						'type_id' => $task["typeId"],
						'can_write' => $task["canWrite"],
						'collapsed' => $task["collapsed"],
						'has_child' => $task["hasChild"]
					]);
					if ($result) {
						//save assignment(s) - even if $task["assigs"] is null
						$res1 = $assig->setAssignments($task["assigs"],$task["id"]);
					}
				}
				if ($result === false) {
					$bError = true;
					break;
				}
			}
			if (!$bError) {
				foreach($taskArray["deletedTaskIds"] as $deleteTask) {
					//existing record
					$result = $this->where([
						[ 'id','=',$deleteTask ],
						[ 'project_id', '=', $this->project_id ],
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
		// dd("done");
		return $response;
	}
}
