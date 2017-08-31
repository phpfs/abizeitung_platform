import {Component, OnInit} from '@angular/core';
import {Schueler} from '../data';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {MdSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-finish-profile',
  templateUrl: './finish-profile.component.html',
  styleUrls: ['./finish-profile.component.css']
})
export class FinishProfileComponent implements OnInit {
  public Schueler = Schueler;
  public isLoading = false;
  public userData = {
    name: '',
  };

  constructor(public fbDatabase: AngularFireDatabase, public fbAuth: AngularFireAuth, public snackBar: MdSnackBar, public router: Router) {
  }

  ngOnInit() {
  }

  finish() {
    this.isLoading = true;
    this.fbDatabase.database.ref('/users/' + this.userData.name.trim()).update({
      name: this.userData.name,
      uid: this.fbAuth.auth.currentUser.uid,
    }).then(function () {
      return this.fbAuth.auth.currentUser.updateProfile({
        displayName: this.userData.name,
        photoURL: '',
      });
    }
      .bind(this))
      .then(function () {
        this.isLoading = false;
        this.router.navigate('/stil');
      }.bind(this))
      .catch(function (error) {
        this.isLoading = false;
        if (error.code === 'PERMISSION_DENIED') {
          this.snackBar.open('Du bist bereits mit einer anderen Handynummer registriert!', 'Close');
        } else {
          this.snackBar.open('Es ist ein unbekannter Fehler aufgetreten!', 'Close');
        }
      }.bind(this));
  }
}
