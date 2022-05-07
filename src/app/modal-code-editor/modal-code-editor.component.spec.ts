import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCodeEditorComponent } from './modal-code-editor.component';

describe('ModalCodeEditorComponent', () => {
  let component: ModalCodeEditorComponent;
  let fixture: ComponentFixture<ModalCodeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCodeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
