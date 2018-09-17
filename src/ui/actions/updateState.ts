import { store } from '../store';
import { ACTION } from './constants';

export function updateState(state) {
    const actions = [];
    const {
        currentLocale,
        accounts = [],
        selectedAccount = {},
        initialized,
        locked,
        networks = [],
        currentNetwork = '',
        messages = [],
        balances = [],
        pollInterval,
        uiState = {},
    } = state;
    const currentState = store.getState();

    if (state.networks && state.networks.length) {
        actions.push({
            type: ACTION.UPDATE_NETWORKS,
            payload: state.networks
        });
    }

    if (currentLocale && currentLocale !== currentState.currentLocale) {
        actions.push({
            type: ACTION.UPDATE_FROM_LNG,
            payload: currentLocale
        });
    }

    if (currentNetwork !== currentState.currentNetwork) {
        actions.push({
            type: ACTION.UPDATE_CURRENT_NETWORK,
            payload: currentNetwork
        });
    }

    if (messages.length !== currentState.messages.length) {
        actions.push({
            type: ACTION.UPDATE_MESSAGES,
            payload: messages
        });
    }

    if (selectedAccount.address !== currentState.selectedAccount.address ) {
        actions.push({
            type: ACTION.UPDATE_SELECTED_ACCOUNT,
            payload: selectedAccount
        });
    }

    if (accounts.length !== currentState.accounts.length) {
        actions.push({
            type: ACTION.UPDATE_ACCOUNTS,
            payload: accounts
        });
    }

    if (!currentState.state || initialized !== currentState.state.initialized || locked !== currentState.state.locked) {
        actions.push({
            type: ACTION.UPDATE_APP_STATE,
            payload: { initialized, locked }
        });
    }

    if (balances.length !== currentState.balances.length) {
        actions.push({
            type: ACTION.UPDATE_BALANCES,
            payload: balances
        });
    }

    actions.forEach(action => store.dispatch(action));
}
