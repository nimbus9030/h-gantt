<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Task;

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
			['task_id' , '=', $task["id"] ],
			['delete_flag',"=",false ],
		])->select('id', 'resource_id','role_id','effort')->get()->toArray();
	}
}
