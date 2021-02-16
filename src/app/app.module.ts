import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FooterComponent } from './footer/footer.component';
import { SocialIconComponent } from './footer/social-icon/social-icon.component';
import { InfoSectionComponent } from './shared/info-section/info-section.component';
import { HomeComponent } from './home/home.component';
import { RoadmapComponent } from './home/roadmap/roadmap.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectItemComponent } from './projects/project-list/project-item/project-item.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { BlogComponent } from './blog/blog.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogPostComponent } from './blog/blog-list/blog-post/blog-post.component';
import { BlogPostDetailComponent } from './blog/blog-post-detail/blog-post-detail.component';
import { BlogPostEditComponent } from './blog/blog-post-detail/blog-post-edit/blog-post-edit.component';
import { ContactComponent } from './contact/contact.component';
import { ExperienceComponent } from './experience/experience.component';
import { SkillsListComponent } from './experience/skills-list/skills-list.component';
import { SkillItemComponent } from './experience/skills-list/skill-item/skill-item.component';
import { SkillDetailComponent } from './experience/skill-detail/skill-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AppRoutingModule } from './app-routing.module';
import { RoadmapNodeComponent } from './home/roadmap/roadmap-node/roadmap-node.component';
import { ProjectMoodComponent } from './projects/project-list/project-item/project-mood/project-mood.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { ManageProjectsComponent } from './admin/manage-projects/manage-projects.component';
import { ManageBlogsComponent } from './admin/manage-blogs/manage-blogs.component';
import { ManageSkillsComponent } from './admin/manage-skills/manage-skills.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SocialIconComponent,
    InfoSectionComponent,
    HomeComponent,
    RoadmapComponent,
    ProjectsComponent,
    ProjectListComponent,
    ProjectItemComponent,
    ProjectDetailComponent,
    BlogComponent,
    BlogListComponent,
    BlogPostComponent,
    BlogPostDetailComponent,
    BlogPostEditComponent,
    ContactComponent,
    ExperienceComponent,
    SkillsListComponent,
    SkillItemComponent,
    SkillDetailComponent,
    PageNotFoundComponent,
    RoadmapNodeComponent,
    ProjectMoodComponent,
    AdminComponent,
    ManageProjectsComponent,
    ManageBlogsComponent,
    ManageSkillsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    AppRoutingModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatExpansionModule,
    MatChipsModule,
    MatGridListModule,
    MatSliderModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
