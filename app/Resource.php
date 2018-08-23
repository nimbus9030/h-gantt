<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Assig;
use User;
use Illuminate\Support\Facades\DB;
class Resource extends Model
{
	private $userId;
	private $projectId;
	public function setUserId($userId) {
		$this->userId = $userId;
	}
	public function setProjectId($projectId) {
		$this->projectId = $projectId;
	}
	/*
		Returns all valid tasks based on project's id

		@params integer $projectId

		SELECT resources.id, users.id as userId, users.name as name, rate, access
		FROM resources
		LEFT JOIN users ON users.id = resources.user_id
		WHERE project_id = $projectId AND resources.delete_flag = false

		@return sqlArray
	*/
	public static function getAllResources($projectId) {
		return Resource::where([
			['resources.delete_flag',"=",false ],
			['project_id',"=",$projectId ],
		])->leftJoin('users', 'users.id', '=', 'resources.user_id')
		->select('resources.id', 'users.id as userId','users.name as name', 'rate', 'access')->get()->toArray();
	}
	/*
		Returns all users that are not related to the current project in order to add them as a resources

		SELECT  id,name
		FROM    users
		WHERE   users.id NOT IN (SELECT user_id FROM resources WHERE project_id = $projectId) AND delete_flag = false

	*/
	public static function getAvailableResources($projectId) {

		return User::where([
			['delete_flag',"=",false ]
    	])->whereNotIn('id', function($query) use ($projectId){
    		$query->where([
    			[ 'project_id','=',$projectId ],
    			[ 'delete_flag','=',false ]
    		])->select('user_id')->from('resources');
	    })->select('id', 'name')->get()->toArray();
	}

	public function saveMultiple($resArray) {
		//note: project_id should already existing. The tasks to be deleted are not contained in $taskArray

		$response = array("stat" => false, "error" => "", "new_ids" => array());
		try {
			DB::beginTransaction();
			$assig = new Assig;
			$bError = false;

			//if we are not updating this resource, delete it later.
			$oldResources = $this->getAllResources($this->projectId);

			foreach($resArray as $res) {

				if (gettype($res["resourceId"]) == "string") {
					//no 'name' column in resource: $this->name = $res["name"];
					$this->rate = $res["rate"];
					$this->project_id = $this->projectId;
					$this->user_id = $this->userId;
					//new record
					$result = $this->save();
				}
				else {
					//existing record
					$result = $this->where([
						[ 'id','=',$res["resourceId"] ],
						[ 'delete_flag', '=', 'false' ],
						[ 'user_id','=', $this->userId ],
						[ 'project_id','=', $this->projectId ]
					])->update([
						//no 'name' column in resource 'name' => $res["name"],
						'rate' => $res["rate"],
					]);
					//don't auto-delete this resource because we need it
					foreach($oldResources as $key=>$oldRes) {
						if ($oldRes["id"] == $res["resourceId"]) {
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
				//Delete all existing resources that were not updated
				$inArray = array();
				foreach($oldResources as $deleteRes) {
					$inArray[] = $deleteRes["id"];
				}
				$numUpdated = $this->whereIn('id',$inArray)->update(['delete_flag' => true]);
				if ($numUpdated === 0) {
					//no records were updated???
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
