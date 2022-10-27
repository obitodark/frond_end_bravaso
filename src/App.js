import DataProvider from './Context/DataProvider';
import AuthProvider from './Context/AuthContext';

import Router from './router';
import DataProviderAdmin from './Context/ContextAdmin/DataProviderAdmin';

function App() {
    return (
        <DataProviderAdmin>
            <AuthProvider>
                <DataProvider>
                    <Router />
                </DataProvider>
            </AuthProvider>
        </DataProviderAdmin>
    );
}

export default App;
