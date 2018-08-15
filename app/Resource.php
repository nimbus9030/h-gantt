<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Assig;

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
		])->select('id', 'name')->get()->toArray();
	}
}
