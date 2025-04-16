document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('emailInput');
    const enrichBtn = document.getElementById('enrichBtn');
    const contactInfo = document.getElementById('contactInfo');
    const loginSection = document.getElementById('loginSection');
    const mainSection = document.getElementById('mainSection');
    
    let authToken = localStorage.getItem('authToken');
    
    // Check if user is already logged in
    if (authToken) {
        loginSection.style.display = 'none';
        mainSection.style.display = 'block';
    }
    
    // Handle login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            if (!response.ok) {
                throw new Error('Login failed');
            }
            
            const data = await response.json();
            authToken = data.token;
            localStorage.setItem('authToken', authToken);
            
            loginSection.style.display = 'none';
            mainSection.style.display = 'block';
        } catch (error) {
            alert(error.message);
        }
    });
    
    // Handle contact enrichment
    enrichBtn.addEventListener('click', async () => {
        const email = emailInput.value;
        
        if (!email) {
            alert('Please enter an email address');
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:3000/api/contacts/${email}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('authToken');
                    loginSection.style.display = 'block';
                    mainSection.style.display = 'none';
                    alert('Session expired. Please log in again.');
                    return;
                }
                throw new Error('Failed to fetch contact info');
            }
            
            const result = await response.json();
        
    
            if (!result.success) {
                throw new Error(result.message || 'Failed to get contact info');
            }
            
            const contact = result.data; 
            
            console.log('Contact data:', contact); 
            
            contactInfo.innerHTML = `
                <h3>${contact.full_name}</h3>
                <p><strong>Email:</strong> ${contact.email}</p>
                <p><strong>Job Title:</strong> ${contact.job_title}</p>
                <p><strong>Department:</strong> ${contact.department}</p>
                <p><strong>Phone:</strong> ${contact.phone_number}</p>
            `;
        } catch (error) {
            alert(error.message);
        }
    });
});