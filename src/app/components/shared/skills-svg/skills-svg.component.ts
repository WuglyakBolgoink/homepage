import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills-svg',
  templateUrl: './skills-svg.component.html'
})
export class SkillsSvgComponent implements OnInit {
  image: any = {
    src: '/assets/skills.png',
    thumb: '/assets/skills_thumbs.png'
  };

  constructor() {
  }

  ngOnInit() {
  }
}
