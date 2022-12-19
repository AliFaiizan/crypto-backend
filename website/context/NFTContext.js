import React, { useState, useEffect } from 'react';

import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';

import { create as ipfsHttpClient } from 'ipfs-http-client';
import { MarketAddress, MarketAddressABI } from './constants';
import { SECRET_KEY, PROJECT_ID } from '../keys';

const auth = `Basic ${Buffer.from(
  `${PROJECT_ID}:${SECRET_KEY}`,
).toString('base64')}`;
const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  path: '/api/v0',
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const currency = 'MATIC';

  const checkIfWalletConnected = async () => {
    if (!window.ethereum) return alert('Please install Metamask');
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No Account Found');
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install Metamask');
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    setCurrentAccount(accounts[0]);
    window.location.reload();
  };
  // https://cid.ipfs.tech/#QmVFUxLuFhULhNd4UEvfb5UgiJVV5aeRgUuVQrrkfFV64P  formetadata
  const uploadToIPFS = async (file) => {
    try {
      const cid = await client.add({ content: file });
      const url = `https://ipfs.io/${cid.path}`;
      return url;
    } catch (err) {
      console.log('there was an Error while uploading the file');
    }
  };
  return (
    <NFTContext.Provider
      value={{ currency, connectWallet, currentAccount, uploadToIPFS }}
    >
      {children}
    </NFTContext.Provider>
  );
};
