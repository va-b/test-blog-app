<template>
    <v-card>
        <v-text-field box hide-details label="Имя пользователя" v-model="$store.state.comme.editedEntity.userName"/>
        <v-textarea box hide-details label="Текст комментария" v-model="$store.state.comme.editedEntity.text"/>
        <v-card-actions>
            <v-btn round @click="onCancel" class="mx-0">
                Отмена
            </v-btn>
            <v-spacer/>
            <v-btn round color="primary" @click="onSave" class="mx-0" :disabled="isSaving" :loading="isSaving">
                Сохранить
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Watch, Model } from "vue-property-decorator";

    @Component
    export default class CommentEdit extends Vue
    {
        @Prop({default: null}) myId: number;

        isSaving: boolean = false;

        async onSave()
        {
            this.isSaving = true;
            await this.$store.dispatch('comme/save');
            this.isSaving = false;
            this.$emit('saved');
        }

        onCancel()
        {
            this.$store.commit('comme/resetCurrentItem');
            this.$emit('saved');
        }
    }
</script>