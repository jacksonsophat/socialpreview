'use server'

import { redirect } from 'next/navigation';
import { db } from './index';
import { contact } from './schema';

export const createContact = async (name: string, email: string, message: string) => {
    // console.log(name, email, message);
    // return;

    const data = await db.insert(contact).values({
        name,
        email,
        message
    })

    redirect('/contact/thank-you');
    // return data;
};  