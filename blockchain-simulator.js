// Blockchain Simulator for FarmTrace
// Simulates blockchain operations for demo purposes

const crypto = require('crypto');

class Block {
    constructor(index, timestamp, data, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto.createHash('sha256')
            .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce)
            .digest('hex');
    }

    mineBlock(difficulty) {
        const target = Array(difficulty + 1).join("0");
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(`Block mined: ${this.hash}`);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    minePendingTransactions() {
        const block = new Block(
            this.chain.length,
            Date.now(),
            this.pendingTransactions,
            this.getLatestBlock().hash
        );

        block.mineBlock(this.difficulty);
        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [];
    }

    createTransaction(fromAddress, toAddress, amount, productData = null) {
        const transaction = {
            fromAddress,
            toAddress,
            amount,
            productData,
            timestamp: Date.now(),
            transactionId: this.generateTransactionId()
        };

        this.addTransaction(transaction);
        return transaction;
    }

    generateTransactionId() {
        return crypto.randomBytes(16).toString('hex');
    }

    getAddressBalance(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const transaction of block.data) {
                if (transaction.fromAddress === address) {
                    balance -= transaction.amount;
                }

                if (transaction.toAddress === address) {
                    balance += transaction.amount;
                }
            }
        }

        return balance;
    }

    getAllTransactionsForAddress(address) {
        const transactions = [];

        for (const block of this.chain) {
            for (const transaction of block.data) {
                if (transaction.fromAddress === address || transaction.toAddress === address) {
                    transactions.push(transaction);
                }
            }
        }

        return transactions;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }

    // FarmTrace specific methods
    recordFarmerRegistration(userId, farmerData) {
        const transaction = this.createTransaction(
            null,
            `farmer_${userId}`,
            0,
            {
                type: 'FARMER_REGISTRATION',
                farmerId: userId,
                farmerName: farmerData.fullName,
                farmLocation: farmerData.farmAddress,
                farmSize: farmerData.farmSize,
                isOrganic: farmerData.isOrganic || false,
                timestamp: Date.now()
            }
        );

        this.minePendingTransactions();
        return transaction;
    }

    recordProductBatch(farmerId, productData) {
        const transaction = this.createTransaction(
            `farmer_${farmerId}`,
            `product_${productData.id}`,
            0,
            {
                type: 'PRODUCT_BATCH',
                productId: productData.id,
                farmerId: farmerId,
                productName: productData.productName,
                quantity: productData.quantityKg,
                pricePerKg: productData.pricePerKg,
                qualityGrade: productData.qualityGrade,
                harvestDate: productData.harvestDate,
                isOrganic: productData.isOrganic,
                qrCode: productData.qrCode,
                timestamp: Date.now()
            }
        );

        this.minePendingTransactions();
        return transaction;
    }

    recordKYCVerification(userId, documentType, verificationStatus) {
        const transaction = this.createTransaction(
            `user_${userId}`,
            'kyc_authority',
            0,
            {
                type: 'KYC_VERIFICATION',
                userId: userId,
                documentType: documentType,
                verificationStatus: verificationStatus,
                verifiedBy: 'field_agent',
                timestamp: Date.now()
            }
        );

        this.minePendingTransactions();
        return transaction;
    }

    recordSaleTransaction(sellerId, buyerId, productId, amount, quantity) {
        const transaction = this.createTransaction(
            `user_${sellerId}`,
            `user_${buyerId}`,
            amount,
            {
                type: 'PRODUCT_SALE',
                productId: productId,
                sellerId: sellerId,
                buyerId: buyerId,
                quantity: quantity,
                unitPrice: amount / quantity,
                timestamp: Date.now()
            }
        );

        this.minePendingTransactions();
        return transaction;
    }

    getProductHistory(productId) {
        const history = [];

        for (const block of this.chain) {
            for (const transaction of block.data) {
                if (transaction.productData &&
                    (transaction.productData.productId === productId ||
                     transaction.toAddress === `product_${productId}`)) {
                    history.push({
                        blockIndex: block.index,
                        blockHash: block.hash,
                        timestamp: transaction.timestamp,
                        type: transaction.productData.type,
                        data: transaction.productData
                    });
                }
            }
        }

        return history;
    }

    generateQRData(productId) {
        const productHistory = this.getProductHistory(productId);
        const latestRecord = productHistory[productHistory.length - 1];

        if (latestRecord) {
            return {
                productId: productId,
                blockHash: latestRecord.blockHash,
                timestamp: latestRecord.timestamp,
                verificationUrl: `https://farmtrace.blockchain/verify/${latestRecord.blockHash}`,
                data: latestRecord.data
            };
        }

        return null;
    }
}

// Create global blockchain instance
const farmTraceBlockchain = new Blockchain();

// Add some initial demo data
console.log('Initializing FarmTrace Blockchain...');

// Demo farmer registration
farmTraceBlockchain.recordFarmerRegistration(1, {
    fullName: 'Rajesh Kumar',
    farmAddress: 'Village Khetpur, Odisha',
    farmSize: 2.5,
    isOrganic: true
});

// Demo product batch
farmTraceBlockchain.recordProductBatch(1, {
    id: 1,
    productName: 'Organic Tomatoes',
    quantityKg: 500,
    pricePerKg: 45.50,
    qualityGrade: 'Grade A',
    harvestDate: '2024-09-10',
    isOrganic: true,
    qrCode: 'QR_TOM_001'
});

// Demo KYC verification
farmTraceBlockchain.recordKYCVerification(1, 'AADHAAR', 'VERIFIED');

console.log('Blockchain initialized with demo data!');
console.log(`Total blocks: ${farmTraceBlockchain.chain.length}`);
console.log(`Blockchain valid: ${farmTraceBlockchain.isChainValid()}`);

module.exports = {
    blockchain: farmTraceBlockchain,
    Block,
    Blockchain
};