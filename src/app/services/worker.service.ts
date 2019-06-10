import { Injectable, Input } from "@angular/core";

// add if building with webpack
import * as ServerDataProcessorWorker from "nativescript-worker-loader!../workers/server-data-processor.worker";
import { Subject } from "rxjs";

@Injectable()
export class WorkerService {
    public ServerDataProcessorWorker: Worker;
    
	constructor() {
        
    }
	
    
    initServerDataProcessorWorker() {
        if (global["TNS_WEBPACK"]) {
            console.log('build with web pack');
            this.ServerDataProcessorWorker = new ServerDataProcessorWorker();
        } else {
            console.log('build without web pack');
            this.ServerDataProcessorWorker = new Worker("../workers/server-data-processor.worker");
        }

        this.ServerDataProcessorWorker.onmessage = m => this.serverWorkerMessageRecieved(m);
        this.ServerDataProcessorWorker.onerror = e => {
            console.log("worker error", e);
        };
    }


    serverWorkerMessageRecieved(messageEvent: MessageEvent) {
       console.log('worker message recieved', messageEvent);        
    }

    closeServerDataProcessorWorker() {
        this.ServerDataProcessorWorker.terminate();
    }

    
}