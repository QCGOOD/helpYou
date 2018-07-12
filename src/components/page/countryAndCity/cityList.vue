<template>
  <div class="wrap" ref="wrap">
    <div ref="search" class="search">
      <button-wrap>
        <el-button type="primary" size="mini" @click="add">添加</el-button>
        <el-button type="primary" size="mini" :disabled="tableList.id == null" @click="update">修改</el-button>
        <el-button type="danger" size="mini" :disabled="tableList.id == null" @click="deleteConfirm()">删除</el-button>
        <el-button type="primary" size="mini" class="back" @click="back()">返回</el-button>
      </button-wrap>
    </div> 
    <qc-table ref="table" :table-list="showData" :search="searchData" isStripe :url="`api/admin/v1/area/listByParentId?parentId=`+$route.query.id"></qc-table>
    <dig-form :visible='digFormWrap' :id="updateId" :type="3" :parentId="$route.query.id" :detail="model" @close="digClose"></dig-form>
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
      searchData: {},
      showData: [
        { template: 'index' },
        { prop: "name", label: "名称" },
        { prop: "timeZone", label: "时区" },
        { prop: "createTime", label: "创建时间" }
      ],
      model: {},
      tableData: [],
    };
  },
  created() {
  },
  methods: {
    rowClick(row) {
      this.tableRow = row;
      this.model = JSON.parse(JSON.stringify(row));
    },
    back() {
      this.$router.go(-1);
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
      api.deleteArea({ id: this.tableList.id }).then(res => {
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
    }
  }
};
</script>
<style lang="less" scoped>
.search{
  position: relative;
  .back {
    position: absolute;
    right: 15px;
    top: 11px;
  }
}

</style>