export class User {
  constructor(
    public email: string | null,
    public userName: string,
    public firstName: string,
    public lastName: string,
    public dateOfBirth: Date,
    public profilePhoto: string | null
  ) {}
}
