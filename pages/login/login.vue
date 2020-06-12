<template>
	<view class="content">
		<view class="wrap">
			<view class="logo">
				<image src="../../static/img/logo.png" mode=""></image>
			</view>
			<view class="login_type">
				<view :class="{'cur':logintype==0}" data-type='0' @tap="loginfuc">登陆</view>
				<!-- <view :class="{'cur':logintype==1}" data-type='1' @tap="loginfuc">注册</view> -->
			</view>
			<view class="input-group">
				<view class="input-row ">
					<text class="title iconfont iconshouji"></text>
					<m-input class="m-input" type="number" clearable focus v-model="account"   placeholder="请输入手机号码"></m-input>
				</view>
				<view class="input-row ">
					<text class="title iconfont iconcredentials_icon-copy"></text>
					<m-input class="m-input" type="text" clearable v-model="sfz" placeholder="输入身份证号"></m-input>
				</view>
				<view class="input-row">
					<text class="title  iconfont iconmima01"></text>
					<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
				</view>
				<view class="input-row" v-if="logintype==1">
					<text class="title  iconfont iconmima01"></text>
					<m-input type="password" displayable v-model="password1" placeholder="确认密码"></m-input>
				</view>
				<view v-if="logintype==1" class="input-row" >
					<text class="title iconfont iconyanzheng"></text>
					<input type="text" v-model="code" placeholder="请输入验证码"></input>
					<view v-if="yzm_type==0" class="getyzm" @tap="getCode">获取验证码</view>
					<view v-if="yzm_type==1" class="getyzm">{{yztime}}s</view>
				</view>
			</view>
			<view class="btn-row">
				<button v-if="logintype==0" type="primary" class="primary" @tap="bindLogin">登 录</button>
				<button v-if="logintype==1" type="primary" class="primary" @tap="bindLogin">注 册</button>
			</view>
			<view class="action-row" v-if="logintype==0">
				<!-- <navigator url="../reg/reg">注册账号</navigator>
				<text>|</text> -->
				<navigator url="../pwd/pwd">忘记密码?</navigator>
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
	import mInput from '../../components/m-input.vue'

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
				providerList: [],
				hasProvider: false,
				account: '',
				sfz:'',
				password: '',
				password1: '',
				code:'',
				positionTop: 0,
				isDevtools: false,
			}
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login']),
			loginfuc(e) {
				console.log(e.currentTarget.dataset.type)
				var type = e.currentTarget.dataset.type
				var that = this
				console.log(that.logintype)
				if (that.logintype == type) {
					return
				} else {
					that.logintype = type
			
				}
				that.account=''
				that.sfz=''
				that.password=''
				that.password1=''
				that.code=''
			},
			initProvider() {
				const filters = ['weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/img/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
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
			
			bindLogin() {
				var that =this
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (that.account == '' || !(/^1\d{10}$/.test(that.account))) {
					uni.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				if (that.sfz.length < 1 && that.logintype == 0) {
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
				if(that.logintype==1){
					if (that.password != that.password1) {
						uni.showToast({
							icon: 'none',
							title: '两次密码不一致'
						});
						return;
					}
					if (!that.code) {
						uni.showToast({
							icon: 'none',
							title: '请输入验证码'
						});
						return;
					}
				}
				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */
				var data = {
					account: that.account,
					sfz:that.sfz,
					password: that.password
				};
				var jkurl='/loginUser/login'
				if(that.logintype==1){
					data = {
						account: v.account,
						sfz:that.sfz,
						code:that.code,
						password: that.password
					}
					jkurl=''
				}
				
				uni.showToast({
					icon: 'none',
					title: '操作成功'
				})
				that.login('问心');
				uni.setStorageSync('loginmsg', '问心')
				setTimeout(() => {
					uni.reLaunch({
						url:'../main/main'
					})
				}, 1000)
				return
				service.post(jkurl, data,
					function(res) {
						that.btnkg = 0
						if (res.data.code == 1) {
				
							uni.showToast({
								icon: 'none',
								title: '操作成功'
							})
							if(that.logintype==0){
								that.login(res.data.real_name);
								uni.setStorageSync('loginmsg', res.data.data)
								setTimeout(() => {
									uni.reLaunch({
										url:'../main/main'
									})
								}, 1000)
							}else if(that.logintype==1){
								setTimeout(() => {
									that.logintype=0
								}, 1000)
							}
							
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
				return
				const validUser = service.getUsers().some(function(user) {
					return data.account === user.account && data.password === user.password;
				});
				if (validUser) {
					this.toMain(this.account);
				} else {
					uni.showToast({
						icon: 'none',
						title: '用户账号或密码不正确',
					});
				}
			},
			oauth(value) {
				uni.login({
					provider: value,
					success: (res) => {
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								/**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
								this.toMain(infoRes.userInfo.nickName);
							},
							fail() {
								uni.showToast({
									icon: 'none',
									title: '登陆失败'
								});
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
			},
			getUserInfo({
				detail
			}) {
				if (detail.userInfo) {
					this.toMain(detail.userInfo.nickName);
				} else {
					uni.showToast({
						icon: 'none',
						title: '登陆失败'
					});
				}
			},
			toMain(userName) {
				this.login(userName);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../main/main',
					});
				} else {
					uni.navigateBack();
				}

			}
		},
		onReady() {
			this.initPosition();
			this.initProvider();
			// #ifdef MP-WEIXIN
			this.isDevtools = uni.getSystemInfoSync().platform === 'devtools';
			// #endif
		}
	}
</script>

<style>
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
		width: 315upx;
		display: flex;
		align-items: center;
		/* justify-content: space-between; */
		justify-content: center;
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
		justify-content: flex-end;
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
		font-size: 15px!important;
		padding-left: 10px;
		font-size: 15px;
		flex: 1;
	}
	input{
		font-size: 15px!important;
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
