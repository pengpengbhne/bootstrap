$(function(){
	//加载表格数据
	$('#table').bootstrapTable({
	    url:'/xjzhgdyun/get_demo_table_list.call',
	    method:'post',
	    dataType:'json',
	    contentType:"application/x-www-form-urlencoded; charset=UTF-8",
	    showRefresh:false,//是否显示刷新按钮
	    showColumns:false,//是否显示内容列下拉框。
	    showFullscreen:false,//是否显示全屏按钮。
	    showPaginationSwitch:false,//是否显示切换分页按钮。
	    pagination:true,
	    pageNumber:1,
	    pageSize:10,
	    pageList:[10,20,30],
	    paginationPreText:'上一页',
	    paginationNextText:'下一页',
	    data_local: "zh-US",//表格汉化
	    cache:false,//禁用 AJAX 数据缓存。
	    search:false,//启用搜框
	    toolbar: '#tb',//指定工具栏
        sidePagination: "server", //服务端处理分页 server 前端分页client
        striped: true,//设置为 true 会有隔行变色效果
        queryParamsType:'undefind',
        queryParams: queryParams,
        sortClass:"name",
        sortName:"name",
	    idField: "name",
	    rowStyle:function(row,index){
	    	/*if (index%2==1){
	    		return {css:{"background-color":"red"}}
	    	}else{
	    		return {css:{"background-color":"green"}}
	    	}*//*隔行变色*/
	    	return {css:{"tr:hover":"#DAFFFD"}}
	    },
	    columns:[{
	    	checkbox:true,
	    },{
	    	field:'id',
	    	visible:false
	    },{
	    	title:'姓名',
	    	field:'name',
	    	align:'center'
	    },{
	    	title:'联系方式',
	    	field:'telephone',
	    	align:'center',
	    	sortable:true
	    		
	    },{
	    	title:'密码',
	    	field:'password',
	    	align:'center'
	    },{
	    	title:'操作',
	    	field:'toolbar',
	    	width:140,
	    	align:'center'
	    },]
	});
	//时间控件
	$('#label_formdatetime').datetimepicker({
		format: "yyyy-mm-dd",
		language: "zh-CN",
		weekStart: 1,
	   	toolbarPlacement:'default', //工具摆放的位置，top 则为上，默认为底
	   	autoclose: true,//选择后自动关闭
	   	todayHighlight: 1,
	   	startView: 'month',
	   	showTodayButton:false,	//是否工具栏 显示 直达今天天数的 按钮，默认false
	   	minView: 2,  //Number, String. 默认值：0, 'hour'，日期时间选择器所能够提供的最精确的时间选择视图。
	    showClear:false, //是否 工具栏显示  清空 输入框  的按钮。默认false
	    forceParse: 0,
	    pickerPosition: "bottom-left" 
    });
	$('#form_datatime').datetimepicker({
		format: "yyyy-mm-dd hh:ii:ss",
		language: "zh-CN",
		weekStart: 1,
	   	toolbarPlacement:'default', //工具摆放的位置，top 则为上，默认为底
	   	autoclose: true,//选择后自动关闭
	   	todayHighlight: 1,
	   	startView: 'month',
	   	minView: 0,  //Number, String. 默认值：0, 'hour'，日期时间选择器所能够提供的最精确的时间选择视图。
	    showClear:true, //是否 工具栏显示  清空 输入框  的按钮。默认false
	    forceParse: 0,
	    showMeridian:1,
	    todayBtn:true,//显示今天按钮
	    pickerPosition: "bottom-left" 
    });
	$('#label_formdate').datetimepicker({
		format: "yyyy-mm-dd",
		language: "zh-CN",
		weekStart: 1,
	   	toolbarPlacement:'default', //工具摆放的位置，top 则为上，默认为底
	   	autoclose: true,//选择后自动关闭
	   	todayHighlight: 1,//今天的日期高亮
	   	todayBtn:true,//显示今天按钮
	   	startView: 'month',//开始是月
	   	showTodayButton:true,	//是否工具栏 显示 直达今天天数的 按钮，默认false
	   	minView: 2,  //Number, String. 默认值：0, 'hour'，日期时间选择器所能够提供的最精确的时间选择视图。
	    showClear:true, //是否 工具栏显示  清空 输入框  的按钮。默认false
	    forceParse: 0,
	    showMeridian:1,
	    pickerPosition: "bottom-left" 
    });
	$('#form_time').datetimepicker({
		format: "hh:ii:ss",
		language: "zh-CN",
		weekStart: 1,//从周一开始
	   	toolbarPlacement:'default', //工具摆放的位置，top 则为上，默认为底
	   	autoclose: true,//选择后自动关闭
	   	todayHighlight: 1,//今天的日期高亮
	   	todayBtn:true,//显示今天按钮
	   	startView: 'hour',//开始是月
	   	minView: 0,  //Number, String. 默认值：0, 'hour'，日期时间选择器所能够提供的最精确的时间选择视图。
	    showClear:true, //是否 工具栏显示  清空 输入框  的按钮。默认false
	    forceParse: 0,
	    showMeridian:1,
	    pickerPosition: "bottom-left" 
    });
	
	 //日期插件初始化      
    $('#datetimeStart').datetimepicker({
        language:  'zh-CN', 
        format:'yyyy-mm-dd', 
        weekStart: 1, /*以星期一为一星期开始*/
        todayBtn:  true,
        autoclose: 1, 
        minView:2, /*精确到天*/
        pickerPosition: "bottom-left" 
     }).on("changeDate",function(ev){  //值改变事件
        //选择的日期不能大于第二个日期控件的日期
        if(ev.date){
             $("#datetimeEnd").datetimepicker('setStartDate', new Date(ev.date.valueOf()));
         }else{
             $("#datetimeEnd").datetimepicker('setStartDate','1900-01-01');
         }
     });
     $('#datetimeEnd').datetimepicker({
          language:  'zh-CN', //中文
          format:'yyyy-mm-dd', 
          weekStart: 1, /*以星期一为一星期开始*/
          todayBtn:  true,//显示今天按钮
          autoclose: 1, //选择后自动关闭
          minView:2, /*精确到天*/
          pickerPosition: "bottom-left"//picker显示左边
       }).on("changeDate",function(ev){
          //选择的日期不能小于第一个日期控件的日期
          if(ev.date){
               $("#datetimeStart").datetimepicker('setEndDate', new Date(ev.date.valueOf()));
          }else{
               $("#datetimeStart").datetimepicker('setEndDate','2900-01-01');
          }
       });   
     var data={}
     var url="/xjzhgdyun/get_select_options.call"
    getSelectOptions("orgid",url,data);
     
});

