<template>
<el-dialog :title='id ? "修改" : "添加"' :visible.sync="visible" width="880px" :append-to-body="true" :before-close="close" :close-on-click-modal="false" :close-on-press-escape="false">
  <div style="overflow: auto;" v-loading="dataLoading">
    <el-form :model="model" ref="model" class="new-form" label-position="top">
      <el-form-item>
        <el-form-item label="城市" prop="areaId" style="width:150px;" :rules="[{ required: true, message: '该字段不能为空'}]">
          <el-cascader size="small" :options="cityList" v-model="options" :show-all-levels="false" @change="cityChange"></el-cascader>
        </el-form-item>
        <el-form-item label="类型" prop="type" style="width:150px;" :rules="[{ required: true, message: '该字段不能为空'}]">
          <el-select v-model="model.type" size="small">
            <el-option label="首页" :value="1"></el-option>
            <el-option label="资讯" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="model.type == 2" label="栏目" prop="categoryId" style="width:150px;">
          <el-select v-model="model.categoryId" size="small">
            <el-option :label="item.name" :value="item.id" v-for="(item, index) in categoryList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="seqNum" style="width:150px;" :rules="[{ required: true, message: '该字段不能为空'}]">
          <el-input-number size="small" :min="1" v-model="model.seqNum"></el-input-number>
        </el-form-item>
        <el-form-item label="名称" prop="name" :rules="[{ required: true, message: '该字段不能为空'}]">
          <el-input size="small" v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input size="small" v-model="model.href"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input size="small" v-model="model.note"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="图片" prop="url" :rules="[{ required: true, message: '该字段不能为空'}]">
        <div class="upload-img-box" @click="openImgBox()">
          <img v-if="model.url" :src="imgHost+model.url" style="width: 120px;">
          <i v-else class="el-icon-plus upload-icon"></i>
        </div>
      </el-form-item>
    </el-form>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="close(false)">取 消</el-button>
    <el-button size="small" type="primary" @click="success()" :loading="loading">确 定</el-button>
  </span>
  <image-dialog :visible="digImgWrap" uploadType="radio" imageType='admin' @close-imgbox="closeImgbox" @get-imgsrc="onGetImgsrc"></image-dialog>
</el-dialog>
</template>

<script>
import ImageDialog from "../../common/ImageDialog";
import api from "api/common.js";

export default {
  props: {
    visible: Boolean,
    cityList: Array,
    categoryList: Array,
    id: {
      type: String,
      default: ""
    }
  },
  components: {
    ImageDialog
  },
  data() {
    return {
      digImgWrap: false,
      model: {
        type: 1,
        name: "",
        href: "",
        url: "",
        seqNum: "",
        note: "",
        id: "",
        categoryId: ""
      },
      options: [],
      loading: false,
      dataLoading: false
    };
  },
  watch: {
    'model.type'() {
      if(this.model.type == 1) this.model.categoryId = '';
    },
    visible(val) {
      if (val && this.id != "") {
        this.dataLoading = true;
        this.detail();
      }
    }
  },
  methods: {
    //更新信息
    detail() {
      api.getAttachment({ id: this.id }).then(res => {
        this.model = res.data.data;
        this.dataLoading = false;
        // this.options = [this.model.areaId, this.model.id]
        // console.log(this.options)
      });
    },
    cityChange(val) {
      console.log(val)
      this.model.areaId = val[1]
    },
    //添加
    save() {
      api.addAttachment(this.model).then(res => {
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
      api.updateAttachment(this.model).then(res => {
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
      this.model = this.reduc();
      this.$emit("close", flag);
    },
    reduc() {
      let model = {
        name: "",
        href: "",
        url: "",
        sortNumber: 0,
        note: ""
      };
      return model;
    },
    // 打开图片对话框
    openImgBox() {
      // this.uploadType = type
      this.digImgWrap = true;
    },
    // 关闭图片对话框
    closeImgbox(state) {
      this.digImgWrap = false;
    },
    // 单张图片
    onGetImgsrc(val) {
      this.model.url = val;
    }
  }
};
</script>
