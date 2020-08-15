import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SetnameComponent } from './setname/setname.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GroupProfileComponent } from './group-profile/group-profile.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { EditComponent } from './edit/edit.component';
import { EditGroupComponent } from './edit-group/edit-group.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  { path: 'groups/:name/edit', pathMatch: "full", component: EditGroupComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'users/:name/edit', pathMatch: "full", component: EditComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'users/:name', component: UserProfileComponent },
  { path: 'groups/:name', component: GroupProfileComponent  },
  { path: 'login', pathMatch: "full", component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome } },
  { path: '', pathMatch: "full", component: HomeComponent},
  { path: 'name', pathMatch: "full", component: SetnameComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
