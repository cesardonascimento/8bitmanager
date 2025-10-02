import { NextResponse } from 'next/server';

export async function respondError(error: Error | string | unknown) {
  let errorMessage: string | undefined;

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else if (error !== undefined && error !== null) {
    errorMessage = String(error);
  }

  console.error(errorMessage);

  return NextResponse.json({ error: errorMessage }, { status: 500 });
}

export async function respondNotFound(message = 'Record not found') {
  return NextResponse.json({ error: message }, { status: 404 });
}

export async function respondBadRequest(message = 'Bad request') {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function respondSuccess(data: unknown) {
  return NextResponse.json(data);
}
