import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SkillDetailComponent } from '../../skill-detail/skill-detail.component';
import { Skill } from '../../skill.model';

@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.css']
})
export class SkillItemComponent implements OnInit {

  @Input() skillItem: Skill;

  constructor(public dialog: MatDialog) {}

  openDialog() {
    console.log("Got skill item", this.skillItem)
    this.dialog.open(SkillDetailComponent, {panelClass: 'skill-detail-dialog', data: this.skillItem, maxHeight: '100vh'});
  }

  ngOnInit(): void {
  }


}
