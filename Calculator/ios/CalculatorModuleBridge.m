//
//  CalculatorModuleBridge.m
//  Calculator
//
//  Created by 김성겸 on 3/9/25.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CalculatorModule, NSObject)

RCT_EXTERN_METHOD(executeCalc: (NSString *) action
numberA: (int) numberA
numberB: (int) numberB
resolver: (RCTPromiseResolveBlock) resolve
rejector: (RCTPromiseRejectBlock) reject
)

@end
