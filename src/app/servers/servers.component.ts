import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-servers',
  // selector: '[app-servers]', - selecting component by attribute
  // selector: '.app-servers', - selecting component by class name
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {
  allowNewServer = false
  serverCreationStatus = 'No server was created!'
  serverName = 'Test server'
  serverCreated = false
  servers: Array<string> = []

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true
    }, 2000)
  }

  ngOnInit(): void {
  }

  onCreateServer(): void {
    this.serverCreated = true
    this.serverCreationStatus = `Server was created: ${ this.serverName }`
    this.servers.push(this.serverName)
  }

  onUpdateServerName(event: any): void {
    console.log(event)
    // explicit casting
    this.serverName = (<HTMLInputElement>event.target).value
  }

}
