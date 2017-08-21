import {AdminGuard, AuthGuard, PreAuthGuard, UnauthedGuard} from '../auth.guard';
import {AuthComponent} from '../auth/auth.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {FinishProfileComponent} from '../finish-profile/finish-profile.component';
import {StilComponent} from '../stil/stil.component';
import {CommentComponent} from '../comment/comment.component';


const appRoutes: Routes = [
  {path: '', redirectTo: 'stil', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent, canActivate: [UnauthedGuard]},
  {path: 'admin', component: StilComponent, canActivate: [AdminGuard]},
  {path: 'finish-profile', component: FinishProfileComponent, canActivate: [PreAuthGuard]},
  {path: 'stil', component: StilComponent, canActivate: [AuthGuard]},
  {path: 'comment', component: CommentComponent, canActivate: [AuthGuard]},
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
  ]
})
export class AppRouterModule {
}
