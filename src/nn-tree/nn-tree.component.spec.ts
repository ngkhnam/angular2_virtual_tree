import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NNTreeComponent } from './tree.component';

describe('VirtualTreeComponent', () => {
  let component: NNTreeComponent;
  let fixture: ComponentFixture<NNTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NNTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NNTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
