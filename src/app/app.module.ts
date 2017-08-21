import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {LoaderComponent} from './layout/loader/loader.component';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppRouterModule} from './router/router.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdSelectModule,
  MdSnackBarModule,
  MdTableModule,
  MdToolbarModule
} from '@angular/material';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AdminGuard, AuthGuard, PreAuthGuard, UnauthedGuard} from './auth.guard';
import {StilbluetenDatabase} from './stil/stil.database';
import {FinishProfileComponent} from './finish-profile/finish-profile.component';
import {DeleteDialogComponent, StilComponent} from './stil/stil.component';
import {CdkTableModule} from '@angular/cdk';
import {CreateStilblueteComponent} from './stil/create-stilbluete/create-stilbluete.component';
import {CreateCommentComponent} from './comment/create-comment/create-comment.component';
import {CommentDatabase} from './comment/comment.database';
import {CommentComponent} from './comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoaderComponent,
    NavbarComponent,
    StilComponent,
    FinishProfileComponent,
    CreateStilblueteComponent,
    DeleteDialogComponent,
    CreateCommentComponent,
    CommentComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRouterModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MdAutocompleteModule,
    MdSelectModule,
    MdTableModule,
    CdkTableModule,
    MdDialogModule
  ],
  entryComponents: [
    CreateStilblueteComponent,
    DeleteDialogComponent,
    CreateCommentComponent
  ],
  providers: [
    AuthGuard,
    UnauthedGuard,
    AdminGuard,
    PreAuthGuard,
    StilbluetenDatabase,
    CommentDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
