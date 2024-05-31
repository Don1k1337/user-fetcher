<template>
  <div class="card-container">
    <div class="card">
      <form @submit.prevent="onSubmit" class="form">
        <div class="input-group">
          <label for="email">Email:</label>
          <Field
            name="email"
            type="email"
            v-model="email"
            placeholder="Enter your email"
            :class="{ invalid: !isValid && isTouched }"
          />
          <ErrorMessage name="email" class="error-message" />
        </div>
        <div class="input-group">
          <label for="number">Number:</label>
          <input
            v-model="number"
            type="text"
            placeholder="Enter your number"
            @input="formatNumber"
          />
        </div>
        <button
          type="submit"
          class="submit-button"
          :disabled="!isValid || loading"
        >
          {{ loading ? "Searching..." : "Search" }}
        </button>
      </form>
    </div>
    <div
      class="user-card"
      :class="{ 'loading-opacity': loading, 'default-opacity': !loading }"
    >
      <div v-if="userData.length > 0">
        <h2>User Data:</h2>
        <div v-for="(user, index) in userData" :key="index">
          <p>Email: {{ user.email }}</p>
          <p>Number: {{ user.number }}</p>
        </div>
      </div>
      <div v-else>
        <p>No user data available. Please search for some.</p>
      </div>
    </div>
  </div>
  <div v-if="loading" class="loader-container">
    <div class="loader"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  ErrorMessage,
  Field,
  useForm,
  useIsFormTouched,
  useIsFormValid,
} from "vee-validate";
import * as yup from "yup";
import { getUserByNameEmail } from "../api";
import { formatNumberBeforeSubmit } from "../utils/data/phoneTrimmer.ts";

const email = ref<string>("");
const number = ref<string>("");

interface userData {
  email: string;
  number: string;
}

const formatNumber = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  let inputValue: string = target.value.replace(/\D/g, "");

  if (inputValue.length > 6) inputValue = inputValue.substring(0, 6);

  target.value = inputValue
    .replace(/^(\d{2})/, "$1-")
    .replace(/(\d{2})(?=\d{2}$)/, "$1-");
};

const loading = ref<boolean>(false);
const userData = ref<userData[]>([]);

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
  }),
});
const isValid = useIsFormValid();
const isTouched = useIsFormTouched();

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    const formattedNumber = formatNumberBeforeSubmit(number.value);
    const response = await getUserByNameEmail({
      number: formattedNumber,
      email: values.email,
    });
    userData.value = response.users;
    console.log(userData.value);
  } catch (error) {
    console.error("Validation errors or API error:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
}
.loading-opacity {
  opacity: 0.3;
}
.default-opacity {
  opacity: 1;
}
.card {
  background-color: #f0f0f0;
  border-radius: 1rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 28.125rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.form {
  display: flex;
  flex-direction: column;
}

.input-group {
  margin-bottom: 1.5rem;
}

label {
  font-size: 1rem;
  font-weight: bold;
}

input {
  margin-top: 0.5rem;
  width: calc(100% - 2rem);
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 0.0625rem solid $color-background;
  font-size: 1rem;
}

input.invalid {
  border-color: $color-danger;
}
.error-message {
  color: $color-danger;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.submit-button {
  background-color: $color-secondary;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: $color-secondary;
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.loader {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 0.25rem solid rgba(0, 123, 255, 0.2);
  border-top-color: $color-secondary;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .card-container {
    margin-top: 2rem;
  }
}

@media (max-width: 480px) {
  .card {
    padding: 1rem;
  }

  .input-group {
    margin-bottom: 1rem;
  }

  label {
    font-size: 0.875rem;
  }

  input {
    padding: 0.5rem;
    font-size: 0.875rem;
  }

  .error-message {
    font-size: 0.75rem;
  }

  .submit-button {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
}
</style>
