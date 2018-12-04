$(function(){
	init_query_table("table",//tabelId
			'/xjzhgdyun/get_demo_table_list.call',//url
			10,//pageSize
			[10,20,40],//pageList
			"name",//sortName
			"asc",//sortOrder
			"name",//idField 
			"tb",//toolbar
			queryParams);

	//自定义时间控件使用
	date_auto_function("label_formdatetime","yyyy-mm-dd hh:ii:ss","year",0)
	//日期控件
	date_function("label_formdate")
	date_function("birthday_day")
	//时间控件
	time_function("form_time")
	//调用日期时间控件
	datetime_function("form_datatime");
	//调用开始结束的时间控件
	datetime_startEnd_function("datetimeStart","datetimeEnd");
	//调用获取下拉框数据
     var data={}
     var url="/xjzhgdyun/get_select_options.call"
    getSelectOptions("orgid",url,data);
     var data1={}
     var url1="/xjzhgdyun/get_select_options.call"
    getSelectOptions("roles",url1,data1);
     
});
function optionContent(value,row,index){
	/*  		return ['<button id="tableEditor" type="button" class="btn btn-default">编辑</button>&nbsp; | &nbsp;',
					'<button id="tableDelete" type="button" class="btn btn-default">删除</button>&nbsp; | &nbsp;', 
					'<button id="tableDescript" type="button" class="btn btn-default">显示详情</button>'].join("") 
					 */
	/* 		return [' <button id="tableDescript" type="button" data-toggle="modal" data-target="#myModal" class="btn btn-default">显示详情</button> ']
	 */		return [' <a id="tableDescript" class="btn btn-base btn-md-base" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-plus btn-base-padding"></span>显示详情</ a> ']
			
		}
window.operateEvents = {
		/* "click #tableEditor":function(e,value,row,index){console.log(row);console.log(e);console.log(index);console.log(value)},
		"click #tableDelete":function(e,value,row,index){console.log(row);console.log(e);console.log(index);console.log(value)}, */
		"click #tableDescript":get_persional_all_date,
}

//获取参数---搜索向后台传递的参数
function queryParams(params) {
	var pars = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			 offset:this.offset,
	         pageSize: this.pageSize,   //页面大小
	         pageNumber: this.pageNumber,  //页码
	         sortName:this.sortName,
	         sortOrder:this.sortOrder,
	         searchText:this.searchText,
	         name: $("#username").val(),
	         telephone: $("#telephone").val(),
	         password: $("#password").val(),
	     };
    return pars;
}
//搜索触发方法刷新表格
function searchfun() {
	$("#table").bootstrapTable('refresh',{
		silent: true,
		query:{
			pageNumber: 1,
		}
	});
}
//清除搜索框
function clearfunction(){
	clear_form("resource-form");
	searchfun();
}
//关闭模态框前清除form中的数据
function modelClose(){
	clear_form("addform");
	$('#myModal').modal('hide');
	
}
function modelClose2(){
	clear_form("defaultForm");
	$('#myModal2').modal('hide');
	
}
//（html）   获取参数---搜索向后台传递的参数
function queryParams1(params) {
	var pars = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	         pageSize: params.pageSize,   //页面大小
	         pageNumber: params.pageNumber,  //页码
	         sortName:params.sortName,
	         sortOrder:params.sortOrder,
	         searchText:params.searchText,
	         name: $("#username1").val(),
	         telephone: $("#telephone1").val(),
	         password: $("#password1").val(),
	     };
    return pars;
}

function submitForm(){
	//调用数据提交函数
	submit_form("addform",'/xjzhgdyun/update_user_info.call',successfunction);
}
//提交成功调用函数
function successfunction(data){
	if(data.status=="success"){
		$("#myModal").modal("hide");
		clearform();
		searchfun();
    	toastrSuccess("提交成功");
	}
}

//编辑
function edit(id){
	callback_ajax("/xjzhgdyun/update_user_info_find.call",{obj_id:id},function(data){
		$("#tb_username").val(data.user_name);
		$("#tb_telephone").val(data.telephone);
		$("#userid").val(data.id);
		$("#tb_password").val("");
		$("#myModal").modal("show");
	});
}
//批量删除
function delUserList(){
	//调用批量删除的方法
	del_selects_List("table",'id','/xjzhgdyun/del_user_info.call',"确认要删除吗？",delsuccess);
	
}
//单个--- 删除
function remove(id){
	//普通的删除
	//del_confirm('/xjzhgdyun/del_user_info.call',"确定要删除吗？",id);
	//带有操作成功后的删除函数
	del_success_confirm('/xjzhgdyun/del_user_info.call',"确定要删除吗？",id,delsuccess);
}
//删除成功调用函数
function delsuccess(data){
	if(data.status=="success"){
		searchfun();
    	toastrSuccess("删除成功！");//成功的提示框
	}
}
