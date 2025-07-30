import type { VercelRequest, VercelResponse } from '@vercel/node';
import { spawn } from 'child_process';
import path from 'path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { fileId, style = 'viral' } = req.body;

  if (!fileId) {
    return res.status(400).json({ error: 'Missing fileId' });
  }

  const cliPath = path.resolve('./backend/cli.ts');
  const args = ['process-job', fileId, style];

  try {
    const child = spawn('npx', ['ts-node', cliPath, ...args], {
      stdio: 'inherit',
    });

    child.on('error', (err) => {
      console.error('Process failed:', err);
    });

    res.status(202).json({ success: true, message: 'Processing started' });
  } catch (err) {
    console.error('Failed to spawn process:', err);
    res.status(500).json({ error: 'Could not start processing' });
  }
}
