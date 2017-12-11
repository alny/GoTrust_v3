import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminsListPage from './pages/AdminsListPage';
import SupportPage from './pages/SupportPage';
import RepCheckPage from './pages/RepCheckPage';
import ProfilePage from './pages/ProfilePage';
import topRepPage from './pages/topRepPage';
import MiddlemanPage from './pages/MiddlemanPage';
import SettingsPage from './pages/SettingsPage';
import VerifyPage from './pages/VerifyPage';
import addTradePage from './pages/addTradePage';
import TradePage from './pages/TradePage';




export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        ...ProfilePage,
        path: '/profile'
      },
      {
        ...TradePage,
        path: '/trading'
      },
      {
        ...SupportPage,
        path: '/support'
      },
      {
        ...topRepPage,
        path: '/top'
      },
      {
        ...MiddlemanPage,
        path: '/middleman'
      },
      {
        ...SettingsPage,
        path: '/settings'
      },
      {
        ...addTradePage,
        path: '/addtrade'
      },
      {
        ...VerifyPage,
        path: '/verify'
      },
      {
        ...RepCheckPage,
        path: '/repchecker'
      },
      {
        ...NotFoundPage
      }
    ]
  }
];
