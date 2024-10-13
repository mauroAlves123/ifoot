import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  senha: string = '';

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  
  async loginGoogle(){
    await this.firebaseService.loginGoogle()
  }

  async entrarLogin(){
    await this.firebaseService.entrarLogin(this.email, this.senha);
  }

}
