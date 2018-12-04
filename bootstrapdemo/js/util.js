/**
 * 截取路径中的参数
 */
function QueryString(strname)
{
	var hrefstr,pos,parastr,para,tempstr;
	hrefstr = window.location.href;
	pos = hrefstr.indexOf("?");
	parastr = hrefstr.substring(pos+1);
	para = parastr.split("&");	
	tempstr="";	
	for(i=0;i<para.length;i++)
	{ 
		tempstr = para[i];
		pos = tempstr.indexOf("="); 
		if(tempstr.substring(0,pos) == strname) 
		{  
			return tempstr.substring(pos+1);
		}	
	}	
	return null;
}
var minDate = '2014-01';
var mcMinDate = '2013-06';
function alertmsg(msg){
	alert('提示',msg,'warning');
}
function alertinfo(msg){
	alert('提示',msg,'warning');
}
function refreshTab(title){
	var pr={tabTitle:title};
	window.parent.refreshTab(pr);
}


function noMenuOne() 
{ 
return false; 
} 
//document.oncontextmenu = noMenuOne; 
function noMenuTwo() 
{ 
if(event.button == 2) 
{ 
return false; 
}
} 
//document.onmousedown = noMenuTwo;

/*var par=Math.random();
var d=new Date();
d.getSecond();
par+=*/

/**
 * ajax回调复杂方法
 * @param ck_url 请求地址
 * @param ck_data 发送数据
 * @param ck_function 回调的方法
 * @returns
 */
function callback_ajax(ck_url,ck_data,ck_function){
	$.ajax({
		url : ck_url,
		dataType : "json",
		type : 'post',
		async : true,
		data : ck_data,
		success : function(data) {
			/*防止sql注入*/
			if(data.hasOwnProperty("zhuru")){
				alert('警告！您发送请求中含有非法字符!');
			}else{
				ck_function(data);
			}
		},
		error : function(e) {alert('系统忙稍后重试!!!');}
	});
}
/**
 * 动态获取Select选项
 * @param id  select的id
 * @param url  请求的url
 * @param data  json类型的参数
 */
function getSelectOptions(id,url,data){
    $.ajax({
        type: "post",
        url:url,
        data:data,
        async:false,
        dataType: "json",
        success: function(res){
            if (null != res) {
                var html = '';
                Object.keys(res).forEach(function(key){

                    html += '<option value="' + res[key].value + '" data-tokens="'+ res[key].name+'">' + res[key].name+ '</option>';
                });
                $("#"+id).html(html);
                //必须加，刷新select
                $("#"+id).selectpicker('refresh');
            }
        }
    });
}
/**
 * 简单的表单封装   
 * @param formId 表单Id
 * @param url 
 * @param success_function 成功后调用的函数
 * @param error_funtion 错误时调用的函数
 */
function submit_se_form(formId,url,success_function,error_funtion){
	$.ajax({
        async: false,
        type: "POST",
        url:url,
        contentType : "application/x-www-form-urlencoded; charset=utf-8",
        data:$("#"+formId).serialize(),
        dataType: "json",
        success: function (data) {
        	success_function(data);//成功时调用的函数
          },
        error: function (msg) {
        	error_function(msg);//错误时调用函数
        }
    })
}
/**
 * 简单的表单封装   
 * @param formId 表单Id
 * @param url 
 * @param success_function 成功后调用的函数
 */
function submit_form(formId,url,success_function){
	$.ajax({
        async: false,
        type: "POST",
        url:url,
        contentType : "application/x-www-form-urlencoded; charset=utf-8",
        data:$("#"+formId).serialize(),
        dataType: "json",
        success: function (data) {
        	success_function(data);//成功时调用的函数
          },
        error: function (msg) {
        	toastrError('提交数据失败');
        }
    })
}
/**
 * 带有成功函数和错误函数的删除
 * @param url  
 * @param title  标题：字符串
 * @param ids 要删除的id拼接的字符串
 * @param success_funtion 成功时返回的函数
 * @param error_function //错误时返回的函数
 */
