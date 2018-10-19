<template>
    <div></div>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Watch, Model } from "vue-property-decorator";

    @Component
    export default class Detail extends Vue
    {
        @Prop({default: null}) myId: number;
    }
</script>