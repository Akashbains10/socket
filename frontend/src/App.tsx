import './App.css';
import AppProvider from '@/provider/AppProvider';
import { AppRoutes } from './routes';
import { Provider } from 'react-redux';
import { store } from './store/store';
import SocketProvider from './provider/SocketProvider';

function App() {
  return (
    <>
      <Provider store={store}>
        <AppProvider>
          <SocketProvider>
            <AppRoutes />
          </SocketProvider>
        </AppProvider>
      </Provider>
    </>
  )
}

export default App
