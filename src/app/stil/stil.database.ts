import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';
import {DataSource} from '@angular/cdk';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class StilbluetenDatabase {
  dataChange: BehaviorSubject<Stilbluete[]> = new BehaviorSubject<Stilbluete[]>([]);
  private connected = false;

  get data(): Stilbluete[] {
    return this.dataChange.value;
  }

  constructor(public fbDatabase: AngularFireDatabase, public fbAuth: AngularFireAuth) {
    this.fbAuth.authState.subscribe(() => {
      this.connect();
    });
  }

  public connect() {
    if (this.connected) {
      return;
    }
    this.fbDatabase.database.ref('/users/' + this.fbAuth.auth.currentUser.displayName.trim() + '/stilblueten')
      .on('value', function (snapshot) {
        let data = [];
        if (snapshot.val() != null) {
          data = Object.entries(snapshot.val()).map(([key, value]) => {
            value.id = key;
            return value;
          });
        }
        this.dataChange.next(data);
      }.bind(this));
    this.connected = true;
  }


  public addStilbluete(stilbluete: Stilbluete) {
    stilbluete.uid = this.fbAuth.auth.currentUser.uid;
    const newKey = this.fbDatabase.database.ref().child('stilblueten').push().key;
    const updates = {};
    updates['/stilblueten/' + newKey] = stilbluete;
    updates['/users/' + this.fbAuth.auth.currentUser.displayName.trim() + '/stilblueten/' + newKey] = stilbluete;
    this.fbDatabase.database.ref().update(updates);
  }

  public removeStilbluete(stilbluete: Stilbluete) {
    const updates = {};
    updates['/stilblueten/' + stilbluete.id] = null;
    updates['/users/' + this.fbAuth.auth.currentUser.displayName.trim() + '/stilblueten/' + stilbluete.id] = null;
    this.fbDatabase.database.ref().update(updates);
  }
}

export class StilbluetenDataSource extends DataSource<any> {
  constructor(private _exampleDatabase: StilbluetenDatabase) {
    super();
  }

  connect(): Observable<Stilbluete[]> {
    return this._exampleDatabase.dataChange;
  }

  disconnect() {
  }
}


export class Stilbluete {
  constructor(uid: string, creator_name: string, content: string, course: string, author: string) {
    this.uid = uid;
    this.creator_name = creator_name;
    this.timestamp = Date.now();
    this.content = content;
    this.course = course;
    this.author = author;
  }

  id: string;
  uid: string;
  creator_name: string;
  timestamp: number;
  content: string;
  course: string;
  author: string;
}
