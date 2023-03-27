import { AnyType } from '@Common/types';
import set from 'lodash/set';
import get from 'lodash/get';

// ----------------------------------------------------------------------------------------------------------
interface SetStatePayload {
  key: string;
  primitiveValue?: boolean | string | number;
  objectValue?: object;
  setValue?: Set<AnyType>;
  arrayValue?: Array<AnyType>;
  mode: 'extend' | 'replace';
}

// ----------------------------------------------------------------------------------------------------------
const setSetValue = (state: object, payload: SetStatePayload) => {
  const { mode, key, setValue } = payload;

  if (!setValue) {
    return state;
  }

  switch (mode) {
    case 'replace': {
      set(state, key, new Set([...setValue]));
      break;
    }
    default: {
      const current = get(state, key) || [];
      set(state, key, new Set([...current, ...setValue]));
      break;
    }
  }

  return state;
};

// ----------------------------------------------------------------------------------------------------------
const setArrayValue = (state: object, payload: SetStatePayload) => {
  const { mode, key, arrayValue } = payload;

  if (!arrayValue) {
    return state;
  }

  switch (mode) {
    case 'replace': {
      set(state, key, [...arrayValue]);
      break;
    }
    default: {
      const current = get(state, key) || [];
      set(state, key, [...current, ...arrayValue]);
      break;
    }
  }

  return state;
};

// ----------------------------------------------------------------------------------------------------------
const setObjectValue = (state: object, payload: SetStatePayload) => {
  const { mode, key, objectValue } = payload;

  if (!objectValue) {
    return state;
  }

  switch (mode) {
    case 'replace': {
      set(state, key, { ...objectValue });
      break;
    }
    default: {
      const current = get(state, key) || {};
      set(state, key, { ...current, ...objectValue });
      break;
    }
  }

  return state;
};

// ----------------------------------------------------------------------------------------------------------
const setPrimitiveValue = (state: object, payload: SetStatePayload) => {
  const { key, primitiveValue } = payload;
  return set(state, key, primitiveValue);
};

// ----------------------------------------------------------------------------------------------------------
const applyState = (state: object, payload: SetStatePayload) => {
  const { primitiveValue, objectValue, setValue, arrayValue } = payload;

  if (primitiveValue !== undefined) {
    return setPrimitiveValue(state, payload);
  }

  if (objectValue) {
    return setObjectValue(state, payload);
  }

  if (arrayValue) {
    return setArrayValue(state, payload);
  }

  if (setValue) {
    return setSetValue(state, payload);
  }

  return state;
};

// ----------------------------------------------------------------------------------------------------------
export const setState = (state: object, action: { payload: SetStatePayload | Array<SetStatePayload> }) => {
  const { payload } = action;
  const isArrayOfPayload = Array.isArray(payload);

  if (isArrayOfPayload) {
    for (const el of payload) {
      state = applyState(state, el);
    }
  } else {
    state = applyState(state, payload);
  }

  return state;
};
