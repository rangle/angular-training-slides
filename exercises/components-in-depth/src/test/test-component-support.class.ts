import { DebugElement, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

export class TestComponentSupport<T> {

  public component: T;
  private fixture: ComponentFixture<T>;
  private debugElement: DebugElement;

  constructor(private componentType: Type<T>) {
    this.createComponent();
  }

  private createComponent() {
    this.fixture = TestBed.createComponent(this.componentType);
    this.component = this.fixture.componentInstance;
    this.debugElement = this.fixture.debugElement;
  }

  public detectChanges(): void {
    return this.fixture.detectChanges();
  }

  public update(): void {
    const component = <any> this.component;

    if (component.ngOnChanges) {
      component.ngOnChanges();
    }

    this.detectChanges();
  }

  public whenStable(): Promise<any> {
    return this.fixture.whenStable();
  }

  public querySelector(selector: string): HTMLElement {
    return this.debugElement.nativeElement.querySelector(selector);
  }

  public querySelectorAll(selector: string): any[] {
    return this.debugElement.nativeElement.querySelectorAll(selector);
  }

  public getAttributeValue(selector: string, attributeName: string): string {
    return this.querySelector(selector).getAttribute(attributeName);
  }

  public getStyle(selector: string) {
    return this.querySelector(selector).style;
  }

  public getClassNames(selector: string) {
    return this.getAttributeValue(selector, 'class').split(' ');
  }

  public getInnerHtml(selector: string) {
    return this.querySelector(selector).innerHTML.trim();
  }

}
