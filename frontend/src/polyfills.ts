import { Buffer } from 'buffer';
import process from 'process';

window.Buffer = Buffer;
window.process = process;

// Polyfill for readable-stream
if (typeof window !== 'undefined') {
  (window as any).global = window;
  (window as any).process = process;
  (window as any).Buffer = Buffer;
} 