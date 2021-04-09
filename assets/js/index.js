
//--------------general settings--------------

//contractAddress
const ContractAddress = "0x058851CbFEc5Cefd9C3b5cC9a4453006fd0B93B5";

//mainnet
//const ContractAddress = "0x379C97D28f89775b06e5392E30ECBcc2c3f8e7Fd";

//matic matic testnet(0) or matic network(1)
const network = 0;

//---------------------------------------------


//testnet or mainnet 
//rpclist = [ "" , "" ];
explorerlist = [ "https://explorer-mumbai.maticvigil.com/tokens/" , "https://explorer-mainnet.maticvigil.com/tokens/" ];
mintnandemotokenapilist = [ "https://mint.nandemotoken.com/api/v1/testnet/" , "https://mint.nandemotoken.com/api/v1/" ];
opensealist = [ "https://testnets.opensea.io/account/" , "https://opensea.io/account/"];


let replica_contract;

window.onload = async function() {
    ethereum.on('chainChanged', (_chainId) => window.location.reload());
}

function walletmodal(){
    $('#wallet-popup').modal('show');
}


async function loadmm_gasfree(){
    $('#wallet-popup').modal('hide');
    if (typeof web3 == 'undefined'){
        ans = window.confirm("metamaskをインストールしてください\nmetamaskのインストール方法を確認しますか？\n\n参考：https://note.com/ocurima/n/n29e1fd7ecbdd");
        if (ans){
            window.open("https://note.com/ocurima/n/n29e1fd7ecbdd");
        }
        return;
    }
    
    ans = window.confirm("OKを押すと『NFTスタンプ』がMetaMaskに送信されます")
    if ( !ans ){
        return;
    }
    
    
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const add = await signer.getAddress();

    ans2 = await signer.signMessage( "NFTスタンプを受け取ります" );
    if ( ans2[1] != "x" ){
        return;
    }
    
    
    
    let result = await $.getJSON( mintnandemotokenapilist[network] + ContractAddress + "/"+ add + "/" )
    console.log(result);
    $('#myinfo').modal('show')
    
    //    window.alert("開発中です。しばらくお待ちください");
}

function explorer(){
    //window.alert("matic")
    ans = window.confirm("ブロックチェーンエクスプローラーを開く\n\n" + explorerlist[network] + ContractAddress + "/inventory\n\nNFTの発行状況を確認しますか？(通常は1分以内に発行されます)");
        if(ans){ window.open( explorerlist[network] +ContractAddress + "/inventory"); }
}

function opensea(){
    //window.alert("opensea")
    ans = window.confirm("OpenSeaでNFTスタンプを確認する\n\n"+ opensealist[network] + "\n\nOpenSeaを開き、MetaMaskを接続しますか？\n(反映には数分時間がかかります。NFTの画像は処理が終わると表示されます)");
        if(ans){ window.open( opensealist[network] ); }
}
