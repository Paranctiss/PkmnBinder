import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionCatalogComponent } from './extension-catalog.component';

describe('ExtensionCatalogComponent', () => {
  let component: ExtensionCatalogComponent;
  let fixture: ComponentFixture<ExtensionCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtensionCatalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtensionCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
