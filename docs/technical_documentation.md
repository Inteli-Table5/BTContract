# BTContract: Technical Documentation

## Project Overview

BTContract is a comprehensive Bitcoin contract management platform designed to bridge the technical gap for non-developers seeking to leverage blockchain technology. This platform enables users with minimal technical knowledge to create, deploy, and manage Bitcoin-based smart contracts through an intuitive interface, abstracting away the underlying complexity of blockchain interactions.

The system empowers users to establish binding agreements using Bitcoin and Lightning Network technology, facilitating secure, transparent, and automated transactions without requiring in-depth knowledge of cryptographic principles or blockchain development.

## System Architecture

BTContract implements a modern client-server architecture with a clear separation of concerns between presentation, business logic, and blockchain integration layers:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────────┐
│             │     │             │     │                     │
│  Next.js    │────▶│  Next.js    │────▶│  Lightning Network  │
│  Frontend   │◀────│  API Routes │◀────│  Bitcoin Network    │
│             │     │             │     │                     │
└─────────────┘     └─────────────┘     └─────────────────────┘
```

### Architectural Components

- **Frontend Layer**: A responsive Next.js application providing the user interface for contract creation, management, and monitoring
- **Backend Layer**: Next.js API routes providing RESTful API endpoints that process requests, generate contract logic, and manage blockchain interactions
- **Blockchain Integration Layer**: Direct integration with Lightning Network nodes and the Bitcoin blockchain for contract deployment and execution
- **Database Layer**: PostgreSQL database managed through Prisma ORM for storing user data, contract information, and transaction history

This separation ensures maintainability, scalability, and security while providing a seamless user experience across the contract lifecycle.

## Technical Stack

### Frontend Architecture

#### Next.js Framework

BTContract leverages **Next.js** as the foundation of its user interface, providing several significant advantages:

- **Server-Side Rendering**: Improves initial load performance and SEO optimization
- **API Routes**: Enables backend functionality within the same application, simplifying deployment
- **Component-Based Architecture**: The application is built from encapsulated, reusable components that maintain internal state, promoting code organization
- **File-Based Routing**: Simplifies navigation structure and routing logic
- **React Integration**: Utilizes React's efficient DOM manipulation for improved rendering performance

#### TailwindCSS Integration

The platform incorporates **TailwindCSS** for styling, providing a developer-friendly approach to creating a consistent, responsive user interface:

- **Utility-First Approach**: Accelerates development by eliminating the need to context-switch between template and stylesheet files
- **JIT Compiler**: Generates only the CSS classes actually used, resulting in minimal production bundle sizes
- **Responsive Design System**: Built-in responsive modifiers enable effortless adaptation to different screen sizes
- **Design System Consistency**: Custom configuration allows for standardized color palettes, spacing scales, and typography

### Authentication & Security

BTContract implements **NextAuth.js** for secure user authentication, providing:

- **Multiple Authentication Providers**: Support for various authentication methods including email/password, social logins, and more
- **JWT Sessions**: Secure session management using JSON Web Tokens
- **Role-Based Access Control**: Different permission levels for users, administrators, and other roles
- **CSRF Protection**: Built-in protection against cross-site request forgery attacks

### Database Technology

The platform utilizes a robust database infrastructure:

- **PostgreSQL**: A powerful, open-source relational database hosted on Render
- **Prisma ORM**: Type-safe database client that simplifies database operations with auto-generated queries
- **Schema Management**: Versioned database schema defined through Prisma schema
- **Database Migrations**: Automated migration handling for seamless schema updates

### Contract/Blockchain Technology

BTContract utilizes several blockchain technologies to implement its smart contract functionality:

- **Lightning Network**: This Layer 2 solution enables instant, low-fee Bitcoin transactions, dramatically improving user experience compared to on-chain transactions
- **HTLC (Hashed Timelock Contracts)**: These specialized Bitcoin scripts implement conditional payments that release funds only when specific cryptographic conditions are met
- **Bitcoin Scripts**: The platform generates appropriate Bitcoin script code to implement contract logic directly on the blockchain

## Contract Lifecycle

BTContract manages the complete contract lifecycle from creation through settlement:

### 1. Contract Generation

The contract generation process begins when users specify contract parameters through the intuitive frontend interface. These parameters define the agreement terms, parties involved, and conditional logic.

The system validates all inputs to ensure completeness and correctness before generating the appropriate contract structure. This includes:

- Validation of Bitcoin and Lightning Network public keys and node identifiers
- Amount verification and conversion between BTC and satoshi units
- Automatic generation of secure cryptographic elements like payment hashes
- Creation of appropriate script templates based on contract type

### 2. Contract Deployment

When a user decides to deploy a contract, BTContract executes several critical steps:

- Validation of the complete contract object to ensure all required fields are present
- Generation of appropriate Bitcoin scripts based on contract type (HTLC, multisig, etc.)
- Creation of Lightning Network invoices for payment processing
- Registration of the contract in the platform's database using Prisma
- Generation of payment information (including QR codes for Lightning payments)

### 3. Payment Status Tracking

Once deployed, BTContract continuously monitors contract status through:

- Regular polling of Lightning Network nodes for payment confirmation
- Monitoring of on-chain transactions for settlement of Bitcoin contracts
- Real-time status updates to users through the frontend interface
- State transitions as the contract progresses through its lifecycle

## Implementation Details

### API Route Example for Contract Creation

```javascript
// pages/api/contracts/index.js
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import crypto from 'crypto';
import { contractFactory } from '../../../lib/contracts/contractFactory';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get user session for authentication
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { 
      contractType, 
      amount, 
      buyerAddress, 
      sellerAddress, 
      timelock, 
      description 
    } = req.body;

    // Input validation
    if (!contractType || !amount || !buyerAddress || !sellerAddress) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required contract parameters' 
      });
    }

    // Generate unique contract ID
    const contractId = crypto.randomBytes(16).toString('hex');
    
    // Create contract object based on type
    const contract = await contractFactory.createContract({
      type: contractType,
      id: contractId,
      amount: parseFloat(amount),
      buyerAddress,
      sellerAddress,
      timelock: timelock || 144, // Default: ~24 hours in blocks
      description: description || 'Bitcoin Smart Contract',
      userId: session.user.id // Link contract to current user
    });

    // Store contract in database using Prisma
    const createdContract = await prisma.contract.create({
      data: contract
    });

    res.status(201).json({
      success: true,
      message: 'Contract created successfully',
      contractId,
      contract: createdContract
    });
  } catch (error) {
    console.error('Contract creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create contract',
      details: error.message
    });
  }
}
```

### Lightning Invoice Generation

```javascript
// lib/lightning/invoiceGenerator.js
import lnService from 'ln-service';
import fs from 'fs';

