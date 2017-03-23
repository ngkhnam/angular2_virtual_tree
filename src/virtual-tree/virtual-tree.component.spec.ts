import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualTreeComponent } from './virtual-tree.component';

describe('VirtualTreeComponent', () => {
  let component: VirtualTreeComponent;
  let fixture: ComponentFixture<VirtualTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
