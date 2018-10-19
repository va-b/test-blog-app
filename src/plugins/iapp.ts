import { Vue } from "vue/types/vue";
import { ServicesFactory } from "../services/ServicesFactory";

export interface IApp extends Window
{
    serviceFactory: ServicesFactory;
    vi: Vue;
}

export default window as IApp;