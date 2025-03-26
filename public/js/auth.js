// Check if user is already logged in
function checkAuth() {
    const user = localStorage.getItem('user');
    if (user && window.location.pathname === '/') {
        window.location.href = '/dashboard';
    } else if (!user && window.location.pathname === '/dashboard') {
        window.location.href = '/';
    }
}

// Handle login form submission
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = document.getElementById('submitButton');
        const errorDiv = document.getElementById('error');
        
        submitButton.disabled = true;
        submitButton.textContent = 'Logging in...';
        errorDiv.style.display = 'none';

        const formData = new FormData(e.target);
        const loginData = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirect to dashboard
            window.location.href = '/dashboard';
        } catch (error) {
            errorDiv.textContent = error.message;
            errorDiv.style.display = 'block';
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Login';
        }
    });
}

// Handle registration form submission
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = document.getElementById('submitButton');
        const errorDiv = document.getElementById('error');
        
        submitButton.disabled = true;
        submitButton.textContent = 'Creating account...';
        errorDiv.style.display = 'none';

        const formData = new FormData(e.target);
        const registerData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };

        // Check if passwords match
        if (registerData.password !== registerData.confirmPassword) {
            errorDiv.textContent = 'Passwords do not match';
            errorDiv.style.display = 'block';
            submitButton.disabled = false;
            submitButton.textContent = 'Register';
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            // Redirect to login page
            window.location.href = '/?registered=true';
        } catch (error) {
            errorDiv.textContent = error.message;
            errorDiv.style.display = 'block';
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Register';
        }
    });
}

// Handle sign out
if (document.getElementById('signOutButton')) {
    document.getElementById('signOutButton').addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    });
}

// Check authentication status when page loads
checkAuth(); 