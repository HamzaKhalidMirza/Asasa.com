import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArchitectPage } from './architect.page';

describe('ArchitectPage', () => {
  let component: ArchitectPage;
  let fixture: ComponentFixture<ArchitectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchitectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArchitectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