export async function generateLightningInvoice(contractId, amountSats, description) {
  try {
    // Connect to Lightning Network node
    const { lnd } = lnService.authenticatedLndGrpc({
      cert: fs.readFileSync('./certs/tls.cert').toString('base64'),
      macaroon: fs.readFileSync('./certs/admin.macaroon').toString('hex'),
      socket: '127.0.0.1:10009', // LND gRPC endpoint
    });
    
    // Create expiry date (24 hours from now)
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 24);
    
    // Generate invoice
    const invoice = await lnService.createInvoice({
      lnd,
      tokens: amountSats, // Amount in satoshis
      description: `BTContract payment: ${description}`,
      expires_at: expiryDate.toISOString(),
      id: contractId, // Use contract ID as payment identifier
    });
    
    return {
      paymentRequest: invoice.request, // Lightning invoice string
      paymentHash: invoice.id,
      expiresAt: expiryDate.toISOString(),
      amountSats: amountSats
    };
  } catch (error) {
    console.error('Lightning invoice generation error:', error);
    throw new Error(`Failed to generate Lightning invoice: ${error.message}`);
  }
}
```

### Bitcoin HTLC Script

```javascript
// lib/bitcoin/scriptGenerator.js
import bitcoin from 'bitcoinjs-lib';

export function createHTLCScript(buyerPubKey, sellerPubKey, paymentHash, lockTimeBlocks) {
  // Convert inputs to appropriate format
  const buyerPubKeyBuffer = Buffer.from(buyerPubKey, 'hex');
  const sellerPubKeyBuffer = Buffer.from(sellerPubKey, 'hex');
  const paymentHashBuffer = Buffer.from(paymentHash, 'hex');
  
  // Create Bitcoin script for HTLC
  const htlcScript = bitcoin.script.compile([
    bitcoin.opcodes.OP_IF,
      bitcoin.opcodes.OP_SHA256,
      paymentHashBuffer,
      bitcoin.opcodes.OP_EQUALVERIFY,
      sellerPubKeyBuffer,
      bitcoin.opcodes.OP_CHECKSIG,
    bitcoin.opcodes.OP_ELSE,
      bitcoin.script.number.encode(lockTimeBlocks),
      bitcoin.opcodes.OP_CHECKLOCKTIMEVERIFY,
      bitcoin.opcodes.OP_DROP,
      buyerPubKeyBuffer,
      bitcoin.opcodes.OP_CHECKSIG,
    bitcoin.opcodes.OP_ENDIF
  ]);
  
  return {
    htlcScript,
    scriptAddress: bitcoin.payments.p2sh({ 
      redeem: { output: htlcScript } 
    }).address,
    redeemScript: htlcScript.toString('hex')
  };
}
```

### Next.js Contract Component

```jsx
// components/ContractDetails.jsx
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { useSession } from 'next-auth/react';

