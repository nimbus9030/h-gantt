<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Assig;

class Role extends Model
{
	/*
	Returns all valid tasks based on project's id

	@params jsonArray $params
	//id - table.projects.id

	@return sqlArray
	*/
	public static function getAllRoles() {
		return Role::where([
			['delete_flag',"=",false ],
		])->select('id', 'name')->get()->toArray();
	}
}
