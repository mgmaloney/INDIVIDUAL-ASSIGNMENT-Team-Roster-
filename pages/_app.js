/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { useState } from 'react';
import MemberContext from '../utils/context/memberContext';
import TeamContext from '../utils/context/teamContext';
import { AuthProvider } from '../utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';

function MyApp({ Component, pageProps }) {
  const [member, setMember] = useState({});
  const [team, setTeam] = useState({});
  return (
    <AuthProvider>
      {/* gives children components access to user and auth methods */}
      <TeamContext.Provider value={{ team, setTeam }}>
        <MemberContext.Provider value={{ member, setMember }}>
          <ViewDirectorBasedOnUserAuthStatus
            // if status is pending === loading
            // if status is logged in === view app
            // if status is logged out === sign in page
            component={Component}
            pageProps={pageProps}
          />
        </MemberContext.Provider>
      </TeamContext.Provider>
    </AuthProvider>
  );
}

export default MyApp;
