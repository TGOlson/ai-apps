import React from 'react';
import ReactDOMClient from 'react-dom/client';

import { RouterProvider, createHashRouter } from 'react-router-dom';

import Root from './pages/Root';

import "./index.css";
import CodeReview from './pages/CodeReview';
import Home from './pages/Home';
import ChatBot from './pages/ChatBot';
import TweetGen from './pages/TweetGen';

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element:<Home />,
      },
      {
        path: "/code-review",
        element: <CodeReview />,
      },
      {
        path: "/tweet-gen",
        element: <TweetGen />,
      },
      {
        path: "/chatbot",
        element: <ChatBot />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOMClient.createRoot(rootElement);
root.render(<RouterProvider router={router} />);
