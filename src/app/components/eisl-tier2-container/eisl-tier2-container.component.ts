import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eisl-tier2-container',
  templateUrl: './eisl-tier2-container.component.html',
  styleUrls: ['./eisl-tier2-container.component.css', '../../../assets/css/common.css']
})
export class EislTier2ContainerComponent implements OnInit {

  constructor(private router: Router) { }

  selectService(param: string) {
    if (param == 'schedule') {
      this.router.navigate(['/onDemandScheduling']);
    } else if (param == 'queryHome') {
      this.router.navigate(['/onDemandMemberQueryHome']);
    }
  }

  goHome(){
    this.router.navigate(['/']);
  }

  goConstructionPage(){
    this.router.navigate(['/underConstruction']);
  }

  ngOnInit() {
  }

}
