<template>
	<view class="content">
		<view class="wrap">
			
			<view class="input-group">
				
				<view class="int_tip">设置查询密码</view>
				<view class="input-row" style="height: 40px;">
					<input type="text"  disabled="" placeholder="请输入手机号"  :value="gettel(phone)"></input>
					<view v-if="yzm_type==0" class="getyzm" @tap="getCode">获取验证码</view>
					<view v-if="yzm_type==1" class="getyzm">{{yztime}}s</view>
				</view>
				<view class="input-row"  style="height: 40px;">
					<input type="text" v-model="code" placeholder="请输入验证码" ></input>
				</view>
				<view class="input-row"  style="height: 40px;">
					<m-input type="password" displayable v-model="password" placeholder="请输入要设置的查询密码"></m-input>
					<!-- <input type="text" v-model="password" placeholder="请输入要设置的查询密码" ></input> -->
				</view>
			</view>
			<view class="btn-row">
				<button v-if="logintype==0" type="primary" class="primary" @tap="findPassword">下一步</button>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue';

	export default {
		components: {
			mInput
		},
		data() {
			return {
				type:1,
				btnkg: 0,
				logintype: '0',
				yzm_type: 0,
				yztime: 60,
				
				password: '',
				code:'',
			}
		},
		onLoad(option) {
			if (!this.hasLogin) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					/**
					 * 如果需要强制登录，不显示取消按钮
					 */
					showCancel: !this.forcedLogin,
					success: (res) => {
						if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
							if (this.forcedLogin) {
								uni.reLaunch({
									url: '../login/login'
								});
							} else {
								uni.navigateTo({
									url: '../login/login'
								});
							}
						}
					}
				});
			}
			if(option.type){
				this.type=option.type
			}
			
		},
		onShow() {
			if (!this.hasLogin) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					/**
					 * 如果需要强制登录，不显示取消按钮
					 */
					showCancel: !this.forcedLogin,
					success: (res) => {
						if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
							if (this.forcedLogin) {
								uni.reLaunch({
									url: '../login/login'
								});
							} else {
								uni.navigateTo({
									url: '../login/login'
								});
							}
						}
					}
				});
			}else{
				
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName','userCard','comapnyName','deptName','phone','cxpsd']),
		methods: {
			...mapMutations(['login','setCxpsd']),
			gettel(tel){
				// var tel = 18810399133;
				tel = "" + tel;
				var reg=/(\d{3})\d{4}(\d{4})/;
				var tel1 = tel.replace(reg, "$1****$2")
				return tel1
			},
			getCode() {
				let that = this
			
				if (that.phone == '' || !(/^1\d{10}$/.test(that.phone))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				
				var jkurl = '/userInfo/getVerifyCode?phone='+that.phone+'&userCard='+that.userCard
				var data = {}
				service.get(jkurl, data,
					function(res) {
						that.btnkg=0
						if (res.data.code == 0) {
			
							uni.showToast({
								icon: 'none',
								title: '发送成功'
							})
							that.codetime()
			
						} else {
							if (res.data.msg) {
								uni.showToast({
									icon: 'none',
									title: res.data.msg
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: '操作失败'
								})
							}
						}
					},
					function(err) {
						that.btnkg=0
						if (err.data.message) {
							uni.showToast({
								icon: 'none',
								title: err.data.message
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					})
			
			},
			codetime() {
				let that = this
				let time = 60
				let st = setInterval(function() {
					if (time == 0) {
						that.yzm_type = 0
						clearInterval(st);
					} else {
						let news = time--;
						// console.log(news)
						that.yzm_type = 1
						that.yztime = news
			
					}
				}, 1000);
			},
			
			findPassword() {
				var that =this
				if (!that.code) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
					return;
				}
				if (that.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				var data={}
				var jkurl='/loginUser/modifyPw?pwdType=1&phone='+that.phone+'&userCard='+that.userCard+'&verifyCode='+that.code+'&passwd='+that.password
				service.get(jkurl, data,
					function(res) {
						that.btnkg = 0
						if (res.data.code == 0) {
				
							uni.showToast({
								icon: 'none',
								title: '操作成功'
							})
							that.setCxpsd(that.password)
							uni.redirectTo({
								url:'/pages/set_pwd1/set_pwd1?type='+that.type
							})
								// that.logout();
								// uni.setStorageSync('loginmsg','')
								// setTimeout(() => {
								// 	uni.reLaunch({
								// 		url:'../login/login'
								// 	})
								// }, 1000)
							
							
						} else {
							if (res.data.message) {
							  uni.showToast({
							    icon: 'none',
							    title: res.data.message
							  })
							} else {
							  uni.showToast({
							    icon: 'none',
							    title: '操作失败'
							  })
							}
						}
					},
					function(err) {
						that.btnkg = 0
						if (err.data.msg) {
							uni.showToast({
								icon: 'none',
								title: err.data.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				)
			}
		}
	}
</script>

<style scoped>
	.wrap{
		width: 695upx;
		margin: 0 auto;
	}
	
	.logo{
		width: 100%;
		padding-top: 140upx;
		padding-bottom: 120upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.logo image{
		width: 334upx;
		height: 61upx;
	}
	.login_type{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 auto;
		color: #999;
		font-size: 30upx;
	}
	.login_type .cur{
		color: #194989;
		
		font-weight:400;
	}
	.action-row {
		display: flex;
		flex-direction: row;
		color: #999;
	}

	.action-row navigator {
		color: #194989;
		padding: 0 10px;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	.input-row {
		display: flex;
		align-items: center;
		border-top: 0;
		border-left: 0;
		border-right: 0;
		margin-bottom: 0;
	}
	
	.input-row input {
		font-size: 30rpx;
		padding-left: 10px;
		flex: 1;
		font-size: 15px;
	}
	.getyzm {
		flex: none;
		display: flex;
		font-size: 14px;
		height:27px;
		border:1px solid rgba(1,131,199,1);
		border-radius:10px;
		align-items: center;
		width: 193upx;
		/* height: 29rpx; */
		background: rgba(255, 255, 255, 1);
		/* border-radius: 29rpx; */
		color: #2C55C1;
		justify-content: center;
	}
	.int_tip{
		font-size: 15px;
		color: #bbb;
		padding-bottom: 12px;
		border-bottom: 1px solid #eee;
	}
	uni-button.primary{
		border-radius: 5px;
	}
</style>
