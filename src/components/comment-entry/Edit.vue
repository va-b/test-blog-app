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
            if(!!this.myId)  this.$store.commit("comme/setCurrentItem", this.myId);
            else this.$store.commit("comme/resetCurrentItem");
        }

        async onSave()
        {
            await this.$store.dispatch('comme/save');
            //this.$router.go(-1);
        }

        onCancel()
        {
            this.$store.commit('comme/resetCurrentItem');
            //this.$router.go(-1);
        }
    }
</script>