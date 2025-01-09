import '@testing-library/jest-dom';

// Import global from Node.js globals if it's not defined
if (typeof global === 'undefined') {
  window.global = window;
}

// Add TextEncoder polyfill for React Router tests
if (typeof TextEncoder === 'undefined') {
  // eslint-disable-next-line no-undef
  global.TextEncoder = class {
    encode(str) {
      const arr = new Uint8Array(str.length);
      for (let i = 0; i < str.length; i++) {
        arr[i] = str.charCodeAt(i);
      }
      return arr;
    }
  };
  // eslint-disable-next-line no-undef
  global.TextDecoder = class {
    decode(arr) {
      return String.fromCharCode.apply(null, arr);
    }
  };
}

// const { TextEncoder, TextDecoder } = require('util');
// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;

// Object.defineProperty(window, 'matchMedia', {
//   writable: true,
//   value: jest.fn().mockImplementation(query => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: jest.fn(),
//     removeListener: jest.fn(), 
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//     dispatchEvent: jest.fn(),
//   })),
// });


// class MockIntersectionObserver {
//   constructor(callback) {
//     this.callback = callback;
//   }

//   observe() {
//     return null;
//   }

//   unobserve() {
//     return null;
//   }

//   disconnect() {
//     return null;
//   }
// }

// window.IntersectionObserver = MockIntersectionObserver;

// // Suppress React 18 console warnings during tests
// const originalError = console.error;
// console.error = (...args) => {
//   if (/Warning.*not wrapped in act/.test(args[0])) {
//     return;
//   }
//   originalError.call(console, ...args);
// };