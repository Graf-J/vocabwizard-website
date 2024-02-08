import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardComponent } from './add-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddCardComponent', () => {
  let component: AddCardComponent;
  let fixture: ComponentFixture<AddCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AddCardComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressBarModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [
        Router,
        CardService,
        {
          provide: ActivatedRoute,
          useValue: { params: of({ deckId: '123' }) },
        },
      ],
    });
    fixture = TestBed.createComponent(AddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
