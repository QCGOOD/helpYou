<template>
<el-dialog :title='id ? "修改" : "添加"' :visible.sync="visible" width="500px" :append-to-body="true" :before-close="close" :close-on-click-modal="false" :close-on-press-escape="false">
  <div style="overflow: auto;" v-loading="dataLoading">
    <el-form :model="model" ref="model" class="new-form" style="width: 300px;" label-position="top">
        <el-form-item label="名称" prop="name" :rules="[{ required: true, message: '该字段不能为空'}]">
          <el-input size="small" v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item v-if="type === 3" label="时区" prop="timeZone" :rules="[{ required: true, message: '该字段不能为空'}]">
          <el-input size="small" v-model="model.timeZone"></el-input>
        </el-form-item>
    </el-form>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="close(false)">取 消</el-button>
    <el-button size="small" type="primary" @click="success()" :loading="loading">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
import api from "api/common.js";

export default {
  props: {
    visible: Boolean,
    cityList: Array,
    detail: Object,
    type: Number,
    id: {
      type: String,
      default: ""
    },
    parentId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      model: {
        type: 1,
        name: '',
        parentId: '',
        timeZone: 'None'
      },
      options: [],
      loading: false,
      dataLoading: false
    };
  },
  watch: {
    visible(val) {
      if (val) {
        if(this.id != ""){
          this.dataLoading = true;
          this.getDetail();
        }
        this.model.type = this.type;
        this.model.parentId = this.parentId;
      }
    }
  },
  methods: {
    //更新信息
    getDetail() {
      api.getAreaDetail({ id: this.id }).then(res => {
        this.model = res.data.data;
        this.dataLoading = false;
      });
    },
    //添加
    save() {
      api.addAreaList(this.model).then(res => {
        this.loading = false;
        this.$message({
          message: "添加成功",
          type: "success"
        });
        this.close(true);
      }).catch(err => {
        this.loading = false;
      })
    },
    //修改
    update() {
      api.upDateAreaList(this.model).then(res => {
        this.loading = false;
        this.$message({
          message: "修改成功",
          type: "success"
        });
        this.close(true);
      }).catch(err => {
        this.loading = false;
      })
    },
    success() {
      this.$refs.model.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.id != "") {
            this.update();
          } else {
            this.save();
          }
        } else {
          return false;
        }
      });
    },
    close(flag) {
      this.$refs.model.resetFields();
      this.model = {
        type: 3,
        name: '',
        parentId: '',
        timeZone: ''
      }
      this.$emit("close", flag);
    },
  }
};
</script>
