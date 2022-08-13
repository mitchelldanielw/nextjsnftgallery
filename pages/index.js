
import { useState, useEffect } from 'react'
import {NFTCard} from "./components/nftCard"

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection]=useState(false);

  const fetchNFTs = async() => {
    let nfts; 
    console.log("fetching nfts");
    const api_key = '06jhVGT7LyRH0LTyj0HnMjkmYomFKRhc'
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
    
    if (!collection.length) 
      {var requestOptions = {
        method: 'GET'
      };
    
      const fetchURL = `${baseURL}?owner=${wallet}`;
  
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
        console.log("Fetching address owned NFTs collection:")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
    }
  
    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }
  }

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET'
      };
      const api_key = '06jhVGT7LyRH0LTyj0HnMjkmYomFKRhc'
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log("Collection NFTs:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

  return (
    
    <div className="h-screen w-screen bg-slate-900 ">
    
      <div className="flex flex-col items-center justify-center">
        <span className="bg-clip-text text-transparent py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-8xl font-bold ...">Alchemy RTW3 Week4 (NFT GALLERY)</span>

      <div className="flex flex-col items-center justify-center">
        <input id="wa" disabled={fetchForCollection} className="w-full bg-gradient-to-r from-violet-900 to-fuchsia-600 py-2 px-2 rounded-lg text-white focus:outline-slate-300 disabled:let text=purple-900" title="Paste Wallet Address" onChange={(e) => { setWalletAddress(e.target.value); } } value={wallet} type={"text"} placeholder="Enter or paste a wallet address here"></input>

        <label className="text-white"><input onChange={(e) => { setFetchForCollection(e.target.checked); setWalletAddress("");} } type={"checkbox"} className="mr-2 mt-2 mb-3" title="Remove and Ignore wallet address"></input>Ignore wallet address and search any NFT collections!</label>

        <input id="ca" className="w-full bg-gradient-to-r from-violet-900 to-fuchsia-600 py-2 px-2 rounded-lg text-white focus:outline-slate-300" title="Paste Collection Address" onChange={(e) => { setCollectionAddress(e.target.value); } } value={collection} type={"text"} placeholder="Enter or paste a collection address here"></input>

        <button className={"text-white bg-gradient-to-r from-violet-900 to-fuchsia-600 px-4 py-2 mt-3 rounded-lg w-1/8"} title="Discover NFTs!" onClick={() => {
          if (fetchForCollection) { 
            fetchNFTsForCollection();
          }
          else
            fetchNFTs();
            setCollectionAddress("");
            setWalletAddress("");
        } }>Discover NFTs!</button>
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length && NFTs.map(nft => {
            return (
              <NFTCard nft={ nft }/>
            )
          })
        }
      </div>
    </div>
    </div>
  )
}
export default Home
