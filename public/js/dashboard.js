// Initialize password data in localStorage if it doesn't exist
if (!localStorage.getItem('passwords')) {
    localStorage.setItem('passwords', JSON.stringify([]));
}

// DOM Elements
const loadingSpinner = document.getElementById('loading');
const passwordGrid = document.getElementById('passwordGrid');
const addPasswordModal = document.getElementById('addPasswordModal');
const viewPasswordModal = document.getElementById('viewPasswordModal');
const addPasswordForm = document.getElementById('addPasswordForm');
const signOutButton = document.getElementById('signOutButton');

// Show loading spinner
function showLoading() {
    loadingSpinner.style.display = 'flex';
}

// Hide loading spinner
function hideLoading() {
    loadingSpinner.style.display = 'none';
}

// Load and display passwords
async function loadPasswords() {
    showLoading();
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const passwords = JSON.parse(localStorage.getItem('passwords'));
        passwordGrid.innerHTML = '';
        
        passwords.forEach((password, index) => {
            const passwordCard = document.createElement('div');
            passwordCard.className = 'password-card';
            passwordCard.innerHTML = `
                <h3 class="title">${password.title}</h3>
                <p>${password.username}</p>
                <div class="actions">
                    <a href="#" class="link view-password" data-index="${index}">View</a>
                    <a href="#" class="link delete-password" data-index="${index}">Delete</a>
                </div>
            `;
            passwordGrid.appendChild(passwordCard);
        });

        // Add event listeners to view and delete buttons
        document.querySelectorAll('.view-password').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                viewPassword(e.target.dataset.index);
            });
        });

        document.querySelectorAll('.delete-password').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                deletePassword(e.target.dataset.index);
            });
        });
    } catch (error) {
        console.error('Error loading passwords:', error);
    } finally {
        hideLoading();
    }
}

// Show add password modal
document.getElementById('addPasswordButton').addEventListener('click', () => {
    addPasswordModal.style.display = 'flex';
});

// Hide modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === addPasswordModal) {
        addPasswordModal.style.display = 'none';
    }
    if (e.target === viewPasswordModal) {
        viewPasswordModal.style.display = 'none';
    }
});

// Handle add password form submission
addPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPassword = {
        title: formData.get('title'),
        username: formData.get('username'),
        password: formData.get('password'),
        url: formData.get('url'),
        notes: formData.get('notes')
    };

    // Add new password to storage
    const passwords = JSON.parse(localStorage.getItem('passwords'));
    passwords.push(newPassword);
    localStorage.setItem('passwords', JSON.stringify(passwords));

    // Reset form and close modal
    e.target.reset();
    addPasswordModal.style.display = 'none';

    // Reload passwords
    await loadPasswords();
});

// View password details
function viewPassword(index) {
    const passwords = JSON.parse(localStorage.getItem('passwords'));
    const password = passwords[index];
    
    document.getElementById('viewPasswordTitle').textContent = password.title;
    document.getElementById('viewPasswordUsername').textContent = password.username;
    document.getElementById('viewPasswordValue').textContent = password.password;
    
    viewPasswordModal.style.display = 'flex';
}

// Delete password
async function deletePassword(index) {
    if (confirm('Are you sure you want to delete this password?')) {
        const passwords = JSON.parse(localStorage.getItem('passwords'));
        passwords.splice(index, 1);
        localStorage.setItem('passwords', JSON.stringify(passwords));
        await loadPasswords();
    }
}

// Handle sign out
signOutButton.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
});

// Close modal buttons
document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', () => {
        addPasswordModal.style.display = 'none';
        viewPasswordModal.style.display = 'none';
    });
});

// Load passwords when page loads
loadPasswords(); 