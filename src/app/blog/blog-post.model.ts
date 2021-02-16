export class BlogPost{
    public title: string;
    public subtitle: string;
    public excerpt: string;
    public tags: string[];
    public sections: string[];
    public mainBlogImagePath: string;
    public postImages: string[];
    public imagesPerParagraph: number;
    public bottomImage: string;
    public _id?: string;

    constructor(blogTitle: string, blogSubtitle: string, blogExcerpt: string, blogTags: string[], blogSections: string[], blogPrimaryImagePath: string, imagesForPost: string[], imgPerParagraph: number, imageOnBottom: string){
       this.title = blogTitle;
       this.subtitle = blogSubtitle;
       this.excerpt = blogExcerpt;
       this.tags = blogTags;
       this.sections = blogSections;
       this.mainBlogImagePath = blogPrimaryImagePath;
       this.postImages = imagesForPost;
       this.imagesPerParagraph = imgPerParagraph;
       this.bottomImage = imageOnBottom;
    }
}
