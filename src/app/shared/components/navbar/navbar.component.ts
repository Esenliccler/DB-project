import { filter, tap } from 'rxjs';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  animations: [
    trigger('dropdown', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => visible', animate('300ms linear')),
      transition('visible => void', animate('500ms linear')),
    ]),
  ],
})
export class NavBarComponent implements OnInit {
  pageTitleSignal: WritableSignal<string> = signal('');
  userName!: string;
  profileImg: string = 'assets/logo.png';
  dropdownVisibleSignal: WritableSignal<boolean> = signal(false);

  @ViewChild('dropdownList') dropdownList!: ElementRef;
  ulElement!: HTMLElement;

  constructor(
    private readonly _router: Router,
    private readonly _renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.setPageTitleBasedOnUrl(this._router.url);

    this._router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        tap((event: NavigationEnd) => {
          this.setPageTitleBasedOnUrl(event.urlAfterRedirects);
        })
      )
      .subscribe();

    if (localStorage.getItem('lieferspatz-user')) {
      this.userName = `${
        JSON.parse(localStorage.getItem('lieferspatz-user') ?? '').userName
      }`;
    }
  }

  private setPageTitleBasedOnUrl(url: string): void {
    switch (url) {
      case '/lieferspatz/home':
        this.pageTitleSignal.set('Home Page');
        break;
      default:
        this.pageTitleSignal.set(this.extractPageTitleFromUrl(url));
    }
  }

  private extractPageTitleFromUrl(url: string): string {
    const segments: Array<string> = url.split('/');
    const page: string = segments[segments.length - 2];
    const id: string = segments[segments.length - 1];

    switch (page) {
      case 'item':
        return `Viewing item /#${id}/`;
      default:
        return 'ERROR';
    }
  }

  public toggleDropdown(): void {
    this.dropdownVisibleSignal.set(!this.dropdownVisibleSignal());
    this.ulElement = this.dropdownList.nativeElement;

    if (this.dropdownVisibleSignal()) {
      this._renderer.setStyle(this.ulElement, 'display', 'block');
    } else {
      this._renderer.setStyle(this.ulElement, 'display', 'none');
    }
  }

  public logout(): void {
    localStorage.removeItem('lieferspatz-user');
    this._router.navigate(['/login']);
  }
}
