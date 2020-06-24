export interface IContact {
  name: string;
  gender: Gender;
  email?: string;
  phone?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female'
}
