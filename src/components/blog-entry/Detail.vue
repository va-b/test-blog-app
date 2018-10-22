<template>
    <v-layout column>
        <v-flex xs12>
            <v-card v-if="record">
                <v-img class="white--text" :src="record.imgUrl" aspect-ratio="4">
                    <v-container fill-height fluid>
                        <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                                <span class="headline entry-title">{{record.title}}</span>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-img>
                <v-card-text>
                    {{record.full}}
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 style="display:flex">
            <v-spacer/>
            <v-btn round color="primary" class="ma-0" @click="onAddComment">
                <v-icon left small>fa-comment</v-icon>
                Ответить
            </v-btn>
        </v-flex>
        <v-flex xs12 v-for="comment in $store.state.comme.entities" :key="comment.id">
            <comment-entry :comment="comment" @toedit="commentDialog = true"/>
        </v-flex>
        <v-dialog v-model="commentDialog" persistent max-width="420">
            <comment-edit v-if="commentDialog" @saved="onCommentSaved"/>
        </v-dialog>
    </v-layout>
</template>
<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import { IBlogEntry } from "../../models/BlogEntry";
    import CommentEdit from "../comment-entry/CommentEdit.vue";
    import CommentEntry from "../comment-entry/CommentEntry.vue";

    @Component({
                   components: { CommentEntry, CommentEdit },
               })
    export default class Detail extends Vue
    {
        @Prop({default: null}) myId: number;

        commentDialog: boolean = false;

        created(){this.$store.dispatch('bloge/getList');}

        mounted()
        {
            this.$store.commit('comme/setParentEntityId', this.myId);
            this.$store.dispatch('comme/getList');
        }

        get record(): IBlogEntry
        {
            return this.$store.state.bloge.entities.find(x => x.id == this.myId);
        }

        onAddComment()
        {
            this.$store.commit("comme/resetCurrentItem");
            this.commentDialog = true;
        }

        onCommentSaved()
        {
            this.commentDialog = false;
            this.$store.dispatch('comme/getList');
        }
    }
</script>