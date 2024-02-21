/* eslint-disable prettier/prettier */
import {Component, Vue} from 'vue-facing-decorator';
import {useToast} from 'vue-toastification';

@Component({})
export default class Paket extends Vue {

    public id: string = '';
    public name: string = '';
    public id_paket: string = '';
    public address: string = '';
    public no_telp: string = '';

    public pakets: any[] = [];
    public customers: any[] = [];
    private toast = useToast();

    public mounted(): void {
        this.getData();
        this.getPaket();
    }

    public getData() {
        this.customers = [];
        this.clearForm();

        const url = 'http://localhost:8000/api/customer/data';
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.customers = res.data;
            });
    }

    public getPaket() {
        this.pakets = [];
        this.clearForm();

        const url = 'http://localhost:8000/api/paket/data';
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.pakets = res.data;
            });
    }

    public clearForm() {
        this.id = '';
        this.id_paket = '';
        this.name = '';
        this.address = '';
        this.no_telp = '';
    }

    public async storeCustomer(): Promise<void> {
        const url = 'http://localhost:8000/api/customer/store';

        fetch(url, {
            method: 'post',
            body: JSON.stringify(
                                    {
                                        'id': this.id, 
                                        'id_paket': this.id_paket,
                                        'name': this.name, 
                                        'address': this.address,
                                        'no_telp': this.no_telp
                                    }
                                ),
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

    public setCustomer(_id: string, _id_paket: string, _name: string, _notelp: string, _address: string) {
        // console.log(_id, _name, _price);
        this.id = _id;
        this.id_paket = _id_paket;
        this.name = _name;
        this.no_telp = _notelp
        this.address = _address;
    }

    public deleteCustomer(_id: string) {
        console.log(_id);
        const url = 'http://localhost:8000/api/customer/destroy/'+_id;
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
