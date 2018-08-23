<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Project extends Model
{
	public function __construct() {
		$this->setTable("projects");
	}
	/**

		Get list of all projects that the user is the owner of and/or a team member of.

		SELECT DISTINCT ON (projects.id) projects.id,projects.name,projects.description,projects.status,projects.owner
		FROM projects
		LEFT JOIN resources ON projects.id = resources.project_id
		WHERE projects.delete_flag = false AND (owner = $params["userId"] OR resources.user_id = $params["userId"])
		    AND (name LIKE %$params["searchfilter"]%)
		GROUP BY projects.id
		ORDER BY $params["iSortCol_0"] $params["sSortDir_0"]
		OFFET $params["iDisplayStart"]
		LIMIT $params["iDisplayLength"]

		then paginate the results
	*/
    public static function getList($params) {
    	
    	return Project::where([
    		['projects.delete_flag',"=",false]
    	])->where(function ($query) use ($params) {
    		return $query->where('owner', '=', $params["userId"])
    					->orWhere('resources.user_id','=',$params["userId"]);
    	})->where(function($query) use ($params){
	    	if (!empty($params["searchfilter"])) {
	    		$search = $params["searchfilter"];
	    		return $query->where('name','LIKE',"%{$search}%");
	    	}
	    	return $query;
	    })
    	->leftJoin('resources', 'projects.id', '=', 'resources.project_id')
	    ->groupby('projects.id')->distinct()
	    ->orderBy($params["iSortCol_0"],$params["sSortDir_0"])
		->paginate($params["iDisplayLength"],['projects.id','projects.name','projects.description','projects.status','projects.owner'],'page', $params["iDisplayStart"] / $params["iDisplayLength"] + 1)->toArray();
    }
    /**
    	Add a new project to gantt, or update existing project's name or description

    	@params jsonArray $params
    	<li>name : string</li>
    	<li>description: string</li>
    	<li>status: integer (default:1)</li>
    	<li>owner: integer (table.users.id)</li>

    */
    public function addToDatabase($params) {
    	$response = array("stat" => false, "error" => "");
    	try {
    		//new project
    		if ($params["id"] == 0) {
		        $this->name = $params["name"];
		        $this->description = $params["description"];
		        $this->status = 1;
		        $this->owner = $params["userId"];
		        $result = $this->save();
		    }
		    else {
		    	//edit project
				$result = $this->where([
					[ 'id','=',$params["id"] ],
					[ 'delete_flag','=',false ]
				])->update([
					'name' => $params["name"],
					'description' => $params["description"],
				]);
		    }
	        $response["stat"] = $result;
	        if (!$result) {
	        	$response["error"] = "Unknown error";
	        }
	    }
	    catch (\Exception $e) {
	    	$response["error"] = $e->getMessage();
	    }

        return $response;
    }
    /**
    	Delete a project from gantt

    	@params jsonArray $params
    	<li>id : integer - table.projects.id</li>

    	UPDATE projects
    	SET delete_flag = true
    	WHERE id = $params["id"] AND delete_flag = false

    */
    public function delFromDatabase($params) {
    	$response = array("stat" => false, "error" => "");
    	try{
			if ($params["id"] <= 0) {
				$response["error"] = "Invalid id";
			}
			else {
		    	//delete project
				$result = $this->where([
					[ 'id','=',$params["id"] ],
					[ 'delete_flag','=',false ]
				])->update([
					'delete_flag' => true
				]);
		        $response["stat"] = $result;
		        if (!$result) {
		        	$response["error"] = "Unknown error";
		        }
			}
    	}
    	catch(Exception $e) {
    		$response["error"] = $e->getMessage();

    	}
    	return $response;
    }
}