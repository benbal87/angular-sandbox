# Table of Contents:

#### APP INIT & START

- npm install -g @angular/cli@latest
- ng new <app-name>
- cd <app-name>
- ng serve

#### Notes

- Node.js will be used behind the scenes by the cli to bundle and optimize our project.
- Typescript is compiled by the cli.

# App module

- bundle the functionalities of the app into packages
- gives angular the information about which features the app will use and
- the application can be split to multiple modules

# View encapsulation

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

# Import styles

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

# @Input - decorator

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

# @Output - decorator

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

# Local Reference

- Can be placed on any html element on the template.
- It will hold a reference to the element.
- Only can be used in the template. Not in the typescript code.
- Example: <input type="text" #nameInputElementReference />

# @ViewChild - decorator

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

# @ContentChild - decorator

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

# ng-content - directive

- It serves as a hook to add to the component to mark the place for angular where it should add any
  content what it finds between the tags.
- It is like the "yield" in Riot.js.

```html

<ng-content></ng-content>
```

# Lifecycle hooks

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

# Services

- How to inject a service into a component:

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SomeService]
})
export class AppComponent {
  constructor(private service: SomeService) {
  }

  onSomeChange(text: string) {
    this.loggingService.log(text)
  }
}
```

- Service metadata:
    - You don't add **@Injectable()** to the service you want to inject somewhere just to the
      service where you want to inject something.

```typescript
import { Injectable } from '@angular/core'

@Injectable()
export class LoggingService {
  log(text: string) {
    console.log(text)
  }
}
```

## Hierarchical injection of services

- AppModule:
    - Same instance of Service is available Application-wide.

```typescript
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpModule],
  providers: [SomeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

- AppComponent:
    - Same instance of Service is available for **all Components** (but not for other Services).

- Any other Component:
    - Same instance of Service is available for **the Component an all its child components**.

# Routing

You can define the routes in the **app.module.ts**.

- **pathMatch: 'full'** is necessary if you define a route which has the same prefix as many other
  route. More on [pathMatch](https://angular.io/guide/router-tutorial-toh#pathmatch)

```typescript
const appRoutes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    pathMatch: 'full',
    children: [
      { path: ':id', component: UserComponent },
      { path: ':id/edit', component: UserEditComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

**router-outlet** is for the routes of the top level but not for the child routes. The
UsersComponent child routes should be loaded nested in the component with another **router-outlet**.

```html

<router-outlet></router-outlet>
```

## routerLink

- RouterLink without slash ("/") at the beginning is **relative** path and with it **absolute**
  path.
- If the path is **relative** it will add the selected path to the existing one. So if the url
  was "http://localhost:4200/about" and the "settings" link is clicked then the new url will
  be "http://localhost:4200/about/settings".
- You can also use **relative** path like this: "../settings". That will mean to go up one level and
  apply settings to url.
- For the root path **Home** exact need to be added otherwise the link will be always active because
  it's path matches all off the other links.
- **queryParams** is just another bindable **property** of the **routerLink directive** where the
  params has to be defined in an object.
- **fragment** is to add hash params to the url.

```html

<div class="component-container">
  <ul class="nav nav-tabs">
    <li
      role="presentation"
      routerLinkActive="active"
      [routerLinkActiveOptions]="{ exact: true }"
    >
      <a routerLink="/">Home</a>
    </li>
    <li
      role="presentation"
      routerLinkActive="active"
    >
      <a routerLink="/about">About</a>
    </li>
    <li
      role="presentation"
      routerLinkActive="active"
    >
      <a
        [routerLink]="['/personal']"
        [queryParams]="{ allowEdit: '1' }"
        [fragment]="loading"
      >
        Personal
      </a>
    </li>
    <li
      role="presentation"
      routerLinkActive="active"
    >
      <a routerLink="settings">Settings</a>
    </li>
  </ul>
</div>
```

- Parameters can be passed to the routerLink too:

    ```html
    <a [routerLink]="['/personal', 10, 'Anna']"></a>
    ```

- In the example above the **10** and **'Anna'** are the parameters defined in the routes:

```typescript
const appRoutes: Routes = [
  {
    path: 'personal/:id/:name',
    component: UserComponent
  }
]
```

## Routing programatically

- The **Router** from **'@angular/router'** have to be injected into the component in the
  constructor. And then it can be used.
- Unlike the **routerLink** the **navigate** function of the router doesn't know what is the current
  route. So the relative path won't work here. Every path here is absolute.
- Although the relative path can be configured via **relativeTo** in an object as a second argument
  to the **navigate** function.
- **activatedRoute** will inject to currently active route into the component.
- **queryParamsHandling** the handling of the query params while navigating can be added. It can
  have of type QueryParamsHandling = 'merge' | 'preserve' | '';

```typescript
import { Component } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  onSomeChange(id: number, userName: string) {
    this.router.navigate(
      ['/about', id, userName],
      {
        relativeTo: this.activatedRoute,
        // Adding query and hash params
        queryParams: { allowEdit: '1' },
        fragment: 'loading',
        queryParamsHandling: 'preserve'
      }
    )
  }
}
```

- You can get **parameter** from route via **ActivatedRoute**.
- The first option is to use the **activatedRoute.snapshot.params**. But that won't refresh if the
  route changes but the component not.
- You can also use **activatedRoute.snapshot.queryParams** and **activatedRoute.snapshot.fragment**.

```typescript
const appRoutes: Routes = [
  {
    path: 'users/:id',
    component: UserComponent
  }
]
```

```typescript
import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private activatedRoute: ActivatedRoute) {
  }

  onSomeChange() {
    const usedId: number = this.activatedRoute.snapshot.params['id']
    // rest of the logic...
  }
}
```

- The second option is just use the **params**. It is an observable, and you can subscribe to it.
  But it will be necessary to **unsubscribe** from it before the component is destroyed. Else the
  observable will live on in the memory.
- You can also use **activatedRoute.queryParams** and **activatedRoute.fragment** to subscribe to
  them.

```typescript
import { Component } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements ngOnInit, onDestroy {
  usedId: number = -1
  paramsSubscription: Subscription

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.usedId = params['id']
    })
  }

  onDestroy() {
    this.paramsSubscription.unsubscribe()
  }
}
```

## Router Guards

### canActivate and canActivateChild

- Router guard is a service, so it needs to be added to the **providers** array in the
  **app.module.ts**.

```typescript
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router'
import { Observable } from 'rxjs/Observable';

