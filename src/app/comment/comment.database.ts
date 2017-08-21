import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';
import {DataSource} from '@angular/cdk';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CommentDatabase {
  dataChange: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);
  private connected = false;

  get data(): Comment[] {
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
    this.fbDatabase.database.ref('/users/' + this.fbAuth.auth.currentUser.displayName.trim() + '/comment')
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

  public addComment(comment: Comment) {
    comment.uid = this.fbAuth.auth.currentUser.uid;
    comment.id = comment.target.trim() + '-' + this.fbAuth.auth.currentUser.displayName.trim();
    const updates = {};
    updates['/comment/' + comment.id] = comment;
    updates['/users/' + this.fbAuth.auth.currentUser.displayName.trim() + '/comment/' + comment.target.trim()] = comment;
    this.fbDatabase.database.ref().update(updates);
  }

  public removeComment(comment: Comment) {
    const updates = {};
    updates['/comment/' + comment.id] = null;
    updates['/users/' + this.fbAuth.auth.currentUser.displayName.trim() + '/comment/' + comment.target.trim()] = null;
    this.fbDatabase.database.ref().update(updates);
  }

  public getAlreadyCommentedPeople(): string[] {
    return this.data.map(value => value.target);
  }
}

export class CommentDataSource extends DataSource<any> {
  constructor(private _exampleDatabase: CommentDatabase) {
    super();
  }

  connect(): Observable<Comment[]> {
    return this._exampleDatabase.dataChange;
  }

  disconnect() {
  }
}


export class Comment {
  constructor(uid: string, creator_name: string, content: string, target: string) {
    this.uid = uid;
    this.creator_name = creator_name;
    this.timestamp = Date.now();
    this.content = content;
    this.target = target;
  }

  id: string;
  uid: string;
  creator_name: string;
  timestamp: number;
  content: string;
  target: string;
}
