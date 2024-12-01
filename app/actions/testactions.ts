'use server'; // action.ts

import { redirect } from 'next/navigation';
import { parseWithZod } from '@conform-to/zod';
import { schema } from '@/app/actions/testschema';

export async function login(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: schema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  redirect('/dashboard');
}