<template>
    <v-card>
        <v-card-title>
            <div class="subheading">
                {{comment.userName}}
            </div>
            <v-spacer/>
            <v-btn flat icon small color="primary" @click="toEdit" class="my-0">
                <v-icon small>fa-edit</v-icon>
            </v-btn>
            <v-btn flat icon small color="error" @click="toDelete" class="my-0">
                <v-icon small>fa-trash</v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text>{{comment.text}}</v-card-text>
    </v-card>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Watch, Model } from "vue-property-decorator";
    import { IComment } from "../../models/CommentEntry";

    @Component
    export default class CommentEntry extends Vue
    {
        @Prop() comment: IComment;
        isSaving: boolean = false;

        async toEdit(): Promise<any>
        {
            this.$store.commit("comme/setCurrentItem", this.comment.id);
            this.$emit('toedit');
        }

        async toDelete(): Promise<any>
        {
            this.isSaving = true;
            await this.$store.dispatch('comme/delete', this.comment.id);
            this.isSaving = false;
        }
    }
</script>