import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { BlogComponent } from './blog/blog.component';
import { BlogPostDetailComponent } from './blog/blog-post-detail/blog-post-detail.component';
import { BlogPostEditComponent } from './blog/blog-post-detail/blog-post-edit/blog-post-edit.component';
import { ContactComponent } from './contact/contact.component';
import { ExperienceComponent } from './experience/experience.component';
import { SkillDetailComponent } from './experience/skill-detail/skill-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { ManageProjectsComponent } from './admin/manage-projects/manage-projects.component';
import { ManageBlogsComponent } from './admin/manage-blogs/manage-blogs.component';
import { ManageSkillsComponent } from './admin/manage-skills/manage-skills.component';
import { AuthGuard } from './admin/auth.guard';

// Flat routing structure of the site - some paths currently commented out as not in use
const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'projects', component: ProjectsComponent},
  { path: 'projects/:id', component: ProjectDetailComponent},
  { path: 'blog', component: BlogComponent},
  { path: 'blog/:id', component: BlogPostDetailComponent},
  // { path: 'blog/:id/edit', component: BlogPostEditComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'experience', component: ExperienceComponent},
  { path: 'experience/:skill', component: SkillDetailComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'admin/manage-projects', component: ManageProjectsComponent, canActivate: [AuthGuard]},
  { path: 'admin/manage-blogs', component: ManageBlogsComponent, canActivate: [AuthGuard]},
  { path: 'admin/manage-skills', component: ManageSkillsComponent, canActivate: [AuthGuard]},
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
