<template>
    <v-layout column>
        <v-flex xs12>
            <v-img :src="$store.state.bloge.editedEntity.imgUrl" aspect-ratio="3" class="elevation-1"/>
        </v-flex>
        <v-flex xs12>
            <v-text-field solo hide-details label="Заголовок" v-model="$store.state.bloge.editedEntity.title"/>
        </v-flex>
        <v-flex xs12>
            <v-text-field solo hide-details label="Краткое описание" v-model="$store.state.bloge.editedEntity.description"/>
        </v-flex>
        <v-flex xs12>
            <v-text-field solo hide-details label="URL картинки" v-model="$store.state.bloge.editedEntity.imgUrl"/>
        </v-flex>
        <v-flex xs12>
            <v-textarea solo hide-details label="Текст статьи"   v-model="$store.state.bloge.editedEntity.full"/>
        </v-flex>
        <v-flex xs12 style="display: flex">
            <v-btn depressed @click="onCancel" class="mx-0">
                Отмена
            </v-btn>
            <v-spacer/>
            <v-btn color="info" @click="onSave()" class="mx-0"
                   :disabled="$store.state.bloge.isSaving" :loading="$store.state.bloge.isSaving"
            >
                Сохранить
            </v-btn>
        </v-flex>

    </v-layout>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Watch, Model } from "vue-property-decorator";

    @Component
    export default class Edit extends Vue
    {
        @Prop({default: null}) myId: number;

        created()
        {
            if(!!this.myId)  this.$store.commit("bloge/setCurrentItem", this.myId);
            else this.$store.commit("bloge/resetCurrentItem");
        }

        async onSave()
        {
            await this.$store.dispatch('bloge/save');
            this.$router.go(-1);
        }

        onCancel()
        {
            this.$store.commit('bloge/resetCurrentItem');
            this.$router.go(-1);
        }
    }
</script>