<template>
  <div class="wrap" ref="wrap" v-loading="dataLoading">
    <div class="context-box" :style="{'height': `${areaHeight}px`}" ref="context">
      <div class="form">
        <el-form :model="form" ref="form" class="new-form" style="width: 300px;" label-position="top">
          <el-form-item label="点赞" prop="like" :rules="[{ required: true, message: '该字段不能为空'}]">
            <el-input-number size="small" v-model="form.like"></el-input-number>
          </el-form-item>
          <el-form-item label="阅读" prop="read" :rules="[{ required: true, message: '该字段不能为空'}]">
            <el-input-number size="small" v-model="form.read"></el-input-number>
          </el-form-item>
          <el-form-item label="留言" prop="leaveWord" :rules="[{ required: true, message: '该字段不能为空'}]">
            <el-input-number size="small" v-model="form.leaveWord"></el-input-number>
          </el-form-item>
          <el-form-item label="分享" prop="share" :rules="[{ required: true, message: '该字段不能为空'}]">
            <el-input-number size="small" v-model="form.share"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="bottom-btn">
      <el-button type="primary" @click="submit" size="small" :loading="loading">保存</el-button>
    </div>
  </div>
</template>

<script>
import api from "api/common.js";

export default {
  components: {
    
  },
  data() {
    return {
      wrapHeight: 0,
      areaHeight: 0,
      canISubmit: true,
      loading: false,
      dataLoading: true,
      model: {
        id: "957ff61ca719404983617da580749dbb",
        value: "5_1_0_0",
        name: "信息热度分值配置",
        type: 5
      },
      form: {
        like: 0,
        read: 0,
        leaveWord: 0,
        share: 0,
      }
    };
  },
  created() {
    this.apiGetConfig()
  },
  mounted() {
    this.getHeight();
    window.onresize = () => {
      this.getHeight();
    };
  },
  methods: {
    // 设置高度
    getHeight() {
      this.areaHeight = window.innerHeight - 120 - 105;
    },
    // 获取配置
    apiGetConfig() {
      api.getConfig({id: '957ff61ca719404983617da580749dbb'})
      .then(res => {
        this.dataLoading = false;
        let value  =  res.data.data.value.split('_');
        this.form.like = value[0]
        this.form.read = value[1]
        this.form.leaveWord = value[2]
        this.form.share = value[3]
        this.$refs.form.clearValidate()
      }).catch(err => {
        this.dataLoading = false;
      })
    },
    //更新
    apiUpdate(form) {
      api.updateConfig(form).then(res => {
        this.loading = false;
        this.$message({
          message: "保存成功",
          type: "success"
        });
        this.apiGetConfig()
      }).catch(err => {
        this.loading = false;
      })
    },
    // 提交
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          let value = `${this.form.like}_${this.form.read}_${this.form.leaveWord}_${this.form.share}`;
          this.model.value = value;
          this.apiUpdate(this.model);
        } else {
          return false;
        }
      });
    },
  }
};
</script>
<style lang="less" scoped>
.context-box{
  padding: 20px;
  overflow: auto;
}
.property-table {
  border: 1px solid #e7eaec;
  margin-top: 20px;
  // width: 900px;
  border-spacing: 0;
  border-collapse: collapse;
  tr {
    th {
      padding: 15px 12px;
      line-height: 1.5;
      .input-group {
        display: flex;
      }
    }
    td {
      border-top: 1px solid #e7eaec;
      line-height: 1.5;
      padding: 15px 12px;
      text-align: center;
      img{
        cursor: pointer;
      }
    }
  }
}
.bottom-btn {
  text-align: center;
  height: 60px;
  line-height: 60px;
  border-top: 1px solid #e7eaec;
}
</style>
