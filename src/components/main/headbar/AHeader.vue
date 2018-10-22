<template>
    <v-toolbar app dense dark fixed color="teal">
        <v-btn flat large round @click="$router.push('/')" class="px-3">
            <v-icon dark left>fa-code</v-icon>
            Awesome Blog
        </v-btn>
        <v-spacer/>
        <v-btn flat round @click="$router.push('/add')">
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