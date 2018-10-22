<template>
    <v-card tile hover @click.native="$router.push('/record/' + record.id)">
        <v-img class="white--text" :src="record.imgUrl" aspect-ratio="2">
            <v-container fill-height fluid>
                <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                        <span class="headline entry-title">{{record.title}}</span>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-img>
        <v-card-text>
            <div class="subheading">
                {{record.description}}
            </div>
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <v-btn flat round small color="primary"
                   @click.stop="toEdit"
            >
                <v-icon small left>fa-edit</v-icon>Редактировать
            </v-btn>
            <v-btn flat round small color="error"
                   @click.stop="toDelete"
                   :disabled="isSaving" :loading="isSaving"
            >
                <v-icon small left>fa-trash</v-icon>Удалить
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Watch, Model } from "vue-property-decorator";
    import { IBlogEntry } from "../../models/BlogEntry";

    @Component
    export default class Entry extends Vue
    {
        @Prop() record: IBlogEntry;

        isSaving: boolean = false;

        async toEdit(): Promise<any>
        {
            this.isSaving = true;

            if(!!this.record.id)  this.$store.commit("bloge/setCurrentItem", this.record.id);
            else this.$store.commit("bloge/resetCurrentItem");

            this.$router.push('/edit/' + this.record.id);
            this.isSaving = false;
        }

        async toDelete(): Promise<any>
        {
            this.isSaving = true;
            await this.$store.dispatch('bloge/delete', this.record.id);
            this.isSaving = false;
        }
    }
</script>