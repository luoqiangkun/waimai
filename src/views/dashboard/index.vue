<template>
  <div class="dashboard">
    <el-row :gutter="20">
	  <el-col :span="6">
	  	<el-card shadow="hover" class="box-card box-card-blue">
		    <div class="title"><i class="circular-ring"></i> 今日销售额(元)</div>
	        <div class="count">
	          <div class="num">
	          	{{seller.amount}}
	          	</div>
	          <div class="per"> <i :class="seller.amount_per > 0 ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i> {{seller.amount_per}}%</div>
	        </div>
	    </el-card>
	  	
	  </el-col>
	  <el-col :span="6">
	  	<el-card shadow="hover" class="box-card box-card-purple">
		    <div class="title"><i class="circular-ring"></i> 今日订单数(笔)</div>
	        <div class="count">
	          <div class="num">
	          	{{seller.num}}
	          	</div>
	          <div class="per"> <i :class="seller.num_per > 0 ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i> {{seller.num_per}}%</div>
	        </div>
	    </el-card>
	  </el-col>
	  <el-col :span="6">
	  	<el-card shadow="hover" class="box-card box-card-cyan">
		    <div class="title"><i class="circular-ring"></i> 今日顾客(个)</div>
	        <div class="count">
	          <div class="num">	
	          	{{seller.customer}}
	          	</div>
	          <div class="per"> <i :class="seller.customer_per > 0 ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i> {{seller.customer_per}}%</div>
	        </div>
	    </el-card>
	  </el-col>
	  <el-col :span="6">
	  	<el-card shadow="hover" class="box-card box-card-orange">
		    <div class="title"><i class="circular-ring"></i> 人均消费数(元)</div>
	        <div class="count">
	          <div class="num">	          	
	          	{{seller.average}}
	          	</div>
	          <div class="per"> <i :class="seller.average_per > 0 ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i> {{seller.average_per}}%</div>
	        </div>
	    </el-card>
	  </el-col>
	</el-row>

	<el-row :gutter="20">
		<el-col :span="8">
			<el-card class="chart-card">
				<div class="header">
					<h4>订单交易额统计</h4>					
				</div>
				<div class="content" >
					<div id="chart1" style="width:100%;height:250px"></div>
				</div> 
				
			</el-card>
		</el-col>
		<el-col :span="8">
			<el-card class="chart-card">
				<div class="header">
					<h4>订单交易数统计</h4>					
				</div>
				<div class="content" >
					<div id="chart2" style="width:100%;height:250px"></div>
				</div> 
				
			</el-card>
		</el-col>
		<el-col :span="8">
			<el-card class="chart-card">
				<div class="header">
					<h4>顾客统计</h4>
					
				</div>
				<div class="content" >
					<div id="chart3" style="width:100%;height:250px"></div>
				</div> 
				
			</el-card>
		</el-col>
	</el-row>
	<el-row :gutter="20">

		<el-col :span="6">
			<el-card class="chart-card">
				<div class="header">
					<h4>商品销售额统计</h4>
				</div>
				<div class="content">
					<div id="chart4" style="width:100%;height:410px"></div>
				</div>
			</el-card>
		</el-col>

		<el-col :span="18">
			<el-card class="chart-card">
				<div class="header">
					<h4>热门商品统计</h4>
					<div class="el-button-group">
						<el-button size="mini" :class="{'el-button-active' : dateActive === 1 }" @click="handleButtonClick(1)">近7天</el-button>
						<el-button size="mini" :class="{'el-button-active' : dateActive === 2 }" @click="handleButtonClick(2)">近30天</el-button>
						<el-button size="mini" :class="{'el-button-active' : dateActive === 3 }" @click="handleButtonClick(3)">近6个月</el-button>
					</div>
				</div>
				<div class="content" >
					<el-table
					    :data="tableData"
					    style="width: 100%"
					    height="403">
					    <el-table-column
					      prop="item_image"
					      label="商品图片"
					      width="120"
					    >
					    	<template slot-scope="scope">
					    		<el-avatar :src="scope.row.item_image"></el-avatar>
					            
					        </template>
					    </el-table-column>
					    <el-table-column
					      
					      prop="item_name"
					      label="商品名称"
					    >
					    </el-table-column>
					    <el-table-column
					      prop="item_price"
					      label="商品价格"
					      align="center"
					      width="150">
					    </el-table-column>
					    <el-table-column
					      prop="num"
					      label="销售量"
					      align="center"
					      width="150">
					    </el-table-column>
					  </el-table>
				</div> 
				
			</el-card>
		</el-col>

		
	</el-row>
  </div>
</template>

