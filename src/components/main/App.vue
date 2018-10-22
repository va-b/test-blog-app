<template>
    <v-app>
        <a-header/>
        <v-content>
            <v-container grid-list-lg>
                <router-view/>
            </v-container>
        </v-content>
    </v-app>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Watch, Model } from "vue-property-decorator";
    import AHeader from "./headbar/AHeader.vue";
    @Component({
                   components: { AHeader },
               })
    export default class App extends Vue
    {

    }
</script>