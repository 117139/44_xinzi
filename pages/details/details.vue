<template>
	<view class="wrap">
		<view class="xq_li">
			<view>单位名称</view>
			<view>{{datas.unitName?datas.unitName:'无'}}</view>
		</view>
		<view class="xq_li">
			<view>姓名</view>
			<view>{{datas.name?datas.name:'无'}}</view>
		</view>
		<view class="xq_li">
			<view>身份证号</view>
			<view>{{datas.idNo?datas.idNo:'无'}}</view>
		</view>
		<view class="xq_li">
			<view>岗位工资</view>
			<view>{{datas.positionSalary?datas.positionSalary:'无'}}</view>
		</view>
		<view class="xq_li">
			<view>薪级工资</view>
			<view>{{datas.paySalary?datas.paySalary:'无'}}</view>
		</view>
		<view class="xq_li">
			<view>基础性绩效工资</view>
			<view>{{datas.baseSalary?datas.baseSalary:'无'}}</view>
		</view>
		<view class="xq_li">
			<view>奖励性绩效工资</view>
			<view>{{datas.encourageSalary?datas.encourageSalary:'无'}}</view>
		</view>
		<view class="xq_li">
			<view>临时性补贴</view>
			<view>{{datas.tempSubsidy?datas.tempSubsidy:'无'}}</view>
		</view>
		<view class="xq_li">
			<view>综合补助</view>
			<view>{{datas.multiplySubsidy?datas.multiplySubsidy:'无'}}</view>
		</view>
		<view class="xq_li">
			<view>独生子女费</view>
			<view>{{datas.onlyChildFee?datas.onlyChildFee:'无'}}</view>
		</view>
		<view class="xq_li">
			<view>补发工资</view>
			<view>{{datas.supplyAgain?datas.supplyAgain:'无'}}</view>
		</view>
		<view class="xq_li">
			<view>其他</view>
			<view>{{datas.otherFee?datas.otherFee:'无'}}</view>
		</view>
		<view class="xq_li">
			<view>应发合计</view>
			<view>{{datas.shouldSum?datas.shouldSum:'无'}}</view>
		</view>
		<view class="xq_li">
			<view>代扣住房公积金小计</view>
			<view>{{datas.housingFee?datas.housingFee:'无'}}</view>
		</view>
		<view class="xq_li">
			<view>代扣失业金小计</view>
			<view>{{datas.loseWorkFee?datas.loseWorkFee:'无'}}</view>
		</view>
		<view class="xq_li">
			<view>代扣基本医疗保险小计</view>
			<view>{{datas.safeFee?datas.safeFee:'无'}}</view>
		</view>
		<view class="xq_li">
			<view>当月代扣养老保险</view>
			<view>{{datas.oldFee?datas.oldFee:'无'}}</view>
		</view>
		<view class="xq_li">
			<view>当月代扣个人年金</view>
			<view>{{datas.selfFee?datas.selfFee:'无'}}</view>
		</view>
		<view class="xq_li">
			<view>财政统发金额</view>
			<view>{{datas.financeFee?datas.financeFee:'无'}}</view>
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
		data() {
			return {
				month:'',
				datas:''
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
			}else{
				if(option.month){
					this.month=option.month
					this.getdata(option.month)
				}else{
					uni.redirectTo({
						url:'../main/main'
					})
				}
			}
			
			
		},
		computed: mapState(['forcedLogin', 'hasLogin','userCard', 'userName','qyType']),
		methods: {
			getdata(month){
				var that =this
				var data={}
				//selectSaraylDetailByUserCard
				var jkurl='/salary/selectSaraylDetailByUserCard?userCard='+that.userCard+'&month='+that.month+'&type='+that.qyType
				uni.showLoading({
					title:'正在获取数据'
				})
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
