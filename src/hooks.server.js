// import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
// import { createServerClient } from '@supabase/ssr'
// import { redirect } from '@sveltejs/kit'
// import { goto } from "$app/navigation";


// export const handle = async ({ event, resolve }) => {
//     event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
//         cookies: {
//             get: (key) => event.cookies.get(key),
//             set: (key, value, options) => {
//                 event.cookies.set(key, value, { ...options, path: '/' })
//             },
//             remove: (key, options) => {
//                 event.cookies.delete(key, { ...options, path: '/' })
//             },
//         },
//     })

//     event.locals.getSession = async () => {
//         const {
//             data: { session },
//         } = await event.locals.supabase.auth.getSession()
//         return session
//     }


//     const session = await event.locals.getSession();

//     if (session && event.url.pathname == '/') {
//         throw redirect(303, '/categories')
//     }

//     const pathname = event.url.pathname.replace('/', '')

//     if (!session && pathname != '') {
//         throw redirect(303, '/')
//     }

//     return resolve(event, {
//         filterSerializedResponseHeaders(name) {
//             return name === 'content-range'
//         },
//     })
// }

import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createServerClient } from '@supabase/ssr'
import { redirect } from '@sveltejs/kit'

export const handle = async ({ event, resolve }) => {
    event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        cookies: {
            get: (key) => event.cookies.get(key),
            set: (key, value, options) => {
                event.cookies.set(key, value, { ...options, path: '/' })
            },
            remove: (key, options) => {
                event.cookies.delete(key, { ...options, path: '/' })
            },
        },
    })

    event.locals.getSession = async () => {
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession()
        return session
    }

    const session = await event.locals.getSession();

    //console.log("Session: ", session); // Log session to see if it is being retrieved successfully

    if (session && event.url.pathname == '/') {
        throw redirect(303, '/categories')
    }

    if (session) {
        if (event.url.pathname === '/admin') {
            const { data: user, error } = await event.locals.supabase
                .from('profiles') 
                .select('role')
                .eq('id', session.user.id)
                .single();

            console.log("Checking role for access control. User ID: ", session.user.id, " Role: ", user.role); // Log user data to see what is being returned
            console.log("Error: ", error); // Log any errors

            if (error || !user || user.role !== 'admin') {
                console.log("Redirecting to unauthorized, user does not meet criteria"); // Log redirection decision
                throw redirect(303, '/categories');
            }
        }
    } else if (event.url.pathname !== '/') {
        throw redirect(303, '/');
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range'
        },
    })
}