//弹框测试
function alertfun(){
	var select = $("#select_input").val();
	var date =$("#date_input").val();
	swal({
		  title: select,
		  text: date,
		  imageUrl: 'https://unsplash.it/400/200',
		  imageWidth: 400,
		  imageHeight: 200,
		  imageAlt: 'Custom image',
		  animation: false
		})
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
function clearfun(){
	$('#resource-form')[0].reset();
    searchfun();
}
//清空表单
function clearform(){
	$('#addform')[0].reset();
    searchfun();
}
function modelClose(){
	clearform();
	$('#myModal').modal('hide');
	
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
	submit_form("addform",'/xjzhgdyun/update_user_info.call',successfunction);
}
function successfunction(data){
	if(data.status=="success"){
		$("#myModal").modal("hide");
		clearform();
		searchfun();
    	toastrSuccess("提交成功");
	}
	toastrError('提交数据失败');
}
//提交表单
function submitForm1(){
	$.ajax({
        async: false,
        type: "POST",
        url:'/xjzhgdyun/update_user_info.call',
        contentType : "application/x-www-form-urlencoded; charset=utf-8",
        data:$("#addform").serialize(),
        dataType: "json",
        success: function (data) {
        	if(data.status=="success"){
        		$("#myModal").modal("hide");
        		clearform();
        		searchfun();
            	toastrSuccess("提交成功");
        	}else{
        		toastrError('提交数据失败');
        	}
          },
        error: function (msg) {
        	toastrError('提交数据失败');
        }
    })
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
	var rows=$("#table").bootstrapTable('getSelections');
	if(rows.length==0){
		toastrWarning("请选择删除的记录");
		return ;
	}
	var ids='';
	for(var i=0;i<rows.length;i++){
		ids+=rows[i]['id']+"&";//批量删除用&连接Id
	}
	ids=ids.substring(0,ids.length-1);
	delUserInfo(ids);
}
//单个--- 删除
function remove(id){
	//普通的删除
	//del_confirm('/xjzhgdyun/del_user_info.call',"确定要删除吗？",id);
	//带有操作成功后的删除函数
	del_confirm('/xjzhgdyun/del_user_info.call',"确定要删除吗？",id,del_success);
}
function del_success(data){
		searchfun();
}
//带有sweetalert弹框的删除
function delData(ids){
	swal({
		  title: '确定要删除吗?',
		  text: "删除后将无法恢复！",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: '确认删除',
		  cancelButtonText:'取消'
		}).then(function(result) {
		  if (result.value) {
			  $.ajax({
			        async: false,
			        type: "get",
			        url:'/xjzhgdyun/del_user_info.call',
			        contentType : "application/x-www-form-urlencoded; charset=utf-8",
			        data:{
			        	ids:ids
			        },
			        dataType: "json",
			        success: function (data) {
			        	if(data.status=="success"){
			        		swal('删除成功!','数据已经删除.','success')
			        		searchfun();
			        	}else if(data.status=="no"){
			        		toastrError(data.count);
			        	}else if(data.status=="failure"){
			        		searchfun();
			        		toastrWarning("aa");
			        	}else{
			        		toastrError("删除失败");
			        	}
			          },
			        error: function (msg) {
			        	toastrError('删除失败');
			        }
			    })
		  }
		})
}
//原生态弹框--删除函数
function delUserInfo(ids){
	var msg="你确定要删除吗？";
	if(confirm(msg)==true){
		$.ajax({
	        async: false,
	        type: "get",
	        url:'/xjzhgdyun/del_user_info.call',
	        contentType : "application/x-www-form-urlencoded; charset=utf-8",
	        data:{
	        	ids:ids
	        },
	        dataType: "json",
	        success: function (data) {
	        	if(data.status=="success"){
	        		searchfun();
	            	toastrSuccess(data.count);//成功的提示框
	        	}else if(data.status=="no"){
	        		toastrError(data.count);
	        	}else if(data.status=="failure"){
	        		searchfun();
	        		toastrWarning("aa");
	        	}else{
	        		toastrError("删除失败");
	        	}
	          },
	        error: function (msg) {
	        	toastrError('删除失败');
	        }
	    })
	}
}
