<template>
  <!--'el-form-item&#45;&#45;feedback': elForm && elForm.statusIcon,-->
  <!--'el-form-item&#45;&#45;feedback': myform && myform.statusIcon,-->
  <!--'el-form-item&#45;&#45;feedback': myform && myform.statusIcon,-->
  <div class="el-form-item" :class="[{
      'is-error': isError,
      'is-validating': validateState === 'validating',
      'is-success': validateState === 'success',
      'is-required':  required
    },
    sizeClass ? 'el-form-item--' + sizeClass : ''
  ]">

    <div class="el-form-item__label_block" v-if="label">
      <label :for="labelFor" class="el-form-item__label" :style="{'min-width': labelWidth }" v-if="label || $slots.label">
        <!--:style="labelStyle"-->
        <slot name="label">{{ label }}</slot>
      </label>
    </div>
    <!--:style="contentStyle"-->
    <div class="el-form-item__content" style="width: 100%;">
      <slot></slot>
      <transition name="el-zoom-in-top">
        <div v-if="isError" class="el-form-item__error">
          <!--:class="{-->
          <!--'el-form-item__error&#45;&#45;inline': typeof inlineMessage === 'boolean'-->
          <!--? inlineMessage-->
          <!--: (myform && myform.inlineMessage || false)-->
          <!--}"-->
          {{validateMessage}}
        </div>
      </transition>
    </div>

  </div>
</template>
<script>

  export default {
    name: 'form-item',
    // inject: ['myform'],
    data() {
      return {
        isNested: false,
      };
    },
    props: {
      isError: {
        type: Boolean,
        default: false
      },
      validateMessage: String,
      validateState: String,
      label: String,
      labelWidth: String,
      prop: String,
      required: {
        type: Boolean,
        default: undefined
      },
      rules: [Object, Array],
      error: String,
      validateStatus: String,
      for: String,
      inlineMessage: {
        type: [String, Boolean],
        default: ''
      },
      showMessage: {
        type: Boolean,
        default: true
      },
      size: String
    },
    computed: {
      labelFor() {
        return this.for || this.prop;
      },
      labelStyle() {
        const ret = {};
        if (this.form.labelPosition === 'top') return ret;
        const labelWidth = this.labelWidth || this.form.labelWidth;
        if (labelWidth) {
          ret.width = labelWidth;
        }

        return ret;
      },
      contentStyle() {
        const ret = {};
        const label = this.label;
        if (this.form.labelPosition === 'top' || this.form.inline) return ret;
        if (!label && !this.labelWidth && this.isNested) return ret;
        const labelWidth = this.labelWidth || this.form.labelWidth;
        if (labelWidth) {
          ret.marginLeft = labelWidth;
        }
        return ret;
      },
      sizeClass() {
        return this.elFormItemSize || (this.$ELEMENT || {}).size;
      },
      form() {
        let _this = this;
        let parent = this.$parent;

        return parent;
      },

    }

  };
</script>
<style lang="scss">

  .el-form-item__inline {
    /*background: red;*/
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    height: 48px;
    padding: 0!important;
  }
  @media screen and (max-width: 767px) {
    .el-form-item__inline {
      flex-direction: column;
    }
    .el-form-item__label {
      float: left;
      width: 100%!important;
      text-align: left!important;
    }
    .el-form-item__label_block {
      text-align: left!important;
      margin-left: 0;
      width: 100%!important;
    }
  }


  .el-form-item , .el-input .el-input input {
    width: 100%!important;
  }
  .el-form-item__label {
    /*background: yellow;*/
    text-align: left;
    /*margin: 0!important;*/
    /*padding: 0!important;*/
    display:  block;
    /*float: left;*/
    /*font-size: 13px;*/
    /*color: #606266;*/
    line-height: 1;
    margin-left: 0;
    /*padding: 0 12px 0 0;*/
    /*box-sizing: border-box;*/
  }
  .el-form-item__content {
    /*line-height: 14px;*/
    /*position: relative;*/
    /*font-size: 13px;*/
  }
  .el-form-item {
    margin-bottom: 20px;
  }
</style>
