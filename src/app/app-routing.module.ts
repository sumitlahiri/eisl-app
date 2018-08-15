import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component';
import { EislTier2ContainerComponent } from './components/eisl-tier2-container/eisl-tier2-container.component';
import { ScheduleComponent } from './components/eisl-tier2-container/schedule/schedule.component';
import { MemberQueryHomeComponent } from './components/eisl-tier2-container/member-query-home/member-query-home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'onDemandServices', component: EislTier2ContainerComponent },
  { path: 'onDemandScheduling', component: ScheduleComponent },
  { path: 'onDemandMemberQueryHome', component: MemberQueryHomeComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
