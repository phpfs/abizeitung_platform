import {Component, OnInit} from '@angular/core';
import {Stilbluete, StilbluetenDatabase} from '../stil.database';
import {AngularFireAuth} from 'angularfire2/auth';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-stilbluete',
  templateUrl: './create-stilbluete.component.html',
  styleUrls: ['./create-stilbluete.component.css']
})
export class CreateStilblueteComponent implements OnInit {

  public inputData = {
    course: '',
    content: '',
    author: ''
  };

  constructor(public stilbluetenDatabase: StilbluetenDatabase, public auth: AngularFireAuth, public dialogRef: MdDialogRef<CreateStilblueteComponent>) {
  }

  ngOnInit() {
  }

  create() {
    this.stilbluetenDatabase.addStilbluete(
      new Stilbluete(
        this.auth.auth.currentUser.uid,
        this.auth.auth.currentUser.displayName,
        this.inputData.content,
        this.inputData.course,
        this.inputData.author
      ));
    this.dialogRef.close();
  }

}
