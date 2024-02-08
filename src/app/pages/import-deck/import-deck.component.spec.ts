import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDeckComponent } from './import-deck.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { DeckService } from 'src/app/services/deck.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ImportDeckComponent', () => {
  let component: ImportDeckComponent;
  let fixture: ComponentFixture<ImportDeckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ImportDeckComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressBarModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [Router, DeckService],
    });
    fixture = TestBed.createComponent(ImportDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
