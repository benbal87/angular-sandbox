#### APP INIT & START

- npm install -g @angular/cli@latest
- ng new <app-name>
- cd <app-name>
- ng serve

#### Notes

- Node.js will be used behind the scenes by the cli to bundle and optimize our project.
- Typescript is compiled by the cli.

## App module

- bundle the functionalities of the app into packages
- gives angular the information about which features the app will use and
- the application can be split to multiple modules

## View encapsulation

- [Angular Guide - View Encapsulation](https://angular.io/guide/view-encapsulation)
- In Angular, component CSS styles are encapsulated into the component's view and don't affect the
  rest of the application.
- The values can be:
    - Emulated (default)
    - ShadowDom
    - None
- The default **Emulated** value can be changed via the **@Component** metadata:
    ```typescript
    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.scss'],
      // encapsulation: ViewEncapsulation.ShadowDom
      // encapsulation: ViewEncapsulation.None
      encapsulation: ViewEncapsulation.Emulated
    })
    export class AppComponent {
    }
    ```

## Import styles

- npm install --save bootstrap@3
- bootstrap need to be installed with npm and need to be added to "angular.json" as the first
  element of the array "projects.architect.build.options.styles"

## Directives

- directives are instructions in the dom.
- *ngIf: structural directive
  - asterisk is used before structural directives
  - angular behind the scenes will transform the element into something else
- \#: local reference
- attribute directives: They do not add or remove elements. They only change the element they were
  placed on.
- ngSwitch
    ```html
    <div [ngSwitch]="value">
      <p *ngSwitchCase="5">Value is 5</p>
      <p *ngSwitchCase="10">Value is 10</p>
      <p *ngSwitchCase="100">Value is 100</p>
      <p *ngSwitchDefault>Value is Default</p>
    </div>
    ```

## @Input - decorator

- @Input() lets a parent component update data in the child component.
    ```html
    
    <div class="parent-template">
      <child-component [aliasForInput]="someObjectToPassDownToChildComponent"></child-component>
    </div>
    ```

    ```typescript
    class ChildComponent {
      @Input('aliasForInput') element: any
    }
    ```

## @Output - decorator

- (eventToListenForInParentComponentTemplate)="callbackFnInChildComponent($event)"
- @Input() and @Output() give a child component a way to communicate with its parent component.
- @Input() lets a parent component update data in the child component.
- Conversely, @Output() lets the child send data to a parent component.


- child component:
    ```typescript
    class ChildComponent {
      @Output('outputEventAlias') outputEvent = new EventEmitter<SomeType>()
      
      onSomeChange(data: any) {
        outputEvent.emit(data)
      }
    }
    ```
- parent component:
    ```html
    <div class="parent-template">
      <child-component (outputEventAlias)="doSomethingOnEvent($event)"></child-component>
    </div>
    ```
    ```typescript
    class ParentComponent {
      doSomethingOnEvent(data: any) {
        console.log('Reacting for output event in child:', JSON.stringify(data, null, 4))
      }
    }
    ```

## Local Reference

- Can be placed on any html element on the template.
- It will hold a reference to the element.
- Only can be used in the template. Not in the typescript code.
- Example: <input type="text" #nameInputElementReference />

## @ViewChild - decorator

- The local reference variable in the template can be accessed via this decorator.
    ```html
    <div class="container">
      <input type="text" #nameOfTheLocalReferenceFromTheTemplate />
    </div>
    ```
    ```typescript
    class Component {
      @ViewChild('nameOfTheLocalReferenceFromTheTemplate') typescriptVariableElementRef: ElementReference
    
      doSometing() {
        typescriptVariableElementRef.nativeElement.value // value of the input field
      }
    }
    ```

## @ContentChild - decorator

- It is for accessing a local reference of a html element which was added in the ng-content.
    ```html
    <div class="parent-component-template">
      Some content...
      <child-component>
        <div class="ng-content-container">
          Child component data...
          <input type="text" #contentChildExampleRef>
        </div>
      </child-component>
    </div>
    ```
    ```html
    <div class="child-component-container">
      Child content...
      <ng-content></ng-content>
    </div>
    ```
    ```typescript
    class ChildComponent {
      @ContentChild('contentChildExampleRef') someInput: ElementRef
    
      doSomething() {
        someInput.nativeElement.value // value of the input field injected with ng-content
      }
    }
    ```

## ng-content - directive

- It serves as a hook to add to the component to mark the place for angular where it should add any
  content what it finds between the tags.
- It is like the "yield" in Riot.js.
    ```html
    <ng-content></ng-content>
    ```

## Lifecycle hooks

When a new component instantiated it goes through a couple of lifecycle hooks. It is possible to
subscribe to these changes via these lifecycle hooks.

- ngOnInit: Called once the component is initialized.
- ngOnChanges: Called after a bound input property changes. It is also called after the component is
  instantiated.
    - returns an object with SimpleChange objects which contains the following:
      ```typescript
      import { SimpleChange } from '@angular/core'
      
      const changeObject = {
        nameOfThePropertyThatChanged: { // SimpleChange
          currentValue: 'Changed!',
          firstChange: false,
          previousValue: 'Test value...'
        }
      }
      ```
- ngDoCheck: Called during every change detection run.
- ngAfterContentInit: Called after the content (ng-content) has been projected into the view.
- ngAfterContentChecked: Called every time the projected content has been checked.
- ngAfterViewInit: Called after the component's vew (and child views) has been initialized.
- ngAfterViewChecked: Called every time the view (and child views) has been checked.
- ngOnDestroy: Called once the component is about to be destroyed.

## @Directive

- 

## Services

- How to inject a service into a component:
```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SomeService]
})
export class AppComponent {
  constructor(private service: SomeService) {}

  onSomeChange(text: string) {
    this.loggingService.log(text)
  }
}
```

next video: module 9 - lesson 7
