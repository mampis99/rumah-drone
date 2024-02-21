/* eslint-disable prettier/prettier */
import {Component, Vue} from 'vue-facing-decorator';
import {useToast} from 'vue-toastification';

@Component({})
export default class Paket extends Vue {

    public id: string = '';
    public name: string = '';
    public price: string = '';
    public pakets: any[] = [];
    private toast = useToast();

    public mounted(): void {
        this.getData();
    }

    public getData() {
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
        this.name = '';
        this.price = '';
    }

    public async storePaket(): Promise<void> {
        const url = 'http://localhost:8000/api/paket/store';

        fetch(url, {
            method: 'post',
            body: JSON.stringify({'id': this.id, 'name': this.name, 'price': this.price}),
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

    public setPaket(_id: string, _name: string, _price: string) {
        // console.log(_id, _name, _price);
        this.id = _id;
        this.name = _name;
        this.price = _price;
    }

    public deletePaket(_id: string) {
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
