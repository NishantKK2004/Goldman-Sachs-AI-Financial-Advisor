const DB_NAME = 'financehub-auth';
const DB_VERSION = 1;
const USER_STORE = 'users';
const SESSION_KEY = 'financehub-session';
const HASH_ITERATIONS = 210000;

function bufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    bytes.forEach(byte => {
        binary += String.fromCharCode(byte);
    });
    return btoa(binary);
}

function base64ToBuffer(value) {
    const binary = atob(value);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
}

function normalizeEmail(email) {
    return email.trim().toLowerCase();
}

function openDb() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(USER_STORE)) {
                db.createObjectStore(USER_STORE, { keyPath: 'email' });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function getUserByEmail(email) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(USER_STORE, 'readonly');
        const store = transaction.objectStore(USER_STORE);
        const request = store.get(normalizeEmail(email));

        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
        transaction.oncomplete = () => db.close();
    });
}

async function saveUser(user) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(USER_STORE, 'readwrite');
        const store = transaction.objectStore(USER_STORE);
        const request = store.add(user);

        request.onsuccess = () => resolve(user);
        request.onerror = () => reject(request.error);
        transaction.oncomplete = () => db.close();
    });
}

async function hashPassword(password, saltBase64) {
    const salt = saltBase64 ? base64ToBuffer(saltBase64) : crypto.getRandomValues(new Uint8Array(16)).buffer;
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(password),
        'PBKDF2',
        false,
        ['deriveBits']
    );
    const hash = await crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt,
            iterations: HASH_ITERATIONS,
            hash: 'SHA-256',
        },
        keyMaterial,
        256
    );

    return {
        salt: bufferToBase64(salt),
        hash: bufferToBase64(hash),
    };
}

function safeUser(user) {
    return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
    };
}

export async function createUser({ firstName, lastName, email, password }) {
    const cleanEmail = normalizeEmail(email);
    const existing = await getUserByEmail(cleanEmail);
    if (existing) {
        throw new Error('An account already exists for this email.');
    }

    const passwordRecord = await hashPassword(password);
    const user = {
        email: cleanEmail,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        passwordSalt: passwordRecord.salt,
        passwordHash: passwordRecord.hash,
        createdAt: new Date().toISOString(),
    };

    await saveUser(user);
    return safeUser(user);
}

export async function authenticateUser(email, password) {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error('No account found for that email.');
    }

    const passwordRecord = await hashPassword(password, user.passwordSalt);
    if (passwordRecord.hash !== user.passwordHash) {
        throw new Error('Incorrect password.');
    }

    return safeUser(user);
}

export function saveSession(user) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function loadSession() {
    try {
        const stored = sessionStorage.getItem(SESSION_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
}

export function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
}
