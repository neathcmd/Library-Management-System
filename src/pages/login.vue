<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input v-model="username" id="username" type="text" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="password" id="password" type="password" required />
        </div>
        <button type="submit">Login</button>
        <div v-if="error" class="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

function handleLogin() {
  // Simple demo: username "admin", password "admin"
  if (username.value === 'admin' && password.value === 'admin') {
    // Set login state (for demo, use localStorage)
    localStorage.setItem('loggedIn', 'true')
    router.push('/dashboard') // Change to your main page route
  } else {
    error.value = 'Invalid username or password'
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
}
.login-box {
  background: #fff;
  padding: 32px 28px;
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(26,35,65,0.12);
  width: 320px;
}
h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #1a2341;
}
.form-group {
  margin-bottom: 18px;
}
label {
  display: block;
  margin-bottom: 6px;
  color: #1a2341;
}
input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #1a2341;
  border-radius: 4px;
  font-size: 1rem;
}
button {
  width: 100%;
  padding: 10px;
  background: #1a2341;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
}
button:hover {
  background: #25305a;
}
.error {
  color: #c00;
  margin-top: 12px;
  text-align: center;
}
</style>