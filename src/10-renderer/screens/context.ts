import React from 'react';

// ----------------------------------------------------------------------------------
interface IAuthContext {
  doAuth?: (index: number, credenital: any) => void;
  doDeleteSavedAccount?: Function;
}
export const AuthContext = React.createContext<IAuthContext>({});
