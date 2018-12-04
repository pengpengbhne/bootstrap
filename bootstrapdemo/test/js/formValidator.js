
/*
 * 参考bootstrapValidator
 * 表单验证*/
$(function() {
    $('#defaultForm').bootstrapValidator({
        fields: {
        	
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空！'
                    },
                    stringLength: {
                        min: 6,
                        max: 20,
                        message: '用户名长度为6-20'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名只能包括字符、数字、下划线'
                    },
                    /*远程验证
                     * remote: {
                        type: 'POST',
                        url: '#',
                        message: '用户名不能重复'
                    },*/
                }
            },
            roles: {
                validators: {
                    notEmpty: {
                        message: 'The country is required and can\'t be empty'
                    }
                }
            },
            email: {
                validators: {
                    emailAddress: {
                        message: '请填入正确的email地址！'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    different: {
                        field: 'username',
                        message: '密码不能和用户名相同！'
                    }
                }
            },
            confirmPassword: {
                validators: {
                    notEmpty: {
                        message: '确认密码不能为空！'
                    },
                    identical: {
                        field: 'password',
                        message: '请与密码保持一致！'
                    }
                }
            },
            phoneNumber: {
                validators: {
                	notEmpty: {
                        message: '手机号码不能为空'
                    },
                    /*stringLength: {
                        min: 11,
                        max: 11,
                        message: '请输入11位手机号码'
                    },*/
                    regexp: {
                        regexp: /^1[34578]\d{9}$/,
                        message: '请输入11位正确的手机号码'
                    }
                }
            },
            secondFile: {
                validators: {
                    file: {
                        extension: 'pdf',
                        type: 'application/pdf',
                        minSize: 1024*1024,
                        message: '请选择一个大小小于 1M的pdf文件'
                    }
                }
            },
            dis:{
            	validators:{
            		notEmpty: {
                        message: '描述不能为空！'
                    },
                    stringLength:{
                    	max:100,
                    	message:'最大长度为100'
                    }
            	}
            },
            birthday: {
                validators: {
                	notEmpty: {
                        message: '日期不能为空！'
                    },
                    date: {
                        format: 'yyyy-mm-dd',
                        message: '时间日期不对'
                    }
                }
            },
            gender: {
                validators: {
                    notEmpty: {
                        message: '性别必填！'
                    }
                }
            },ages: {
                validators: {
                    lessThan: {
                        value: 100,
                        inclusive: true,//设置为true表示可以等于
                        message: '年龄最大为100'
                    },
                    greaterThan: {
                        value: 1,
                        inclusive: true,
                        message: '年龄最小为 1'
                    }
                }
            },
            'languages[]': {
                validators: {
                    notEmpty: {
                        message: '语言至少选择2个'
                    },
                    choice: {
                        min: 2,
                        max: 4,
                        message: '语言需要选择2-4个'
                    }
                }
            },
        }
    });

    // Validate the form manually
    $('#validateBtn').click(function() {
        $('#defaultForm').bootstrapValidator('validate');
    });

    $('#resetBtn').click(function() {
        $('#defaultForm').data('bootstrapValidator').resetForm(true);
    });
});
