import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: true,
		hasLogin: false,
		userName: "问心",
		userCard:'',
		roleId:'',
		comapnyName:'',
		deptName:'',
		deptCode:'',
		phone:'',
		id:'',
		qyType:'',  //1事业  2行政
		cxpsd:''
	},
	mutations: {
		login(state, usermsg) {
			state.userName = usermsg.userName || '新用户';
			state.userCard = usermsg.userCard || ''; //身份证号
			state.roleId = usermsg.roleId || 0;//角色id，用户角色，1管理员，0普通职员
			state.hasLogin = true;
		},
		login_com(state, usermsg) {
			state.comapnyName = usermsg.comapnyName || '';
			state.deptName = usermsg.deptName || '';
			state.deptCode = usermsg.deptCode || '';
			state.phone = usermsg.phone || '';
			state.id = usermsg.id || '';
			state.qyType = usermsg.type || '';
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		},
		setCxpsd(state,psd) {
			state.cxpsd = psd;
		},
		setPhone(state,phone) {
			state.phone = phone;
		}
	}
})

export default store
