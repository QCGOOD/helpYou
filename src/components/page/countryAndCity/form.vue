<template>
<el-dialog :title='id ? "修改" : "添加"' :visible.sync="visible" width="500px" :append-to-body="true" :before-close="close" :close-on-click-modal="false" :close-on-press-escape="false">
  <div style="overflow: auto;" v-loading="dataLoading">
    <el-form :model="model" ref="model" class="new-form" style="width: 300px;" label-position="top">
        <el-form-item label="名称" prop="name" :rules="[{ required: true, message: '该字段不能为空'}]">
          <el-input size="small" v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item v-if="type === 3" label="时区" prop="timeZone" :rules="[{ required: true, message: '该字段不能为空'}]">
          <el-select v-model="model.timeZone" size="small">
            <el-option v-for="(item, index) in timeZoneList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
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
        timeZone: 'GMT+8'
      },
      timeZoneList: [
        {label: '零时区', value: 'GMT'},
        {label: '东一区', value: 'GMT+1'},
        {label: '东二区', value: 'GMT+2'},
        {label: '东三区', value: 'GMT+3'},
        {label: '东四区', value: 'GMT+4'},
        {label: '东五区', value: 'GMT+5'},
        {label: '东六区', value: 'GMT+6'},
        {label: '东七区', value: 'GMT+7'},
        {label: '东八区', value: 'GMT+8'},
        {label: '东九区', value: 'GMT+9'},
        {label: '东十区', value: 'GMT+10'},
        {label: '东十一区', value: 'GMT+11'},
        {label: '东十二区', value: 'GMT+12'},
        {label: '西一区', value: 'GMT-1'},
        {label: '西二区', value: 'GMT-2'},
        {label: '西三区', value: 'GMT-3'},
        {label: '西四区', value: 'GMT-4'},
        {label: '西五区', value: 'GMT-5'},
        {label: '西六区', value: 'GMT-6'},
        {label: '西七区', value: 'GMT-7'},
        {label: '西八区', value: 'GMT-8'},
        {label: '西九区', value: 'GMT-9'},
        {label: '西十区', value: 'GMT-10'},
        {label: '西十一区', value: 'GMT-11'},
        {label: '西十二区', value: 'GMT-12'},
      ],
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
