export class Mood{
  public moodDescription: string;
  public moodValue: string;

  constructor(desc: string, val: string){
    this.moodDescription = desc;
    this.moodValue = val;
  }
}
