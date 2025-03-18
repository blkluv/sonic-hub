# SonicHub Technical Documentation

## Overview

SonicHub is a multi-agent DeFi, Gaming, NFT & Social platform built on the Sonic Mainnet. It leverages autonomous agents to facilitate various AI operations, aiming to provide users with efficient and seamless blockchain interaction.

## Features

- **AI-Powered Simplicity:** Natural language interface makes blockchain easy to use.  
- **Multi-Agent Coordination:** Each agent specializes in a function while seamlessly interacting.  
- **Optimized for Sonic SVM Mainnet:** Faster transactions, lower fees, and secure smart contract execution.  
- **Built with Sonic Agent Kit:** Enables intelligent task execution, cross-agent communication, and modular scalability.

Here is a **comprehensive list** of all agents on **SonicHub**, categorized into **Core Agents, NFT & Token Agents, Gaming Agents, and Analysis Agents** with their **details, capabilities, and usage examples**.

---

## **1️⃣ Core Agents**
These agents handle fundamental blockchain operations such as wallet management, trading, transfers, and liquidity provisioning.

### **📌 Wallet Agent**
- **Description:** Retrieves wallet information including balance, transaction history, and network status.
- **Capabilities:**
  - Fetch real-time balances of supported tokens.
  - Display transaction history and network status.
  - Show gas fees and wallet activity.
- **Example Usage:**  
  - *"Show my wallet balance."*  
  - *"What’s my transaction history?"*

---

### **📌 Trading Agent**
- **Description:** Executes decentralized trades on supported DEXs, finding optimal swap routes.
- **Capabilities:**
  - Swap tokens across multiple DEXs.
  - Execute limit and market orders.
  - Find the best available trading rates.
- **Example Usage:**  
  - *"Swap 2 SONIC for USDC at the best rate."*  
  - *"Show me the best price to swap SOL for USDT."*

---

### **📌 Transfer Agent**
- **Description:** Facilitates seamless on-chain asset transfers, including gasless transactions.
- **Capabilities:**
  - Send tokens to any address.
  - Execute batch transfers.
  - Enable gasless USDC transfers.
- **Example Usage:**  
  - *"Send 100 USDC to 0x123…abc."*  
  - *"Transfer 5 SONIC to another wallet."*

---

### **📌 Liquidity Agent**
- **Description:** Provides liquidity management tools for DeFi protocols.
- **Capabilities:**
  - Add/remove liquidity in liquidity pools.
  - Track and optimize yield farming strategies.
  - Manage LP token staking.
- **Example Usage:**  
  - *"Add 10 SONIC and 1000 USDC to a liquidity pool."*  
  - *"Show my LP token holdings."*

---

### **📌 Bridging Agent**
- **Description:** Facilitates cross-chain asset transfers between networks.
- **Capabilities:**
  - Bridge assets between Sonic SVM Mainnet and other chains.
  - Optimize bridging routes for lower fees.
  - Display bridge transaction history.
- **Example Usage:**  
  - *"Bridge 50 USDT from Ethereum to Sonic SVM."*  
  - *"What’s the fastest route to bridge SOL?"*

---

## **2️⃣ NFT & Token Agents**
These agents help users create, manage, and interact with NFTs and tokens.

### **📌 Deploy NFT Agent**
- **Description:** Deploys NFT collections using Sonic SVM Mainnet and Metaplex.
- **Capabilities:**
  - Launch NFT collections with custom metadata.
  - Set royalty and minting rules.
  - Manage on-chain attributes.
- **Example Usage:**  
  - *"Create an NFT collection named Sonic Creatures."*  
  - *"Set 10% royalties on my NFT collection."*

---

### **📌 Mint NFT Agent**
- **Description:** Allows users to mint NFTs from existing collections.
- **Capabilities:**
  - Mint single or batch NFTs.
  - Customize attributes and metadata.
  - Transfer NFTs to other addresses.
- **Example Usage:**  
  - *"Mint 3 NFTs from my collection."*  
  - *"Transfer my minted NFT to another wallet."*

---

