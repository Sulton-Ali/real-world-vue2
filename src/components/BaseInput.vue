<template>
  <div>
    <label for="">{{ label }}</label>
    <input type="text" />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Label',
    },
  },
}
</script>

<style></style>