<script>
import { analyticsSeller,analyticsGoods } from '@/api/base'
export default {
  name: 'Dashboard',
  data(){
  	return {
  		seller:{},
  		chert:{},
  		tableData: [],
      	date_type: 'day',
      	dateActive:1
  	}
  },
  methods: {
  	getSellerData(){
      analyticsSeller({year:this.value3}).then( res => {
        this.seller = res.data;
        
        this.drawLine();
      })
    },
    getGoodsData(){
      analyticsGoods({date_type:this.date_type}).then( res => {
        this.tableData = res.data;
        this.drawChart();
      })
    },
    handleButtonClick( active ){
    	this.dateActive = active
    	if( active == 1 ){
    		this.date_type = 'day';
    	} else if( active == 2 ){
    		this.date_type = 'month';
    	} else if( active == 3 ){
    		this.date_type = 'year';
    	}
    	this.getGoodsData();
    },
    drawLine() {
    	let t = this;
    	let xAxis_data = [];
    	let series_data1 = [];
    	let series_data2 = [];
    	let series_data3 = [];
    	
    	for( let i in this.seller.series ){
    		xAxis_data.push( this.seller.series[i].date );
    		series_data1.push( this.seller.series[i].amount );
    		series_data2.push( this.seller.series[i].num );
    		series_data3.push( this.seller.series[i].customer );
    	}

    	let legend_data = [];
	    let series_data = [];
	    let color = ['#3EC7FE','#FF6A7D','#FFCF72','#C572FE'];
	      
	    for( let i in this.seller.goods ){
	        legend_data.push( this.seller.goods[i].item_name );
	        series_data.push({
	          value: this.seller.goods[i].amount,
	          name: this.seller.goods[i].item_name,
	          itemStyle: {
	            color: color[i]
	          }
	        });
	    }

      // 基于准备好的dom，初始化echarts实例
      	let chart1 = this.$echarts.init(document.getElementById("chart1"));
      	let chart2 = this.$echarts.init(document.getElementById("chart2"));
      	let chart3 = this.$echarts.init(document.getElementById("chart3"));
      	let chart4 = this.$echarts.init(document.getElementById("chart4"));

  		chart1.setOption({
			tooltip: {
				trigger: 'axis'
			},
	        xAxis: {
	          	type: "category",
	          	boundaryGap: false,
	          	data: xAxis_data,
	          	splitLine: {
		            show: true,
					lineStyle: {
				        // 使用深浅的间隔色
				        color: ['#d5e5f5']
				    }
		        }
	        },
	        yAxis: {
	          	type: "value",
	          	splitLine: {
		            show: false
		        }
	        },
	        series: [{
	            data: series_data1,
	            type: "line",
	            symbol: 'circle', // 拐点类型
	            smooth: true, // 当为true时，就是光滑的曲线（默认为true）；当为false，就是折线不是曲线的了，那这个设为true，下面的（吃饭）数据中设置smooth为false，这个就不是光滑的曲线了。
	            symbolSize: 6, // 拐点圆的大小
	            sampling: 'average',
	            itemStyle: {
	                normal: {
	                    color: '#2e8ff2'
	                }
	            },
	            areaStyle: {
	                normal:{
			           //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
			            color: new t.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{ 

			                offset: 0,
			                color: '#8bbbec'
			            },{
			                offset: 1,
			                color: '#ffffff'
			            }])
			        }
	            },
          	}]
      	});


      	chart2.setOption({
			tooltip: {
				trigger: 'axis'
			},
	        xAxis: {
	          	type: "category",
	          	boundaryGap: false,
	          	data: xAxis_data,
	          	splitLine: {
		            show: true,
					lineStyle: {
				        // 使用深浅的间隔色
				        color: ['#d4d5ef']
				    }
		        }
	        },
	        yAxis: {
	          	type: "value",
	          	splitLine: {
		            show: false
		        }
	        },
	        series: [{
	            data: series_data2,
	            type: "line",
	            symbol: 'circle', // 拐点类型
	            smooth: true, // 当为true时，就是光滑的曲线（默认为true）；当为false，就是折线不是曲线的了，那这个设为true，下面的（吃饭）数据中设置smooth为false，这个就不是光滑的曲线了。
	            symbolSize: 6, // 拐点圆的大小
	            sampling: 'average',
	            itemStyle: {
	                normal: {
	                    color: '#7176ff'
	                }
	            },
	            areaStyle: {
	                normal:{
			           //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
			            color: new t.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{ 

			                offset: 0,
			                color: '#b3b5f3'
			            },{
			                offset: 1,
			                color: '#ffffff'
			            }])
			        }
	            },
          	}]
      	});

      	chart3.setOption({
			tooltip: {
				trigger: 'axis'
			},
	        xAxis: {
	          	type: "category",
	          	boundaryGap: false,
	          	data: xAxis_data,
	          	splitLine: {
		            show: true,
					lineStyle: {
				        // 使用深浅的间隔色
				        color: ['#d3f5f7']
				    }
		        }
	        },
	        yAxis: {
	          	type: "value",
	          	splitLine: {
		            show: false
		        }
	        },
	        series: [{
	            data: series_data3,
	            type: "line",
	            symbol: 'circle', // 拐点类型
	            smooth: true, // 当为true时，就是光滑的曲线（默认为true）；当为false，就是折线不是曲线的了，那这个设为true，下面的（吃饭）数据中设置smooth为false，这个就不是光滑的曲线了。
	            symbolSize: 6, // 拐点圆的大小
	            sampling: 'average',
	            itemStyle: {
	                normal: {
	                    color: '#41d6de'
	                }
	            },
	            areaStyle: {
	                normal:{
			           //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
			            color: new t.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{ 

			                offset: 0,
			                color: '#96f0f5'
			            },{
			                offset: 1,
			                color: '#ffffff'
			            }])
			        }
	            },
          	}]
      	});

      	chart4.setOption({
	        tooltip: {
	          trigger: "item",
	          formatter: "{a} <br/>{b}: {c} ({d}%)"
	        },
	        legend: {
	          orient: "vertical",
	          icon: "circle",
	          
	           x: 'center', // 'center' | 'left' | {number},
       		   y: 'bottom', // 'center' | 'bottom' | {number}

	          data: legend_data,
	          textStyle: {
	            fontSize: 12,
	            lineHeight:20
	          },
	          formatter: function(val) {

	            var strs = String(val).split(''); //字符串数组
	            var str = ''
	            for(var i = 0, s; s = strs[i++];) { //遍历字符串数组
	            str += s;
	            if(!(i % 20)) str += '\n'; //按需要求余
	            }
	            return str
	          }
	        },
	        series: [
	          {
	            name: "访问来源",
	            type: "pie",
	            center: ['50%','30%'],
	            radius: ["40%", "60%"],
	            avoidLabelOverlap: false,
	            label: {
	              normal: {
	                show: false,
	                position: "center"
	              },
	              emphasis: {
	                show: true,
	                textStyle: {
	                  fontSize: "30",
	                  fontWeight: "bold"
	                }
	              }
	            },
	            labelLine: {
	              normal: {
	                show: false
	              }
	            },
	            data: series_data
	          }
	        ]
	    });
    },
    drawChart(){
    	let t = this;
    	let chart4 = this.$echarts.init(document.getElementById("chart4"));
	   
    }
  },
  mounted() {
    this.getSellerData();
    this.getGoodsData();
  },
}
</script>

