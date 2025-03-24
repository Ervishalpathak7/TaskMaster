

export function validateEmail(email) {
    // Check the email is valid or not 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);  
};