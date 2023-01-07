import React, { useState, useEffect } from 'react';

import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
// import axios from 'axios';

import { create as ipfsHttpClient } from 'ipfs-http-client';
import { MarketAddress, MarketAddressABI } from './constants';
import { SECRET_KEY, PROJECT_ID, BASE_IPFS_URL } from '../keys';

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

const fetchContract = (signer) => new ethers.Contract(MarketAddress, MarketAddressABI, signer);

export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const currency = 'ETH';

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
    // this will get the image that we have deployed to blockchain
    try {
      const cid = await client.add({ content: file });
      const url = `${BASE_IPFS_URL}${cid.path}`;
      return url;
    } catch (err) {
      console.log('there was an Error while uploading the file');
    }
  };
  const createSale = async (url, price) => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const parsedPrice = ethers.utils.parseUnits(price, 'ether');

    const contract = fetchContract(signer);

    const listingPrice = await contract.getListingPrice();
    const transaction = await contract.createToken(url, parsedPrice, { value: listingPrice.toString() });

    await transaction.wait();
  };

  const createNewNFT = async (formInput, fileUrl, router) => {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;

    const data = JSON.stringify({ name, description, image: fileUrl });

    try {
      const added = await client.add(data);
      const url = `${BASE_IPFS_URL}${added.path}`;
      await createSale(url, price);
      router.push('/');
    } catch (err) {
      console.log('Error while uploading the file');
    }
  };

  // refatoring
  return (
    <NFTContext.Provider
      value={{ currency, connectWallet, currentAccount, uploadToIPFS, createNewNFT }}
    >
      {children}
    </NFTContext.Provider>
  );
};
