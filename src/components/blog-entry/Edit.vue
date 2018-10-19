<template>
    <div></div>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Watch, Model } from "vue-property-decorator";

    @Component
    export default class Edit extends Vue
    {
        @Prop({default: null}) myId: number;

        created()
        {
            if(!!this.myId)  this.$store.commit("bloge/setCurrentItem", this.myId);
            else this.$store.commit("bloge/resetCurrentItem");
        }

        async onSave()
        {
            await this.$store.dispatch('bloge/save');
            this.$router.go(-1);
        }

        onCancel()
        {
            this.$store.commit('bloge/resetCurrentItem');
            this.$router.go(-1);
        }
    }
</script>