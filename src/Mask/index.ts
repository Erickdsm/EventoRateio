/**
 * @providesModule @fa-masks
 */
 import {MaskService} from 'react-native-masked-text';

 const nameRegexWithAccents = /[^A-Za-z^\u00C0-\u017F+\s]/g;
 const onlyNumbersRegex = /[^0-9]+/g;
 
 export const cellphoneMask = (value: string) =>
   value ? MaskService.toMask('cel-phone', value) : value;
 
 export const dateMask = (value: string) =>
   value ? MaskService.toMask('datetime', value, {format: 'DD/MM/YYYY'}) : value;
 
 export const cpfMask = (value: string) =>
   value ? MaskService.toMask('cpf', value) : value;
 
 export const nameMask = (value: string) =>
   value && value.replace(nameRegexWithAccents, '');
 
 export const onlyNumbersMask = (value: string) => {
   if (value) {
     return value.trim().replace(onlyNumbersRegex, '');
   }
 };
 
 export const cepMask = (value: string) => {
   const numbers = onlyNumbersMask(value);
 
   if (numbers && numbers.length >= 6) {
     return numbers.slice(0, 5) + '-' + numbers.slice(5, 9);
   }
 
   return numbers;
 };
 
 export const cnpjMask = (value: string) =>
   value ? MaskService.toMask('cnpj', value) : value;
 
 export const removeMask = (value: string) => {
   const removeAll = value.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
   return removeAll.replace(/[-]/g, '');
 };
 
 export const removeMaskMoney = (value: string) => {
   let convertedValue = parseFloat(
     value.replace(/[^0-9,]*/g, '').replace(',', '.'),
   ).toFixed(2);
 
   return convertedValue;
 };
 
 export const cpfcnpjMask = (value: string) => {
   const str: any = onlyNumbersMask(value);
   if (str && str.length === 14) {
     return cnpjMask(str);
   } else {
     return cpfMask(str);
   }
 };
 
 export const money = (value: string) =>
   value
     ? MaskService.toMask('money', value, {
         precision: 2,
         separator: ',',
         delimiter: '.',
         unit: 'R$ ',
         suffixUnit: '',
       })
     : value;
 
 export const moneyLarge = (value: string) =>
   value
     ? MaskService.toMask('money', value, {
         precision: 0,
         separator: ',',
         delimiter: '.',
         unit: 'R$ ',
         suffixUnit: '',
       })
     : value;
 
 export const hour = (value: string) =>
   value
     ? MaskService.toMask('custom', value, {
         mask: '99:99',
       })
     : value;
 
 export const percentMask = (value: string) => {
   if (!value) {
     return value;
   }
 
   if (value.length > 5) {
     return value.slice(0, 5);
   }
   return value
     ? MaskService.toMask('money', value, {
         precision: 2,
         separator: ',',
         delimiter: '.',
         unit: '',
         suffixUnit: '',
       })
     : value;
 };
 