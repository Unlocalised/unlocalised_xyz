export class Skill{
  skillName: string;
  skillNumber: string;
  skillLevel: string;
  skillImagePath: string;
  skillAchievements: {title:string, info:string}[];
  skillDetails: {title: string, info: string} [];
  isWorkHistory: boolean;
  _id?:string;

    constructor(name: string, num : string, lvl : string, imgPath: string, achievements: {title:string, info:string}[], details: {title: string, info: string} [], workHistory: boolean){
        this.skillName = name;
        this.skillNumber = num;
        this.skillLevel = lvl;
        this.skillImagePath = imgPath;
        this.skillAchievements = achievements;
        this.skillDetails = details;
        this.isWorkHistory = workHistory;
    }
}
