import React from 'react';
import { Route } from 'react-router';

/* containers */
import { App } from './containers/App';
import { HomeContainer } from './containers/HomeContainer';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import NotFound from './components/NotFound';
import ProtectedView from './components/ProtectedView';
import About from './components/About';
import { DetermineAuth } from './components/DetermineAuth';
import { requireNoAuthentication } from './components/notAuthenticatedComponent';
import { requireAuthentication } from './components/AuthenticatedComponent';
