let web3;
let contract;
const contractAddress = '0xaCb036621ff653DB861300cfeF47c80406F9f539';
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_buyer",
                "type": "address"
            }
        ],
        "name": "approveBuyerProposal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_seller",
                "type": "address"
            }
        ],
        "name": "approveSellerProposal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "credits",
                "type": "uint256"
            }
        ],
        "name": "BuyerProposalApproved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "credits",
                "type": "uint256"
            }
        ],
        "name": "BuyerProposalSubmitted",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_seller",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_buyer",
                "type": "address"
            }
        ],
        "name": "completeTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "credits",
                "type": "uint256"
            }
        ],
        "name": "SellerProposalApproved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "credits",
                "type": "uint256"
            }
        ],
        "name": "SellerProposalSubmitted",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_credits",
                "type": "uint256"
            }
        ],
        "name": "submitBuyerProposal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_credits",
                "type": "uint256"
            }
        ],
        "name": "submitSellerProposal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "credits",
                "type": "uint256"
            }
        ],
        "name": "TransactionCompleted",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "buyerProposals",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "credits",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "counterparty",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "contractOwner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "sellerProposals",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "credits",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "counterparty",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const loadWeb3 = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
        } catch (error) {
            console.error("User denied account access");
        }
    } else if (window.web3) {
        web3 = new Web3(web3.currentProvider);
    } else {
        console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }

    contract = new web3.eth.Contract(contractABI, contractAddress);
};

document.getElementById('buyerBtn').addEventListener('click', function () {
    document.getElementById('buyerForm').classList.remove('hidden');
    document.getElementById('sellerForm').classList.add('hidden')
});

document.getElementById('sellerBtn').addEventListener('click', function () {
    document.getElementById('sellerForm').classList.remove('hidden');
    document.getElementById('buyerForm').classList.add('hidden');
});

// Buyer and Seller submit buttons (just alerts for demo purposes)
document.getElementById('buyerSubmitBtn').addEventListener('click', async () => {
    await loadWeb3();
    const credits = document.getElementById('buyerCredits').value;
    console.log(contract);
    const accounts = await web3.eth.getAccounts();
    await contract.methods.submitBuyerProposal(credits).send({ from: accounts[0] });
    alert("Buyer proposal submitted");
    alert('Buyer details submitted!');
    // Add logic to submit data to blockchain or backend here
});

document.getElementById('sellerSubmitBtn').addEventListener('click', async () => {
    await loadWeb3();
    alert('Seller details submitted!');
    const credits = document.getElementById('buyerCredits').value;
    console.log(credits);
    const accounts = await web3.eth.getAccounts();
    await contract.methods.submitSellerProposal(credits).send({ from: accounts[0] });
    alert("Seller proposal submitted");
    // Add logic to submit data to blockchain or backend here
});


