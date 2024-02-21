/* eslint-disable prettier/prettier */
import {IUser} from '@/interfaces/user';
import {Component, Vue} from 'vue-facing-decorator';
import MenuItem from '@/components/menu-item/menu-item.vue';
import {Image} from '@profabric/vue-components';
import SidebarSearch from '@/components/sidebar-search/sidebar-search.vue';
import {i18n} from '@/translation';

@Component({
    name: 'app-menu-sidebar',
    components: {
        'app-menu-item': MenuItem,
        'app-sidebar-search': SidebarSearch,
        'pf-image': Image
    }
})
export default class MenuSidebar extends Vue {
    public role: string = ""
    public menu: any[] = [];

    mounted(): void {
        const rl = this.$store.getters['auth/authentication'];
        this.role = rl.level
        console.log(this.role);
        
        this.menu = MENU.filter(x => x.meta == this.role);
    }


    get authentication(): IUser {
        return this.$store.getters['auth/authentication'];
    }

    get sidebarSkin() {
        return this.$store.getters['ui/sidebarSkin'];
    }
}

export const MENU = [
        {
            name: i18n.global.t('labels.dashboard'),
            path: '/',
            meta: '1'
        },
        {
            name: 'Barang',
            path: '/barang',
            meta: '1'
        },
        {
            name: 'Barang Masuk',
            path: '/barang-masuk',
            meta: '2'
        },
        {
            name: 'Pengiriman Barang',
            path: '/barang-keluar',
            meta: '2'
        },
        {
            name: 'Stok',
            path: '/stok',
            meta: '2'
        },
        {
            name: 'Stok',
            path: '/stok',
            meta: '1'
        },
];