import { Component } from 'react';
import { Navigator } from './Navigator.d'


interface Promise<T> {

    catch(onRejected?: (reason: any) => Promise<T>): Promise<T>;

    then(onFulfilled?: (value: T) => void, onRejected?: (reason: any) => Promise<T>): Promise<T>;
}

interface Account {
    name:string
    token:string
}

export interface ScreenComponent extends Component {
    navigator: Navigator

    addListener: (eventId: string, callback?: (data: object) => void) => void

    removeListener: (eventId: string) => void

    listenLoginStatus: (subscriber: (data: object) => void) => void;
    listenAppDidEnterBackground: (subscriber: (data: object) => void) => void;
    listenAppWillEnterForground: (subscriber: (data: object) => void) => void;

    executeLogin: () => Promise<Account>;
    getAccountInfo: () => Promise<Account>;
    onLineExecute: (action: (account: Account) => void) => void;
    executeCallback: (e?: object) => void

    startLoading: (status: string) => void;
    stopLoading: () => void;
    showDelayInfoTip: (info: string) => void;
}