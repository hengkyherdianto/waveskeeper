import { ACTION } from '../actions/constants';
import { config } from '@waves/signature-generator';
import background from '../services/Background';
import { i18n } from '../i18n';
import { setTab } from '../actions';

export const changeLang = store => next => action => {
    if (action.type === ACTION.CHANGE_LNG && action.payload !== store.getState().currentLocale) {
        background.setCurrentLocale(action.payload);
    }
    return next(action);
};

export const updateLang = store => next => action => {
    if (action.type === ACTION.UPDATE_FROM_LNG && action.payload !== store.getState().currentLocale) {
        i18n.changeLanguage(action.payload);
    }
    return next(action);
};

export const selectAccount = store => next => action => {
    if (action.type === ACTION.SELECT_ACCOUNT && store.getState().selectedAccount.address !== action.payload.address) {
        background.selectAccount(action.payload.address);
        return null;
    }

    return next(action);
};

export const uiState = store => next => action => {
    if (action.type === ACTION.SET_UI_STATE) {
        const ui = store.getState().uiState;
        const newState = { ...ui, ...action.payload };
        background.setUiState(newState);
        return null;
    }

    if (action.type === ACTION.SET_UI_STATE_AND_TAB) {
        const ui = store.getState().uiState;
        const newState = { ...ui, ...action.payload.ui };
        background.setUiState(newState).then(
            next(setTab(action.payload.tab))
        );
        store.dispatch({
            type: ACTION.UPDATE_UI_STATE,
            payload: uiState
        });

        return setTab(action.payload.tab);
    }

    return next(action);
};

export const updateNetworkCode = store => next => action => {
    if (action.type === ACTION.UPDATE_CURRENT_NETWORK || action.type === ACTION.UPDATE_NETWORKS) {
        const { payload, type } = action;
        let { networks, currentNetwork } = store.getState();

        if (type === ACTION.UPDATE_CURRENT_NETWORK) {
            currentNetwork = payload;
        }

        if (type === ACTION.UPDATE_NETWORKS) {
            networks = payload;
        }
        
        if (currentNetwork && networks && networks.length) {
            const netCode = networks.filter(({ name }) => name === currentNetwork)[0] || networks[0];
            if (netCode) {
                config.set({networkByte: netCode.code.charCodeAt(0)});
            }
        }
    }

    next(action);
};
