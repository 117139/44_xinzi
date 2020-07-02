<template>
	<view class="content">
		<!-- {{hasLogin}} -->
		<view v-if="hasLogin" class="hello">
			<view class="my_box">
				<view class="user_tx">
					<image src="../../static/img/images/tx_03.png" mode="aspectFill"></image>
				</view>
				<view class="user_msg">
					<view class="user_name">
						<view>{{userName}}</view>
						<image src="../../static/img/logout.png" mode="" @tap="bindLogout"></image>
					</view>
					<view class="user_name1">身份证号：{{userCard}}</view>
					<view class="user_name1">单位编号：{{deptCode}}</view>
					<view class="user_name1">单位名称：{{comapnyName}}</view>
				</view>
			</view>
			<view class="index_list">
				<view v-if="cxpsd" class="index_li"  @tap="jump" data-url="/pages/cx_pwd/cx_pwd">
					<image src="../../static/img/images/index_btn_05.jpg"></image>
					<text>查询薪资</text>
				</view>
				<view v-else class="index_li"  @tap="jump" data-url="/pages/set_pwd/set_pwd">
					<image src="../../static/img/images/index_btn_05.jpg"></image>
					<text>查询薪资</text>
				</view>
				<view class="index_li" @tap="jump" data-url="/pages/set_pwd/set_pwd?type=1">
					<image src="../../static/img/images/index_btn_07.jpg"></image>
					<text>设置查询密码</text>
				</view>
				<view class="index_li" @tap="jump" data-url="/pages/set_tel/set_tel">
					<image src="../../static/img/images/index_btn_09.jpg"></image>
					<text>修改手机号</text>
				</view>
			</view>
		</view>
		<view v-if="!hasLogin" class="hello">
			<view class="my_box">
				<view class="user_tx">
					<image src="../../static/img/images/tx_03.png" mode="aspectFill"></image>
				</view>
				<view class="user_msg">
					<view class="user_name">
						<view>{{userName}}</view>
						<image src="../../static/img/logout.png" mode="" @tap="bindLogout"></image>
					</view>
					<view class="user_name1">身份证号：{{userCard}}</view>
					<view class="user_name1">单位编号：{{deptCode}}</view>
					<view class="user_name1">单位名称：{{comapnyName}}</view>
				</view>
			</view>
			<view class="index_list">
				<view v-if="cxpsd" class="index_li"  @tap="jump" data-url="/pages/cx_pwd/cx_pwd">
					<image src="../../static/img/images/index_btn_05.jpg"></image>
					<text>查询薪资</text>
				</view>
				<view v-else class="index_li"  @tap="jump" data-url="/pages/set_pwd/set_pwd">
					<image src="../../static/img/images/index_btn_05.jpg"></image>
					<text>查询薪资</text>
				</view>
				<view class="index_li" @tap="jump" data-url="/pages/set_pwd/set_pwd?type=1">
					<image src="../../static/img/images/index_btn_07.jpg"></image>
					<text>设置查询密码</text>
				</view>
				<view class="index_li" @tap="jump" data-url="/pages/set_tel/set_tel">
					<image src="../../static/img/images/index_btn_09.jpg"></image>
					<text>修改手机号</text>
				</view>
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

	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName','userCard','phone','comapnyName','deptName','deptCode','cxpsd']),
		onLoad() {
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
				this.getcxwd()
			}
		},
		onShow() {
			console.log('main onshow')
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
				// this.getcxwd()
			}
		},
		methods: {
			...mapMutations(['logout','setCxpsd']),
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			getcxwd(){
				var that =this
				//loginUser/getQueryPwd
				var data={}
				var jkurl='/loginUser/getQueryPwd?userCard='+that.userCard+'&phone='+that.phone
				service.get(jkurl, data,
					function(res) {
						that.btnkg = 0
						if (res.data.code == 0) {
				
							if(res.data.data){
								that.setCxpsd(res.data.data)
							}
								
							
						} else {
							console.log('查询权限失败')
							// if (res.data.msg) {
							//   uni.showToast({
							//     icon: 'none',
							//     title: res.data.msg
							//   })
							// } else {
							//   uni.showToast({
							//     icon: 'none',
							//     title: '操作失败'
							//   })
							// }
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
			jump(e) {
				var that = this
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
					setTimeout(function() {
						that.btnkg = 0
					}, 1000)
				}
				console.log(e.currentTarget.dataset.url)
				uni.navigateTo({
					url: e.currentTarget.dataset.url,
				});
			},
			bindLogout() {
				this.logout();
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../login/login',
					});
				}
			}
		}
	}
</script>

<style>
	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.title {
		color: #8f8f94;
		margin-top: 25px;
	}

	
	.my_box{
		width:100%;
		height:266upx;
		background-image: url(../../static/img/images/index_bg_02.jpg);
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		padding: 39upx 28upx;
		box-sizing: border-box;
		display: flex;
	}
	.user_tx{
		width:118upx;
		height:118upx;
		background:rgba(255,255,255,1);
		border-radius:50%;
		margin-right: 38upx;
	}
	.user_tx image{
		width:118upx;
		height:118upx;
		border-radius:50%;
	}
	.user_msg{
		flex: 1;
		
	}
	.user_name{
		font-size: 16px;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.user_name image{
		width:45px;
		height: 13px;
	}
	.user_name1{
		font-size: 12px;
		color:rgba(255,255,255,.8);
		margin-top: 15upx;
	}
	.index_list{
		width: 100%;
		padding: 30upx 28upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.index_li{
		max-width: 33%;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 15px;
		color: #333;
	}
	.index_li image{
		width:156upx;
		height:156upx;
		background:rgba(42,120,223,1);
		border-radius:10px;
		margin-bottom: 10upx;
	}
</style>
