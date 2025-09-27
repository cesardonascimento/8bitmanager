import { NextResponse } from 'next/server';

export function createErrorResponse(
  error: unknown,
  message: string = 'An error occurred',
  status: number = 500,
  context?: string
) {
  const logMessage = context ? `Error ${context}:` : 'API Error:';
  console.error(logMessage, error);

  return NextResponse.json({ error: message }, { status });
}

export function createNotFoundResponse(message: string = 'Record not found') {
  return NextResponse.json({ error: message }, { status: 404 });
}
