import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditRulePage } from './edit-rule.page';

describe('EditRulePage', () => {
  let component: EditRulePage;
  let fixture: ComponentFixture<EditRulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditRulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
