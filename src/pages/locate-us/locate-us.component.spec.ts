import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocateUsComponent } from './locate-us.component';

describe('LocateUsComponent', () => {
  let component: LocateUsComponent;
  let fixture: ComponentFixture<LocateUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocateUsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocateUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