function del_se_confirm(url,title,ids,success_funtion,error_function){
	swal({
		  title: title,
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3DC7BE',
		  cancelButtonColor: '#d33',
		  confirmButtonText: '确认',
		  cancelButtonText:'取消'
		}).then(function(result) {
		  if (result.value) {
			  $.ajax({
			        async: false,
			        type: "post",
			        url:url,
			        contentType : "application/x-www-form-urlencoded; charset=utf-8",
			        data:{
			        	ids:ids
			        },
			        dataType: "json",
			        success: function (data) {
			        	success_funtion(data);
			          },
			        error: function (msg) {
			        	error_function(msg);
			        }
			    })
		  }
		});
}
/**
 * 带有成功函数
 * @param url  
 * @param title  标题：字符串
 * @param ids 要删除的id拼接的字符串
 * @param success_funtion 成功时返回的函数
 */
function del_success_confirm(url,title,ids,success_funtion){
	swal({
		  title: title,
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3DC7BE',
		  cancelButtonColor: '#d33',
		  confirmButtonText: '确认',
		  cancelButtonText:'取消'
		}).then(function(result) {
		  if (result.value) {
			  $.ajax({
			        async: false,
			        type: "post",
			        url:url,
			        contentType : "application/x-www-form-urlencoded; charset=utf-8",
			        data:{
			        	ids:ids
			        },
			        dataType: "json",
			        success: function (data) {
			        	success_funtion(data);
			          },
			        error: function (msg) {
			        	toastrError("操作失败！");
			        }
			    })
		  }
		})
}
/**
 * 普通的删除
 * @param url  
 * @param title  标题：字符串
 * @param ids 要删除的id拼接的字符串
 */
function del_confirm(url,title,ids){
	swal({
		  title: title,
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3DC7BE',
		  cancelButtonColor: '#d33',
		  confirmButtonText: '确认',
		  cancelButtonText:'取消'
		}).then(function(result) {
		  if (result.value) {
			  $.ajax({
			        async: false,
			        type: "post",
			        url:url,
			        contentType : "application/x-www-form-urlencoded; charset=utf-8",
			        data:{
			        	ids:ids
			        },
			        dataType: "json",
			        success: function (data) {
			        	if(data.status=="success"){
			        		toastrSuccess(data.msg);
			        	}else if(data.status=="failure"){
			        		toastrWarning(data.msg);
			        	}else{
			        		toastrError("操作失败！");
			        	}
			          },
			        error: function (msg) {
			        	toastrError("操作失败！");
			        }
			    })
		  }
		});
}
/**
 * 批量删除id使用&符合连接
 * @param tableId 表Id
 * @param id 列名
 * @param url 
 * @param title 弹框标题如：确认删除吗？
 * @param success_funtion 删除成功后调用的函数
 */
function del_selects_List(tableId,id,url,title,success_funtion){
	var rows=$("#"+tableId).bootstrapTable('getSelections');
	if(rows.length==0){
		toastrWarning("请选择删除的记录");
		return ;
	}
	var ids='';
	for(var i=0;i<rows.length;i++){
		ids+=rows[i][id]+"&";//批量删除用&连接Id
	}
	ids=ids.substring(0,ids.length-1);
	del_success_confirm(url,title,ids,success_funtion)
}
/**
 * 自定义时间日期
 * @param dateId id
 * @param format 时间格式 ："yyyy-mm-dd hh:ii:ss"
 * @param startView:"year"|"month"|"day"
 * @param minView--->0:代表分钟，1：代表小时，2：代表天
 */
function date_auto_function(dateId,format,startView,minView){
	$('#'+dateId).datetimepicker({
		format: format,
		language: "zh-CN",
		weekStart: 1,
	   	toolbarPlacement:'default', //工具摆放的位置，top 则为上，默认为底
	   	autoclose: true,//选择后自动关闭
	   	todayHighlight: 1,
	   	startView: startView,
	   	minView: minView,  //Number, String. 默认值：0, 'hour'，日期时间选择器所能够提供的最精确的时间选择视图。
	    showClear:true, //是否 工具栏显示  清空 输入框  的按钮。默认false
	    forceParse: 0,
	    showMeridian:1,
	    todayBtn:true,//显示今天按钮
	    pickerPosition: "bottom-left" 
	});
}
/**
 * 日期控件
 * @param dateId
 */
