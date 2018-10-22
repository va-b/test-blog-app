<template>
    <v-layout row wrap v-if="!!$store.state.bloge.editedEntity">
        <v-flex xs12 lg6>
            <v-img :src="$store.state.bloge.editedEntity.imgUrl" aspect-ratio="2" class="elevation-1"/>
        </v-flex>
        <v-flex xs12 lg6>
            <v-card>
                <v-text-field box hide-details label="Заголовок" v-model="$store.state.bloge.editedEntity.title"/>
                <v-text-field box hide-details label="Краткое описание" v-model="$store.state.bloge.editedEntity.description"/>
                <v-text-field box hide-details label="URL картинки" v-model="$store.state.bloge.editedEntity.imgUrl"/>
                <v-textarea box hide-details label="Текст статьи"   v-model="$store.state.bloge.editedEntity.full"/>
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
        </v-flex>
    </v-layout>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Watch, Model } from "vue-property-decorator";

    @Component
    export default class Edit extends Vue
    {
        @Prop({default: null}) myId: number;

        isSaving: boolean = false;

        created()
        {
            if(!!this.myId) this.$store.dispatch('bloge/getList')
                                .then(() => this.$store.commit("bloge/setCurrentItem", this.myId));
            else this.$store.commit('bloge/resetCurrentItem');
        }


        async onSave()
        {
            this.isSaving = true;
            await this.$store.dispatch('bloge/save');
            this.isSaving = false;
            this.$store.commit('bloge/resetCurrentItem');
            this.$router.go(-1);
        }

        onCancel()
        {
            this.$store.commit('bloge/resetCurrentItem');
            this.$router.go(-1);
        }
    }
</script>