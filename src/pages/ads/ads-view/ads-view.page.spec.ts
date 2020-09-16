import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdsViewPage } from './ads-view.page';

describe('AdsViewPage', () => {
  let component: AdsViewPage;
  let fixture: ComponentFixture<AdsViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdsViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
