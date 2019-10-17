import { Component } from '@angular/core';
import { NewsService } from './services/news.service';
import { SourceModel } from './models/soruce.model';
import { TranslateService } from '@ngx-translate/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { NewModel } from './models/new.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public date = new Date();
  public sources: SourceModel[] = []
  public news: NewModel[] = [];
  public search = new FormControl('');
  public sections = [
    {
      url: '/top',
      icon: 'icon-news',
      name: 'top'
    },
    {
      url: '/explore',
      icon: 'icon-explore',
      name: 'explore'
    }
  ]

  constructor(
    private newsService: NewsService,
    private translate: TranslateService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry
      .addSvgIcon('icon-news', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/news.svg'))
      .addSvgIcon('icon-explore', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/explore.svg'));
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    this.getNews();
  }

  public async getNews() {
    this.sources = await this.newsService.getSources();
  }

  public async searchNews() {
    if(this.search.value != '') {
      this.news = await this.newsService.searchNews(this.search.value);
    }
  }
}
