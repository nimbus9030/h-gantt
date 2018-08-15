<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Project extends Model
{
	public function __construct() {
		$this->setTable("projects");
	}
    public static function getList($params) {
    	return Project::where('delete_flag',"=",false)
    	->where(function($query) use ($params){
	    	if (!empty($params["searchfilter"])) {
	    		$search = $params["searchfilter"];
	    		return $query->where('name','LIKE',"%{$search}%");
	    	}
	    	return $query;
	    })
	    ->orderBy($params["iSortCol_0"],$params["sSortDir_0"])
		->paginate($params["iDisplayLength"],['*'],'page', $params["iDisplayStart"] / $params["iDisplayLength"] + 1)->toArray();
    }
    public function addToDatabase($params) {
    	$response = array("stat" => false, "error" => "");
    	try {
    		//new project
    		if ($params["id"] == 0) {
		        $this->name = $params["name"];
		        $this->description = $params["description"];
		        $this->status = 1;
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