import { Component, OnInit } from '@angular/core';
import { Member } from '../../../models/member';
import { VitalSigns } from '../../../models/vital-signs';
import { VisitDetail } from '../../../models/visit-detail';
import { Router } from '@angular/router';
import { MemberService } from '../../../services/member.service';
import { ResourceResolverService } from '../../../services/resource-resolver.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-member-query-home',
  templateUrl: './member-query-home.component.html',
  styleUrls: ['./member-query-home.component.css', '../../../../assets/css/common.css']
})
export class MemberQueryHomeComponent implements OnInit {
  member: Member;
  members: Member[];
  visits: VisitDetail[];
  showError: boolean = false;
  today: any;
  pipe: any;
  filterStartDate: any;
  filterEndDate: any;
  showFilterByStartDate: boolean = false;
  showFilterBySource: boolean = false;
  showAddProvider: boolean = false;
  showResourceSection: boolean = false;
  form: FormGroup;
  patientClaimsChkBox: boolean = true;
  patientClaims = [
    { id: 'claims', name: 'Claims' },
    { id: 'priorAuth', name: 'Prior Auth' },
    { id: 'eligibility', name: 'Eligibility' }
  ]

  visitDate: Date;
  selectedEMR: string = '';
  selectedProvider: string = '';
  vitalsigns: string = '';
  errorInServiceCall: boolean = false;
  errorText: string = '';

  constructor(private router: Router, private memberService: MemberService, private formBuilder: FormBuilder, private spinner: NgxSpinnerService, private resourceService: ResourceResolverService) {
    this.formReset();

    const controls = this.patientClaims.map(c => new FormControl(true));
    this.form = this.formBuilder.group({
      patientClaims: new FormArray(controls)
    });
  }

  ngOnInit() {
    this.pipe = new DatePipe('en-US');
    this.today = this.pipe.transform(new Date(), 'MM-dd-yyyy');
  }

  goHome() {
    this.router.navigate(['/']);
  }

  goSelectService() {
    this.router.navigate(['/onDemandScheduling']);
  }

  findVisitDetails(firstName: string, lastName: string, memberId: string): VisitDetail[] {
    this.members = this.memberService.getMemberDetails();
    this.showResourceSection = false;

    for (var ind = 0; ind < this.members.length; ind++) {
      if (this.members[ind].lastName == lastName || this.members[ind].firstName == firstName || this.members[ind].memberId == memberId) {
        this.visits = this.memberService.getVisitDetails(memberId);
        this.member = this.members[ind];
        this.showError = false;
      }
    }

    if (this.visits.length == 0) {
      this.formReset();
      this.showError = true;
    }

    console.log('Visits Length :' + this.visits.length);
    return this.visits;
  }

  formReset() {
    this.showError = false;
    this.members = [
      {
        firstName: "",
        lastName: "",
        dob: "",
        memberId: ""
      }
    ]
    this.member = this.members[0];

    this.visits = [];
    this.members = [];
    this.showFilterByStartDate = false;
    this.filterStartDate = null;
    this.filterEndDate = null;
    this.showResourceSection = false;
  }

  filterByDateRange() {
    console.log(" In filterByDateRange");
    this.showFilterByStartDate = true;
    this.showFilterBySource = false;
    this.showAddProvider = false;
  }

  filterBySource() {
    console.log(" In filterBySource");
    this.showFilterBySource = true;
    this.showFilterByStartDate = false;
    this.showAddProvider = false;


  }

  filterByAddProvider() {
    console.log(" In filterByAddProvider");
    this.showAddProvider = true;
    this.showFilterBySource = false;
    this.showFilterByStartDate = false;
  }

  filterVisitByDateRange(filterStartDate: any, filterEndDate: any) {
    console.log(" In filterVisitByDateRange, startDate: " + filterStartDate + ' endDate: ' + filterEndDate);
    this.filterStartDate = this.pipe.transform(new Date(filterStartDate), 'MM-dd-yyyy');
    this.filterEndDate = this.pipe.transform(new Date(filterEndDate), 'MM-dd-yyyy');

    for (var ind = 0; ind < this.visits.length; ind++) {
      this.visitDate = this.pipe.transform(new Date(this.visits[ind].lastVisitDate), 'MM-dd-yyyy');
      if (this.filterStartDate > this.visitDate || this.visitDate > this.filterEndDate) {
        this.visits[ind].isActive = false;
      }
    }
  }

  filterVisitBySource(patientClaim: string, event: any) {
    console.log(" In filterVisitBySource " + event.target.checked + " , " + patientClaim);
    for (var ind = 0; ind < this.visits.length; ind++) {
      if (this.visits[ind].source == patientClaim && !event.target.checked) {
        this.visits[ind].isActive = false;
      }
    }
  }

  filterReset(param: string) {
    //'dvFilterByDateRange'
    if (param == 'dvFilterByDateRange') {
      for (var ind = 0; ind < this.visits.length; ind++) {
        this.visits[ind].isActive = true;
      }
    } else if (param == 'dvFilterBySource') { //'dvFilterBySource'
      for (var ind = 0; ind < this.visits.length; ind++) {
        this.visits[ind].isActive = true;
      }
      const controls = this.patientClaims.map(c => new FormControl(true));
      this.form = this.formBuilder.group({
        patientClaims: new FormArray(controls)
      });
    }
  }

  getResourceList(selectedEMR: string, selectedProvider: string) {
    console.log(" In getResourceList ");
    this.showResourceSection = true;
    this.selectedEMR = selectedEMR;
    this.selectedProvider = selectedProvider;

    this.getVitalSigns('','','');
  }

  getVitalSigns(ehrId: string, patientId: string, emrName: string) {
    console.log(" In getVitalSigns ");
    this.spinner.show();

    this.resourceService.resolveGetVitalSigns('1', '10002752').subscribe((data: VitalSigns) => {
      if (data.error == null) {
        console.log("In MemberQuery Component, getVitalSigns, in Subscribe :" + data.vitalsigns);
        this.vitalsigns = data.vitalsigns;
        this.errorInServiceCall = false;
        this.spinner.hide();
      } else {
        this.errorText = data.error;
        this.errorInServiceCall = true;
        this.spinner.hide();
      }
    })
  }
}
