export const NFTCard = ({ nft }) => {
    if (!Collection.length) return null;

    function copyToClipboard(e) {
        copyTextToClipboard();
        e.target.focus();
        
    };
      
    async function copyTextToClipboard() {
        try {
            await navigator.clipboard.writeText(nft.contract.address);
            console.log('Copied to clipboard');
        } catch (err) {
            console.error('Copy function failed: ', err);
        }
    };

    return ( 
        //description appears in hover-over the NFTs picture to save screen footprint 
        <div className="w-1/6 m-3 flex flex-col ">
        <div className="rounded-md">
            <image className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway} title={nft.description}></image>
        </div>
        <div className="flex flex-col y-gap-2 px-2 py-3 bg-purple-600 rounded-b-md h-110 ">
            <div className="">
                <h2 className="text-xl text-white text-center" title={nft.title}>{nft.title}</h2>
                <p className="text-sm text-white" title={nft.id.tokenId}>Id: {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>
                <p className="text-sm text-white" title={nft.contract.address}>CA: {nft.contract.address}</p>
                
            <div className="flex justify-center mt-2 mb-2">
                <a className="py-2 px-2 mr-2 text-sm bg-green-600 w-full text-center rounded-lg text-white cursor-pointer" title="Copy to clipboard and go to input" onClick={copyToClipboard} href={`#ca`} >Copy Contract Address and go to Contract Address Input </a>
            </div> 
            </div>
            
            <div className="flex justify-center mt-2 mb-2">
                <a target={"_blank"} href={`https://etherscan.io/address/${nft.contract.address}`} className="py-2 px-2 mr-1 text-sm bg-blue-500 w-1/2 text-center rounded-lg text-white cursor-pointer" title=" Collection Contract Address">Contract on Etherscan</a>
                <a target={"_blank"} href={`https://etherscan.io/token/${nft.contract.address}`} className="py-2 px-2 ml-1 text-sm bg-blue-500 w-1/2 text-center rounded-lg text-white cursor-pointer" title=" Collection Token Address">Token on etherscan</a>
            </div>
        </div>
        </div>      
    )
}

export default NFTCard