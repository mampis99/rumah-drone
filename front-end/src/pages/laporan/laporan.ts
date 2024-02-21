/* eslint-disable prettier/prettier */
import {Component, Vue} from 'vue-facing-decorator';
import {useToast} from 'vue-toastification';


@Component({})
export default class Blank extends Vue {

    public id: string = '';

    public isChecked: boolean = false;
    public pakets: any[] = [];
    public customers: any[] = [];
    private toast = useToast();

    public mounted(): void {
        this.getData();
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
        
    }

    public handleTextChange(event: any) {
        // console.log(event.target.checked);
        this.isChecked = event.target.checked;
        this.id = event.target.id;

        const url = 'http://localhost:8000/api/customer/acc';

        fetch(url, {
            method: 'post',
            body: JSON.stringify(
                                    {
                                        'id': this.id, 
                                        'is_checked': this.isChecked,
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
}
