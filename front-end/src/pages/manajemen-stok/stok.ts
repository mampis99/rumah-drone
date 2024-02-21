/* eslint-disable prettier/prettier */
import {Component, Vue} from 'vue-facing-decorator';
import {useToast} from 'vue-toastification';


@Component({})
export default class Blank extends Vue {

    public id: string = '';

    public isChecked: boolean = false;
    public pakets: any[] = [];
    public barangs: any[] = [];
    private toast = useToast();

    public mounted(): void {
        this.getData();
    }

    public getData() {
        this.barangs = [];

        const url = 'http://localhost:8000/api/stok/data';
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res.data);
                
                this.barangs = res.data;
            });
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
