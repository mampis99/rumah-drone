/* eslint-disable prettier/prettier */
import {Component, Vue} from 'vue-facing-decorator';
import {useToast} from 'vue-toastification';

@Component({})
export default class Paket extends Vue {

    public id: string = '';
    public tanggal: string = '';
    public no_po: string = '';
    public id_barang: string = '';
    public qty: string = '';
    public barang_masuk: any[] = [];
    public barangs: any[] = [];
    private toast = useToast();

    public mounted(): void {
        this.getData();
        this.getDataBarang();
    }

    public getData() {
        this.barang_masuk = [];
        this.clearForm();

        const url = 'http://localhost:8000/api/stok/masuk';
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.barang_masuk = res.data;
            });
    }

    public getDataBarang() {
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
        this.tanggal = '';
        this.no_po = '';
        this.id_barang = '';
        this.qty = '';
    }

    public async storeBarang(): Promise<void> {
        const url = 'http://localhost:8000/api/stok/store';

        fetch(url, {
            method: 'post',
            body: JSON.stringify({
                                    'id': this.id, 
                                    'type' : 'in',
                                    'tanggal': this.tanggal,
                                    'no_po': this.no_po,
                                    'id_barang': this.id_barang,
                                    'masuk': this.qty,
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

    public setBarang(_id: string,  _tanggal: string, _no_po: string, _id_barang: string, _qty: string) {
        this.id = _id;
        this.tanggal = _tanggal;
        this.no_po = _no_po;
        this.id_barang = _id_barang;
        this.qty = _qty;

        console.log(_tanggal);
        
    }

    public deleteBarang(_id: string) {
        console.log(_id);
        const url = 'http://localhost:8000/api/stok/destroy/'+_id;
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
