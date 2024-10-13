import React from 'react';
import App from '@layouts/App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('app');

if (container) {
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
} else {
  console.error('앱을 렌더링할 수 없습니다. #app 요소를 찾을 수 없습니다.');
}
