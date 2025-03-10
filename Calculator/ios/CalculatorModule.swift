//
//  CalculatorModule.swift
//  Calculator
//
//  Created by 김성겸 on 3/9/25.
//

import Foundation

@objc(CalculatorModule)
class CalculatorModule:NSObject {
  @objc(executeCalc:numberA:numberB:resolver:rejector:)
  public func executeCalc(_ action: String, numberA: Int, numberB: Int, resolver: RCTPromiseResolveBlock, rejector: RCTPromiseRejectBlock) -> Void {
    if(action == "plus"){
      resolver(numberA + numberB);
      return;
    }
    
    if(action == "minus"){
      resolver(numberA - numberB);
      return;
    }
    
    if(action == "multiply"){
      resolver(numberA * numberB);
      return;
    }
    
    if(action == "divide"){
      resolver(numberA / numberB);
      return;
    }
    
    rejector("Unexpected action type", action, nil);
  }
}
