import { useKeycloak } from '@react-keycloak/web';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AccountSettings from './components/AccountSettingsPage';
import Layout from './components/Layout';
import StartPage from './components/StartPage';

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
        
        <Route path="/account/settings" element={<AccountSettings />}/>
        
      </Routes>
      </Layout>  
    </BrowserRouter>
  );
}

export default App;
