import { PrismaClient } from '@prisma/client'

// Create Prisma Client with query logging
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || 
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Test database connection function
export async function testConnection() {
  try {
    // Execute a simple query - adjust this based on your schema
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ Database connection successful')
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  }
}

// Test database connection when the server starts
if (process.env.NODE_ENV !== 'production') {
  testConnection()
    .then((connected) => {
      if (!connected) {
        console.warn('⚠️ Server starting with database connection issues')
      }
    })
    .catch((error) => {
      console.error('❌ Error testing database connection:', error)
    })
}

export default prisma