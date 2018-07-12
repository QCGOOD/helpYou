<template>
  <div class="wrap" ref="wrap">
    <div ref="search">
      <!-- <search-wrap>
        <el-form :inline="true">
          <el-form-item label="国家">
            <el-input size="small" v-model="searchData.name" placeholder="请输入国家"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </search-wrap> -->
      <!-- /area/listWithChild -->
      <button-wrap>
        <el-button type="primary" size="mini" @click="add">添加</el-button>
        <el-button type="primary" size="mini" :disabled="tableList.id == null" @click="update">修改</el-button>
        <el-button type="danger" size="mini" :disabled="tableList.id == null" @click="deleteConfirm">删除</el-button>
        <el-button type="primary" size="mini" :disabled="tableList.id == null" @click="jumpPage('/main/countryAndCity/city?id='+tableList.id)">查看城市</el-button>
      </button-wrap>
    </div>   
    <qc-table ref="table" :table-list="showData" :search="searchData" isStripe url="api/admin/v1/area/listByType">
 </qc-table>
  <dig-form :visible='digFormWrap' :id="updateId" :type="1" @close="digClose"></dig-form>
  </div>
</template>

<script>
import { tableMixin } from "../../../assets/js/tableMixin";
import ButtonWrap from "../../common/ButtonWrap";
import SearchWrap from "../../common/SearchWrap";
import DigForm from "./form";
import api from "api/common.js";

export default {
  mixins: [tableMixin],
  components: { SearchWrap, ButtonWrap, DigForm },
  data() {
    return {
      updateId: "",
      digFormWrap: false,
      areaList: [],
      searchData: {
        areaId: "",
        name: "",
        type: 1,
      },
      showData: [
        { prop: "", label: "序号", template: 'index' },
        { prop: "name", label: "名称" },
        // { prop: "timeZone", label: "时区" },
        { prop: "createTime", label: "创建时间" }
      ],
    };
  },
  created() {
    this.getAreaList();
  },
  methods: {
    // 获取国家包含城市
    getAreaList(){
      api.getAreaList()
      .then(res => {
        let list = []
        res.data.data.list.map((item, i) => {
          list.push({label: item.name, value: item.id, children: []})
          item.childList.map((two, j) => {
            list[i].children.push({label: two.name, value: two.id})
          })
        })
        this.areaList = list
      })
    },
    cityChange(val) {
      this.searchData.areaId = val[1]
    },
    //添加
    add() {
      this.updateId = "";
      this.digFormWrap = true;
    },
    //删除提示框
    deleteConfirm() {
      this.$confirm("是否删除该数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delete();
        })
        .catch(() => {
          return;
        });
    },
    //提示
    delete() {
      api.deleteAttachment({ id: this.tableList.id }).then(res => {
        this.searchKeep();
        this.$message({
          message: "删除成功",
          type: "success"
        });
      });
    },
    //修改
    update() {
      this.updateId = this.tableList.id;
      this.digFormWrap = true;
    },
    digClose(flag) {
      this.updateId = "";
      this.digFormWrap = false;
      if (typeof flag == "boolean" && flag) {
        this.searchKeep();
      }
    },
    jumpPage(url){
      this.$router.push(url)
    }
  },
  watch: {
    'tableList'() {
      // console.log(this.tableList)
      sessionStorage.setItem('tableList', JSON.stringify(this.tableList.childList))
    }
  }
};
</script>