### **📌 Deploy Token Agent**
- **Description:** Helps users create and manage custom fungible tokens.
- **Capabilities:**
  - Deploy new ERC-20 or SPL tokens.
  - Set initial supply, tokenomics, and minting rules.
  - Enable token burning or governance features.
- **Example Usage:**  
  - *"Create a token named SONIC with a 1M supply."*  
  - *"Enable token staking rewards on my token."*

---

### **📌 Token Locker Agent**
- **Description:** Locks tokens for vesting, liquidity, or security purposes.
- **Capabilities:**
  - Lock tokens for a set duration.
  - Create vesting schedules for investors.
  - Secure team allocations in smart contracts.
- **Example Usage:**  
  - *"Lock 500,000 tokens for 12 months."*  
  - *"Set up a vesting schedule for my project."*

---

## **3️⃣ Gaming Agents**
These agents facilitate blockchain gaming operations on **Sonic SVM Mainnet**.

### **📌 GamePad Agent**
- **Description:** Launches blockchain games on Sonic SVM with integrated smart contracts.
- **Capabilities:**
  - Deploy game contracts on Sonic SVM.
  - Set up in-game NFT rewards and token utilities.
  - Enable on-chain transactions for in-game items.
- **Example Usage:**  
  - *"Launch my new RPG game on Sonic SVM."*  
  - *"Enable token staking in my game."*

---

### **📌 GameHub Agent**
- **Description:** Tracks and ranks players on gaming leaderboards using on-chain data.
- **Capabilities:**
  - Display real-time player rankings.
  - Fetch on-chain game statistics.
  - Show game participation history.
- **Example Usage:**  
  - *"Show me the top players in the racing game."*  
  - *"Who won the last tournament on Sonic SVM?"*

---

## **4️⃣ Analysis Agents**
These agents provide blockchain data insights and market intelligence.

### **📌 Token Analysis Agent**
- **Description:** Provides token market data and analytics.
- **Capabilities:**
  - Show token price history and market cap.
  - Track liquidity and trading volume.
  - Provide sentiment analysis on price movements.
- **Example Usage:**  
  - *"Show me the 7-day price chart for SOL."*  
  - *"What’s the 24-hour trading volume of ETH?"*

---

### **📌 Knowledge Agent**
- **Description:** Offers educational content on DeFi, NFTs, and blockchain concepts.
- **Capabilities:**
  - Explain blockchain terminologies.
  - Provide interactive learning guides.
  - Fetch blockchain documentation.
- **Example Usage:**  
  - *"Explain how yield farming works."*  
  - *"Give me a guide on using liquidity pools."*

---

### **📌 Social Agent**
- **Description:** Aggregates sentiment analysis and trends from social media.
- **Capabilities:**
  - Scan Twitter, Reddit, and Discord for blockchain discussions.
  - Analyze sentiment trends on specific tokens.
  - Identify upcoming projects and trends.
- **Example Usage:**  
  - *"What’s the latest sentiment on $SONIC?"*  
  - *"Which new gaming tokens are trending?"*

---


## Installation

To set up SonicHub locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/UncleTom29/sonic-hub.git
   cd sonic-hub
   ```

2. **Install Dependencies**:

   Ensure you have [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed. Then, run:

   ```bash
   yarn install
   ```

3. **Configure the Environment**:

   Set up necessary environment variables. Refer to the `tsconfig.json` and `tailwind.config.ts` files for configuration details.

4. **Run the Application**:

   Start the development server:

   ```bash
   yarn start
   ```

   The application should now be accessible at `http://localhost:3000`.

## Usage

Once the application is running, users can interact with various DeFi services provided by SonicHub. The multi-agent system autonomously manages tasks such as asset management, trading, and more.

## Contributing

Contributions to SonicHub are welcome. To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear messages.
4. Push your branch and open a Pull Request.

Ensure that your code adheres to the project's coding standards and includes necessary tests.

## License

SonicHub is licensed under the MIT License. For more details, refer to the [LICENSE](https://github.com/UncleTom29/sonic-hub/blob/main/LICENSE) file.

## Contact

For questions or support, please open an issue in the [GitHub repository](https://github.com/UncleTom29/sonic-hub/issues).
