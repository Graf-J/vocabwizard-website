import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeckComponent } from './create-deck.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { DeckService } from 'src/app/services/deck.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateDeckComponent', () => {
  let component: CreateDeckComponent;
  let fixture: ComponentFixture<CreateDeckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CreateDeckComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSliderModule,
        MatSelectModule,
        MatProgressBarModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [Router, DeckService],
    });
    fixture = TestBed.createComponent(CreateDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
