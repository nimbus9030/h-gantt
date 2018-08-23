<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;


class HomeController extends Controller
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
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }

    public function addProject(Request $request) {

        $response = array("stat" => false, "error" => "");
         $rules = [
            'id' => 'required|integer',
            'name' => 'required|string',
            'description' => 'required|string',
        ];

        $request->validate($rules);

        $params = array(
            "id" => $request->input("id"),
            "name" => $request->input("name"),
            "description" => $request->input("description"),
        );

        $project = new Project;
        $user = \Auth::user();
        $params["userId"] = $user->id;
        $response = $project->addToDatabase($params);

        return $response;
    }

    public function pagelist(Request $request) {

        $response = array("stat" => false, "error" => "");
        $rules = [
            'fromdate'      => 'required|date|date_format:Y-m-d',
            'todate'        => 'required|date|date_format:Y-m-d',
            'sSearch'        => 'nullable|string',
            'iDisplayLength'        => 'integer',
            'iDisplayStart' => 'integer',
            'sSortDir_0' => 'string',
            'iSortCol_0' => 'integer'
        ];

        $request->validate($rules);

        $maxRows = 0;
        $rows = array();

        $params = array(
            "fromdate" => $request->input("fromdate"),
            "todate" => $request->input("todate"),
            "searchfilter" => $request->input("sSearch",""),
            "iDisplayLength" => $request->input("iDisplayLength",10),
            "iDisplayStart" => $request->input("iDisplayStart",0),
            "iDisplayStart" => $request->input("iDisplayStart",0),
            "sSortDir_0" => $request->input("sSortDir_0","asc"),
            "iSortCol_0" => $request->input("iSortCol_0",0)
        );
        $dataTableHeaderNames = array("name","description","status","id");
        //convert column # to the table's column name
        $params["iSortCol_0"] = $dataTableHeaderNames[$params["iSortCol_0"]];
        $user = \Auth::user();
        $params["userId"] = $user["id"];
        $result = Project::getlist($params);
        if(!empty($result)) {
            foreach($result["data"] as $r) {
                $access = ($r["owner"] == $user["id"]) ? 1 : 2;//1=owner, 2=member
                $rows[] = array($r["name"],$r["description"],$access,$r["status"],0,$r["id"]); //0 = actions column
            }
            $maxRows = $result["total"];
        }

        $response["stat"] = true;
        $response["table"] = array(
                'data' => $rows,
                'recordsTotal' => $maxRows,
                'recordsFiltered' => $maxRows
        );
        return $response;
    }
    public function delProject(Request $request) {
        $response = array("stat" => false, "error" => "");
        $rules = [
            'id'      => 'required|integer',
        ];

        $request->validate($rules);

        $params = array(
            "id" => $request->input("id"),
        );

        $project = new Project;
        $response = $project->delFromDatabase($params);

        return $response;
    }
}
