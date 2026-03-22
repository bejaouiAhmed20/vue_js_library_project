<template>
  <div class="signup-container">
    <div class="signup-card">
      <h2>Create Account</h2>

      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <label>Username</label>
          <input v-model="form.username" type="text" required />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input v-model="form.email" type="email" required />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input v-model="form.password" type="password" required />
        </div>
         <div class="have">
              <a href="/">Already have an account?</a>
            </div>
        <button type="submit" :disabled="loading">
          {{ loading ? "Creating..." : "Sign Up" }}
        </button>

        <p v-if="message" :class="isError ? 'error' : 'success'">
          {{ message }}
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import axios from "axios"

const loading = ref(false)
const message = ref("")
const isError = ref(false)

const form = reactive({
  username: "",
  email: "",
  password: "",
})

const handleSignup = async () => {
  loading.value = true
  message.value = ""

  try {
    await axios.post("http://localhost:3000/auth/signup", {
      ...form,
      role: "ROLE_USER", // ✅ always user
    })

    message.value = "Account created successfully ✅"
    isError.value = false

    // reset form
    form.username = ""
    form.email = ""
    form.password = ""
  } catch (err: any) {
    message.value = err.response?.data?.message || "Signup failed ❌"
    isError.value = true
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.signup-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0f172a;
}

.signup-card {
  background: #1e293b;
  padding: 30px;
  border-radius: 16px;
  width: 350px;
  color: white;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

input {
  padding: 10px;
  border-radius: 8px;
  border: none;
  margin-top: 5px;
}

button {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  background: #3b82f6;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.success {
  color: #22c55e;
  margin-top: 10px;
  text-align: center;
}

.error {
  color: #ef4444;
  margin-top: 10px;
  text-align: center;
}
/* Forgot */
.have {
  text-align: right;
  margin-bottom: 15px;
}

.have a {
  font-size: 13px;
  color: #60a5fa;
  text-decoration: none;
}

.have a:hover {
  text-decoration: underline;
}

</style>