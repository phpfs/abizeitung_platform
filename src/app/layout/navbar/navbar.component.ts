import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.afAuth.auth.signOut().then(function () {
      this.router.navigate(['/auth']);
    }.bind(this));
  }

}
