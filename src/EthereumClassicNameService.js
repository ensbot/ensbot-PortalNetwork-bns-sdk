"use strict"
import {
  registryInit,
  getResolver
} from "./helper/ecns/registryService";
import {
  resolverInit,
  getAddress,
  getContent,
  getMultihash,
  getSupportsInterface
} from "./helper/ecns/resolverService";

class EthereumClassicNameService {
  // Provider URL
  constructor(restURL) {
    this.restURL = restURL
  }

  async getResolver(name) {
    // TODO using web3 to fetch data
    registryInit(this.restURL);
    const resolverAddr = await getResolver(name);
    return resolverAddr;
  }

  async getAddress(name) {
    registryInit(this.restURL, this.networkId);
    const resolverAddr = await getResolver(name);
    resolverInit(this.restURL, resolverAddr);
    const addr = await getAddress(name);
    return addr;
  }

  async getContent(name) {
    registryInit(this.restURL, this.networkId);
    const resolverAddr = await getResolver(name);
    resolverInit(this.restURL, resolverAddr);
    const content = await getContent(name);
    return content;
  }

  async getMultihash(name) {
    registryInit(this.restURL, this.networkId);
    const resolverAddr = await getResolver(name);
    resolverInit(this.restURL, resolverAddr);
    const isSupportMultihash = await getSupportsInterface("multihash");
    if(isSupportMultihash){
      const multihash = await getMultihash(name);
      return multihash;
    }else{
      return "Not support multihash";
    }
  }
}

export default EthereumClassicNameService
