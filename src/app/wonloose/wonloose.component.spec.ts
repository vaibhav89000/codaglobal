import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WonlooseComponent } from './wonloose.component';

describe('WonlooseComponent', () => {
  let component: WonlooseComponent;
  let fixture: ComponentFixture<WonlooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WonlooseComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WonlooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
