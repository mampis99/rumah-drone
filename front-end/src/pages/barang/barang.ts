/* eslint-disable prettier/prettier */
import {Component, Vue} from 'vue-facing-decorator';
import {useToast} from 'vue-toastification';

@Component({})
export default class Paket extends Vue {

    public id: string = '';
    public name: string = '';
    public stok_minimum: string = '';
    public stok_maksimal: string = '';
    public barangs: any[] = [];
    private toast = useToast();

    public mounted(): void {
        this.getData();
    }

    public getData() {
        this.barangs = [];
        this.clearForm();

        const url = 'http://localhost:8000/api/barang/data';
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res.data);
                
                this.barangs = res.data;
            });
    }

    public clearForm() {
        this.id = '';
        this.name = '';
        this.stok_minimum = '';
        this.stok_maksimal = '';
    }

    public async storeBarang(): Promise<void> {
        const url = 'http://localhost:8000/api/barang/store';

        fetch(url, {
            method: 'post',
            body: JSON.stringify({
                                    'id': this.id, 
                                    'name': this.name, 
                                    'stok_minimum': this.stok_minimum,
                                    'stok_maksimum': this.stok_maksimal
                                }),
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

    public setBarang(_id: string, _name: string, _minimum: string, _maksimal: string) {
        this.id = _id;
        this.name = _name;
        this.stok_minimum = _minimum;
        this.stok_maksimal = _maksimal;
    }

    public deleteBarang(_id: string) {
        console.log(_id);
        const url = 'http://localhost:8000/api/paket/destroy/'+_id;
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
