import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private userSubject: BehaviorSubject<firebase.User | null> = new BehaviorSubject<firebase.User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private storage: Storage
  ) {
    this.initStorage();

    this.angularFireAuth.authState.subscribe(user => {
      this.userSubject.next(user);
      if (user) {
        this.saveUserToStorage(user);
      } else {
        this.clearUserFromStorage();
      }
    });
  }

  async initStorage() {
    await this.storage.create();
  }

  async loginGoogle() {
    try {
      await this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Erro ao entrar com o Google', error);
    }
  }

  async logoutGoogle() {
    try {
      await this.angularFireAuth.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao sair com o Google', error);
    }
  }

  async criarLogin(email: string, senha: string) {
    try {
      await this.angularFireAuth.createUserWithEmailAndPassword(email, senha);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Não foi possível criar sua conta', error);
    }
  }

  async entrarLogin(email: string, senha: string) {
    try {
      await this.angularFireAuth.signInWithEmailAndPassword(email, senha);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Não foi possível fazer login', error);
    }
  }

  async saveUserToStorage(user: firebase.User) {
    try {
      await this.storage.set('currentUser', {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
    } catch (error) {
      console.error('Erro ao salvar usuário no storage', error);
    }
  }

  async clearUserFromStorage() {
    try {
      await this.storage.remove('currentUser');
    } catch (error) {
      console.error('Erro ao limpar usuário do storage', error);
    }
  }

  async getUserFromStorage(): Promise<any> {
    try {
      const user = await this.storage.get('currentUser');
      return user;
    } catch (error) {
      console.error('Erro ao recuperar usuário do storage', error);
      return null;
    }
  }
}
