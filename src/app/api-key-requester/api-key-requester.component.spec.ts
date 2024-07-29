import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiKeyRequesterComponent } from './api-key-requester.component';

describe('ApiKeyRequesterComponent', () => {
  let component: ApiKeyRequesterComponent;
  let fixture: ComponentFixture<ApiKeyRequesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiKeyRequesterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiKeyRequesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