export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.authService.isAuthenticated()
      .then((result: boolean) => {
        if (result) {
          return true
        } else {
          this.router.navigate(['/'])
          return false
        }
      })
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.canActivate(route, state)
  }
}
```

- The guard can be used in the canActivate array in the route items.

```typescript
const appRoutes: Routes = [
  {
    path: 'editAccount',
    component: AccountEditComponent,
    canActivate: [AuthGuard]
  }
]
```

- The **canActivateChild** also can be used instead of **canActivate**. In this case only the child
  routes will be protected.

```typescript
const appRoutes: Routes = [
  {
    path: 'editAccount',
    component: AccountEditComponent,
    CanActivateChild: [AuthGuard]
  }
]
```

### **canDeactivateChild**

- First the guard need to be implemented with a **canDeactivate** method which you must implement.

```typescript
import { Observable } from 'rxjs/Observable';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router'

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate()
  }
}
```

- Then the **CanDeactivateGuard** has to be added to one of the app routes:

```typescript
const appRoutes: Routes = [
  { path: 'edit', component: EditComponent, canDeactivate: [CanDeactivateGuard] },
]
```

- Then the **CanComponentDeactivate** interface needs to be implemented in the class.

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements CanComponentDeactivate {
  areChangesSaved: boolean = true

  constructor(private activatedRoute: ActivatedRoute) {
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.areChangesSaved) {
      return confirm('Do you want to discard the changes?')
    }
    return tue
  }
}
```

