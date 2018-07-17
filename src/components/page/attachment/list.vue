<template>
  <div class="wrap" ref="wrap">
    <div ref="search">
      <search-wrap>
        <el-form :inline="true">
          <el-form-item label="名称">
            <el-input size="small" v-model="searchData.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="城市">
            <el-cascader size="small" :options="areaList" :show-all-levels="false" @change="cityChange"></el-cascader>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="searchData.type" size="small">
              <el-option label="首页" :value="1"></el-option>
              <el-option label="资讯" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="searchData.type == 2" label="栏目">
            <el-select v-model="searchData.categoryId" size="small">
              <el-option :label="item.name" :value="item.id" v-for="(item, index) in categoryList" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </search-wrap>
      <!-- /area/listWithChild -->
      <button-wrap>
        <el-button type="primary" size="mini" @click="add">添加</el-button>
        <el-button type="primary" size="mini" :disabled="tableList.id == null" @click="update">修改</el-button>
        <el-button type="danger" size="mini" :disabled="tableList.id == null" @click="deleteConfirm">删除</el-button>
      </button-wrap>
    </div>   
    <qc-table ref="table" :table-list="showData" :search="searchData" url="api/admin/v1/appAttachment/page">
 </qc-table>
  <dig-form :visible='digFormWrap' :id="updateId" :cityList="areaList" :categoryList="categoryList"  :categoryParent="categoryParent" @close="digClose"></dig-form>
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
      searchData: {
        abc: [],
        areaId: "",
        name: "",
        type: 1,
        categoryId: "",
      },
      showData: [
        { prop: "seqNum", label: "排序", template: 'seqNum' },
        { prop: "url", label: "图片", template: "img", isPrefix: true },
        { prop: "name", label: "名称" },
        { prop: "countryName", label: "国家" },
        { prop: "cityName", label: "位置" },
        { prop: "href", label: "链接" },
        { prop: "note", label: "备注" },
        { prop: "createTime", label: "创建时间" }
      ],
      categoryType: true,
      categoryParent: {},
      areaList: [],
      categoryList: [],
    };
  },
  created() {
    this.getAreaList();
    this.apiGetList();
  },
  watch: {
    'searchData.type'() {
      if(this.searchData.type == 1) this.searchData.categoryId = "";
    }
  },
  methods: {
    // 分类列表
    apiGetList() {
      api.listCategory()
      .then(res => {
        this.categoryList = res.data.data
      })
    },
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
    }
  }
};
</script>
