<template>
  <v-app>
    <v-main>
      <div class="login-container">
        
        <!-- Card -->
        <v-card class="login-card">
          
          <!-- Title -->
          <div class="login-header">
            <h1>Welcome Back</h1>
            <p>Login to your account</p>
          </div>

          <!-- Form -->
          <v-form @submit.prevent="handleLogin">
            
            <!-- Identifiant -->
            <v-text-field
              v-model="form.identifiant"
              label="Username or Email"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-account"
              class="input-field"
              color="primary"
              required
            />

            <!-- Password -->
            <v-text-field
              v-model="form.password"
              label="Password"
              type="password"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-lock-outline"
              class="input-field"
              color="primary"
              required
            />

           

            <!-- Button -->
            <v-btn
              block
              color="primary"
              size="large"
              class="login-btn"
              type="submit"
              :loading="loading"
            >
              Login
            </v-btn>

            <!-- Message -->
            <p v-if="message" :class="isError ? 'error' : 'success'">
              {{ message }}
            </p>

          </v-form>
          <!-- Signup -->
          <div class="signup">
            Don’t have an account?
            <a href="/signup">Sign up</a>
          </div>

        </v-card>

      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import axios from "axios"

const loading = ref(false)
const message = ref("")
const isError = ref(false)

const form = reactive({
  identifiant: "",
  password: "",
})

const handleLogin = async () => {
  loading.value = true
  message.value = ""

  try {
    const res = await axios.post("http://localhost:3000/auth/signin", form)

    // ✅ Save token (if exists)
    if (res.data.access_token) {
      localStorage.setItem("token", res.data.access_token)
    }

    message.value = "Login successful ✅"
    isError.value = false

    // 👉 Redirect after login (optional)
    // window.location.href = "/dashboard"

  } catch (err: any) {
    message.value =
      err.response?.data?.message || "Invalid credentials ❌"
    isError.value = true
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Background */
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #111827, #1f2937, #111827);
}

/* Card */
.login-card {
  width: 100%;
  max-width: 420px;
  padding: 30px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

/* Header */
.login-header {
  text-align: center;
  margin-bottom: 25px;
}

.login-header h1 {
  color: white;
  font-size: 28px;
  margin-bottom: 5px;
}

.login-header p {
  color: #cbd5e1;
  font-size: 14px;
}

/* Inputs */
.input-field {
  margin-bottom: 15px;
}


/* Button */
.login-btn {
  border-radius: 12px;
  font-weight: bold;
  margin-top: 10px;
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  margin: 25px 0;
  color: #9ca3af;
  font-size: 12px;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #4b5563;
}

.divider span {
  margin: 0 10px;
}

/* Social */
.social-buttons {
  display: flex;
  gap: 10px;
}

.social-btn {
  flex: 1;
  color: white;
  border-color: #6b7280;
}

/* Signup */
.signup {
  text-align: center;
  margin-top: 20px;
  color: #9ca3af;
  font-size: 13px;
}

.signup a {
  color: #60a5fa;
  text-decoration: none;
}

.signup a:hover {
  text-decoration: underline;
}

/* Messages */
.success {
  color: #22c55e;
  text-align: center;
  margin-top: 10px;
}

.error {
  color: #ef4444;
  text-align: center;
  margin-top: 10px;
}
</style>