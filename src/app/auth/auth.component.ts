import {AfterViewInit, Component} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {MdSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import ApplicationVerifier = firebase.auth.ApplicationVerifier;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements AfterViewInit {
  public userData = {
    number: '',
    confirmationCode: ''
  };
  public isLoading = false;
  public confirmationRequired = false;
  public recaptchaVerifier: ApplicationVerifier;
  public confirmationResult;


  constructor(public afAuth: AngularFireAuth, public snackBar: MdSnackBar, public router: Router) {
  }

  register() {
    this.isLoading = true;
    this.afAuth.auth.signInWithPhoneNumber(this.userData.number, this.recaptchaVerifier).then(function (cRes) {
      this.isLoading = false;
      this.confirmationRequired = true;
      this.confirmationResult = cRes;
    }.bind(this)).catch(function (error) {
      // Error; SMS not sent
      this.isLoading = false;
      this.snackBar.open(error.message, 'Close');
    }.bind(this));
  }

  confirm() {
    this.isLoading = true;
    this.confirmationResult.confirm(this.userData.confirmationCode).then(function (result) {
      this.isLoading = false;
      this.snackBar.open('Login erfolgreich!', 'Close');
      this.router.navigate(['/']);
    }.bind(this)).catch(function (error) {
      this.isLoading = false;
      this.snackBar.open('Es ist ein unbekannter Fehler aufgetreten!', 'Close');
    }.bind(this));

  }

  ngAfterViewInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('register', {
      'size': 'invisible'
    });
  }

}