const ContractDetails = ({ contractId }) => {
  const { data: session } = useSession();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Fetch contract details when component mounts
    const fetchContractDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/contracts/${contractId}`);
        
        if (!response.ok) {
          throw new Error(`Contract fetch failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        setContract(data.contract);
      } catch (err) {
        console.error('Error fetching contract:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (session) {
      fetchContractDetails();
      
      // Set up polling for status updates every 10 seconds
      const intervalId = setInterval(fetchContractDetails, 10000);
      
      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [contractId, session]);
  
  if (loading) return <div className="text-center p-4">Loading contract details...</div>;
  if (error) return <div className="bg-red-100 p-4 rounded text-red-700">Error: {error}</div>;
  if (!contract) return <div className="bg-yellow-100 p-4 rounded">Contract not found</div>;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Contract #{contract.id.substring(0, 8)}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Contract Details</h3>
          <p><span className="font-medium">Type:</span> {contract.type}</p>
          <p><span className="font-medium">Amount:</span> {contract.amount} BTC</p>
          <p><span className="font-medium">Created:</span> {new Date(contract.createdAt).toLocaleString()}</p>
          <p><span className="font-medium">Status:</span> 
            <span className={`ml-2 px-2 py-1 rounded text-sm ${
              contract.status === 'PAID' ? 'bg-green-100 text-green-800' :
              contract.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
              contract.status === 'EXPIRED' ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {contract.status}
            </span>
          </p>
        </div>
        
        <div>
          {contract.paymentRequest && (
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Payment QR Code</h3>
              <QRCode value={contract.paymentRequest} size={200} />
              <p className="mt-2 text-sm text-gray-500">Scan with your Bitcoin Lightning wallet</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Additional contract information and controls */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">Contract Parties</h3>
        <p><span className="font-medium">Buyer:</span> {contract.buyerAddress.substring(0, 6)}...{contract.buyerAddress.substring(contract.buyerAddress.length - 6)}</p>
        <p><span className="font-medium">Seller:</span> {contract.sellerAddress.substring(0, 6)}...{contract.sellerAddress.substring(contract.sellerAddress.length - 6)}</p>
      </div>
    </div>
  );
};

export default ContractDetails;
```

### Prisma Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  contracts     Contract[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?
  access_token       String?
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?
  session_state      String?
  user               User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Contract {
  id             String   @id @default(cuid())
  type           String
  amount         Float
  buyerAddress   String
  sellerAddress  String
  timelock       Int
  description    String?
  status         String   @default("PENDING")
  paymentRequest String?
  paymentHash    String?
  scriptAddress  String?
  redeemScript   String?
  expiresAt      DateTime?
  paidAt         DateTime?
  userId         String
  user           User     @relation(fields: [userId], references: [id])
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```

## Contract Monitoring Service

The system includes a background service for monitoring contract status:

```javascript
// lib/contracts/monitor.js
import { PrismaClient } from '@prisma/client';
import { checkPayment } from '../lightning/paymentChecker';

const prisma = new PrismaClient();

export class ContractMonitor {
  constructor() {
    this.monitorInterval = null;
  }
  
  start(intervalMs = 60000) { // Default: check every minute
    if (this.monitorInterval) {
      this.stop(); // Ensure we don't have multiple monitors running
    }
    
    console.log(`Starting contract monitor service (interval: ${intervalMs}ms)`);
    this.monitorInterval = setInterval(() => this.checkPendingContracts(), intervalMs);
    
    // Run initial check
    this.checkPendingContracts();
  }
  
  stop() {
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval);
      this.monitorInterval = null;
      console.log('Contract monitor service stopped');
    }
  }
  
  async checkPendingContracts() {
    try {
      // Find all pending contracts that haven't expired
      const pendingContracts = await prisma.contract.findMany({
        where: {
          status: 'PENDING',
          expiresAt: { gt: new Date() }
        }
      });
      
      console.log(`Checking ${pendingContracts.length} pending contracts`);
      
      // Check each contract for payment status
      for (const contract of pendingContracts) {
        await this.updateContractStatus(contract);
      }
      
      // Find expired contracts to update their status
      const expiredContracts = await prisma.contract.findMany({
        where: {
          status: 'PENDING',
          expiresAt: { lt: new Date() }
        }
      });
      
      // Update expired contracts
      for (const contract of expiredContracts) {
        await prisma.contract.update({
          where: { id: contract.id },
          data: { 
            status: 'EXPIRED', 
            updatedAt: new Date() 
          }
        });
        console.log(`Contract ${contract.id} marked as EXPIRED`);
      }
    } catch (error) {
      console.error('Error in contract monitor:', error);
    }
  }
  
  async updateContractStatus(contract) {
    try {
      // Check payment status with Lightning Network
      const paymentStatus = await checkPayment(contract.paymentHash);
      
      if (paymentStatus.paid) {
        // Update contract in database as paid
        await prisma.contract.update({
          where: { id: contract.id },
          data: { 
            status: 'PAID', 
            paidAt: new Date(),
            updatedAt: new Date()
          }
        });
        console.log(`Contract ${contract.id} marked as PAID`);
        
        // Trigger any follow-up actions for paid contracts
        await this.processCompletedContract(contract);
      }
    } catch (error) {
      console.error(`Error checking contract ${contract.id}:`, error);
    }
  }
  
  async processCompletedContract(contract) {
    // Implementation of any business logic that happens after payment
    // For example: notify parties, trigger settlement, etc.
    console.log(`Processing completed contract: ${contract.id}`);
  }
}
```

## Security Considerations

BTContract implements comprehensive security measures:

### Authentication and Authorization

- **JWT-Based Sessions**: Secure token-based session management with NextAuth.js
- **Role-Based Access**: Different permission levels for users, administrators, and system roles
- **Data Access Controls**: Strict permission enforcement on database operations

### Payment Security

- **256-bit Secure Random Preimages**: Ensures cryptographic strength for payment hashes
- **SHA-256 Hashing**: Industry-standard cryptographic hashing for Lightning Network compatibility
- **Secure Storage**: Protection of sensitive cryptographic elements
- **Database Encryption**: Sensitive data stored in encrypted format where appropriate

### API Security

- **CSRF Protection**: Built-in protection against cross-site request forgery attacks
- **Rate Limiting**: Prevention of brute force and DoS attacks through request throttling
- **Input Validation**: Comprehensive validation of all user inputs
- **Error Handling**: Secure error responses that don't leak sensitive information

## Deployment Architecture

BTContract is deployed on a modern cloud infrastructure:

- **Next.js Application**: Frontend and API routes deployed as a unified application
- **PostgreSQL Database**: Managed PostgreSQL instance on Render for data persistence
- **Lightning Network Node**: Dedicated LND node for Lightning Network integration
- **Continuous Integration/Deployment**: Automated testing and deployment pipeline

## Conclusion

BTContract represents a significant advancement in making Bitcoin smart contract functionality accessible to non-technical users. By abstracting away the complex cryptographic and blockchain interactions behind an intuitive interface, the platform enables secure, fast, and user-friendly contract creation and management.

The combination of Next.js, NextAuth, Prisma, PostgreSQL, and blockchain integration creates a powerful tool for blockchain-based contract management that maintains security and reliability while providing an exceptional user experience.