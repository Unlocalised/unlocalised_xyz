import { Mood } from './project-list/project-item/project-mood/mood.model';

export class Project{
    public summaryTitle: string;
    public summaryDetail: string;
    public projectQuote: string;
    public quoteCitation: string;
    public projectMoods: Mood[];
    public technologiesUsed: string[];
    public projectSummaryImagePath: string;
    public backgroundMotivationText: string;
    public challengesText: string;
    public lessonsText: string;
    public responsibilitiesText: string;
    public testimonials: string[];
    public carouselImagePaths: string[];
    public toolsUsed: string[];
    public sourceCodeLink: string;
    public blogPostLink: string;
    public demoSiteLink: string;
    public _id?: string;

    constructor(title: string, smryDetail : string, quote : string, cite: string, moods: Mood[], techstack: string[], imgPath
      , backgroundMotivation: string, challengesTxt: string, lessons: string, responsibility: string, testimonials: string[], carouselPaths: string[], tools: string[]
      , sourceCode: string, blogPost: string, demoSite: string ){
        this.summaryTitle = title;
        this.summaryDetail = smryDetail;
        this.projectQuote = quote;
        this.quoteCitation = cite;
        this.projectMoods = moods;
        this.technologiesUsed = techstack;
        this.projectSummaryImagePath = imgPath;
        this.backgroundMotivationText = backgroundMotivation;
        this.challengesText = challengesTxt;
        this.lessonsText = lessons;
        this.responsibilitiesText = responsibility;
        this.testimonials = testimonials;
        this.carouselImagePaths = carouselPaths;
        this.toolsUsed = tools;
        this.sourceCodeLink = sourceCode;
        this.blogPostLink = blogPost;
        this.demoSiteLink = demoSite;
    }
}
