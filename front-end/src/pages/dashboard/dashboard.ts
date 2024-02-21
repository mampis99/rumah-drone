/* eslint-disable prettier/prettier */
import {Component, Vue} from 'vue-facing-decorator';

@Component({})
export default class Dashboard extends Vue {
    public total: string = '';
    public masuk: string = '';
    public keluar: string = '';

    public mounted(): void {
        this.getData();
    }

    public getData() {

        const url = 'http://localhost:8000/api/info';
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.total = res.total;
                this.masuk = res.masuk;
                this.keluar = res.keluar;
            });
    }
}
