import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {CommentDatabase, CommentDataSource} from './comment.database';
import {CreateCommentComponent} from './create-comment/create-comment.component';
import {DeleteDialogComponent} from '../stil/stil.component';

@Component({
  selector: 'app-stil',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  public dataSource: CommentDataSource | null;
  public displayedColumns = ['target', 'content', 'action'];

  constructor(public commentDatabase: CommentDatabase, public dialog: MdDialog) {
    this.dataSource = new CommentDataSource(commentDatabase);
  }

  ngOnInit() {
  }

  create() {
    this.dialog.open(CreateCommentComponent, {
      panelClass: 'overlay',
    });
  }

  remove(comment) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.commentDatabase.removeComment(comment);
      }
    });
  }
}
