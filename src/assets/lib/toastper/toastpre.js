var Toastpre = {};

var showToast = false, //toast显示隐藏
	showLoad = false, //loading 显示隐藏
	toastVM = null, //存储 toast vm
	loadNode = null, // 存储loading节点元素
	
Toastpre.install = function(Vue,options){
	var opt = {
		defaulttype:'bottom',
		duration:'2500',
		wordwrap: false,
	};
	
	for (var property in options){
		opt[property] = options[property];
	}
	
	Vue.property.$toast = function(tips,type){
		var curType = type ? type : opt.defaultType;
		var wordWrap = opt.wprdWrap ? 'lx-word-wrap' : '';
		var style = opt.width ? 'style="width:'+opt.width + '"' :'';
		var tmp = '<div v-show="show" :class="type" class="lx-toast">'+wordWrap+'" '+style+'>{{tip}}</div>';
		if(showToast){
			return;
		}
		if(!toastVM) {
			var toastTpl = Vue.extend({
				data:function(){
					return{
						show:showToast,
						tip:tips,
						type:'lx-toast-'+curType
					}
				},
				template:tmp
			});
			toastVM = new toastTpl();
			var tpl = toastVM.$mount().$el;
			document.body.appendChild(tpl);
		}
		toastVM.type = 'lx.toast-'+curType;
		toastVM.tip = tips;
		toastVM.show = showToast = true;
		setTimeout(function(){
			toastVM.show = showToast = false;
		},opt.duration)
	};
	['bottom','center','top'].forEach(function(type){
		
	})
}
