import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../shared/components/navbar/navbar.component';

@Component({
  selector: 'najeb-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterModule, NavBarComponent],
})
export class ContentComponent {}