function date_function(dateId){
	$('#'+dateId).datetimepicker({
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
}
/**
 * 时间控件
 * @param dateId
 */
function time_function(dateId){
	$('#'+dateId).datetimepicker({
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
}
/**
 * @param dateId 日期时间控件
 */
function datetime_function(dateId){
	$('#'+dateId).datetimepicker({
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
}
/**
 * 开始结束时间控件
 * @param startId 开始的Id
 * @param endId	结束的Id
 */
function datetime_startEnd_function(startId,endId){
	//日期插件初始化      
    $('#'+startId).datetimepicker({
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
             $("#"+endId).datetimepicker('setStartDate', new Date(ev.date.valueOf()));
         }else{
             $("#"+endId).datetimepicker('setStartDate','1900-01-01');
         }
     });
     $('#'+endId).datetimepicker({
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
               $("#"+startId).datetimepicker('setEndDate', new Date(ev.date.valueOf()));
          }else{
               $("#"+startId).datetimepicker('setEndDate','2900-01-01');
          }
       });  
}

/**
 * 清空表单数据
 * @param formId 表单Id
 */
function clear_form(formId){
	$('#'+formId)[0].reset();
}
/**
 * 初始化表
 * @param tableId 表id
 * @param url 
 * @param pageSize 每页的大小
 * @param pageList 页的列表
 * @param sortName 排序字段
 * @param sortOrder 'asc'|'desc'。
 * @param idField 指定主键列。
 * @param toolbarId id
 */
function init_table(tableId,url,pageSize,pageList,sortName,sortOrder,idField,toolbarId){
	$('#'+tableId).bootstrapTable({
	    url:url,
	    method:'post',
	    dataType:'json',
	    contentType:"application/x-www-form-urlencoded; charset=UTF-8",
	    showRefresh:false,//是否显示刷新按钮
	    showColumns:false,//是否显示内容列下拉框
	    showFullscreen:false,//是否显示全屏按钮
	    showPaginationSwitch:false,//是否显示切换分页按钮
	    pagination:true,
	    pageNumber:1,
	    pageSize:pageSize,
	    pageList:pageList,
	    paginationPreText:'上一页',
	    paginationNextText:'下一页',
	    data_local: "zh-US",//表格汉化
	    cache:false,//禁用 AJAX 数据缓存。
	    search:false,//启用搜框
	    toolbar: "#"+toolbarId,//指定工具栏
        sidePagination: "server", //服务端处理分页 server 前端分页client
        striped: true,//设置为 true 会有隔行变色效果
        sortName:sortName,
        sortOrder:sortOrder,
	    idField: idField,
	    rowStyle:function(row,index){
	    	return {css:{"tr:hover":"#DAFFFD"}}
	    },
	});
}
/**
 * 初始化表
 * @param tableId 表id
 * @param url 
 * @param pageSize 每页的大小
 * @param pageList 页的列表
 * @param sortName 排序字段
 * @param sortOrder 'asc'|'desc'。
 * @param idField 指定主键列。
 * @param toolbarId id
 * @param queryParams 传自定义参数自定义函数
 */
function init_query_table(tableId,url,pageSize,pageList,sortName,sortOrder,idField,toolbarId,queryParams){
	$('#'+tableId).bootstrapTable({
	    url:url,
	    method:'post',
	    dataType:'json',
	    contentType:"application/x-www-form-urlencoded; charset=UTF-8",
	    showRefresh:false,//是否显示刷新按钮
	    showColumns:false,//是否显示内容列下拉框
	    showFullscreen:false,//是否显示全屏按钮
	    showPaginationSwitch:false,//是否显示切换分页按钮
	    pagination:true,
	    pageNumber:1,
	    pageSize:pageSize,
	    pageList:pageList,
	    paginationPreText:'上一页',
	    paginationNextText:'下一页',
	    data_local: "zh-US",//表格汉化
	    cache:false,//禁用 AJAX 数据缓存。
	    search:false,//启用搜框
	    toolbar: "#"+toolbarId,//指定工具栏
        sidePagination: "server", //服务端处理分页 server 前端分页client
        striped: true,//设置为 true 会有隔行变色效果
        queryParamsType:'undefind',
        queryParams: queryParams,
        sortName:sortName,
        sortOrder:sortOrder,
	    idField: idField,
	    rowStyle:function(row,index){
	    	return {css:{"tr:hover":"#DAFFFD"}}
	    },
	});
}