<template>
	<view class="content">
		<view class="wrap">
			
			<view class="set_ok">
				<image src="../../static/img/set_ok.png" mode="aspectFill"></image>
				<text>查询密码设置成功～</text>
			</view>
			<view class="btn-row">
				<button  type="primary" class="primary" @tap="findPassword">{{type=='1'?'返回首页':'返回查询'}}</button>
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
				type:'',
				btnkg: 0,
				logintype: '0',
				yzm_type: 0,
				yztime: 60,
				account: '18300000000',
				sfz:'',
				password: '',
				code:'',
			}
		},
		onLoad(option) {
			this.type=option.type
		},
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
				uni.showToast({
					icon: 'none',
					title: '发送成功'
				})
				that.codetime()
				that.btnkg= 0
				return
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
				
				// that.setCxpsd(that.password)
				if(that.type==1){
					uni.reLaunch({
						url:'/pages/main/main'
					})
				}else{
					uni.redirectTo({
						url:'/pages/cx_pwd/cx_pwd'
					})
				}
				
				
			}
		}
	}
</script>

<style scoped>
	.wrap{
		width: 695upx;
		margin: 0 auto;
	}
	
	.set_ok{
		padding-top: 100px;
		display: flex;
		align-items: center;
		flex-direction: column;
		font-size: 13px;
		color: #999;
		margin-bottom: 50px;
	}
	.set_ok image{
		width:62px;
		height:62px;
		border-radius: 50%;
		margin-bottom: 22px;
	}
	uni-button.primary{
		border-radius: 5px;
		background: #2A78DF;
	}
</style>
