import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueStatus } from './queue-status';

describe('QueueStatus', () => {
  let component: QueueStatus;
  let fixture: ComponentFixture<QueueStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueueStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueueStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
