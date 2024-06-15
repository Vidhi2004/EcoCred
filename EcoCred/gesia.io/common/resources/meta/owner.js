let web3
let contract;
let accounts;
const contractAddress = '0xaCb036621ff653DB861300cfeF47c80406F9f539';
document.addEventListener('DOMContentLoaded', async function () {
    // const address = localStorage.getItem('ethAddress');
    // if (!address) {
    //     window.location.href = 'login.html';
    //     return;
    // }

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
    accounts = await web3.eth.getAccounts();

    document.getElementById('ownerAddress').textContent += accounts[0];

    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        const balance = await web3.eth.getBalance(address);
        document.getElementById('ownerBalance').textContent += web3.utils.fromWei(balance, 'ether') + ' ETH';

        // Fetch recent transactions
        contract = new web3.eth.Contract(contractABI, contractAddress);
        const allProposals = await contract.methods.getAllProposals().call();
        const transactionsTable = document.getElementById('transactionsTable');
        allProposals.forEach(tx => {
            const row = document.createElement('tr');
            row.innerHTML = `
                    <td class="border px-4 py-2">${tx.counterparty}</td>
                    <td class="border px-4 py-2">${tx.credits}</td>
                    <td class="border px-4 py-2">${new Date(tx.timestamp * 1000).toLocaleString()}</td>
                    <td class="border px-4 py-2">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300" onclick="takeAction('${tx.hash}')">Take Action</button>
                    </td>
                `;
            transactionsTable.appendChild(row);
        });
    } else {
        alert('MetaMask is not installed. Please install it to use this app.');
    }
    // }
})

// async function fetchRecentTransactions(address, web3) {
//     // Example function to fetch recent transactions; replace with your logic
//     return [
//         {
//             hash: '0x123',
//             walletAddress: '0xabc',
//             carbonCredits: '10', // Replace with actual carbon credits value
//             timestamp: Math.floor(Date.now() / 1000)
//         },
//         {
//             hash: '0x456',
//             walletAddress: '0xdef',
//             carbonCredits: '15', // Replace with actual carbon credits value
//             timestamp: Math.floor(Date.now() / 1000) - 3600 // Example: 1 hour ago
//         },
//         // Add more transactions as needed
//     ];
// 


async function takeAction(transactionHash) {
    if (typeof window.ethereum !== 'undefined') {
        // const web3 = new Web3(window.ethereum);
        // const accounts = await web3.eth.getAccounts();
        // const sender = accounts[0];

        // // Example action: send a small amount of ETH back to the sender
        // const transactionParameters = {
        //     to: sender, // Send back to the sender
        //     from: sender,
        //     value: web3.utils.toHex(web3.utils.toWei('0.01', 'ether')),
        //     gas: '21000',
        // };

        try {
            await contract.methods.approveSellerProposal(transactionHash).send({ from: accounts[0] });
            alert('Proposal approved successfully!');
            location.reload();

        } catch (error) {
            console.error('Transaction failed', error);
            alert('Transaction failed: ' + error.message);
        }
    } else {
        alert('MetaMask is not installed. Please install it to use this app.');
    }
}

document.getElementById('issueTokenBtn').addEventListener('click', async function () {
    const receiver = document.getElementById('recipientAddress').value;
    const sender = document.getElementById('tokenAmount').value;
    const accounts = await web3.eth.getAccounts();


    try {
        await contract.methods.completeTransaction(sender, receiver).send({ from: accounts[0] });
        alert('Transaction completed successfully!');
        location.reload();
    } catch (error) {
        console.error('Error completing transaction:', error);
        alert('Error completing transaction. Please check the console for details.');
    }
});


// if (!recipientAddress || !tokenAmount) {
//     alert('Please enter a valid address and amount.');
//     return;
// }

// const accounts = await window.web3.eth.getAccounts();
// const sender = accounts[0];

// const abi = []; // Add your contract's ABI here
// const contractAddress = '0xYourContractAddress'; // Replace with your contract address

// const contract = new window.web3.eth.Contract(abi, contractAddress);

// contract.methods.issue(recipientAddress, tokenAmount).send({ from: sender })
//     .on('transactionHash', function (hash) {
//         alert('Transaction sent: ' + hash);
//     })
//     .on('receipt', function (receipt) {
//         alert('Transaction confirmed: ' + receipt.transactionHash);
//         location.reload();
//     })
//     .on('error', function (error, receipt) {
//         console.error('Error:', error);
//     });

document.getElementById('logoutBtn').addEventListener('click', function () {
    localStorage.removeItem('ethAddress');
    window.location.href = 'login.html';
});



const contractABI = [];