export class Channel {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly userId: string,
    public readonly photoURL: string,
    public uid: string = '',
  ) {}
}
