export const firebaseApiAuth = 'https://identitytoolkit.googleapis.com/v1/accounts:'
export const ApiKey = 'AIzaSyBqheFduyXEBJAr71GRFsg4Xo488v4xSkw'
export const signUp = `${firebaseApiAuth}signUp?key=${ApiKey}`
export const signIn = `${firebaseApiAuth}signInWithPassword?key=${ApiKey}`
export const updateProfile = `${firebaseApiAuth}update?key=${ApiKey}`
export const firebaseApiNotes = 'https://firestore.googleapis.com/v1/projects/to-do-app-3c628/databases/(default)/documents/'
export const addNote=`${firebaseApiNotes}notes?documentId=`
export const getNote=`${firebaseApiNotes}:runQuery`
export const updateOrDeleteNote=`${firebaseApiNotes}notes/`
