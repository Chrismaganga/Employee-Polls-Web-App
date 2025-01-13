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

