import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewRulePage } from './new-rule.page';

describe('NewRulePage', () => {
  let component: NewRulePage;
  let fixture: ComponentFixture<NewRulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewRulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
