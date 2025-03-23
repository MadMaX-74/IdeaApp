import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { TrpcProvider } from './lib/trpc'
import { AllIdeasPage } from './pages/AllIdeasPage'
import { ViewIdeaPage } from './pages/ViewIdeaPage'
import * as routes from './lib/routes'
import { Layout } from './components/Layout'
import './styles/global.scss'
import { NewIdeaPage } from './pages/NewIdeaPage'
import { SignUpPage } from './pages/SignUpPage'
import { SignInPage } from './pages/SignInPage'
import { LogOutPage } from './pages/LogOutPage'
import { EditIdeaPage } from './pages/EditIdeaPage'
import { AppContextProvider } from './lib/ctx'
import { NotFoundPage } from './pages/NotFoundPage'
import { EditProfilePage } from './pages/EditProfilePage'

export const App = () => {
  return (
    <HelmetProvider>
      <TrpcProvider>
      <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path={routes.getAllIdeasRoute()} element={<AllIdeasPage />} />
            <Route path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)} element={<ViewIdeaPage />} />
            <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />} />
            <Route path={routes.getUpdateIdeaRoute(routes.updateIdeaRouteParams)} element={<EditIdeaPage />} />
            <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
            <Route path={routes.getSignInRoute()} element={<SignInPage />} />
            <Route path={routes.getEditProfileRoute()} element={<EditProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path={routes.getLogOutRoute()} element={<LogOutPage />} />
        </Routes>
      </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
    </HelmetProvider>
  )
}
