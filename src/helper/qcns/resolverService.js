import Resolver from './resolver';
import QuarkChain from 'quarkchain-web3';
const abi = require('ethereumjs-abi');
const Web3 = require('web3');
const namehash = require('eth-ens-namehash');
let web3 = new Web3();
let resolver = null;

export const resolverInit = (provider, resolverAddr) => {
  if(!resolver || !web3.currentProvider){
    QuarkChain.injectWeb3(web3, provider);
    //web3.setProvider(new web3.providers.HttpProvider(provider));
    resolver = new Resolver(web3, resolverAddr);
  }
}


/**
 * 
 * @param {*} name 
 */
export const getContent = async (name) => {
  try {
    const content = await resolver.content(namehash.hash(name));
    return content;
  } catch (err) {
    console.log('getContent: ', name, err);
    return 'getContent not found';
  }
}

/**
 * 
 * @param {*} name 
 */
export const getMultihash = async (name, key) => {
  try {
    const content = await resolver.multihash(namehash.hash(name), key);
    return content;
  } catch (err) {
    console.log('getMultihash: ', name, err);
    return 'getMultihash not found';
  }
}

/**
 * 
 * @param {*} name 
 */
export const getAddress = async (name) => {
  try {
    const address = await resolver.addr(namehash.hash(name));
    return address;
  } catch (err) {
    console.log('getAddress: ', name, err);
    return 'getAddress not found';
  }
}

/**
 * 
 * @param {*} support 
 */
export const getSupportsInterface = async (support) => {
  try {
    const isSupport = await resolver.supportsInterface(support);
    return isSupport;
  } catch (err) {
    console.log('getSupportsInterface: ', support, err);
    return 'getSupportsInterface not found';
  }
}
