<template>
	<view class="wrap">
		<view class="xq_li">
			<view>单位名称</view>
			<view>200029环保监测站</view>
		</view>
		<view class="xq_li">
			<view>姓名</view>
			<view>{{datas.name}}</view>
		</view>
		<view class="xq_li">
			<view>身份证号</view>
			<view>362430197711264818</view>
		</view>
		<view class="xq_li">
			<view>岗位工资</view>
			<view>1810.00</view>
		</view>
		<view class="xq_li">
			<view>薪级工资</view>
			<view>1126.00</view>
		</view>
		<view class="xq_li">
			<view>基础性绩效工资</view>
			<view>4788.00</view>
		</view>
		<view class="xq_li">
			<view>奖励性绩效工资</view>
			<view>4788.00</view>
		</view>
		<view class="xq_li">
			<view>临时性补贴</view>
			<view>136.00</view>
		</view>
		<view class="xq_li">
			<view>综合补助</view>
			<view>1000.00</view>
		</view>
		<view class="xq_li">
			<view>独生子女费</view>
			<view>{{datas.onlyChildFee}}</view>
		</view>
		<view class="xq_li">
			<view>补发工资</view>
			<view>818.00</view>
		</view>
		<view class="xq_li">
			<view>其他</view>
			<view>0.00</view>
		</view>
		<view class="xq_li">
			<view>应发合计</view>
			<view>12474.00</view>
		</view>
		<view class="xq_li">
			<view>代扣住房公积金小计</view>
			<view>1573.00</view>
		</view>
		<view class="xq_li">
			<view>代扣失业金小计</view>
			<view>262.00</view>
		</view>
		<view class="xq_li">
			<view>代扣基本医疗保险小计</view>
			<view>265.16</view>
		</view>
		<view class="xq_li">
			<view>当月代扣养老保险</view>
			<view>605.60</view>
		</view>
		<view class="xq_li">
			<view>当月代扣个人年金</view>
			<view>302.80</view>
		</view>
		<view class="xq_li">
			<view>财政统发金额</view>
			<view>9701.22</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				datas:''
			}
		},
		onLoad() {
			this.getdata()
		},
		methods: {
			getdata(){
				var that =this
				var data={}
				var jkurl='/salary/selectSaraylDetailOne?id='+1+'&type='+2
				service.get(jkurl, data,
					function(res) {
						that.btnkg = 0
						if (res.data.code == 0) {
							var datas=res.data.data
							console.log(typeof datas)
							if(typeof datas=='string'){
								datas=JSON.parse(datas)
							}
							console.log(datas)
							that.datas=datas
									
						
						} else {
							if (res.data.data.msg) {
							  uni.showToast({
							    icon: 'none',
							    title: res.data.data.msg
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
						if (err.data.data.msg) {
							uni.showToast({
								icon: 'none',
								title: err.data.data.msg
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
		width: 100%;
		min-height: 100vh;
		background: #fff;
	}
	.xq_li{
		width: 100%;
		padding: 0 28upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 40px;
		border-bottom: 1px solid #eee;
		color: #333;
	}
	.xq_li view+view{
		color: #656565;
	}
</style>
