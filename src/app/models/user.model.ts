export class User {
  public readonly favChats: string[];
  constructor(
    public readonly displayName: string,
    public readonly photoURL: string,
    public readonly uid: string,
    public readonly email: string,
    public readonly nickname: string,
    public readonly isOnline: boolean = true,
  ) {}
}
