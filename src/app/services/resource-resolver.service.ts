import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ResourceService } from './resource.service';
import { VitalSigns } from '../models/vital-signs';

@Injectable({
  providedIn: 'root'
})
export class ResourceResolverService {

  constructor(private resourceService: ResourceService) { }

  resolveGetVitalSigns(ehrId: string, patientId: string): Observable<VitalSigns> {
    return this.resourceService.getVitalSigns(ehrId, patientId)
      .pipe(
      map((vitalsigns) => new VitalSigns(vitalsigns)),
      catchError((err: any) => of(new VitalSigns(null, err)))
      );
  }
}
