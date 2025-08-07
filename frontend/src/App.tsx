import './App.css';
import AppProvider from '@/provider/AppProvider';
import { AppRoutes } from './routes';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <>
      <Provider store={store}>
          <AppProvider>
            <AppRoutes />
          </AppProvider>
      </Provider>
    </>
  )
}

export default App
