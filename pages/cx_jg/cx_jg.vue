<template>
	<view class="wrap">
		<view class="cx_time">请选择查询时间</view>
		<view class="cx_list">
			<picker class="cx_time_pc" mode="date" fields	="month" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" data-type="1">
				<view class="cx_time_pc">
					<view>查询时间</view>
					<view>{{date}}</view>
				</view>
			</picker>
			<!-- <picker class="cx_time_pc" mode="date" :value="date1" :start="startDate" :end="endDate" @change="bindDateChange" data-type="2">
				<view class="cx_time_pc">
					<view>结束时间</view>
					<view>{{date1}}</view>
				</view>
			</picker> -->
		</view>
		<view class="sub_btn" @tap="sub">查询</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				date: this.getDate(),
				date1: this.getDate(),
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {

			bindDateChange: function(e) {
				console.log(e.currentTarget.dataset.type)
				var type=e.currentTarget.dataset.type
				if(type==1){
					this.date = e.target.value
				}else{
					this.date1 = e.target.value
				}
				
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 3;
				} else if (type === 'end') {
					year = year;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				// return `${year}-${month}-${day}`;
				return `${year}-${month}`;
			},
			sub(){
				uni.navigateTo({
					url:'../cx_list/cx_list'
				})
			}
		}
	}
</script>

<style>
	.wrap {
		width: 100%;
		background-color: #F5F5F5;
		background-image: url(../../static/img/images/cxbg_02.png);
		background-size: 100% 170rpx;
		background-repeat: no-repeat;
	}
.cx_list{
		width: 694upx;
		background:rgba(255,255,255,1);
		box-shadow:0px 3px 18upx 0px rgba(189,189,189,0.18);
		border-radius:10upx;
		overflow: hidden;
		margin: 0 auto;
	}
	.cx_time {
		width: 100%;
		text-align: center;
		font-size: 16px;
		color: #fff;
		line-height: 55px;
	}
	.cx_time_pc{
		width: 694upx;
		display: flex;
		align-items: center;
		padding: 0 10px;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		justify-content: space-between;
		height: 40px;
		font-size: 16px;
	}
	picker.cx_time_pc{
		padding: 0;
		border-bottom: 1px solid #eee;
	}
	.sub_btn{
		width:694upx;
		height:40px;
		background:rgba(41,119,223,1);
		border-radius:5px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		color: #fff;
		margin: 50px auto;
	}
</style>
