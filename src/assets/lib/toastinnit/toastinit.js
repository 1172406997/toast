var ToastInit = {};
ToastInit.install = function(Vue,options){
	let opt = {
		defaultType:'bottom', //默认显示位置
		duration:'2500' //持续事件
	}
	for(let property in options){
		opt[property] = options[property];//使用option的配置
	}
	Vue.prototype.$toast = (tips,type) =>{//type 为模板添加位置类
		if(type){
			opt.defaultType = type; //如果有type 位置则设为该type
		}
		if(document.getElementByClassName("vue-toast").length){
			//如果toast还在,则不执行
			return;
		}
		let toastTpl = Vue.extend({ //创建构造器定义号提示信息模板
			template:"<div class = 'vue-toast toast-'"+type+">"+tips+'</div>'
		})
		
		let tpl = new toastTpl().$mount().$el;//创建实例挂载到文档以后的地方
		document.body.appendChild(tpl);//将创建好的实例添加到body中
		setTimeout(function(){
			document.body.removeChild(tpl)
		},option.duration)
	} // 实现this.$toast
	['bottom','center','top'].forEach(type => {
		Vue.prototype.$toast[type] = (tips) =>{
			return Vue.prototype.$toast(tips,type)
		}
	})
}
module.exports = ToastInit;
//exports 


