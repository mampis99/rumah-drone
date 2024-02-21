/* eslint-disable prettier/prettier */
import {Component, Vue} from 'vue-facing-decorator';
import {useToast} from 'vue-toastification';


@Component({})
export default class Blank extends Vue {
    public id: string = '';
    public no_induk_pegawai: string = '';
    public password: string = '';
    public users: any[] = [];
    private toast = useToast();

    public mounted(): void {
        this.getData();
    }

    public getData() {
        this.users = [];
        this.clearForm();

        const url = 'http://localhost:8000/api/sales/data';
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.users = res.data;
            });
    }

    public clearForm() {
        this.id = '';
        this.no_induk_pegawai = '';
        this.password = '';
    }

    public async storeUser(): Promise<void> {
        const url = 'http://localhost:8000/api/sales/store';

        fetch(url, {
            method: 'post',
            body: JSON.stringify({'id': this.id, 'username': this.no_induk_pegawai, 'password': this.password}),
            headers: {
                'content-type' : 'application/json'
                }
            })
            .then(res => res.json())
            .then(res => {
                this.getData();
                if (res.success == true) {
                    this.toast.success(res.message);
                }else{
                    this.toast.error(res.message);
                }
        }); 
    }

    public setUser(_id: string, _no_induk_pegawai: string) {
        this.id = _id;
        this.no_induk_pegawai = _no_induk_pegawai;
        this.password = '';
    }

    public deleteUser(_id: string) {
        console.log(_id);
        const url = 'http://localhost:8000/api/sales/destroy/'+_id;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.getData();
                console.log(res);
                if (res.success == true) {
                    this.toast.success(res.message);
                }else{
                    this.toast.error(res.message);
                }
            });
    }
}
