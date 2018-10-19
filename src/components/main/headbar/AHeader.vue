<template>
    <v-toolbar app dense dark fixed color="primary">
        <v-toolbar-title class="white--text">
            <v-icon dark class="mr-2">fa-code</v-icon>
            Awesome Blog
        </v-toolbar-title>
        <v-spacer/>
        <v-btn flat round>
            <v-icon dark small left>fa-plus</v-icon>
            Добавить запись
        </v-btn>
    </v-toolbar>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Watch, Model } from "vue-property-decorator";

    @Component
    export default class AHeader extends Vue
    {

    }
</script>