<template>
    <div></div>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Watch, Model } from "vue-property-decorator";

    @Component
    export default class List extends Vue
    {
        mounted(){this.$store.dispatch('bloge/getList');}
    }
</script>