<template>
	<view class="content">
		<view class="wrap">
			
			<view class="input-group">
				
				<view class="input-row"  style="height: 40px;">
					<input type="password" v-model="password" placeholder="请输入您的查询密码" ></input>
				</view>
				
			</view>
			<view class="btn-row">
				<button v-if="logintype==0" type="primary" class="primary" @tap="getcxwd">确认</button>
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
				btnkg: 0,
				logintype: '0',
				yzm_type: 0,
				yztime: 60,
				account: '18300000000',
				sfz:'',
				password: '',
				password1: '',
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
		computed: mapState(['forcedLogin', 'hasLogin','userCard', 'userName','cxpsd']),
		methods: {
			...mapMutations(['login','setCxpsd']),
			getcxwd(){
				var that =this
				if (!that.password) {
					uni.showToast({
						icon: 'none',
						title: '请输入查询密码'
					});
					return;
				}
				var data={}
				var jkurl='/loginUser/checkQueryPwd?userCard='+that.userCard+'&queryPwd='+that.password
				service.get(jkurl, data,
					function(res) {
						that.btnkg = 0
						if (res.data.code == 0) {
							uni.showToast({
								icon: 'none',
								title: '操作成功'
							})
							setTimeout(() => {
								uni.redirectTo({
									url:'../cx_jg/cx_jg'
								})
							}, 1000)
								
							
						} else {
							
							if (res.data.data) {
								console.log(res.data.data)
							  uni.showToast({
							    icon: 'none',
							    title: '操作失败'
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
			},
			
			findPassword() {
				
				
				var data = {
					password: that.password
				}
				var jkurl=''
				uni.showToast({
					icon: 'none',
					title: '操作成功'
				})
				
					// that.logout();
					// uni.setStorageSync('loginmsg', res.data.data)
					setTimeout(() => {
						uni.redirectTo({
							url:'../cx_jg/cx_jg'
						})
					}, 1000)
					return
				service.post(jkurl, data,
					function(res) {
						that.btnkg = 0
						if (res.data.code == 0) {
				
							uni.showToast({
								icon: 'none',
								title: '操作成功'
							})
							
								that.logout();
								uni.setStorageSync('loginmsg', res.data.data)
								setTimeout(() => {
									uni.reLaunch({
										url:'../login/login'
									})
								}, 1000)
							
							
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
		margin: 200upx auto 0;
		width:515upx;
		display: flex;
		align-items: center;
		border-top: 0;
		border-left: 0;
		border-right: 0;
		margin-bottom: 0;
		text-align: center;
		padding-bottom: 50upx;
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
		border-left: 1px solid #ddd;
		align-items: center;
		width: 193rpx;
		height: 29rpx;
		background: rgba(255, 255, 255, 1);
		/* border-radius: 29rpx; */
		color: #2C55C1;
		justify-content: center;
	}
	.int_tip{
		font-size: 16px;
		color: #bbb;
		padding-bottom: 12px;
		border-bottom: 1px solid #eee;
	}
	uni-button.primary{
		border-radius: 5px;
	}
</style>
