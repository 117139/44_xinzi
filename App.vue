<script>
import {
		mapState,
		mapMutations
	} from 'vuex'
var guanbi
	export default {
		computed: mapState(['forcedLogin', 'hasLogin',]),
		onLaunch: function() {
			clearTimeout(guanbi) 
			var that=this
			console.log('App Launch');
			if(sessionStorage.getItem("login")=='true'){
				console.log(1)
				var usermsg=sessionStorage.getItem("usermsg")
				var usermsg1=sessionStorage.getItem("usermsg1")
				that.login(JSON.parse(usermsg));
				that.login_com(JSON.parse(usermsg1));
			}else{
				uni.reLaunch({
					url:'./pages/login/login'
				})
			}
		},
		onShow: function() {
			console.log('App Show');
			
		},
		onHide: function() {
			var that=this
			guanbi=setTimeout(function (){
				sessionStorage.setItem("login", false);
				that.logout()
			},100)
			
			console.log('App Hide');
		},
		onUnload() {
			
			console.log('App Unload');
		},
		methods:{
			...mapMutations(['login','logout','login_com']),
		}
	}
</script>

<style>
	/* 头条小程序需要把 iconfont 样式放到组件外 */
	@import "components/m-icon/m-icon.css";

	/*每个页面公共css */
	page {
		min-height: 100%;
		display: flex;
		font-size: 16px;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		/* min-height: 100%; */
		display: flex;
		flex: 1;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #fff;
		/* padding: 10px; */
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 20px;
		position: relative;
	}

	/* .input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	} */

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
		font-size: 18px;
		line-height: 40px;
		border: 1px solid #eee;
		margin-bottom: 30upx;
	}

	.input-row .title {
		width: 40px;
		padding-left: 0;
		text-align: center;
		color: #999;
	}

	/* .input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 8px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	} */

	.btn-row {
		margin-top: 25px;
		padding: 10px;
	}

	button.primary {
		background-color: #194989;
		height:40px;
		line-height: 40px;
		border-radius:40px;
		font-size: 16px;
	}
	
	
	
	
	@font-face {
	    font-family:"iconfont";
	    src: url('//at.alicdn.com/t/font_1869598_onjfw0zsqkq.eot?t=1591605653687');
	    /* IE9 */
	    src: url('//at.alicdn.com/t/font_1869598_onjfw0zsqkq.eot?t=1591605653687#iefix') format('embedded-opentype'),
	    /* IE6-IE8 */
	    url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAVUAAsAAAAAClwAAAUIAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDQAqHTIYgATYCJAMYCw4ABCAFhG0HZBvaCCOSDk6O7B8JmZs3msWyO46HxQdThEPl1dYWRTZ22V22KppofBMP/6593pdkYIkVktqzHkhBAS2TsKiqTdW39WzEDP/d6g2SVtCdW6paATPHsHAtoANdnT+pP11N2z+96VW4dPeD++ZpNuWyV9Ius7f5Zg1CIhRCYnEcHEv9tG+gPKB3yQ58en5KoAeqXjQWDYfTDWTuU5HNBW6yYiIPE+g3Z0ecLM5vahV8WyBemif3tC6dEkMOrbIOOVuOxl0I2vQt/TDyXf/9+C+OlqTK+KOuPj596OCXv17GOkxSxuHlWXC7RMYOCvEx1PZaNmM7sv5PpDji+xetJP2KN8u/Vn/1uo5fmKhHtn6DVE0lJPnzz4salw0Cex6v+EXm2fKAlC5fhkaCfBUaGfIeBOtHVZe4ZobYID7huB03DY2s0tT3MtlsFKVT2BTUGFKhMJttQaHj8xpjs7N4ubVUhYL/5EksVakUyOX1zGPnDJDx856so2f14ZEzNX0yNbh/UJ0lHYYQfEijhAb6H8hf6+6xRwbjjz2PPtQfecAXr2CLktP4uWLm3Dkd0vB5S9bsWW2i7EyGZBlfEi9gi4VMlJUuntPgKxQQMnyeplTGSOdpEuuHcp7krDZcc0WsWp8JVaopaIAcacubwnI5j5cg1uAP4MsSdZ5AKlnE1GL7GtlXnhihk3I/znWlKWFKkYydMWNXiSQgOHFwd/mwYWY3tml9Q431L0qWoW55eDiEOQ5r4pBCkTH+WPIQeyB+xKf3tU1LY7RyUCxdbJPVGdJylemogIBh0bBQnfvrgT/CFRKUV/JgYqMcErjCRR3dBTDY2IT+tOth34P/wPfY+pzDxRvfB//Qv2/0MNLQH0amX4Srp+s1D+UVbk4/eMVgvHz48I6+/l37Ge1v0f+I5QxA16prTsbIPAwrZhSM4qbTwuTokZfxHxb5vRq1ykfCGK/EmbQiCkc7Gcy+SHODaNrGJ6a3pADtMVIJSEuci3aXi6KuLMFG7PsH/OzDJOBqUQE4PvPdwd1+wq8AFIGIUJG/0wOhkxtd2Noq1OJoygoK3n2QaXK0hH87mbNei/b0wEANaAPTTQkRLw0kX9fjTrRvuNICaa4b7RNcvVPb5l6jkG9ioi/EhdRFkK/5l7mi3flgF6OxEmagOoGrsIFI0ALQhwgDcBjnk57mxFD1lPjABWM9Y8aBj9dhMpvhQGVTSiZR8gX0we1AEwDo1rIhEgVAN5sHkZynD8s7kQHx5FkER+J5+YhYnKXrVLupDamsrb9PaNtl6GfR6dc1XWs6Gw6canKp+edkC0EEUP7fhVxfl3enzEvJGqh9AKRIQj/1cS66xr0uSzGVupDQmrIhacxC1lpBFuwOVAbsQa21D/22BVweMKECIKJQAFv2MwjhN75gz5Vv2HfjB3mA/YVDT/7hyE3sw5nPuL/huecwZ1PCnLGEYgtG2E5KRj4zil9RDU1OTqFO/URyJgiRH3qTS+yQyjjgVipmliDJtrBgj8OmsdCTrVCwr5n7SRDIsA/yhW1HZ6YIyjFUAoUtYAhWR6qD2Znv518hZdDIUUzXD+snRBwzO4j4whTIpaxL1bUti50VJcaYFDdJxGqBBSyooZgF+vBVFSQwn84R6U0EQi+ZVubXr2iX8hT0429fR4ocJaqoo3H4GjecHLWmzcPoyGk7VOZkm3c7jZ16FIQlTpk3b1w6SdmesP12NAI=') format('woff2'), url('//at.alicdn.com/t/font_1869598_onjfw0zsqkq.woff?t=1591605653687') format('woff'), url('//at.alicdn.com/t/font_1869598_onjfw0zsqkq.ttf?t=1591605653687') format('truetype'),
	    /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
	    url('//at.alicdn.com/t/font_1869598_onjfw0zsqkq.svg?t=1591605653687#iconfont') format('svg');
	    /* iOS 4.1- */
	}
	.iconfont {
	    font-family:"iconfont" !important;
	    font-size: 16px;
	    font-style: normal;
	    -webkit-font-smoothing: antialiased;
	    -moz-osx-font-smoothing: grayscale;
	}
	.iconnext3:before {
	    content:"\e601";
	}
	.iconmima01:before {
	    content:"\e623";
	}
	.iconshouji:before {
	    content:"\e625";
	}
	.iconyanzheng:before {
	    content:"\e6d2";
	}
	.iconcredentials_icon-copy:before {
	    content:"\e600";
	}
</style>
