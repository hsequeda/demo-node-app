export enum PersonGender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export function PersonGenderFromString(val: string): PersonGender {
  switch (val) {
    case PersonGender.Male:
      return PersonGender.Male;
    case PersonGender.Female:
      return PersonGender.Female;
    default:
      return PersonGender.Other;
  }
}
