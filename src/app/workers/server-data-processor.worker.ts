import "globals";
import * as trace from 'tns-core-modules/trace';

const context: Worker = self as any;



context.onmessage = msg => {
    console.log("Inside TS worker...");
    
};

