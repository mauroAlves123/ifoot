import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  paySucess: boolean = false;
  totalAmount: number = 0;
  delivery: number = 5.00;
  deliveryTime: number = 30;
  paymentMethods: string[] = ['Cartão', 'Pix'];
  selectedPaymentMethod: string = '';
  total: number = 0;
  pixCode: string = '';
  logradouro: string = '';
  complemento: string = '';
  numero: string = '';
  cep: string = '';

  constructor(
    private route: ActivatedRoute,
    private cepService: CepService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params['totalAmount']) {
        this.totalAmount = +params['totalAmount'];
        this.total = this.totalAmount + this.delivery;
      }
    });
  }

  async pay() {
    this.paySucess = true;
  }

  handlePaymentMethodChange() {
    if (this.selectedPaymentMethod === 'Pix') {
      this.generatePixCode();
    }
  }

  generatePixCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 20; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    this.pixCode = code;
  }

  buscarCEP() {
    if (this.cep) {
      this.cepService.buscarCep(this.cep).subscribe(
        data => {
          console.log(data)
          this.logradouro = `${data.logradouro}, ${data.bairro} - ${data.localidade}, ${data.uf}`;
          this.complemento = data.complemento;
        },
        error => {
          console.error('Erro ao buscar CEP', error);
        }
      );
    }
  }
}
