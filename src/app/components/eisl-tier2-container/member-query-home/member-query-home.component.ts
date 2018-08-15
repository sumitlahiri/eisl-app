import { Component, OnInit } from '@angular/core';
import { Member } from '../../../models/member';
import { VisitDetail } from '../../../models/visit-detail';
import { Router } from '@angular/router';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'app-member-query-home',
  templateUrl: './member-query-home.component.html',
  styleUrls: ['./member-query-home.component.css', '../../../../assets/css/common.css']
})
export class MemberQueryHomeComponent implements OnInit {
  member: Member;
  members: Member[];
  visits: VisitDetail[];

  constructor(private router: Router, private memberService: MemberService) {
    // this.members = [
    //   {
    //     firstName: "",
    //     lastName: "",
    //     dob: "",
    //     memberId: ""
    //   }
    // ]
    // this.member = this.members[0];
    this.formReset();
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['/']);
  }

  goSelectService() {
    this.router.navigate(['/onDemandScheduling']);
  }

  findVisitDetails(firstName: string, lastName: string, memberId: string): VisitDetail[] {
    this.members = this.memberService.getMemberDetails();

    for (var ind = 0; ind < this.members.length; ind++) {
      if (this.members[ind].lastName == lastName || this.members[ind].firstName == firstName || this.members[ind].memberId == memberId) {
        this.visits = this.memberService.getVisitDetails(memberId);
      } else {
        this.formReset();
      }
    }
    console.log('Visits Length :' + this.visits.length);
    return this.visits;
  }

  formReset() {
    this.members = [
      {
        firstName: "",
        lastName: "",
        dob: "",
        memberId: ""
      }
    ]
    this.member = this.members[0];

    this.visits = [
      {
        providerId: "",
        providerName: "",
        ehrName: "",
        ehrImageSrc: '',
        lastVisitDate: '',
        source: "",
        isActive: false,
        member: {
          firstName: "",
          lastName: "",
          dob: "",
          memberId: ""
        }
      }
    ]
  }

}
