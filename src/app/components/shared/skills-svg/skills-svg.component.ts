import { Component, OnInit } from '@angular/core';
import { Lightbox, LightboxConfig } from 'angular2-lightbox';

@Component({
  selector: 'app-skills-svg',
  templateUrl: './skills-svg.component.html',
  styleUrls: ['./skills-svg.component.less']
})
export class SkillsSvgComponent implements OnInit {
  image: any = {
    src: '/assets/skills.png',
    // caption: `<a href="/assets/skills.png" target="_blank">open</a>`,
    caption: '',
    thumb: '/assets/skills_thumbs.png'
  };

  constructor(private lightbox: Lightbox, private lighboxConfig: LightboxConfig) {
  }

  ngOnInit() {
    // override default config
    this.lighboxConfig.centerVertically = true;
    this.lighboxConfig.fitImageInViewPort = true;
  }

  open(): void {
    console.log('[skills-svg.component][open]:');
    // open lightbox
    const albums = [];
    albums.push(this.image);
    this.lightbox.open(albums, 0);
  }

}
