import {Component, Vue} from 'vue-facing-decorator';
import {
    Option,
    NAVBAR_DARK_VARIANTS,
    NAVBAR_LIGHT_VARIANTS,
    SIDEBAR_DARK_SKINS,
    SIDEBAR_LIGHT_SKINS
} from '@/utils/themes';
import {Checkbox, Select} from '@profabric/vue-components';

@Component({
    name: 'app-control-sidebar',
    components: {
        'pf-checkbox': Checkbox,
        'pf-select': Select
    }
})
export default class ControlSidebar extends Vue {
    private navbarLightVariants: Array<Option> = NAVBAR_LIGHT_VARIANTS;
    private navbarDarkVariants: Array<Option> = NAVBAR_DARK_VARIANTS;
    private darkSidebarSkins: Array<Option> = SIDEBAR_DARK_SKINS;
    private lightSidebarSkins: Array<Option> = SIDEBAR_LIGHT_SKINS;

    public handleDarkModeChange() {
        this.$store.dispatch('ui/toggleDarkMode');
    }

    private onNavbarVariantChange(event: any) {
        if (event && event.target) {
            this.$store.dispatch('ui/setNavbarVariant', event.target.value);
        }
    }

    private onSidebarSkinChange(event: any) {
        if (event && event.target) {
            this.$store.dispatch('ui/setSidebarSkin', event.target.value);
        }
    }

    get darkModeSelected() {
        return this.$store.getters['ui/darkModeSelected'];
    }

    get navbarVariant() {
        return this.$store.getters['ui/navbarVariant'];
    }

    get sidebarSkin() {
        return this.$store.getters['ui/sidebarSkin'];
    }
}
