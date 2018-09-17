import * as styles from './styles/newwallet.styl';
import * as React from 'react'
import { connect } from 'react-redux';
import { translate, Trans } from 'react-i18next';
import { setTab, newAccountSelect } from '../../actions';
import { AvatarList } from '../ui/avatar/AvatarList';
import { Seed } from '@waves/signature-generator';
import { Button } from '../ui/buttons';
import { Input } from '../ui/input';

@translate('extension')
class NewWalletComponent extends React.Component {
    static list = [];
    props;
    state;
    onSelect = (account) => this._onSelect(account);
    onSubmit = () => this._onSubmit();

    constructor({ isGenerateNew, ...props }) {
        super(props);
        if (isGenerateNew) {
            NewWalletComponent.list = NewWalletComponent.getNewWallets();
        }

        const list  = NewWalletComponent.list;
        const selected = list.find(item => props.account && item.address === props.account.address) || list[0];
        this._onSelect(selected);
        this.state = { list };
    }

    static getNewWallets() {
        const list = [];
        for (let i = 0; i < 5; i++) {
            const seedData = Seed.create();
            list.push({ seed: seedData.phrase, address: seedData.address, type: 'seed' });
        }
        return list ;
    }

    render () {
        return <div className={styles.content}>
            <div>
                <h2 className={`title1 margin3 left`}>
                    <Trans i18nKey='newWallet.createNew'>Create New Account</Trans>
                </h2>
            </div>

            <div className={`margin3`}>
                <div className={`body3`}><Trans i18nKey='newWallet.select'>Choose your address avatar</Trans></div>
                <div className={`tag1 basic500`}><Trans i18nKey='newWallet.selectInfo'>This avatar is unique. You cannot change it later.</Trans></div>
            </div>

            <div className={`margin4 avatar-list`}>
                <AvatarList size={48} items={this.state.list} selected={this.props.account} onSelect={this.onSelect}/>
            </div>

            <div className={`tag1 basic500`}>
                <Trans i18nkey='newWallet.address'>Account address</Trans>:
            </div>

            <div className={`${styles.greyLine} grey-line`}>{this.props.account.address}</div>

            <form onSubmit={this.onSubmit}>
                <Button type="submit">
                    <Trans i18nKey="newWallet.continue">Continue</Trans>
                </Button>
            </form>
        </div>
    }

    _onSelect(account) {
        this.props.newAccountSelect({ ...account, type: 'seed', name: '' });
    }

    _onSubmit() {
        this.props.setTab('accountName');
    }
}

const actions = {
    setTab,
    newAccountSelect
};

const mapStateToProps = function(store: any) {
    return {
        account: store.localState.newAccount
    };
};

export const NewWallet = connect(mapStateToProps, actions)(NewWalletComponent);
