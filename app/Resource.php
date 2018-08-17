<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Assig;
use Illuminate\Support\Facades\DB;
class Resource extends Model
{
	/*
	Returns all valid tasks based on project's id

	@params jsonArray $params
	//id - table.resources.id

	@return sqlArray
	*/
	public static function getAllResources() {
		return Resource::where([
			['delete_flag',"=",false ],
		])->select('id', 'name', 'rate')->get()->toArray();
	}

	public function saveMultiple($resArray) {
		//note: project_id should already existing. The tasks to be deleted are not contained in $taskArray

		$response = array("stat" => false, "error" => "", "new_ids" => array());
		try {
			DB::beginTransaction();
			$bError = false;
			foreach($resArray as $res) {

				if (gettype($res["resourceId"]) == "string") {
					$this->name = $res["name"];
					$this->rate = $res["rate"];

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
						[ 'id','=',$res["resourceId"] ],
						[ 'delete_flag', '=', 'false']
					])->update([
						'name' => $res["name"],
						'rate' => $res["rate"],
					]);
				}
				if ($result === false) {
					$bError = true;
					break;
				}
			}
			if (!$bError) {
				// foreach($taskArray["deletedTaskIds"] as $deleteTask) {
				// 	//existing record
				// 	$result = $this->where([
				// 		[ 'id','=',$deleteTask ],
				// 		[ 'project_id', '=', $this->project_id ],
				// 		[ 'delete_flag', '=', 'false']
				// 	])->update([
				// 		'delete_flag' => true,
				// 	]);
				// 	if ($result === false) {
				// 		$bError = true;
				// 		break;
				// 	}
				// }
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
