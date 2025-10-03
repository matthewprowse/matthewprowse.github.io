import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Force remove all focus outlines
document.addEventListener('DOMContentLoaded', () => {
  // Remove focus outlines from all elements
  const removeFocusOutlines = () => {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      (element as HTMLElement).style.outline = 'none';
      (element as HTMLElement).style.boxShadow = 'none';
    });
  };
  
  // Remove on initial load
  removeFocusOutlines();
  
  // Remove on any focus events
  document.addEventListener('focusin', removeFocusOutlines);
  document.addEventListener('focusout', removeFocusOutlines);
  document.addEventListener('click', removeFocusOutlines);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)