import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewGoalPage } from './new-goal.page';

describe('NewGoalPage', () => {
  let component: NewGoalPage;
  let fixture: ComponentFixture<NewGoalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGoalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewGoalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
