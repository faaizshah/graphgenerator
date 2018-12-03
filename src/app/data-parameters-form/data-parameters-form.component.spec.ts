import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataParametersFormComponent } from './data-parameters-form.component';

describe('DataParametersFormComponent', () => {
  let component: DataParametersFormComponent;
  let fixture: ComponentFixture<DataParametersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataParametersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataParametersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
