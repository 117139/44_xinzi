<template>
	<view class="content">
		<view class="wrap">
			<view class="logo">
				<image src="../../static/img/logo.png" mode=""></image>
			</view>
			<view class="login_type">
				<view class="cur" >修改密码</view>
			</view>
			<view class="input-group">
				<view class="input-row ">
					<text class="title iconfont iconshouji"></text>
					<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入手机号码"></m-input>
				</view>
				<view class="input-row" >
					<text class="title iconfont iconyanzheng"></text>
					<input type="text" v-model="code" placeholder="请输入验证码" ></input>
					<view v-if="yzm_type==0" class="getyzm" @tap="getCode">获取验证码</view>
					<view v-if="yzm_type==1" class="getyzm">{{yztime}}s</view>
				</view>
				<view class="input-row ">
					<text class="title iconfont iconcredentials_icon-copy"></text>
					<m-input class="m-input" type="text" clearable focus v-model="sfz" placeholder="输入身份证号"></m-input>
				</view>
				<view class="input-row">
					<text class="title  iconfont iconmima01"></text>
					<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
				</view>
				<view class="input-row">
					<text class="title  iconfont iconmima01"></text>
					<m-input type="password" displayable v-model="password1" placeholder="确认密码"></m-input>
				</view>
			</view>
			<view class="btn-row">
				<button v-if="logintype==0" type="primary" class="primary" @tap="findPassword">确 认</button>
			</view>
			<view class="action-row" v-if="logintype==0">
				<!-- <navigator url="../reg/reg">注册账号</navigator> -->
				<text>想起密码？</text>
				<navigator url="../login/login">登陆</navigator>
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
				account: '',
				sfz:'',
				password: '',
				password1: '',
				code:'',
			}
		},
		methods: {
			...mapMutations(['login']),
			getCode() {
				let that = this
			
				if (that.account == '' || !(/^1\d{10}$/.test(that.account))) {
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
				// uni.showToast({
				// 	icon: 'none',
				// 	title: '发送成功'
				// })
				// that.codetime()
				// that.btnkg= 0
				// return
				var jkurl = '/sendCode'
				var data = {
					type: 3,
					phone: that.account
				}
				service.get(jkurl, data,
					function(res) {
						that.btnkg=0
						if (res.data.code == 1) {
			
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
				if (that.account == '' || !(/^1\d{10}$/.test(that.account))) {
					uni.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				if (!that.code) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
					return;
				}
				if (that.sfz.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入身份证号'
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
				if (that.password != that.password1) {
					uni.showToast({
						icon: 'none',
						title: '两次密码不一致'
					});
					return;
				}
				var data = {
					account: v.account,
					sfz:that.sfz,
					code:that.code,
					password: that.password
				}
				var jkurl='/loginUser/modifyPw'
				service.post(jkurl, data,
					function(res) {
						that.btnkg = 0
						if (res.data.code == 1) {
				
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
		width: 556upx;
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
		font-size: 15px;
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
	}
	
	.input-row input {
		font-size: 15px;
		padding-left: 10px;
		flex: 1;
		font-size: 16px;
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
</style>
