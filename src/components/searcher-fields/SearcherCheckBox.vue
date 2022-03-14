<template>
  <el-checkbox :label="label" model-value="modelValue" @update:modelValue="$emit('update:modelValue', $event)"/>
</template>

<script>
export default {
  name: 'SearcherCheckBox',
  emits: ['update:modelValue'],
  props: {
    label: String,
    modelValue: Boolean,
  },
}
</script>

<style>

</style>
