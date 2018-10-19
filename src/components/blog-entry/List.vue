<template>
    <v-layout column>
        <v-flex xs12 v-for="item in $store.state.bloge.entities" :key="item.id">
            <entry :record="item"/>
        </v-flex>
    </v-layout>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Watch, Model } from "vue-property-decorator";
    import Entry from "./Entry.vue";
    @Component({
                   components: { Entry },
               })
    export default class List extends Vue
    {
        created(){this.$store.dispatch('bloge/getList');}
    }
</script>