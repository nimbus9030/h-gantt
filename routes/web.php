<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::post('/home/pagelist', 'HomeController@pagelist');
Route::post('/home/addProject', 'HomeController@addProject');
Route::post('/home/delProject', 'HomeController@delProject');

Route::get('/gantt/{project}', 'GanttController@index');

Route::post('/gantt/getProjectTasks', 'GanttController@getProjectTasks');
Route::post('/gantt/saveProjectTasks', 'GanttController@saveProjectTasks');

