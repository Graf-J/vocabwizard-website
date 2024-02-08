import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeckComponent } from './update-deck.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from 'src/app/services/deck.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UpdateDeckComponent', () => {
  let component: UpdateDeckComponent;
  let fixture: ComponentFixture<UpdateDeckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UpdateDeckComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSliderModule,
        MatSelectModule,
        MatIconModule,
        MatProgressBarModule,
        MatButtonModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [
        Router,
        DeckService,
        {
          provide: ActivatedRoute,
          useValue: { params: of({ deckId: '123' }) },
        },
      ],
    });
    fixture = TestBed.createComponent(UpdateDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
