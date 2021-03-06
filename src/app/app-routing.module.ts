import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  {
    path: 'chat',
    loadChildren: './chat/chat.module#ChatPageModule',
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'auth' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'create-channel', loadChildren: './create-channel/create-channel.module#CreateChannelPageModule' },
  { path: 'messages', loadChildren: './chat/chat-shared/messages/messages.module#MessagesPageModule' },
  { path: 'message-settings', loadChildren: './message-settings/message-settings.module#MessageSettingsPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
