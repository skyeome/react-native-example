import {NativeModules} from 'react-native';

export const excuteCalculator = (
  action: 'plus' | 'minus' | 'multiply' | 'divide',
  numbA: number,
  numbB: number,
): Promise<number> => {
  return NativeModules.CalculatorModule.executeCalc(action, numbA, numbB);
};
