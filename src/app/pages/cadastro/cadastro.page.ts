import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  email: string = '';
  senha: string = '';
  
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  async criarLogin(){
    await this.firebaseService.criarLogin(this.email, this.senha);
  }

}
