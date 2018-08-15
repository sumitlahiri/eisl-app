import { Injectable } from '@angular/core';
import { Member } from '../models/Member';
import { VisitDetail } from '../models/visit-detail';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  members: Member[];
  visits: VisitDetail[];

  constructor() {
    //this.getVisitDetails('118800657');
    this.getMemberDetails();
  }

  getMemberDetails(): Member[] {
    this.members = [
      {
        firstName: "Fred",
        lastName: "Smart",
        dob: "08-24-1965",
        memberId: "118800657"
      }
    ]

    return this.members;
  }

  getVisitDetails(memberId: string): VisitDetail[] {
    this.visits = [
      {
        providerId: "12235678",
        providerName: "John Medical",
        ehrName: "Allscripts",
        ehrImageSrc: './assets/images/allscripts-logo-green-gray-2x.png',
        lastVisitDate: '06-13-2013',
        source: "Claims",
        isActive: true,
        member: {
          firstName: "Fred",
          lastName: "Smart",
          dob: "08-24-1965",
          memberId: "118800657"
        }
      },
      {
        providerId: "66234487",
        providerName: "Elmhurst Hospital",
        ehrName: "Cerner",
        ehrImageSrc: './assets/images/Cerner_RGB_Standard_ horizontal.png',
        lastVisitDate: '06-15-2013',
        source: "Claims",
        isActive: true,
        member: {
          firstName: "Fred",
          lastName: "Smart",
          dob: "08-24-1965",
          memberId: "118800657"
        }
      },
      {
        providerId: "87456654",
        providerName: "Florida Orlando Hospital",
        ehrName: "Cerner",
        ehrImageSrc: './assets/images/Cerner_RGB_Standard_ horizontal.png',
        lastVisitDate: '06-20-2013',
        source: "Prior Auth",
        isActive: true,
        member: {
          firstName: "Fred",
          lastName: "Smart",
          dob: "08-24-1965",
          memberId: "118800657"
        }
      },
      {
        providerId: "99762238",
        providerName: "Methodist University Hospital",
        ehrName: "Allscripts",
        ehrImageSrc: './assets/images/allscripts-logo-green-gray-2x.png',
        lastVisitDate: '06-20-2013',
        source: "Prior Auth",
        isActive: true,
        member: {
          firstName: "Fred",
          lastName: "Smart",
          dob: "08-24-1965",
          memberId: "118800657"
        }
      },
      {
        providerId: "55439865",
        providerName: "CareFirst Clinic",
        ehrName: "Allscripts",
        ehrImageSrc: './assets/images/allscripts-logo-green-gray-2x.png',
        lastVisitDate: '06-28-2013',
        source: "Eligibility",
        isActive: true,
        member: {
          firstName: "Fred",
          lastName: "Smart",
          dob: "08-24-1965",
          memberId: "118800657"
        }
      },
      {
        providerId: "77654976",
        providerName: "NorthWestern Hospital",
        ehrName: "Cerner",
        ehrImageSrc: './assets/images/Cerner_RGB_Standard_ horizontal.png',
        lastVisitDate: '06-08-2013',
        source: "Eligibility",
        isActive: true,
        member: {
          firstName: "Fred",
          lastName: "Smart",
          dob: "08-24-1965",
          memberId: "118800657"
        }
      }
    ]

    return this.visits;
  }
}
