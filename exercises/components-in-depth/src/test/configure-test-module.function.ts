import { TestBed, TestModuleMetadata, async } from '@angular/core/testing';

export function configureTestModule(moduleMetadata: TestModuleMetadata): any {
  return async(() => {
    TestBed.configureTestingModule(moduleMetadata).compileComponents();
  });
}
