import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {MdDialogRef} from '@angular/material';
import {Comment, CommentDatabase} from '../comment.database';
import {Lehrer, Schueler} from '../../data';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  public inputData = {
    target: '',
    content: ''
  };
  public validTargets = [];

  constructor(public commentDatabase: CommentDatabase,
              public auth: AngularFireAuth,
              public dialogRef: MdDialogRef<CreateCommentComponent>) {
  }

  ngOnInit() {
    const alreadyCommented = this.commentDatabase.getAlreadyCommentedPeople();
    this.validTargets = Schueler.concat(Lehrer).filter(value => {
      return alreadyCommented.indexOf(value) === -1;
    });
  }

  create() {
    this.commentDatabase.addComment(
      new Comment(
        this.auth.auth.currentUser.uid,
        this.auth.auth.currentUser.displayName,
        this.inputData.content,
        this.inputData.target
      ));
    this.dialogRef.close();
  }

}
