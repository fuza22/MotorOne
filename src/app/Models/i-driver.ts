export interface IDriver {
  [x: string]: any;

  id: number;
  permanentNumber: number;
  givenName: string;
  familyName: string;
  dateOfBirth: Date;
  nationality: string;

}
