import { LocalStorageKeys } from '@Common/constants';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

interface IQTSAuth {
  token: {
    base: { access: string; type: string };
    jwt: { access: string; refresh: string; type: string };
  };
  [field: string | symbol]: any;
}

const useQTSUser = (): IQTSAuth => {
  const initialValue = React.useRef(localStorage.getItem(LocalStorageKeys.QTS_USER) ?? '{}');
  const [qtsUser, setQTSUser] = React.useState<IQTSAuth>(JSON.parse(initialValue.current));

  React.useEffect(() => {
    const storageQTSUser = localStorage.getItem(LocalStorageKeys.QTS_USER);
    if (!storageQTSUser || isEmpty(storageQTSUser) || storageQTSUser === initialValue.current) {
      return;
    }

    setQTSUser(JSON.parse(storageQTSUser));
    return () => {};
  }, []);

  return qtsUser as IQTSAuth;
};

export default useQTSUser;
