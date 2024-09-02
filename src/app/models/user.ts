export class User {
  constructor(
    public userName: string,
    public firstName: string,
    public lastName: string,
    public dateOfBirth: Date,
    public profilePhoto: string | null
  ) {}
}
