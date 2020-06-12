<template>
	<view class="wrap">
		<view class="xq_li">
			<view>单位名称</view>
			<view>200029环保监测站</view>
		</view>
		<view class="xq_li">
			<view>姓名</view>
			<view>张小琴</view>
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
			<view>200029环保监测站</view>
		</view>
		<view class="xq_li">
			<view>单位名称</view>
			<view>200029环保监测站</view>
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
			<view>1000.00</view>
		</view>
		<view class="xq_li">
			<view>综合补助</view>
			<view>0.00</view>
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
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