## Passing data through Routing

- The data need to be defined in on of the routes as an object.

```typescript
const appRoutes: Routes = [
  {
    path: 'edit',
    component: EditComponent,
    data: {
      message: 'YOLO!'
    }
  }
]
```

- Then it can be used in the component.

```typescript
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Data } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements ngOnInit {
  message: string = ''

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.message = this.activatedRoute.snapshot.data['message']
    this.route.data.subscribe((data: Data) => {
      this.message = data['message']
    })
  }
}
```

## Load data before routing

- First a resolver class need to be implemented.

```typescript
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ServersService } from '../servers.service';

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(+route.params['id']);
  }
}
```

- Then it should be referenced in the app routes with the **resole** property.

```typescript
const appRoutes: Routes = [
  {
    path: 'servers',
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      { path: ':id', component: ServerComponent, resolve: { server: ServerResolver } },
    ]
  }
];
```

- Then you can just get the server data in the **ngOnInit** method by subscribing to the **data**
  in **ActivatedRoute**

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    );
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }
}
```

# Observables

- An observable can be thought of as a data source.
- In **Angular** observable is an import from the third party package [RxJS](https://rxjs.dev/)
- The observable here is implemented in a way that it follows the observable pattern. So we have an
  observable and an observer. In between there is a stream/timeline. And in this timeline we can
  have multiple events emitted by the observable.
- Observable can emit data because you trigger it programatically.
- There are three ways of handling data packages. Three types of data packages you can receive:
    - handle the normal data
    - handle errors
    - handle the completion of the observable
- Observable has one major advantage. It has operators.

### You can simply create an observable:

- In this simple case we can get a new value in every time interval we set.
- To **unsubscribe** from the observable on **ngOnDestroy** is important. Because if you miss it the
  observable will be still alive after the component destroyed and a new observable will be created
  if the component is created again. This can cause memory leaks in the application.
- However, the observables provided by Angular do not need to be unsubscribed of because Angular
  will handle the unsubscription behind the scenes.

```typescript
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  ngOnInit() {
    this.firstObsSubscription =
      interval(1000)
        .subscribe(count => {
          console.log(count);
        });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
```

### Custom observable:

- With **Observable** object you can create a new observable.
- It gets a callback function. It will get an **observer** object.
    - And you can call **next** on it. It will fire with the given object.
    - **complete** will kill the observable.
    - **error** is for firing an error if something goes wrong.
- When you subscribe to an observable you can pass 3 different callback functions to it:
    - One for data handling.
    - One for error handling.
    - And also one for completion handling.

```typescript
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  ngOnInit() {
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3!'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
        alert(error.message);
      },
      () => {
        console.log('Completed!');
      }
    );
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
```

### Operators

- You can use operators with calling pipe on the observable. Pipe method is built in RxJS.
- So the previous example will be modified:

```typescript
this.firstObsSubscription = customIntervalObservable
  .pipe(
    filter(data => data > 0),
    map(data => 'Round: ' + (data + 1))
  )
  .subscribe(
    data => {
      console.log(data);
    },
    error => {
      console.log(error);
      alert(error.message);
    },
    () => {
      console.log('Completed!');
    }
  )
```

### Subjects

- Subjects are like event emitters.
- Subject is a special kind of observable.
- Now **Subject** is used instead of **EventEmitter** because this is the new approach.

First we create a service where we define the **Subject**.

```typescript
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  emitter = new Subject<boolean>();
}
```

Then we inject the **UserService** in the **UserComponent**. And the **next** method can be called
on the emitter what we created before if some previously defined action happens.

```typescript
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService) {
  }

  onActivate() {
    this.userService.emitter.next(true);
  }
}
```

Then we can subscribe to the subject we created and listen to it.

```typescript
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private activatedSub: Subscription;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.activatedSub = this.userService.emitter.subscribe(someBoolean => {
      // logic here...
    });
  }

  ngOnDestroy(): void {
    this.activatedSub.unsubscribe();
  }
}
```
