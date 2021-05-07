<template>
  <form-item label="Тел." class="w-100" :isError="errors.has('phone')" :validate-message="errors.first('phone')">
  <div class="el-input">
    <input
      type="text"
      autocomplete="off"
      placeholder="Тел."
      name="phone"
      class="el-input__inner w-100"
      v-validate="'required|length:15'"
      :value="value"
      @input="onInput"
      v-mask="mask"
      pattern="[0-9]*">
<!--    data-vv-validate-on="change" -->
  </div>
  </form-item>
</template>

<script>
import FormItem from "@/components/form-item";
export default {
  name: "el-phone-input",
  components: {FormItem},
  data() {
    return {
      mask: '7-###-###-##-##',
    }
  },
  props: {
    value: null,
  },
  methods: {
    onInput($event) {
      this.$emit('input', $event.target.value)
    },
  }
}
</script>

<style lang="scss">

</style>
