import {Component, OnInit} from '@angular/core';
import {StilbluetenDatabase, StilbluetenDataSource} from './stil.database';
import {CreateStilblueteComponent} from './create-stilbluete/create-stilbluete.component';
import {MdDialog} from '@angular/material';

@Component({
  selector: 'app-stil',
  templateUrl: './stil.component.html',
  styleUrls: ['./stil.component.css']
})
export class StilComponent implements OnInit {
  public dataSource: StilbluetenDataSource | null;
  public displayedColumns = ['course', 'content', 'author', 'action'];

  constructor(public stilbluetenDatabase: StilbluetenDatabase, public dialog: MdDialog) {
    this.dataSource = new StilbluetenDataSource(stilbluetenDatabase);
  }

  ngOnInit() {
  }

  create() {
    this.dialog.open(CreateStilblueteComponent, {
      panelClass: 'overlay',
    });
  }

  remove(stilbluete) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.stilbluetenDatabase.removeStilbluete(stilbluete);
      }
    });
  }
}

@Component({
  selector: 'app-dialog-delete',
  template: '<h2 md-dialog-title>Wirklich löschen ?</h2><md-dialog-content>Bist du sicher ?</md-dialog-content><md-dialog-actions>' +
  '  <button md-button md-dialog-close>Nein</button>\n' +
  '  <button md-button color="warn" [md-dialog-close]="true">Ja</button>\n' +
  '</md-dialog-actions>'
})
export class DeleteDialogComponent {


}
