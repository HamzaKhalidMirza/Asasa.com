import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocateUsPage } from './locate-us.page';

describe('LocateUsPage', () => {
  let component: LocateUsPage;
  let fixture: ComponentFixture<LocateUsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocateUsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocateUsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
