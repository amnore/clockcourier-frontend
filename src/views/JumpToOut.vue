<template>
    <div><p>
      {{ $t("message.waiting") }}
    </p></div>
</template>

<script>
export default {
  name:"JumpToOut",

  mounted() {
    console.log(this.$route.query.url);
    window.location.href=this.$route.query.url;
  }
}
</script>
