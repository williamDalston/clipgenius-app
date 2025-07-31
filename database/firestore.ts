// Firebase/Firestore integration - commented out for now
// import { initializeApp, cert, getApps } from 'firebase-admin/app'
// import { getFirestore } from 'firebase-admin/firestore'

// if (!getApps().length) {
//   initializeApp({
//     credential: cert({
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//     }),
//   })
// }

// const db = getFirestore()

// export const jobsCollection = db.collection('jobs')

// export async function saveJobMetadata(fileId: string, metadata: any) {
//   await jobsCollection.doc(fileId).set({
//     createdAt: new Date(),
//     ...metadata,
//   })
// }

// export async function updateJobStatus(fileId: string, updates: any) {
//   await jobsCollection.doc(fileId).update(updates)
// }

// export async function getJobStatus(fileId: string) {
//   const doc = await jobsCollection.doc(fileId).get()
//   return doc.exists ? doc.data() : null
// }

// Mock implementations for now
export const jobsCollection = null

export async function saveJobMetadata(fileId: string, metadata: any) {
  console.log('Mock saveJobMetadata:', fileId, metadata)
}

export async function updateJobStatus(fileId: string, updates: any) {
  console.log('Mock updateJobStatus:', fileId, updates)
}

export async function getJobStatus(fileId: string) {
  console.log('Mock getJobStatus:', fileId)
  return null
}
