<template>
  <div class="wrap" ref="wrap">
    <div ref="search">
      <!-- <search-wrap>
        <el-form :inline="true">
          <el-form-item label="名称">
            <el-input size="small" v-model="searchData.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </search-wrap> -->
      <!-- /area/listWithChild -->
      <button-wrap class="button-wrap">
        <!-- <el-button type="primary" size="mini" @click="add">添加</el-button>
        <el-button type="primary" size="mini" :disabled="tableList.id == null" @click="update">修改</el-button>
        <el-button type="danger" size="mini" :disabled="tableList.id == null" @click="deleteConfirm">删除</el-button> -->
        <el-button type="info" size="mini"  @click="apiExport">导出</el-button>
        <up-load-file url="api/admin/v1/sensitiveWord/import" size="mini"></up-load-file>
        <el-button class="refresh" type="primary" size="mini"  @click="search()">刷新</el-button>
      </button-wrap>
    </div>   
    <qc-table ref="table" :table-list="showData" :search="searchData" :isStripe="true" url="api/admin/v1/sensitiveWord/page"></qc-table>
  <dig-form :visible='digFormWrap' :id="updateId" @close="digClose"></dig-form>
  </div>
</template>

<script>
import { tableMixin } from "../../../assets/js/tableMixin";
import ButtonWrap from "../../common/ButtonWrap";
import SearchWrap from "../../common/SearchWrap";
import UpLoadFile from "../../common/UpLoadFile";
import DigForm from "./form";
import api from "api/common.js";

export default {
  mixins: [tableMixin],
  components: { SearchWrap, ButtonWrap, DigForm, UpLoadFile },
  data() {
    return {
      updateId: "",
      digFormWrap: false,
      searchData: {
        name: "",
      },
      showData: [
        { template: 'index' },
        { prop: "word", label: "内容" },
      ],
    };
  },
  created() {
  },
  methods: {
    search(){
      this.searchKeep();
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
    // 导出
    apiExport() {
      location.href = `${this.localhost}/api/admin/v1/sensitiveWord/export`
    },
  }
};
</script>
<style lang="less" scoped>
.button-wrap{
  position: relative;
  .refresh{
    position: absolute;
    top: 10px;
    right: 15px;
  }
}
</style>