<style scoped>
.box-card {
	display:block;
}
.box-card .title {
	font-size:14px;
	color:#999;
	display:flex;
}
.box-card .count {
	display:flex;
	justify-content: space-between;
	align-items: center;
	padding:10px 15px 15px 20px;
}
.box-card .count .num {
	font-size:28px;
}
.box-card .count .per {
	font-size:14px;
	color:#999;
}
.box-card .count .per i {
	font-size:16px;
}

.box-card-blue {
	border-bottom:5px solid #2e8ff2;
}
.box-card-purple {
	border-bottom:5px solid  #7176ff;
}
.box-card-cyan {
	border-bottom:5px solid #41d6de;
}
.box-card-orange {
	border-bottom:5px solid  #ffad61;
}

.circular-ring {
	width: 15px;
    height: 15px;
    display: inline-block;
    margin-right:10px;
}
.box-card-blue .circular-ring {
    background:url('../../assets/images/blue.png');
    background-size: 100%;
    background-position: 50%;
    background-repeat: no-repeat;
	
}
.box-card-purple .circular-ring{
    background:url('../../assets/images/purple.png');
    background-size: 100%;
    background-position: 50%;
    background-repeat: no-repeat;
	
}
.box-card-cyan .circular-ring{
    background:url('../../assets/images/cyan.png');
    background-size: 100%;
    background-position: 50%;
    background-repeat: no-repeat;
	
}
.box-card-orange .circular-ring{
    background:url('../../assets/images/orange.png');;
    background-size: 100%;
    background-position: 50%;
    background-repeat: no-repeat;
}
.el-icon-caret-top {
	color:#67c23a;
}
.el-icon-caret-bottom {
	color:#f56c6c;
}
.chart-card {
	margin-top:10px;
}
.chart-card .header{
	display: flex;
    justify-content: space-between;
}
.chart-card .h4 {

}

.chart-card .el-button-group .el-button {
	color:#409eff;
	border-color:#409eff;
}
.chart-card .el-button-group .el-button-active {
	background:#409eff;
	color:#ffffff;
}
</style>