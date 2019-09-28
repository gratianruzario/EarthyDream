import {
    Directive,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef
  } from '@angular/core';
import { AuthService } from '../services/auth-service.service';

@Directive({ selector: '[appAuthed]' })
  export class ShowAuthedDirective implements OnInit {
    constructor(
      private templateRef: TemplateRef<any>,
      private userService: AuthService,
      private viewContainer: ViewContainerRef
    ) {}

    condition: boolean;

  @Input() set appAuthed(condition: boolean) {
      this.condition = condition;
    }

    ngOnInit() {
      this.userService.user$.subscribe(
        (isAuthenticated) => {
          if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainer.clear();
          }
        }
      );
    }

  }
