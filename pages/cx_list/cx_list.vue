<template>
	<view class="wrap">
		<view class="cx_list">
			<view class="cx_list_tit">
				<view class="li_t1">交易时间</view>
				<view class="li_t2">薪资金额</view>
			</view>
			<view class="li_box">
				<view class="cx_li"  v-for="(item,index) in data_list" @tap="jump" :data-url="'/pages/details/details?id='+index">
					<view class="li_t1">2019-02-03</view>
					<view class="li_t2">12567.56</view>
					<text class="iconfont iconnext3"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data_list:[1,1,1,1,1,1,1,1,1]
			}
		},
		methods: {
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
		}
	}
</script>

<style scoped>
	.wrap{
		width: 100%;
		min-height: 100vh;
		background: #F5F5F5;
		padding: 38upx 28upx;
		box-sizing: border-box;
	}
	.cx_list{
		width: 100%;
		background:rgba(255,255,255,1);
		box-shadow:0px 3px 18upx 0px rgba(189,189,189,0.18);
		border-radius:10upx;
		overflow: hidden;
	}
	.cx_list_tit{
		width: 100%;
		height:80upx;
		padding: 0 28upx;
		background:rgba(42,120,223,1);
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #fff;
		font-size: 16px;
		box-sizing: border-box;
	}
	.li_t1{
		width: 422upx;
	}
	.li_t2{
		flex: 1;
	}
	.li_box{
		width: 100%;
	}
	.cx_li{
		width: 100%;
		display: flex;
		align-items: center;
		height:80upx;
		padding: 0 28upx;
		justify-content: space-between;
		background: #fff;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		
	}
	.cx_li .iconfont{
		flex: none;
		margin-left: 10px;
		color: #DBDBDB;
	}
	.cx_li:nth-child(2n){
		background: #F7F7F7;
	}
</style>
