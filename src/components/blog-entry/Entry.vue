<template>
    <v-card tile hover @click.native="$router.push('/record/' + record.id)">
        <v-img class="white--text" :src="record.imgUrl" aspect-ratio="3">
            <v-container fill-height fluid>
                <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                        <span class="headline">{{record.title}}</span>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-img>
        <v-card-title>
            <div class="subheading">
                {{record.description}}
            </div>
            <v-spacer/>
            <v-btn icon flat color="info"
                @click.stop="$router.push('/edit/' + record.id)"
            >
                <v-icon small>fa-edit</v-icon>
            </v-btn>
            <v-btn icon flat color="error"
                @click.stop="$store.dispatch('bloge/delete', record.id)"
                :disabled="$store.state.bloge.isSaving" :loading="$store.state.bloge.isSaving"
            >
                <v-icon small>fa-trash</v-icon>
            </v-btn>
        </v-card-title>
    </v-card>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Watch, Model } from "vue-property-decorator";
    import { IBlogEntry } from "../../models/BlogEntry";

    @Component
    export default class Entry extends Vue
    {
        @Prop() record: IBlogEntry;
    }
</script>