<template>
  <div class="chart">
    <el-card>
      <ul>
        <li>
          <div>{{dataTitleList.increment_users}}</div>
          <div>今日新增用户</div>
        </li>
        <li>
          <div>{{dataTitleList.total_users}}</div>
          <div>总用户量</div>
        </li>
        <li>
          <div>{{dataTitleList.increment_questions }}</div>
          <div>新增试题</div>
        </li>
        <li>
          <div>{{dataTitleList.total_questions}}</div>
          <div>总试题量</div>
        </li>
        <li>
          <div>{{dataTitleList.total_done_questions }}</div>
          <div>总刷题量</div>
        </li>
        <li>
          <div>{{dataTitleList.personal_questions}}</div>
          <div>人均刷题量</div>
        </li>
      </ul>
    </el-card>
    <el-card class="eCharts">
      <div id="main" style="width:800px;height:400px"></div>
    </el-card>
  </div>
</template>

<script>
//导入封装好的面板数据接口
import { dataTitleApi, dataStatisticsApi } from "@/api/index";
//导入echarts
import * as echarts from "echarts";

export default {
  data() {
    return {
      dataTitleList: {}, //存放面板数据
      dataStatisticsList: [], //存放企业题目数据
    };
  },
  //页面一加载获取到的钩子
  created() {
    //获取面板数据
    this.getDataTitle();
  },
  //dom加载完之后的钩子
  mounted() {
    //注意:因为是发送的异步请求,所以dom加载可能比发送请求更快,所以将echarts图表放入请求成功的then函数中
    //请求封装好的企业题目数据接口
    dataStatisticsApi({}).then((res) => {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "right",
        },
        title: {
          text: "整体数据",
          textStyle: {
            color: "#a9a9a9",
          },
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20px",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: res.data,
          },
        ],
      });
    });
  },
  methods: {
    //请求封装好的数据面板接口
    getDataTitle() {
      dataTitleApi({}).then((res) => {
        this.dataTitleList = res.data;
      });
    },
  },
};
</script>

<style lang='less'>
.chart {
  ul {
    display: flex;
    justify-content: space-around;
    list-style: none;
    li div:first-child {
      height: 100px;
      width: 100px;
      border-radius: 50%;
      text-align: center;
      line-height: 100px;
    }
    li div:last-child {
      text-align: center;
      margin-top: 10px;
    }
    li:nth-child(1),
    li:nth-child(2) {
      div:first-child {
        border: 2px solid #66b7fb;
        color: #66b7fb;
      }
    }
    li:nth-child(3),
    li:nth-child(4) {
      div:first-child {
        border: 2px solid #f88566;
        color: #f88566;
      }
    }
    li:nth-child(5),
    li:nth-child(6) {
      div:first-child {
        border: 2px solid #74d590;
        color: #74d590;
      }
    }
  }
  .eCharts {
    margin-top: 20px;
  }
}
</style>