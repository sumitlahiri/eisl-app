import { Member } from './Member';

export interface VisitDetail {
  providerId: string,
  providerName: string,
  ehrName: string,
  ehrImageSrc: string,
  lastVisitDate: any,
  source: string,
  member: Member,
  isActive: boolean
}
