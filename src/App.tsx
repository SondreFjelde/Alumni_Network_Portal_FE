import { useKeycloak } from '@react-keycloak/web';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AccountPage from './components/AccountPage';
import AccountSettings from './components/AccountSettingsPage';
import DashboardPage from './components/DashboardPage';
import GroupList from './components/GroupPage/GroupList';
import Layout from './components/Layout';
import StartPage from './components/StartPage';
import TopicList from './components/TopicPage/TopicList';
import PrivateRoute from './routes/utils';
import Dashboard from './view/Dashboard';

function App() {
  const { initialized } = useKeycloak()
  

  if (!initialized) {
    return <div>Loading...</div>
  }

  
  return (
    <BrowserRouter> 
    <Layout>
      <Routes>
        <Route path="/" element={<StartPage />} /> 

          <Route path="/account/settings" element={
            <PrivateRoute>
              <AccountSettings />
            </PrivateRoute>
          }/>
          <Route path='/dash' element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }/>
          <Route path="/account/:id" element={
            <PrivateRoute>
              <AccountPage />
            </PrivateRoute>
            }/>  
          <Route path="/account" element={
            <PrivateRoute>
              <AccountPage />
            </PrivateRoute>
            }/>

            <Route path="/timeline" element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
            }/>
            <Route path="/groups" element={
            <PrivateRoute>
              <GroupList />
            </PrivateRoute>
            }/>
            <Route path="/topics"      element={
              <PrivateRoute>
                <TopicList />
              </PrivateRoute>
            }/>

      </Routes>
      </Layout>  
    </BrowserRouter>
  );
}

export default App;
